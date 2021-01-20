<template>
  <ValidationObserver
    ref="observers"
    v-slot="{ invalid }"
    tag="form"
    @submit.prevent="onDispatch"
    @reset.prevent="showResetMsgBox"
  >
    <slot>
      <b-container>
        <b-row cols="1" cols-md="3">
          <!-- <b-col>
            <MoleculeFormGroup
              v-pre
              v-bind="sampleForm.name"
              v-model="sampleForm.name.value"
            />
            <b-form-group>
              <template #label>
                お名前
                <b-badge variant="info">必須</b-badge>
              </template>
              <MoleculeFormGroup
                v-model="form.name.last.value"
                v-bind="form.name.last"
                sr-only
              />
              <MoleculeFormGroup
                v-model="form.name.first.value"
                v-bind="form.name.first"
                sr-only
              />
            </b-form-group>
            <MoleculeFormGroup v-model="form.email.value" v-bind="form.email" />
            <MoleculeFormGroup
              v-model="form.address.value"
              v-bind="form.address"
            />
            <MoleculeFormGroup v-model="form.tel.value" v-bind="form.tel" />
          </b-col>
          <b-col>
            <MoleculeFormGroup v-slot="{ props, state }" v-bind="form.request">
              <AtomFormSelect
                v-model="form.request.value"
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
                v-model="form.reqdetail.value"
                v-bind="props"
                :state="state"
                :options="selectOptions(form.request.value, form.reqdetail)"
              />
            </MoleculeFormGroup>
            <MoleculeFormGroup v-slot="{ props, state }" v-bind="form.method">
              <AtomFormSelect
                v-model="form.method.value"
                v-bind="props"
                :state="state"
                :options="form.method.options"
              />
            </MoleculeFormGroup>
            <MoleculeFormGroup v-slot="{ props, state }" v-bind="form.budget">
              <AtomFormSelect
                v-model="form.budget.value"
                v-bind="props"
                :state="state"
                :options="form.budget.options"
              />
            </MoleculeFormGroup>
          </b-col>
          <b-col>
            <MoleculeFormGroup v-slot="{ props, state }" v-bind="form.deadline">
              <AtomFormSelect
                v-model="form.deadline.value"
                v-bind="props"
                :state="state"
                :options="form.deadline.options"
              />
            </MoleculeFormGroup>
            <MoleculeFormGroup v-slot="{ props }" v-bind="form.detail">
              <AtomFormText
                v-model="form.detail.value"
                v-bind="props"
                rows="7"
              />
            </MoleculeFormGroup>
            <MoleculeFormGroup v-slot="{ props }" v-bind="form.circumstance">
              <AtomFormSelect
                v-model="form.circumstance.value"
                v-bind="props"
                :options="form.circumstance.options"
              />
            </MoleculeFormGroup>
          </b-col> -->
        </b-row>
      </b-container>
    </slot>
    <slot name="button">
      <b-container>
        <b-row>
          <b-col>
            <b-button block type="reset">リセット</b-button>
          </b-col>
          <b-col>
            <b-button block type="submit" variant="info" :disabled="invalid"
              >ご入力内容の確認</b-button
            >
          </b-col>
        </b-row>
      </b-container>
    </slot>
  </ValidationObserver>
</template>

<script>
export default {
  props: {
    form: { type: Object, default: () => {} },
  },
  data() {
    return {
      sampleForm: {
        name: {
          id: 'name',
          label: 'Name',
          rules: 'required',
          description: 'Please enter your name.',
          value: '',
        },
      },
    }
  },
  computed: {
    commit() {
      return this.form
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
    showResetMsgBox() {
      this.$bvModal
        .msgBoxConfirm('リセットを実行してよろしいでしょうか?', {
          title: '入力内容のリセット',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'warning',
          okTitle: 'YES',
          cancelTitle: 'NO',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true,
        })
        .then((value) => {
          if (value) this.onReset()
        })
        .catch((err) => {
          // An error occurred
          console.log(err)
        })
    },
    onReset() {
      Object.assign(this.$data, this.$options.data.call(this))
      this.$refs.observers.reset()
    },
    onDispatch() {},
    log(obj) {
      console.log(obj)
    },
  },
}
</script>
