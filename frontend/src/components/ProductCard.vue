<template>
  <div class="card">
    <div class="card__image">
      <img src="../assets/images/JQUEEN050001.png" alt="">
    </div>
    <div class="card__title">
      <h3>Аромат для дома</h3>
    </div>
    <div class="card__desc">
      <p>Аромат для дома</p>
    </div>
    <div class="card__price">
      <span>2000 руб</span>
    </div>
    <button class="card__btn">Купить</button>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">

.card {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 300px;
  margin-top: 30px;
  margin-bottom: 30px;
  border: 1px solid rgba(242, 242, 242, .5);
  border-radius: 10px;
  padding: 30px;
  box-shadow: 5px 5px 10px rgba(242, 242, 242, .5),
  -5px -5px 10px rgba(242, 242, 242, .5),
  5px -5px 10px rgba(242, 242, 242, .5),
  -5px 5px 10px rgba(242, 242, 242, .5);

  &__btn {
    padding: 10px;
    border: 1px solid green;
    border-radius: 10px;
    background-color: lightblue;
  }
}
</style>
