<template>
  <div id="index">
    <div class="body">
      <header>
        <OrganismHeader />
      </header>
      <section id="leadcopy" class="my-4">
        <b-container>
          <b-row class="mb-4">
            <b-col>
              <h1>ご相談・<br class="d-md-none" />お問い合わせ</h1>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <NuxtContent :document="index" />
            </b-col>
          </b-row>
        </b-container>
      </section>
      <section id="form" class="my-4">
        <!-- <OrganismFormDispatch v-bind="{ form }" /> -->
      </section>
    </div>

    <footer class="bg-light">
      <OrganismFooter />
    </footer>
  </div>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const index = await $content('form/index').fetch()
    const form = await $content('form/define').fetch()
    return { index, form }
  },
}
</script>

<style scoped>
.body {
  min-height: 80vh;
}
footer {
  height: 20vh;
}
</style>
