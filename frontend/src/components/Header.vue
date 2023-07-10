<template>
  <header class="header">
    <div class="header__container">
      <div class="header__logo">
        <a href="/">
          <h1>AromeShop</h1>
        </a>
      </div>
      <nav class="header__nav">
        <ul class="nav__list">
          <li class="nav__item">
            <router-link to="/aromahome">Ароматы для дома</router-link>
          </li>
          <li class="nav__item">
            <router-link to="/aromaauto">Ароматы для авто</router-link>
          </li>
          <li class="nav__item">
            <router-link to="/cosmetology">Косметология</router-link>
          </li>
        </ul>
      </nav>
      <div class="header__btns">
        <a class="header__btns-link" href="">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100.36 100.36"><defs></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path class="cls-1" d="M99.08,92.88,70.53,64.32a39.6,39.6,0,1,0-6.21,6.21L92.88,99.08a4.38,4.38,0,0,0,6.2-6.2ZM39.64,70.44a30.8,30.8,0,1,1,30.8-30.8A30.8,30.8,0,0,1,39.64,70.44Z"/></g></g></svg>
        </a>
        <a class="header__btns-link" href="">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 117.05 100.08"><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path d="M58.52,100.08a7.26,7.26,0,0,1-5.16-2.14L9.51,54.15C-2.84,41.82-3.21,21.81,8.69,9.55A31.55,31.55,0,0,1,53.57,9.2l5,5,4.94-5a31.56,31.56,0,0,1,44.89.35c11.91,12.25,11.54,32.26-.81,44.6h0L63.68,97.94A7.24,7.24,0,0,1,58.52,100.08ZM31.3,5a26.32,26.32,0,0,0-19,8C2.25,23.33,2.59,40.2,13,50.63L56.88,94.42a2.33,2.33,0,0,0,3.28,0L104,50.63c10.44-10.43,10.77-27.3.75-37.61A26.56,26.56,0,0,0,67,12.73l-6.69,6.7a2.5,2.5,0,0,1-3.53,0l-6.71-6.7A26.34,26.34,0,0,0,31.3,5Zm74.48,47.57h0Z"/></g></g></svg>
        </a>
        <a class="header__btns-link" href="">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.87 99.96"><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path d="M120.8,31H84.93L73.56,1.34a2,2,0,0,0-3.84,1.43h0L80.57,32H42.12L53,2.76a2,2,0,0,0-3.84-1.43L37.75,32H2A2,2,0,0,0,.12,34.7L23.43,98.62A2,2,0,0,0,25.35,100h71.8a2.05,2.05,0,0,0,1.94-1.36l23.66-64.86a2.07,2.07,0,0,0-2-2.78ZM95.92,96H26.77L4.89,36H36.24l-3.66,9.95a2,2,0,1,0,3.83,1.44L40.61,37H82.09l4.19,10.39a2.05,2.05,0,0,0,3.84-1.44L86.45,36h31.36Z"/></g></g></svg>
        </a>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.header {
  width: 100%;
  padding: 30px;
  color: white;
  background-color: black;

  &__container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  &__btns {
    display: flex;
    flex-direction: row;
    width: 120px;
    justify-content: space-between;
  }
  &__btns-link {
    display: flex;
    flex-direction: row;
    width: 30px;
  }
  &__btns-link svg path {
    fill: white;
  }
}
.nav__list {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;
  font-size: 20px;
  font-weight: 700;
}
</style>
