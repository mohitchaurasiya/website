<template>
  <div>
    <div
      v-bind:key="car.verhicleListingId"
      v-for="car in result"
    >{{car.vehicle.license}} + {{car.vehicle.mileage}} + {{car.price}} + {{car.vehicle.version}} + {{car.vehicle.vehicleModel.vehicleMake.name}}</div>
  </div>
</template>

<script>
export default {
  name: "search-results",
  data() {
    return {
      result: null
    };
  },
  created() {
    axios
      .get(
        "https://localhost:44347/api/vehiclesearch/listings/limited/" +
          window.location.search
      )
      .then(response => (this.result = response.data))
      .catch(error => console.log(error));
  }
};
</script>

