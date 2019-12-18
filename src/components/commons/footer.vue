<template>
  <div class="footer">
    <footer>
      <div class="main-footer-container">
        <div class="footer-container1">
          Opus
          <br />Thapathali, Kathmandu, Nepal
          <br />tel:01 55-55555
          <br />e-mail: sales@opus.com.np
        </div>
        <div class="footer-container2">
          Copyright, {{ new Date().getFullYear() }}
          <br />All rights reserved.
        </div>
      </div>
    </footer>
  </div>
</template>
<script>
export default {
  data: () => ({
    icons: [
      'mdi-facebook-box',
      'mdi-twitter-box',
      'fab fa-google-plus',
      'fab fa-linkedin',
      'fab fa-instagram'
    ]
  })

}
</script>
<style scoped>
.main-footer-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-container1 {
  text-align: left;
}
.footer {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 1rem;
  background-color: rgba(236, 112, 99, 1);
  text-align: center;
  color: white;
}
</style>
