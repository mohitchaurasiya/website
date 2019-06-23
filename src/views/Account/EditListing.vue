<template>
  <v-container fluid>
    <v-list>
      <v-container>
        <EditListingForm/>
      </v-container>
    </v-list>
  </v-container>
</template>
<script>
import EditListingForm from "../../components/Search/Form/EditListingForm.vue";

export default {
  name: "edit-listing",
  components: { EditListingForm }
};
</script>

<style scoped>
</style>
