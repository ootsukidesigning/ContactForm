<template>
  <div>
    <ValidationObserver
      ref="observer"
      :name="formName"
      v-slot="{ invalid }"
      tag="form"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      @submit.prevent="onSubmit"
    >
      <input type="hidden" name="form-name" :value="formName" />
      <slot>
        <b-container>
          <b-row cols="1" cols-md="3">
            <b-col>
              <b-form-group>
                <template #label>
                  お名前
                  <b-badge variant="info">必須</b-badge>
                </template>
                <MoleculeFormGroup
                  v-model="commit.name.last"
                  v-bind="form.name.last"
                  sr-only
                />
                <MoleculeFormGroup
                  v-model="commit.name.first"
                  v-bind="form.name.first"
                  sr-only
                />
              </b-form-group>
              <MoleculeFormGroup
                v-model="commit.address"
                v-bind="form.address"
              />
              <MoleculeFormGroup v-model="commit.tel" v-bind="form.tel" />
              <MoleculeFormGroup v-model="commit.email" v-bind="form.email" />
            </b-col>
            <b-col>
              <MoleculeFormGroup
                v-slot="{ props, state }"
                v-bind="form.request"
              >
                <AtomFormSelect
                  v-model="commit.request"
                  v-bind="props"
                  :state="state"
                  :options="form.request.options"
                />
              </MoleculeFormGroup>
              <MoleculeFormGroup
                v-slot="{ props, state }"
                v-bind="form.reqdetail"
              >
                <AtomFormSelect
                  v-model="commit.reqdetail"
                  v-bind="props"
                  :state="state"
                  :options="selectOptions(commit.request, form.reqdetail)"
                />
              </MoleculeFormGroup>
              <MoleculeFormGroup v-slot="{ props, state }" v-bind="form.method">
                <AtomFormSelect
                  v-model="commit.method"
                  v-bind="props"
                  :state="state"
                  :options="form.method.options"
                />
              </MoleculeFormGroup>
              <MoleculeFormGroup v-slot="{ props, state }" v-bind="form.budget">
                <AtomFormSelect
                  v-model="commit.budget"
                  v-bind="props"
                  :state="state"
                  :options="form.budget.options"
                />
              </MoleculeFormGroup>
            </b-col>
            <b-col>
              <MoleculeFormGroup
                v-slot="{ props, state }"
                v-bind="form.deadline"
              >
                <AtomFormSelect
                  v-model="commit.deadline"
                  v-bind="props"
                  :state="state"
                  :options="form.deadline.options"
                />
              </MoleculeFormGroup>
              <MoleculeFormGroup v-slot="{ props }" v-bind="form.detail">
                <AtomFormText v-model="commit.detail" v-bind="props" rows="7" />
              </MoleculeFormGroup>
              <MoleculeFormGroup v-slot="{ props }" v-bind="form.circumstance">
                <AtomFormSelect
                  v-model="commit.circumstance"
                  v-bind="props"
                  :options="form.circumstance.options"
                />
              </MoleculeFormGroup>
            </b-col>
          </b-row>
          <b-row class="button-area mt-4">
            <b-col>
              <AtomButtonReset @reset="onReset" />
            </b-col>
            <b-col>
              <b-button block type="submit" variant="info" :disabled="invalid">
                ご入力内容の確認
              </b-button>
            </b-col>
          </b-row>
        </b-container>
      </slot>
    </ValidationObserver>
  </div>
</template>

<script>
export default {
  props: {
    form: { type: Object, default: () => {} },
    values: { type: Object, default: () => {} },
    formName: { type: String, default: 'default-form' },
  },
  computed: {
    commit() {
      return this.values
    },
  },
  watch: {
    commit: {
      handler() {
        this.$emit('update', this.commit)
      },
      deep: true,
    },
  },
  methods: {
    selectOptions(selecter = String(), target = Object()) {
      const selectOptions = target.options[selecter]
      return selectOptions || target.options.default
    },
    onSubmit() {
      this.$emit('submit')
    },
    onReset() {
      this.$emit('reset')
      this.$refs.observer.reset()
    },
  },
}
</script>
