<template>
  <div>
    <v-container fluid>
      <v-layout row id="parent">
        <v-flex v-bind:key="license" v-for="license in licenses">
          <Kenteken v-bind:licenseParams="license"/>
        </v-flex>
      </v-layout>
    </v-container>
    <v-btn id="add-button" @click="addSearchTab" color="green" dark small>
      <v-icon dark>add</v-icon>
    </v-btn>
  </div>
</template>

<script>
import Kenteken from "../components/License.vue";
import Vue from "vue";

export default {
  name: "license-search",
  components: {
    Kenteken
  },
  data() {
    return {
      licenses: [""]
    };
  },
  mounted() {
    this.licenses = this.$route.params.licenseParams
      ? this.$route.params.licenseParams.split("&").slice(0, 3)
      : [""];
  },
  methods: {
    addSearchTab() {
      var parent = document.getElementById("parent");
      if (parent.childElementCount < 3) {
        var componentClass = Vue.extend(Kenteken);
        var instance = new componentClass();
        instance.$mount();
        var wrapper = document.createElement("div");
        wrapper.className = "flex";
        wrapper.appendChild(instance.$el);
        parent.appendChild(wrapper);
      }
    }
  }
};
</script>

<style scoped>
#add-button {
  position: fixed;
  bottom: 0;
  width: 50px;
  left: calc(50% - 50px);
}
</style>
