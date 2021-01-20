<template>
  <div id="confirm">
    <OrganismContactFormConfirm v-bind="$props" @confirm="submit" />
  </div>
</template>

<script>
export default {
  fetch({ redirect, params }) {
    if (!params.commit) redirect({ name: 'form' })
  },
  props: {
    form: { type: Object, default: () => {} },
    preservValues: { type: Object, default: () => {} },
    formName: { type: String, default: 'default-form' },
  },
  methods: {
    normalization(data) {
      const normalized = {}
      for (const index in data) {
        normalized[data[index]['id']] = data[index]['value']
      }
      return normalized
    },
    encode(data) {
      return Object.keys(data)
        .map(
          (key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
        )
        .join('&')
    },
    submit(mapped) {
      const url = '/'
      const encode = this.encode({
        'form-name': this.formName,
        ...this.normalization(mapped),
      })
      const config = {
        header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
      this.$axios
        .$post(url, encode, config)
        .then(() => {
          this.$emit('reset', 'preserv')
          this.$router.push({ name: 'form-result', params: { submit: true } })
        })
        .catch((error) => {
          if (this.$axios.isCancel(error)) {
            console.log('Request canceled', error)
          } else {
            console.log(error)
          }
        })
    },
  },
}
</script>
