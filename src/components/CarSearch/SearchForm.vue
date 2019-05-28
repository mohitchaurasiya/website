<template>
  <v-form ref="form" id="form">
    <div v-if="!loading">
      <div ref="cars" id="cars">
        <ModelMake v-bind:small="small" v-on:selectCar="selectCar" v-bind:makes="makes"/>
      </div>
      <v-layout v-if="!small">
        <v-spacer/>
        <v-btn color="secondary" dark @click="addCarsTab">
          Auto toevoegen
          &nbsp;
          <v-icon>add</v-icon>
        </v-btn>
      </v-layout>
      <!--        -->
      <div v-bind:key="range.from.header" v-for="range in ranges">
        <FromToInput
          v-on:submit="addInput"
          v-bind:fromRange="range.from"
          v-bind:toRange="range.to"
        />
      </div>
      <!--       -->
      <v-layout>
        <v-spacer/>
        <v-btn color="secondary" @click="clear">
          Legen
          &nbsp;
          <v-icon>clear</v-icon>
        </v-btn>
        <v-btn color="primary" @click="submit">
          Zoeken
          &nbsp;
          <v-icon>search</v-icon>
        </v-btn>
      </v-layout>
    </div>
  </v-form>
</template>

<script>
import ModelMake from "./ModelMake.vue";
import FromToInput from "./FromToInput.vue";
import Vue from "vue";

export default {
  name: "SearchForm",
  components: {
    ModelMake,
    FromToInput
  },
  props: { small: Boolean },
  data() {
    return {
      makes: null,
      carMakesModels: [],

      ranges: [],

      searchKeys: [],
      loading: true
    };
  },
  created() {
    axios
      .get("https://localhost:44347/api/vehiclesearch/options/limited")
      .then(response => {
        this.makes = response.data.makes;
        this.ranges.push(
          {
            from: response.data.priceFrom,
            to: response.data.priceTo
          },
          {
            from: response.data.registrationDatesFrom,
            to: response.data.registrationDatesTo
          }
        );
        console.log(response.data);
        const urlParams = new URLSearchParams(window.location.search);
        this.fillInForm(urlParams);
        this.loading = false;
        Vue.nextTick().then(() => {
          this.createCarTabs(urlParams);
        });
      })
      .catch(error => console.log(error.response));
  },
  methods: {
    fillInForm(urlParams) {
      urlParams.forEach((value, key) => {
        for (var range in this.ranges) {
          if (this.ranges[range].from.header == key) {
            this.ranges[range].from.value = value;
            this.addInput(key, value);
          } else if (this.ranges[range].to.header == key) {
            this.ranges[range].to.value = value;
            this.addInput(key, value);
          }
        }
      });
    },
    createCarTabs(urlParams) {
      if (urlParams.get("merk") != null) {
        var makeIds = urlParams
          .get("merk")
          .split(",")
          .map(x => parseInt(x));
        var modelIds = urlParams
          .get("model")
          .split(",")
          .map(x => parseInt(x));

        this.clearCarTabs();

        var loopLength = this.small ? 1 : makeIds.length;

        for (var i = 0; i < loopLength; i++) {
          var modelId = i < modelIds.length ? modelIds[i] : null;
          this.addCarsTab(makeIds[i], modelId);
        }
      }
    },
    addInput(name, value) {
      if (this.searchKeys.length > 0) {
        this.searchKeys = this.searchKeys.filter(x => x.name != name);
      }
      if (value != null) {
        this.searchKeys.push({ name, value });
      }
    },
    parse(val) {
      var parsed = parseInt(val);
      if (isNaN(parsed)) return null;
      return parsed;
    },
    stringify(string) {
      return string ? string.split("_").join(" ") : "";
    },
    addCarsTab(makeId, modelId) {
      var parent = this.$refs.cars;

      if (parent.childElementCount < 3) {
        var componentClass = Vue.extend(ModelMake);
        var instance = new componentClass({
          propsData: {
            makes: this.makes,
            small: this.small,
            makeId: makeId,
            modelId: modelId
          }
        });
        instance.$on("selectCar", this.selectCar);
        instance.$mount();

        parent.appendChild(instance.$el);
      }
    },
    selectCar(id, makeId, modelId) {
      if (this.carMakesModels.length > 0) {
        this.carMakesModels = this.carMakesModels.filter(x => x.id != id);
      }
      if (makeId != null || modelId != null) {
        this.carMakesModels.push({ id, makeId, modelId });
      }
    },
    clear() {
      this.$refs.form.reset();
      this.clearCarTabs();
      this.addCarsTab();
    },
    clearCarTabs() {
      var parent = this.$refs.cars;
      while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
      }
      this.carMakesModels = [];
    },
    submit() {
      var makeQuery = this.carMakesModels.map(x => x.makeId).join();
      var modelQuery = this.carMakesModels.map(x => x.modelId).join();

      var params = [];
      if (makeQuery != "") {
        params.push({ name: "merk", value: makeQuery });
      }
      if (modelQuery != "") {
        params.push({ name: "model", value: modelQuery });
      }

      params = params.concat(this.searchKeys);
      var query = params.map(x => x.name + "=" + x.value).join("&");
      if (query) query = "?" + query;

      if (this.sm) {
        history.pushState(null, null, "/search/" + query);
        this.$emit("search", query);
      } else {
        this.$router.push("/search/" + query);
      }
    }
  }
};
</script>
