<template>
  <div id="page">
    <section id="form-header" class="my-4">
      <b-container>
        <b-row class="mb-4">
          <b-col>
            <h1>ご相談・<br class="d-md-none" />お問い合わせ</h1>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <NuxtContent :document="getHeaderText" />
          </b-col>
        </b-row>
      </b-container>
    </section>
    <section id="form-body">
      <NuxtChild
        v-bind="{ form, formName, preservValues, warningText }"
        @preserv="commit"
        @reset="reset"
        keep-alive
      />
    </section>
  </div>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const headerText = {}
    headerText.form = await $content('form/index').fetch()
    headerText['form-confirm'] = await $content('form/confirm').fetch()
    headerText['form-result'] = await $content('form/result').fetch()
    const warningText = await $content('form/warning').fetch()
    const form = await $content('form/define').fetch()
    return { headerText, warningText, form }
  },
  data() {
    return {
      formName: 'contact-form',
      preservValues: {},
    }
  },
  computed: {
    getHeaderText() {
      return this.headerText[this.$route.name]
    },
  },
  methods: {
    commit(value) {
      this.preservValues = value
      this.$router.push({ name: 'form-confirm', params: { commit: true } })
    },
    reset(value) {
      console.log(value)
      if (value === 'preserv') {
        Object.assign(this.$data, this.$options.data())
      }
    },
  },
}
</script>
