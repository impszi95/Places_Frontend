<template>
  <div id="app">
    <CreatePlace class="create_place_comp"/>
    <Places class="places_comp"/>
  </div>
</template>

<script>
import Places from './components/Places.vue'
import CreatePlace from './components/CreatePlace.vue'

export default {
  name: 'App',
  components: {
    Places,
    CreatePlace
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.create_place_comp{
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 30px;
}
.places{
  margin-left: auto;
  margin-right: auto;
}
</style>
