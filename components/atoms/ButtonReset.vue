<template>
  <b-button block @click="showResetMsgBox">リセット</b-button>
</template>

<script>
export default {
  methods: {
    showResetMsgBox() {
      this.$bvModal
        .msgBoxConfirm('リセットを実行してよろしいでしょうか?', {
          title: '入力内容のリセット',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'warning',
          okTitle: 'Reset',
          cancelTitle: 'Cancel',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true,
        })
        .then((value) => {
          if (value) this.$emit('reset', true)
        })
        .catch((err) => {
          // An error occurred
          console.log(err)
        })
    },
  },
}
</script>
