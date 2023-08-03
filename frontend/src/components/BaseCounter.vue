<template>
  <div class="form__counter">
    <button
      type="button"
      aria-label="Убрать один товар"
      @click.prevent="minus(amount)"
    >
      <svg
        width="37"
        height="37"
        viewBox="0 0 37 37"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="0.5" y="0.5" width="36" height="36" rx="18" stroke="#E2E2E2" />
        <path d="M22.287 19.574H14.7V17.765H22.287V19.574Z" fill="#9D9D9D" />
      </svg>
    </button>

    <input
      type="text"
      :value="amount"
      @input="$emit('update:amount', ($event.target as HTMLInputElement).value)"
    />

    <button
      type="button"
      aria-label="Добавить один товар"
      @click.prevent="plus(amount)"
    >
      <svg
        width="37"
        height="37"
        viewBox="0 0 37 37"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="0.5" y="0.5" width="36" height="36" rx="18" stroke="#E2E2E2" />
        <path
          d="M19.524 23.086H18.094V18.576H13.54V17.102H18.094V12.57H19.524V17.102H24.078V18.576H19.524V23.086Z"
          fill="#9D9D9D"
        />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  amount: number;
}>();
const emits = defineEmits<{
  (e: "update:amount", amount: number): void;
}>();
// функция изменения props +1
const plus = (value: number) => {
  emits("update:amount", value + 1);
};
// функция изменения props -1
const minus = (value: number) => {
  if (props.amount <= 1) {
    value = 1;
  } else {
    emits("update:amount", value - 1);
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/style/main";
.form__counter {
  justify-content: space-between;
  flex-direction: row;
  border: 1px solid $primary;
  border-radius: 50px;
  padding: 0 15px;

  &,
  & button {
    display: flex;
    align-items: center;
    background-color: #fff;
  }

  & button {
    margin: 0;
    padding: 0;
    font: inherit;
    background-color: transparent;
    -webkit-tap-highlight-color: transparent;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    border-radius: 50%;
    border: 1px solid #e2e2e2;
    flex-shrink: 0;
    cursor: pointer;
    -webkit-transition: all 0.2s ease;
    transition: all 0.3s ease;
  }
  & button:focus,
  & button:hover {
    border: 1px solid $primary;
    color: $dark_text;
  }
  & input {
    padding: 10px 5px;
    width: 70px;
    border-radius: 0;
    background-color: transparent;
    border: 0;
    -webkit-box-shadow: none;
    box-shadow: none;
    color: #222;
    font: inherit;
    font-size: 24px;
    line-height: 1;
    text-align: center;
  }
}
</style>
