<script setup>
import { reactive, onMounted } from "vue";
import LibrairieItem from "./LibrairieItem.vue";
import LibrairieForm from "./LibrairieForm.vue";
import LibrairieReserch from "./LibrairieReserch.vue";
import Livre from "../Livre";

const listeL = reactive([]);
console.log(listeL);

// -- l'url de l'API
const url = "https://webmmi.iut-tlse3.fr/~pecatte/librairies/public/16/livres";

function getBooks() {
  const fetchOptions = { method: "GET" };
  fetch(url, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      // -- vider la liste des choses
      listeL.splice(0, listeL.length);
      // pour chaque donnée renvoyée par l'API
      //  créer un objet instance de la classe Chose
      //  et l'ajouter dans la liste listeC
      dataJSON.forEach((l) =>
        listeL.push(new Livre(l.id, l.titre, l.qtestock, l.prix))
      );
    })
    .catch((error) => console.log(error));
}

function handlerDelete(id) {
  console.log(id);
  const fetchOptions = {
    method: "DELETE",
  };
  // -- l'id de la chose à supprimer doit être
  //  ajouté à la fin de l'url
  fetch(url + "/" + id, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      getBooks();
    })
    .catch((error) => console.log(error));
}

function handlerAdd(titre, qtestock, prix) {
  console.log(titre, qtestock, prix);

  //Si l'utilisateur rentre prix=0, on change la valeur car le livre ne peut
  //être en stock si la quantité = 0
  if (qtestock <= 0) {
    qtestock = 1;
  }

  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  // --  le libelle de la nouvelle chose est envoyé au serveur
  //  via le body de la req AJAX
  const fetchOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({ titre: titre, qtestock: qtestock, prix: prix }),
  };
  fetch(url, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      getBooks();
    })
    .catch((error) => console.log(error));
}

onMounted(() => {
  getBooks();
});

function handlerAddOneBook(book) {
  console.log(book);
  // -- ajouter 1 en quantité en stock
  book.addOneBook();
  // -- entête http pour la req AJAX
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  // -- la chose modifiée est envoyé au serveur
  //  via le body de la req AJAX
  const fetchOptions = {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify(book),
  };
  // -- la req AJAX
  fetch(url, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      // actualiser la liste des livres
      getBooks();
    })
    .catch((error) => console.log(error));
}

function handlerDeleteOneBook(book) {
  console.log(book);
  if (book.qtestock > 1) {
    // -- soustraire 1 de la quantité en stock
    book.deleteOneBook();
    // -- entête http pour la req AJAX
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    // -- la chose modifiée est envoyé au serveur
    //  via le body de la req AJAX
    const fetchOptions = {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify(book),
    };
    // -- la req AJAX
    fetch(url, fetchOptions)
      .then((response) => {
        return response.json();
      })
      .then((dataJSON) => {
        console.log(dataJSON);
        // actualiser la liste des livres
        getBooks();
      })
      .catch((error) => console.log(error));
  } else {
    handlerDelete(book.id);
    getBooks();
  }
}

function handlerReserch(word) {
  const fetchOptions = { method: "GET" };

  fetch(url + "?search=" + word, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      let booksWithWord = dataJSON;
      document.getElementById("recherche").innerHTML += "<ul>";
      for (let book of booksWithWord) {
        document.getElementById("recherche").innerHTML += book.pourAfficher();
        //"<li>${this._titre}, ${this._qtestock} en stock, ${this._prix}€</li>";
      }
      document.getElementById("recherche").innerHTML += "</ul>";
    })
    .catch((error) => console.log(error));
}
</script>

<template>
  <h3>Lire pour vivre</h3>
  <ul>
    <LibrairieItem
      v-for="livre of listeL"
      :key="livre.id"
      :livre="livre"
      @deleteB="handlerDelete"
      @addOneBook="handlerAddOneBook"
      @deleteOneBook="handlerDeleteOneBook"
    />
  </ul>
  <LibrairieForm @addB="handlerAdd" />
  <LibrairieReserch @lookForB="handlerReserch" />
</template>

<style scoped>
h3 {
  font-family: "Apple Chancery", "Brush Script MT", "cursive", "serif";
  font-weight: lighter;
  font-size: 30px;
  text-align: center;
}
</style>