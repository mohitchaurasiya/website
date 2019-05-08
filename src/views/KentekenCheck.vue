<template>
  <div id="app">
    <v-app>
      <v-container fluid>
        <v-layout row id="parent">
          <v-flex v-if="!licenses">
            <Kenteken/>
          </v-flex>

          <v-flex v-bind:key="license" v-for="license in licenses">
            <Kenteken v-bind:licenseParams="license"/>
          </v-flex>
        </v-layout>
      </v-container>
      <v-btn id="add-button" @click="addSearchTab" color="green" dark small>
        <v-icon dark>add</v-icon>
      </v-btn>
    </v-app>
  </div>
</template>

<script>
import Kenteken from "../components/Kenteken.vue";
import Vue from "vue";

export default {
  name: "kenteken-search",
  components: {
    Kenteken
  },
  data() {
    return {
      licenses: null
    };
  },
  mounted() {
    this.licenses = this.$route.params.licenseParams
      ? this.$route.params.licenseParams.split("&")
      : null;
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
