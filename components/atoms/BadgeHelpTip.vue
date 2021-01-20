<template>
  <b-badge v-b-tooltip.hover :title="text">
    <b-icon icon="question-circle-fill" />
  </b-badge>
</template>

<script>
export default {
  props: {
    text: { type: String, default: '' },
  },
}
</script>
