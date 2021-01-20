<template>
  <div class="header-contact-info">
    <b-badge pill class="px-3">お気軽にお問合せください</b-badge>
    <p class="h4 font-weight-bold">TEL 03-3642-8027</p>
    <p class="reception">( 受付時間 10:00 〜 19:00 )</p>
    <b-button block size="sm" variant="warning">
      <b-icon icon="envelope" />
      メールはこちらから 24時間受付中
    </b-button>
  </div>
</template>

<style scoped>
p {
  margin: 0;
  font-feature-settings: 'palt';
}
.header-contact-info {
  text-align: center;
}
.badge {
  width: 100%;
  letter-spacing: 0.17rem;
}
.reception {
  letter-spacing: 0.075rem;
}
</style>
