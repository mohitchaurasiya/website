<template>
  <v-form ref="form" id="form">
    <div v-if="!loading">
      <v-layout row wrap>
        <template v-for="item in childItems.searchFilters">
          <v-flex v-if="item.type === 'MakeModel'" v-bind:key="item.title" xs12>
            <div ref="cars" id="cars">
              <ModelMake :small="small" v-on:selectCar="selectCar" :makes="item"/>
            </div>
            <v-layout>
              <v-spacer/>
              <v-btn v-if="small" @click="removeLastCarsTab">
                <v-icon>remove</v-icon>
              </v-btn>
              <v-btn color="secondary" dark @click="addCarsTab">
                Auto toevoegen
                &nbsp;
                <v-icon>add</v-icon>
              </v-btn>
            </v-layout>
          </v-flex>
          <v-flex v-else-if="item.type === 'Text'" v-bind:key="item.title" xs12 md6 pa-2>
            <v-text-field
              @input="addInput(item.input, $event)"
              :value="item.value"
              clearable
              :label="item.header"
            ></v-text-field>
          </v-flex>
          <v-flex v-else-if="item.type === 'DropDown'" v-bind:key="item.title" xs12 md6 pa-2>
            <SelectWrapper v-on:submit="addInput" :item="item" clearable/>
          </v-flex>
          <v-flex
            v-else-if="item.type === 'CheckboxDropDown'"
            v-bind:key="item.title"
            xs12
            md6
            pa-2
          >
            <SelectWrapper v-on:submit="addInput" multiple :item="item"/>
          </v-flex>
          <v-flex v-else-if="item.type === 'Range'" v-bind:key="item.title" xs12>
            <FromToInput v-on:submit="addInput" :fromRange="item" :toRange="item"/>
          </v-flex>
        </template>
      </v-layout>
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
import SelectWrapper from "./SelectWrapper.vue";
import Vue from "vue";

export default {
  name: "SearchForm",
  components: {
    ModelMake,
    FromToInput,
    SelectWrapper
  },
  props: { small: Boolean },
  data() {
    return {
      childItems: [],
      makes: [],

      carMakesModels: [],
      searchKeys: [],
      loading: true
    };
  },
  created() {
    axios
      .get("https://localhost:44347/api/vehiclesearch/options")
      .then(response => {
        this.childItems = response.data.Basisgegevens_en_locatie;
        this.makes = this.childItems.searchFilters.find(
          x => x.type === "MakeModel"
        );

        const urlParams = new URLSearchParams(window.location.search);
        this.fillInForm(urlParams);
        this.loading = false;
        Vue.nextTick().then(() => {
          this.createCarTabs(urlParams);
        });
      })
      .catch(error => console.log(error));
  },
  methods: {
    fillInForm(urlParams) {
      console.log(this.childItems.searchFilters);
      urlParams.forEach((value, key) => {
        for (var index in this.childItems.searchFilters) {
          var item = this.childItems.searchFilters[index];

          if (key.toLowerCase().includes("from")) {
            item.fromValue = value;
            this.addInput(key, value);
          } else if (key.toLowerCase().includes("to")) {
            item.toValue = value;
            this.addInput(key, value);
          } else if (item.input == key) {
            item.value = value;
            this.addInput(key, value);
          }
          console.log(item);
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
        for (var i = 0; i < makeIds.length; i++) {
          var modelId = i < modelIds.length ? modelIds[i] : null;
          this.addCarsTab(makeIds[i], modelId);
        }
      }
    },
    addInput(key, value) {
      if (this.searchKeys.length > 0) {
        this.searchKeys = this.searchKeys.filter(x => x.key != key);
      }
      if (value != null) {
        this.searchKeys.push({ key, value });
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
      makeId = isNaN(parseInt(makeId)) ? null : makeId;

      var parent = document.getElementById("cars");
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
    },
    removeLastCarsTab() {
      var parent = document.getElementById("cars");
      if (parent.childElementCount > 1) {
        parent.removeChild(parent.lastChild);
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
      this.searchKeys = [];
      this.clearCarTabs();
      this.addCarsTab();
    },
    clearCarTabs() {
      var parent = document.getElementById("cars");
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
        params.push({ key: "merk", value: makeQuery });
      }
      if (modelQuery != "") {
        params.push({ key: "model", value: modelQuery });
      }

      params = params.concat(this.searchKeys);
      var query = params.map(x => x.key + "=" + x.value).join("&");
      if (query) query = "?" + query;

      if (this.sm) {
        history.pushState(null, null, "/search/" + query);
        this.$emit("search", query);
      } else {
        this.$router.push("/zoeken/" + query);
      }
    },
    carTabsCount() {
      var parent = document.getElementById("cars");
      return parent ? parent.childElementCount : 0;
    }
  }
};
</script>

<style>
</style>

