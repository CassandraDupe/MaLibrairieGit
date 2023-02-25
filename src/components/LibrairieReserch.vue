<script setup>
import { defineEmits } from "vue";

const emit = defineEmits(["lookForB"]);
</script>

<template>
  <h3>Espace Recherche</h3>
  <form @submit.prevent="$emit('lookForB', word)" id="lookingFor">
    <input
      type="text"
      v-model="word"
      placeholder="Mot à chercher ?"
      id="searcher"
    />
    <input type="submit" value="Chercher" />
  </form>
</template>

<style scoped>
h3 {
  font-family: "Apple Chancery", "Brush Script MT", "cursive", "serif";
  font-weight: lighter;
}
</style>
