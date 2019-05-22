<template>
  <div>
    <h2>hello, and welcome to the big dick club</h2>
    <div>
      <SearchResults/>
    </div>
  </div>
</template>

<script>
import SearchResults from "../components/CarSearch/SearchResults.vue";

export default {
  name: "car-search",
  components: {
    SearchResults
  }
};
</script>
