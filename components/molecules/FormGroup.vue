<template>
  <ValidationProvider v-slot="state" :rules="rules" :name="label">
    <b-form-group
      :label="label"
      :label-for="id"
      :label-sr-only="srOnly"
      :invalid-feedback="state.errors[0]"
      :state="judgState(state)"
      :description="description"
    >
      <template #label>
        <slot name="label">
          {{ label }}
          <b-badge v-if="isRequired" variant="info">必須</b-badge>
          <AtomBadgeHelpTip v-if="helpTxt" :text="helpTxt" />
        </slot>
      </template>

      <slot :props="$props" :state="judgState(state)">
        <AtomFormInput
          v-model="commit"
          :state="judgState(state)"
          v-bind="$props"
        />
      </slot>
    </b-form-group>
  </ValidationProvider>
</template>

<script>
export default {
  props: {
    id: { type: String, default: '' },
    description: { type: String, default: '' },
    label: { type: String, default: '' },
    rules: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    value: { type: String, default: '' },
    helpTxt: { type: String, default: '' },
    srOnly: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
  },
  computed: {
    commit: {
      get() {
        return this.value
      },
      set(value) {
        if (this.value !== value) this.$emit('input', value)
      },
    },
    isRequired() {
      return Boolean(~this.rules.indexOf('required'))
    },
  },
  methods: {
    judgState(state) {
      return state.validated ? state.valid : null
    },
  },
}
</script>
