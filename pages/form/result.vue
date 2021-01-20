<template>
  <div>
    <b-container>
      <b-row>
        <b-col>
          <NuxtContent :document="warningText" />
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-button href="/form/">最初へ戻る</b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  fetch({ redirect, params }) {
    if (!params.submit) redirect({ name: 'form' })
  },
  props: {
    resultText: { type: Object, default: () => {} },
    warningText: { type: Object, default: () => {} },
  },
}
</script>
