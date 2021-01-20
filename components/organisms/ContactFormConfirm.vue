<template>
  <div class="organisms">
    <b-container>
      <b-row cols="1" cols-md="3">
        <b-col>
          <b-form-group label="お名前">
            <MoleculeFormGroup
              srOnly
              readonly
              :value="isGet('mapped.last.value')"
            />
            <MoleculeFormGroup
              srOnly
              readonly
              :value="isGet('mapped.first.value')"
            />
          </b-form-group>
          <MoleculeFormGroup
            readonly
            :label="isGet('mapped.address.label')"
            :value="isGet('mapped.address.value')"
          />
          <MoleculeFormGroup
            readonly
            :label="isGet('mapped.tel.label')"
            :value="isGet('mapped.tel.value')"
          />
          <MoleculeFormGroup
            readonly
            :label="isGet('mapped.email.label')"
            :value="isGet('mapped.email.value')"
          />
        </b-col>
        <b-col>
          <MoleculeFormGroup
            readonly
            :label="isGet('mapped.request.label')"
            :value="isGet('mapped.request.value')"
            description="現状、どのようなことを依頼したいと考えていますか？(想定で構いません)"
          />
          <MoleculeFormGroup
            readonly
            :label="isGet('mapped.reqdetail.label')"
            :value="isGet('mapped.reqdetail.value')"
          />
          <MoleculeFormGroup
            readonly
            :label="isGet('mapped.method.label')"
            :value="isGet('mapped.method.value')"
          />
          <MoleculeFormGroup
            readonly
            :label="isGet('mapped.budget.label')"
            :value="isGet('mapped.budget.value')"
          />
        </b-col>
        <b-col>
          <MoleculeFormGroup
            readonly
            :label="isGet('mapped.deadline.label')"
            :value="isGet('mapped.deadline.value')"
          />
          <MoleculeFormGroup :label="isGet('mapped.detail.label')">
            <AtomFormText
              readonly
              rows="7"
              :value="isGet('mapped.detail.value')"
            />
          </MoleculeFormGroup>
          <MoleculeFormGroup
            readonly
            :label="isGet('mapped.circumstance.label')"
            :value="isGet('mapped.circumstance.value')"
          />
        </b-col>
      </b-row>
      <b-row class="button-area mt-4">
        <b-col>
          <b-button block @click="$router.go(-1)"> ご入力内容を変更 </b-button>
        </b-col>
        <b-col>
          <b-button block @click="onSubmit" variant="info">
            ご依頼内容を送信
          </b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  props: {
    form: { type: Object, default: () => {} },
    preservValues: { type: Object, default: () => {} },
  },
  computed: {
    mapped() {
      const mapped = this.mapper(this.preservValues, this.form)

      const reqdetailVal = this.ReplaceByNestedOptions(
        [this.preservValues.request, this.preservValues.reqdetail],
        this.form.reqdetail.options
      )
      if ('reqdetail' in mapped) mapped.reqdetail.value = reqdetailVal

      return mapped
    },
  },
  methods: {
    mapper(values, source, label) {
      let mapped = Object()

      for (const [key, value] of Object.entries(values)) {
        const field = label ? `-${source[key].label}` : source[key].label
        const type = typeof value

        if (type === 'string' || type === 'number') {
          mapped[key] = {
            label: field,
            id: source[key].id,
            value: this.ValueFromOptions(value, source[key].options),
          }
        }

        if (type === 'object') {
          mapped = { ...mapped, ...this.mapper(value, source[key], field) }
        }
      }
      return mapped
    },

    ValueFromOptions(val, options) {
      if (typeof options === 'object') {
        val = options[val] || val
      }

      if (Array.isArray(options)) {
        val = options.find((item) => item.value === val)
        val = val.text || val
      }

      return val
    },

    ReplaceByNestedOptions(values = Array(), nestedOptions) {
      let result

      result = this.ValueFromOptions(values.splice(0, 1).join(), nestedOptions)
      if (values.length) {
        result = this.ReplaceByNestedOptions(values, result)
      }

      return result
    },
    /*
     * Returns undefinded if the target object does not have
     * the specified parameters.
     */
    isGet(str, target) {
      const nestArray = str.split('.')
      let value

      // If the target does not exist,
      // specify the target in the first property
      if (!target) {
        target = this[nestArray.splice(0, 1)] || {}
      }
      // Does the target have the specified property?
      if (nestArray[0] in target) {
        value = target[nestArray.splice(0, 1)]
      }
      // Re-execute if target is object
      if (typeof value == 'object') {
        value = this.isGet(nestArray.join('.'), value)
      }

      return value
    },
    onSubmit() {
      this.$emit('confirm', this.mapped)
    },
  },
}
</script>
