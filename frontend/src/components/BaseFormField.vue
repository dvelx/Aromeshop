<template>
  <label class="form__label">
    <slot />
    <span class="form__value">{{ title }}</span>
    <span v-if="error" class="form__error">{{ error }}</span>
  </label>
</template>

<script setup lang="ts">
defineProps<{
  title: String;
  error: String;
}>();
</script>

<style lang="scss" scoped>
.form__label {
  position: relative;
  display: block;
  color: #222;
}
.form__label:not(:last-child) {
  margin-bottom: 25px;
}

.form__value {
  position: absolute;
  top: 10px;
  left: 20px;
  font-size: 12px;
  line-height: 1;
  color: #737373;
  font-weight: 300;
}
</style>
