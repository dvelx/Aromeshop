<template>
  <div class="container order__container">
    <div class="order__content-top"></div>
    <section class="order__content-form">
      <form action="#" method="post" class="form">
        <div class="form__field">
          <div class="form__data">
            <BaseFormText v-model="formData.name" title="ФИО" placeholder="Введите ваше полное имя" :error="formError.name"/>
            <BaseFormText v-model="formData.address" title="Адрес доставки" placeholder="Введите ваш адрес" :error="formError.address" />
            <BaseFormText v-model="formData.phone" title="Телефон" placeholder="Введите ваш телефон" :error="formError.phone" />
            <BaseFormText v-model="formData.email" title="Email" placeholder="Введи ваш Email" :error="formError.email" />
            <BaseFormTextarea v-model="formData.comment" title="Комментарий к заказу" placeholder="Ваши пожелания" :error="formError.comment" />
          </div>
        </div>
        <div class="form__cart">
          <ul class="form__cart-orders">
            <OrderPageCart />
          </ul>
          
          <div class="form__cart-total">
            <p>Итого:</p>
          </div>
          
          <button class="form__cart-btn btn" type="submit">
            Оформить заказ
          </button>
        </div>
      </form>
    </section>
  </div>
</template>

<script setup lang="ts">
import BaseFormText from "@/components/BaseFormText.vue";
import BaseFormTextarea from "@/components/BaseFormTextarea.vue";
import {ref} from "vue";
import OrderPageCart from "@/components/OrderPageCart.vue";

interface FromData {
  name: string,
  address: string,
  phone: string,
  email: string,
  comment: string
}

const formData = ref({} as FromData)
const formError = ref({} as FromData)
const formErrorMessage = ref({})
</script>

<style lang="scss" scoped>
@import "src/assets/style/main";
.order__container {
  display: flex;
  width: 100vw;
  flex-direction: column;
  padding-left: 18%;
  padding-right: 18%;
}
.form {
  display: grid;
  width: 100%;
  grid-template-columns: auto 370px;
  grid-template-rows: auto 1fr;
  grid-gap: 20px 50px;
  -webkit-box-align: start;
  -ms-flex-align: start;
  align-items: flex-start;
  
  &__field {
    grid-row: 1/3;
  }
  
  &__data {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 5px 30px;
    padding-bottom: 25px;
    margin-bottom: 15px;
    
    & label:not(:nth-child(4)):not(:nth-child(3)) {
      grid-column: 1/-1;
    }
  }
  
  &__cart {
    border: 1px solid #dedede;
    border-radius: 10px;
    padding: 35px 30px;
    
    &-orders {
      list-style: none;
      padding: 0 30px 25px;
      margin: 0 -30px 25px;
      border-bottom: 1px solid #dedede;
    }
    
    &-btn {
      margin-top: 20px;
      width: 100%;
      border-radius: 20px;
      border: 1px solid $primary;
      padding: 25px 15px;
    }
  }
}
</style>
