<template>
  <footer class="footer">
    <div class="container">
      <h1>footer</h1>
      <router-link to="/consent_to_the_processing_of_personal_data">
        Политика конфиденциальности
      </router-link>
    </div>
  </footer>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
@import "../../src/assets/styles/main";

.footer {
  width: 100%;
  padding: 30px 0;
  background-color: black;
  color: white;
}

</style>
