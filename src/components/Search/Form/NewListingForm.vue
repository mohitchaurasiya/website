<template>
  <v-form v-model="valid" ref="form" id="form" lazy-validation>
    <div v-for="category in filters" v-bind:key="category.title" class="category">
      <h2 class="headline">
        {{category.title}}
        <v-icon v-if="filters.indexOf(category) != 0" @click="slide">keyboard_arrow_down</v-icon>
      </h2>
      <v-layout>
        <v-flex v-if="filters.indexOf(category) === 0" xs12 pa-2>
          <v-text-field
            v-model="filters[0].searchFilters[0].value"
            @input="addInput('LIC', $event)"
            @change="getLicenseData($event)"
            clearable
            label="Kenteken"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row wrap v-bind:key="refresh">
        <template v-for="filter in category.searchFilters">
          <v-flex v-if="filter.type === 'MakeModel'" v-bind:key="filter.header" xs12>
            <ModelMakeCreate ref="modelMake" v-on:submit="addMakeModel" v-bind:item="filter"/>
          </v-flex>
          <v-flex v-else-if="filter.type === 'Checkbox'" v-bind:key="filter.header" xs12 md6 pa-2>
            <CheckboxWrapper v-on:submit="addInput" v-bind:item="filter"/>
          </v-flex>
          <v-layout
            row
            wrap
            v-else-if="filter.type === 'CheckboxList'"
            v-bind:key="filter.header"
            pa-2
          >
            <v-flex xs12 md3 v-for="checkbox in filter.options" v-bind:key="checkbox.value">
              <CheckboxList
                v-bind:item="filter"
                v-bind:checkbox="checkbox"
                v-on:submit="addCheckbox"
              />
            </v-flex>
          </v-layout>
          <v-flex v-else-if="filter.type === 'Number'" v-bind:key="filter.header" xs12 md6 pa-2>
            <v-text-field
              v-model="filter.value"
              :rules="filter.required ? rules : []"
              type="number"
              min="1"
              @input="addInput(filter.input, $event)"
              :value="filter.value"
              clearable
              :required="filter.required"
              :class="filter.required ? 'required' : null"
              :label="filter.header"
            ></v-text-field>
          </v-flex>
          <v-flex v-else-if="filter.type === 'Text'" v-bind:key="filter.header" xs12 md6 pa-2>
            <v-text-field
              v-model="filter.value"
              :rules="filter.required ? rules : []"
              @input="addInput(filter.input, $event)"
              :value="filter.value"
              clearable
              :required="filter.required"
              :class="filter.required ? 'required' : null"
              :label="filter.header"
            ></v-text-field>
          </v-flex>
          <v-flex v-else-if="filter.type === 'BigText'" v-bind:key="filter.header" xs12 md6 pa-2>
            <v-textarea
              v-model="filter.value"
              :rules="filter.required ? rules : []"
              @input="addInput(filter.input, $event)"
              :value="filter.value"
              clearable
              :required="filter.required"
              :class="filter.required ? 'required' : null"
              :label="filter.header"
            ></v-textarea>
          </v-flex>
          <v-flex v-else-if="filter.type === 'DropDown'" v-bind:key="filter.header" xs12 md6 pa-2>
            <SelectWrapper v-on:submit="addInput" :item="filter" clearable/>
          </v-flex>
          <v-flex
            v-else-if="filter.type === 'ColorDropDown'"
            v-bind:key="filter.header"
            xs12
            md6
            pa-2
          >
            <ColorDropDown v-on:submit="addInput" :item="filter" clearable/>
          </v-flex>
          <v-flex v-else-if="filter.type === 'TextList'" v-bind:key="filter.header" xs12 md6 pa-2>
            <TextList v-on:submit="addInput" :item="filter" clearable/>
          </v-flex>
          <v-flex v-else-if="filter.type === 'Date'" v-bind:key="filter.header" xs12 md6 pa-2>
            <DatePickerWrapper v-on:submit="addInput" :item="filter" clearable/>
          </v-flex>
        </template>
      </v-layout>
    </div>
    <v-layout>
      <v-spacer/>
      <v-btn color="error" @click="clear">
        Legen
        &nbsp;
        <v-icon>clear</v-icon>
      </v-btn>
      <v-btn color="primary" @click="submit" :disabled="!valid">
        Toevoegen
        &nbsp;
        <v-icon>add</v-icon>
      </v-btn>
    </v-layout>
  </v-form>
</template>

<script>
import ModelMakeCreate from "./Inputs/ModelMakeCreate.vue";
import TextList from "./Inputs/TextList.vue";
import SelectWrapper from "./Inputs/SelectWrapper.vue";
import CheckboxWrapper from "./Inputs/CheckboxWrapper.vue";
import CheckboxList from "./Inputs/CheckboxList.vue";
import Vue from "vue";
import DatePickerWrapper from "./Inputs/DatePickerWrapper.vue";
import ColorDropDown from "./Inputs/ColorDropDown.vue";
import { constants } from "crypto";

export default {
  name: "new-listing-form",
  components: {
    ModelMakeCreate,
    TextList,
    SelectWrapper,
    CheckboxWrapper,
    CheckboxList,
    Vue,
    DatePickerWrapper,
    ColorDropDown
  },
  data() {
    return {
      filters: [],
      valid: false,
      searchKeys: [],
      refresh: false,

      rules: [v => !!v || "Dit veld is vereist"],

      config: {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user")).token
          }`
        }
      }
    };
  },
  created() {
    axios
      .get("/vehiclelisting/listingoptions", this.config)
      .then(response => {
        this.filters = response.data.searchForms;
      })
      .catch(err => console.log(err));
  },
  methods: {
    getLicenseData(license) {
      this.clear();
      Vue.nextTick().then(() => {
        this.filters[0].searchFilters[0].value = license;
      });
      axios
        .get("/rdw/newlisting/" + license)
        .then(response => {
          this.fillInForm(new URLSearchParams(response.data), license);
        })
        .catch(err => console.log(err));
    },
    fillInForm(params, license) {
      params.forEach((value, key) => {
        for (var i in this.filters) {
          var category = this.filters[i];
          for (var j in category.searchFilters) {
            var item = category.searchFilters[j];

            if (item.input == "MK") {
              console.log(item.input);
              this.$refs.modelMake.make = value;
              this.addMakeModel(value, null);
            } else if (item.input == "MD") {
              this.$refs.modelMake.model = value;
              this.addMakeModel(this.$refs.modelMake.make, value);
            } else if (item.input == key) {
              item.value = value;
              this.addInput(key, value);
            }
          }
        }
      });
      this.refresh = !this.refresh;
    },
    clear() {
      this.$refs.form.reset();
      this.searchKeys = [];

      for (var category of this.filters) {
        for (var filter of category.searchFilters) {
          filter.value = null;
        }
      }
    },
    addMakeModel(makeId, modelId) {
      if (this.searchKeys.length > 0) {
        this.searchKeys = this.searchKeys.filter(
          x => x.key != "MK" || x.key != "MD"
        );
      }
      if (makeId != null && makeId != false) {
        this.searchKeys.push({ key: "MK", value: makeId });

        if (modelId != null && modelId != null) {
          this.searchKeys.push({ key: "MD", value: modelId });
        }
      }
    },
    addInput(key, value) {
      if (this.searchKeys.length > 0) {
        this.searchKeys = this.searchKeys.filter(x => x.key != key);
      }
      if (value != null && value != false) {
        this.searchKeys.push({ key, value });
      }
    },
    addCheckbox(key, value, id) {
      var existingKey = this.searchKeys.find(x => x.key == key);
      if (existingKey) {
        var list = existingKey.value.toString().split(",");
        if (value == false || value == null) {
          list = list.filter(x => x != id);
        } else {
          if (!list.includes(id.toString())) {
            list.push(id);
          }
        }
        existingKey.value = list.join();
        if (existingKey.value == "") {
          this.searchKeys = this.searchKeys.filter(x => x.key != key);
        }
      } else {
        this.searchKeys.push({ key, value: id });
      }
    },
    createListingObject() {
      console.log(this.searchKeys);

      var listingQuery =
        "{" +
        this.searchKeys
          .map(x => '"' + x.key + '"' + ":" + '"' + x.value + '"')
          .join(",") +
        "}";

      var listing = JSON.parse(listingQuery);
      if (listing.HO != null) {
        listing.HO = this.toIEnumerable(listing.HO.split(","), true);
      }
      if (listing.EQ != null) {
        listing.EQ = this.toIEnumerable(listing.EQ.split(","), true);
      }
      if (listing.VPP != null) {
        listing.VPP = this.toIEnumerable(listing.VPP.split(","), false);
      }
      if (listing.VNP != null) {
        listing.VNP = this.toIEnumerable(listing.VNP.split(","), false);
      }
      return listing;
    },
    toIEnumerable(toConvert, int) {
      var converted = [];

      for (var option of toConvert) {
        if (int) {
          converted.push(parseInt(option));
        } else {
          converted.push(option);
        }
      }
      return converted;
    },
    submit() {
      if (this.$refs.form.validate()) {
        var newlisting = this.createListingObject();
        console.log(newlisting);
        axios
          .post("/vehiclelisting/list", newlisting, this.config)
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.log(error.response.data);
            this.$store.commit("showSnackbar", error.response.data);
          });
      }
    },
    slide(event) {
      var on = event.target.parentNode.parentNode.classList.toggle("show");
      event.target.innerHTML = on ? "keyboard_arrow_up" : "keyboard_arrow_down";
    }
  }
};
</script>

<style>
#form {
  text-overflow: ellipsis;
}

.show .layout {
  display: flex !important;
}

.category:not(:first-child) .layout {
  display: none;
}

.required label::after {
  content: " *";
  color: red;
}
</style>
