<template>
  <ul v-if="pages > 1" class="pagination">
    <li class="pagination__item">
      <button class="pagination__btn" :disabled="page === 1" @click.prevent="prevPage(Number(page))">Назад</button>
    </li>
    <li v-for="pageNumber of pages" :key="pageNumber" class="pagination__item">
      <a class="pagination__link" @click="paginate(pageNumber)">{{ pageNumber }}</a>
    </li>
    <li class="pagination__item">
      <button class="pagination__button" :disabled="page === pages" @click.prevent="nextPage(Number(page))">Вперед</button>
    </li>
  </ul>
</template>

<script setup lang="ts">
import {computed} from "vue";

const props = defineProps<{
  page: Number,
  count: Number,
  perPage: Number
}>()

const emits = defineEmits<{
  (e: 'update:page', page: number): void
}>()


const pages = computed(() => {
  return Math.ceil(Number(props.count) / Number(props.perPage))
})

const paginate = (page: number) => {
  emits('update:page', page)
}
const prevPage = (page: number) => {
  emits('update:page', page - 1)
}
const nextPage = (page: number) => {
  emits('update:page', page + 1)
}
</script>

<style lang="scss" scoped>
  .pagination {
    display: flex;
    gap: 30px;
    margin-bottom: 30px;
    margin-right: auto;
    margin-left: auto;
    
    &__link {
      color: black;
    }
  }
</style>
