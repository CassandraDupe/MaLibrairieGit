<script setup>
defineProps(["livre"]);
const emit = defineEmits(["deleteB", "addOneBook", "deleteOneBook"]);
</script>

<template>
  <li>
    {{ livre.toShow() }}

    <button @click="$emit('deleteB', livre.id)">Supprimer</button>

    <button @click="$emit('addOneBook', livre)">+1</button>
    <button @click="$emit('deleteOneBook', livre)">-1</button>
  </li>
</template>

<style scoped></style>
