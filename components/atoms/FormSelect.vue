<template>
  <b-form-select v-model="commit" v-bind="$props" :name="id" />
</template>

<script>
export default {
  props: {
    id: { type: String, default: '' },
    state: { default: null },
    options: { type: Array, default: () => [] },
    value: { type: String, default: '' },
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
