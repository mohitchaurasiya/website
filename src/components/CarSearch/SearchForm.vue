<template>
  <v-form ref="form" id="form">
    <div v-if="!loading">
      <div ref="cars" id="cars">
        <ModelMake v-bind:sm="sm" v-on:selectCar="selectCar" v-bind:makes="makes"/>
      </div>
      <v-layout v-if="!sm">
        <v-spacer/>
        <v-btn color="secondary" dark @click="addCarsTab">
          Auto toevoegen
          &nbsp;
          <v-icon>add</v-icon>
        </v-btn>
      </v-layout>
      <v-layout row wrap>
        <!--        -->
        <v-flex xs12 md6 pa-2>
          {{priceRangesFrom.header}}
          <v-select
            v-model="priceFrom"
            :items="priceRangesFrom.values"
            :placeholder="'Kies een ' + priceRangesFrom.header.toLowerCase()"
            clearable
          ></v-select>
        </v-flex>
        <v-flex xs12 md6 pa-2>
          <div>
            {{priceRangesTo.header}}
            <v-select
              v-model="priceTo"
              :items="priceRangesTo.values.filter(x => x.value > priceFrom)"
              :placeholder="'Kies een ' + priceRangesTo.header.toLowerCase()"
              clearable
            ></v-select>
          </div>
        </v-flex>
        <v-flex xs12 md6 pa-2>
          {{registrationsFrom.header}}
          <v-select
            v-model="registrationFrom"
            :items="registrationsFrom.values"
            :placeholder="'Kies een ' + registrationsFrom.header.toLowerCase()"
            clearable
          ></v-select>
        </v-flex>
        <v-flex xs12 md6 pa-2>
          {{registrationsTo.header}}
          <v-select
            v-model="registrationTo"
            :items="registrationsTo.values.filter(x => x.value > registrationFrom)"
            :placeholder="'Kies een ' + registrationsTo.header.toLowerCase()"
            clearable
          ></v-select>
        </v-flex>
        <!--       -->
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
import Vue from "vue";

export default {
  name: "SearchForm",
  components: {
    ModelMake
  },
  props: { sm: Boolean },
  data() {
    return {
      makes: null,
      registrationsFrom: null,
      registrationsTo: null,
      priceRangesFrom: null,
      priceRangesTo: null,
      countries: null,
      cities: null,
      radii: null,

      carMakesModels: [],

      loading: true,

      priceFrom: null,
      priceTo: null,
      registrationFrom: null,
      registrationTo: null
    };
  },
  created() {
    axios
      .get("https://localhost:44347/api/vehiclesearch/options/limited")
      .then(response => {
        this.makes = response.data.makes;
        this.registrationsFrom = response.data.registrationDatesFrom;
        this.registrationsTo = response.data.registrationDatesTo;
        this.priceRangesFrom = response.data.priceFrom;
        this.priceRangesTo = response.data.priceTo;
        this.countries = response.data.countries;
        this.cities = response.data.cities;
        this.radii = response.data.radii;
        this.loading = false;

        Vue.nextTick().then(this.fillInForm);
      })
      .catch(error => console.log(error.response));
  },
  methods: {
    fillInForm() {
      const urlParams = new URLSearchParams(window.location.search);

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
      this.priceFrom = this.parse(urlParams.get("prijs_vanaf"));
      this.priceTo = this.parse(urlParams.get("prijs_tot"));
      this.registrationFrom = this.parse(urlParams.get("bouwjaar_vanaf"));
      this.registrationTo = this.parse(urlParams.get("bouwjaar_tot"));
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
            sm: this.sm,
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
      var params = {
        merk: this.carMakesModels.map(x => x.makeId).join(),
        model: this.carMakesModels.map(x => x.modelId).join(),
        prijs_vanaf: this.priceFrom,
        prijs_tot: this.priceTo,
        bouwjaar_vanaf: this.registrationFrom,
        bouwjaar_tot: this.registrationTo
      };

      var query = Object.keys(params)
        .filter(key => params[key] != null && params[key] != "")
        .map(key => key + "=" + params[key])
        .join("&");

      this.$router.push("/search/?" + query);
    }
  }
};
</script>
