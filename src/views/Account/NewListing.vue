<template>
  <v-container fluid>
    <v-list>
      <v-container>
        <NewListingForm/>
      </v-container>
    </v-list>
  </v-container>
</template>
<script>
import NewListingForm from "../../components/Search/Form/NewListingForm.vue";

export default {
  name: "new-listing",
  components: { NewListingForm }
};
</script>

<style scoped>
</style>
