<template>
  <div>
    <div v-bind:class="small ? '' : 'wrapper__model-make'">
      <v-flex xs12 md12 pa-2>
        <v-select
          v-model="make"
          :items="makes.options"
          :placeholder="'Kies een ' + makes.header.toLowerCase()"
          @input="selectCar"
          @change="getModels"
          clearable
          @click:clear="clearModels"
        ></v-select>
      </v-flex>
      <v-flex xs12 md12 pa-2>
        <v-select
          class="models"
          v-model="model"
          @input="selectCar"
          clearable
          v-bind:items="models != null ? models : []"
          placeholder="Kies een model"
          :disabled="models == null || make == null"
        ></v-select>
      </v-flex>

      <div v-if="!small">
        <v-spacer/>
        <v-btn @click="clear">
          Legen
          <v-icon>clear</v-icon>
        </v-btn>
        <v-btn @click="destroy">
          Verwijder
          <v-icon>delete</v-icon>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModelMake",
  props: ["makes", "id", "small", "makeId", "modelId"],
  data() {
    return {
      models: null,
      make: null,
      model: null
    };
  },
  mounted() {
    if (this.makeId != null) {
      this.make = this.makeId;
      this.getModels(this.make);
      this.model = this.modelId == null ? null : this.modelId;
      this.$emit("selectCar", this._uid, this.make, this.model);
    }
  },
  methods: {
    getModels(value) {
      this.model = null;
      this.selectCar();
      if (value) {
        axios
          .get("/vehiclelisting/models/" + value)
          .then(response => {
            this.models = response.data;
          })
          .catch(error => console.log(error.response.data));
      }
    },
    destroy() {
      // destroy the vue listeners, etc
      this.$destroy();

      // remove the element from the DOM
    },
    selectCar() {
      this.$emit("selectCar", this._uid, this.make, this.model);
    },
    clear() {
      this.make = null;
      this.model = null;
    },
    clearModels() {
      this.model = null;
    }
  },
  destroyed() {
    if (this.$el.parentNode) {
      this.$emit("selectCar", this._uid, null, null);
      this.$el.parentNode.removeChild(this.$el);
    }
  }
};
</script>

<style scoped>
.wrapper__model-make {
  padding: 5px 10px 5px 10px;
  border: 1px solid lightgray;
  border-radius: 2px;
  margin-bottom: 10px;
  transition: all 0.4s;
}

.wrapper__model-make:hover {
  border: 1px solid grey;
}
</style>
