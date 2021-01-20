<template>
  <div id="index">
    <div class="body">
      <header>
        <OrganismHeader />
      </header>
      <!-- This is body -->
    </div>

    <footer class="bg-light">
      <OrganismFooter />
    </footer>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, redirect }) {
    redirect({ name: 'form' })
    return
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
