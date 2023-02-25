<script setup>
import { defineEmits } from "vue";
import { ref } from "vue";
// -- donnée réactive pour la saisie du livre
const titre = ref("");
const qtestock = ref("");
const prix = ref("");

const emit = defineEmits(["addB"]);

function handlerSubmit() {
  // en dehors du template il faut se souvenir que les attributs
  // sont des objets avec l'attribut value (créé par ref())
  emit("addB", titre.value, qtestock.value, prix.value);
  titre.value = "";
}
</script>

<template>
  <h3>Livre à ajouter ?</h3>
  <form @submit.prevent="handlerSubmit">
    <!--<form @submit.prevent="$emit('addB', titre, qtestock, prix)" id="submitter">-->
    <input
      type="text"
      v-model="titre"
      placeholder="titre du livre ?"
      id="titleHolder"
    />
    <input
      type="text"
      v-model="qtestock"
      placeholder="nombre disponible ?"
      id="qteHolder"
    />
    <input type="text" v-model="prix" placeholder="prix ?" id="priceHolder" />
    <input type="submit" value="valider" />
  </form>
</template>

<style scoped>
h3 {
  font-family: "Apple Chancery", "Brush Script MT", "cursive", "serif";
  font-weight: lighter;
}
</style>