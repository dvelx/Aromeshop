<template>
  <section class="order">
    <div class="container order__container">
      <div class="order__content-top"></div>
      <section class="order__content-form">
        <form action="#" method="post" class="form" @submit.prevent="order()">
          <div class="form__field">
            <div class="form__data">

              <label class="form__label">
                <input
                  v-model="formData.name"
                  v-maska:[maskOptions]
                  data-maska="Az Az Az"
                  class="form__input"
                  type="text"
                  name="fullName"
                  placeholder="Введите ваше полное имя"
                />
                <span class="form__value">ФИО</span>
                <span v-if="formError" class="form__error">{{ formError.name }}</span>
              </label>

              <label class="form__label">
                <input
                  v-model="formData.address"
                  class="form__input"
                  type="text"
                  name="address"
                  placeholder="Введите ваш адрес"
                />
                <span class="form__value">Адрес доставки</span>
                <span v-if="formError" class="form__error">{{ formError.address }}</span>
              </label>

              <label class="form__label">
                <input
                  v-model="formData.phone"
                  v-maska:[maskOptions]
                  data-maska="+7(###)###-##-##"
                  class="form__input"
                  type="tel"
                  name="phone"
                  placeholder="Введите ваш телефон"
                />
                <span class="form__value">Телефон</span>
                <span v-if="formError" class="form__error">{{ formError.phone }}</span>
              </label>

              <label class="form__label">
                <input
                  v-model="formData.email"
                  class="form__input"
                  type="text"
                  name="email"
                  placeholder="Введите ваш Email"
                />
                <span class="form__value">Email</span>
                <span v-if="formError" class="form__error">{{ formError.email }}</span>
              </label>

              <label class="form__label">
              <textarea
                v-model="formData.comment"
                class="form__input form__input--area"
                name="comments"
                placeholder="Ваши пожелания"
              ></textarea>
                <span class="form__value">Комментарий к заказу</span>
                <span v-if="formError" class="form__error">{{ formError.comment }}</span>
              </label>

            </div>
          </div>
          <div class="form__cart">
            <ul class="form__cart-orders">
              <OrderPageCart
                v-for="item in products"
                :key="item.id"
                :item="item"
              />
            </ul>

            <div class="form__cart-total">
              <p>
                Итого: <b>{{ totalAmount }}</b> товаров на сумму
                <b>{{ totalPrice }} ₽</b>
              </p>
            </div>

            <button class="form__cart-btn btn" type="submit">
              Оформить заказ
            </button>
          </div>
        </form>
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
import {computed, reactive, ref} from "vue";
import OrderPageCart from "@/components/OrderPageCart.vue";
import { cartStore } from "@/store/cartStore.ts";
import numberFormatter from "@/helpers/numberFormatter.ts";
import apiDataService from "@/services/apiDataService.ts";
import ResponseData from "@/types/ResponseData.ts";
import { useRouter } from "vue-router";
import { vMaska } from "maska";

interface FormData {
  name: string;
  address: string;
  phone: string;
  email: string;
  comment: string;
}

const store = cartStore();
const router = useRouter();

const formData = ref({} as FormData);
const formError = ref({} as FormData);
// const formErrorMessage = ref({});

const products = computed(() => {
  return store.state.cartProduct;
});

const totalPrice = computed(() => {
  return numberFormatter(store.cartTotalPrice());
});

const totalAmount = computed(() => {
  return products.value.length;
});

const order = () => {
  apiDataService
    .makeOrder(
      formData.value.name,
      formData.value.address,
      formData.value.phone,
      formData.value.email,
      formData.value.comment,
      store.state.userAccessKey,
    )
    .then((res: ResponseData) => {
      store.updateOrderInfo(res.data);
      store.resetCart();
      router.push({ name: "/order/:id", params: { id: res.data.id } });
    })
    .catch((error) => {
      formError.value = error.response.data.error;
    });
};
//маска 
const maskOptions = reactive({
  tokens: {
    A: { pattern: /[A-ZА-ЯЁ]/, transform: (v: string) => v.toLocaleUpperCase() },
    z: { pattern: /[a-zа-яё]/, transform: (v: string) => v.toLocaleLowerCase(), multiple: true },
    '#': { pattern: /[0-9]/ },
    m: { pattern: /[a-z0-9-.]/, multiple: true, transform: (v: string) => v.toLocaleLowerCase() }
  },
  tokensReplace: true
});

</script>

<style lang="scss" scoped>
@import "src/assets/style/main";
.order__container {
  display: flex;
  flex-direction: column;
  padding-left: 18%;
  padding-right: 18%;
}

.form {
  display: grid;
  grid-template-columns: auto 370px;
  grid-template-rows: auto 1fr;
  grid-gap: 20px 50px;
  -webkit-box-align: start;
  -ms-flex-align: start;
  align-items: flex-start;
  
  &__label {
    position: relative;
    display: block;
    color: #222;
  }
  &__label:not(:last-child) {
    margin-bottom: 25px;
  }
  &__value {
    position: absolute;
    top: 10px;
    left: 20px;
    font-size: 12px;
    line-height: 1;
    color: #737373;
    font-weight: 300;
  }
  &__input {
    padding: 28px 45px 13px 20px;
    width: 100%;
    height: 65px;
    border: 1px solid $primary;
    border-radius: 10px;
    background-color: #fafafa;
    -webkit-box-shadow: none;
    box-shadow: none;
    -webkit-transition: all 0.2s ease;
    transition: all 0.2s ease;
    color: #222;
    font-size: 16px;
    font-family: inherit;
    line-height: 1;
  }
  &__input--area {
    resize: none;
    height: 140px;
  }
  &__input:focus,
  &__input:hover {
    outline: none;
    border-color: $dark-text;
  }
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
    border: 1px solid $primary;
    border-radius: 10px;
    padding: 35px 30px;

    &-orders {
      list-style: none;
      padding: 0 30px 25px;
      margin: 0 -30px 25px;
      border-bottom: 1px solid $primary;
    }

    &-btn {
      margin-top: 20px;
      width: 100%;
      border-radius: 20px;
      border: 1px solid $primary;
      padding: 15px 15px;
      font-size: 20px;
      color: $dark_text;
    }
  }
}

@media (max-width: 1780px) {
}
@media (max-width: 1366px) {
}

@media (max-width: 1024px) {
}

@media (max-width: 768px) {
  .order__container {
    width: 100%;
    align-items: center;
    padding: 0 30px;
  }
  .order__content-form {
    width: 100%;
  }
  .form {
    display: flex;
    flex-direction: column;
    
    &__field {
      width: 100%;
    }
    
    &__data {
      grid-template-columns: 1fr;
    }
    
    &__label {
      grid-column: 1/-1;
    }

    &__cart {
      width: 100%;
      margin-bottom: 40px;
    }
  }
}

@media (max-width: 576px) {
}

@media (max-width: 320px) {
}
</style>
