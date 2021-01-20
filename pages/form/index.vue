<template>
  <div id="input">
    <OrganismContactForm
      v-bind="{ form, values, formName }"
      @update="updateValues"
      @reset="resetValues"
      @submit="toConfirm"
    />
  </div>
</template>

<script>
export default {
  props: {
    form: { type: Object, default: () => {} },
    formName: { type: String, default: '' },
  },
  data() {
    return {
      values: {
        name: { first: '', last: '' },
        email: '',
        address: '',
        tel: '',
        request: '',
        reqdetail: '',
        method: '',
        budget: '',
        deadline: '',
        detail: '',
        circumstance: '',
      },
    }
  },
  methods: {
    updateValues(value) {
      this.values = value
    },
    resetValues(value) {
      Object.assign(this.$data, this.$options.data())
    },
    toConfirm(value) {
      this.$emit('preserv', this.values)
    },
  },
}
</script>
