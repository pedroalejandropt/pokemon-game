<template>
  <h1 v-if="!pokemon">Loading...</h1>
  <div v-else>
    <h1>Who is this pokemon ?</h1>
    <PokemonPicture :pokemonId="pokemon?.id" :showPokemon="showPokemon" />
    <PokemonOptions :pokemons="pokemonArr" @selection="checkAnswer" />

    <template v-if="showAnswer" class="fade-in">
      <h3>{{ message }}</h3>
      <button @click="resetGame">New Game</button>
    </template>
  </div>
</template>

<script>
import PokemonPicture from "@/components/PokemonPicture";
import PokemonOptions from "@/components/PokemonOptions";
import getPokemonOptions from "@/helpers/getPokemonOptions.js";

export default {
  name: "PokemonPage",
  data() {
    return {
      pokemonArr: [],
      pokemon: null,
      showPokemon: false,
      showAnswer: false,
      message: null,
    };
  },
  methods: {
    async mixPokemonsArr() {
      this.pokemonArr = await getPokemonOptions();
      const rndInt = Math.floor(Math.random() * 4);
      this.pokemon = this.pokemonArr[rndInt];
    },
    checkAnswer(id) {
      this.message =
        this.pokemon.id === id
          ? "Correct"
          : `Incorrect, the answer is ${this.pokemon.name}`;
      this.showAnswer = true;
      this.showPokemon = true;
    },
    resetGame() {
      this.message = null;
      this.pokemon = null;
      this.showPokemon = false;
      this.showAnswer = false;
      this.mixPokemonsArr();
    },
  },
  mounted() {
    this.mixPokemonsArr();
  },
  components: {
    PokemonPicture,
    PokemonOptions,
  },
};
</script>

<style>
</style>