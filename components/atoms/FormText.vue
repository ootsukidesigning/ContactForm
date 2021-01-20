<template>
  <b-form-textarea v-model="commit" v-bind="$props" :name="id" />
</template>

<script>
export default {
  props: {
    id: { type: String, default: '' },
    state: { default: null },
    debounce: { type: String, default: '' },
    rows: { type: String, default: '' },
    value: { type: String, default: '' },
    readonly: { type: Boolean, value: false },
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
  },
}
</script>
