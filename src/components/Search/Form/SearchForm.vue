<template>
  <v-form ref="form" id="form">
    <div v-if="!loading">
      <div v-for="block in items" v-bind:key="block.title" class="block">
        <h2 class="headline">
          {{block.title}}
          <v-icon v-if="items.indexOf(block) != 0" @click="slide">keyboard_arrow_down</v-icon>
        </h2>
        <v-layout row wrap>
          <template v-for="item in block.searchFilters">
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
            <v-layout
              row
              wrap
              v-else-if="item.type === 'CheckboxColorList'"
              v-bind:key="item.title"
              pa-2
            >
              <v-flex
                xs12
                v-bind:md3="!small"
                v-for="checkbox in item.colorOptions"
                v-bind:key="checkbox.title"
              >
                <CheckboxColorList
                  v-bind:item="item"
                  v-bind:checkbox="checkbox"
                  v-on:submit="addCheckbox"
                />
              </v-flex>
            </v-layout>
            <v-flex v-else-if="item.type === 'Checkbox'" v-bind:key="item.title" xs12 md6 pa-2>
              <CheckboxWrapper v-on:submit="addInput" v-bind:item="item"/>
            </v-flex>
            <v-layout
              row
              wrap
              v-else-if="item.type === 'CheckboxList'"
              v-bind:key="item.title"
              pa-2
            >
              <v-flex
                xs12
                v-bind:md3="!small"
                v-for="checkbox in item.options"
                v-bind:key="checkbox.title"
              >
                <CheckboxColorList
                  v-bind:item="item"
                  v-bind:checkbox="checkbox"
                  v-on:submit="addCheckbox"
                />
              </v-flex>
            </v-layout>
            <v-flex v-else-if="item.type === 'Text'" v-bind:key="item.title" xs12 md6 pa-2>
              <v-text-field
                @input="addInput(item.input, $event)"
                :value="item.value"
                clearable
                :label="stringify(item.header)"
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
            <v-flex
              v-else-if="item.type === 'Range'"
              v-bind:key="item.title"
              xs12
              v-bind:md6="!small"
              pa-2
            >
              <Range v-on:submit="addInput" :fromRange="item" :toRange="item"/>
            </v-flex>
            <v-flex
              v-else-if="item.type === 'TextRange'"
              v-bind:key="item.title"
              xs12
              v-bind:md6="!small"
              pa-2
            >
              <TextRange v-on:submit="addInput" :item="item"/>
            </v-flex>
          </template>
        </v-layout>
      </div>
      <v-layout>
        <v-spacer/>
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
import ModelMake from "./Inputs/ModelMake.vue";
import Range from "./Inputs/Range.vue";
import TextRange from "./Inputs/TextRange.vue";
import SelectWrapper from "./Inputs/SelectWrapper.vue";
import CheckboxWrapper from "./Inputs/CheckboxWrapper.vue";
import CheckboxColorList from "./Inputs/CheckboxColorList.vue";
import CheckboxList from "./Inputs/CheckboxList.vue";
import Vue from "vue";
import stringify from "../../../mixins/stringify.vue";

export default {
  name: "SearchForm",
  components: {
    ModelMake,
    Range,
    TextRange,
    SelectWrapper,
    CheckboxWrapper,
    CheckboxColorList,
    CheckboxList
  },
  props: { small: Boolean },
  data() {
    return {
      items: [],
      makes: [],
      lastCarsTab: null,
      carMakesModels: [],
      searchKeys: [],
      loading: true
    };
  },
  mixins: [stringify],
  created() {
    axios
      .get("/vehiclelisting/options")
      .then(response => {
        this.items = response.data.searchForms;
        this.makes = this.items[0].searchFilters.find(
          x => x.type === "MakeModel"
        );

        const urlParams = new URLSearchParams(window.location.search);
        this.fillInForm(urlParams);
        this.loading = false;
        Vue.nextTick().then(() => {
          this.createCarTabs(urlParams);
          this.update();
        });
      })
      .catch(error => console.log(error));
  },
  beforeDestroy() {
    this.loading = true;
  },
  methods: {
    fillInForm(urlParams) {
      urlParams.forEach((value, key) => {
        for (var i in this.items) {
          var block = this.items[i];
          for (var j in block.searchFilters) {
            var item = block.searchFilters[j];

            if (item.input != "MK") {
              if (item.type == "Range") {
                if (item.input === key.split("_")[0]) {
                  if (key[key.length - 1] == "F") {
                    item.fromValue = value;
                    this.addInput(key, value);
                  } else {
                    item.toValue = value;
                    this.addInput(key, value);
                  }
                }
              } else if (item.type == "TextRange") {
                if (item.input === key.split("_")[0]) {
                  item.value = value;
                  this.addInput(key, value);
                }
              } else if (item.input == key) {
                item.value = value;
                this.addInput(key, value);
              }
            }
          }
        }
      });
    },
    createCarTabs(urlParams) {
      if (urlParams.get("MK") != null) {
        var makeIds = urlParams
          .get("MK")
          .split(",")
          .map(x => parseInt(x));
        var modelIds = "";
        if (urlParams.get("MD") != null) {
          modelIds = urlParams
            .get("MD")
            .split(",")
            .map(x => parseInt(x));
        }
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
      if (value != null && value != false) {
        this.searchKeys.push({ key, value });
      }
      if (this.small) {
        this.update();
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
      if (this.small) {
        this.update();
      }
    },
    parse(val) {
      var parsed = parseInt(val);
      if (isNaN(parsed)) return null;
      return parsed;
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

      this.lastCarsTab = { current: instance, previous: this.lastCarsTab };

      instance.$on("selectCar", this.selectCar);
      instance.$mount();

      parent.appendChild(instance.$el);
    },
    removeLastCarsTab() {
      if (this.lastCarsTab.current != null) {
        this.lastCarsTab.current.$destroy();
      }
      if (this.lastCarsTab.previous != null) {
        this.lastCarsTab = this.lastCarsTab.previous;
      }
    },
    selectCar(id, makeId, modelId) {
      if (this.carMakesModels.length > 0) {
        this.carMakesModels = this.carMakesModels.filter(x => x.id != id);
      }
      if (makeId != null && !isNaN(makeId)) {
        this.carMakesModels.push({
          id,
          makeId,
          modelId: modelId == null ? 0 : modelId
        });
      }
      if (this.small) {
        this.update();
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
    update() {
      if (!this.loading) {
        var makeQuery = this.carMakesModels.map(x => x.makeId).join();
        var modelQuery = this.carMakesModels.map(x => x.modelId).join();

        var params = [];
        if (makeQuery != "") {
          params.push({ key: "MK", value: makeQuery });
        }
        if (modelQuery != "") {
          params.push({ key: "MD", value: modelQuery });
        }

        params = params.concat(this.searchKeys);
        var query = params.map(x => x.key + "=" + x.value).join("&");
        if (query) query = "?" + query;

        if (this.small) {
          history.pushState(null, null, "/zoeken" + query);
          this.$emit("search", query);
        }
        return query;
      }
    },
    submit() {
      var query = this.update();
      this.$router.push("/zoeken" + query);
    },
    carTabsCount() {
      var parent = document.getElementById("cars");
      return parent ? parent.childElementCount : 0;
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

.block:not(:first-child) .layout {
  display: none;
}
</style>

