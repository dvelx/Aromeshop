<template>
  <BaseFormField :title="title" :error="error">
    <input
      v-model="value"
      class="form__input"
      type="text"
      :name="typeInput"
      :placeholder="String(placeholder)"
    />
  </BaseFormField>
</template>

<script setup lang="ts">
import { computed } from "vue";
import BaseFormField from "@/components/BaseFormField.vue";

const props = defineProps<{
  title: String;
  error: String;
  placeholder: String;
  modelValue: String;
  typeInput: string;
}>();
const emits = defineEmits<{
  (e: "update:modelValue", modelValue: string): void;
}>();

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value: string) {
    emits("update:modelValue", value);
  },
});
</script>

<style lang="scss" scoped>
@import "src/assets/style/main";
.form__input {
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
.form__input:focus,
.form__input:hover {
  outline: none;
  border-color: $dark-text;
}
</style>
