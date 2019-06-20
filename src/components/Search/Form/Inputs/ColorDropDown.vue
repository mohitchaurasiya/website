<template>
  <v-select
    :multiple="multiple"
    :items="item.colorOptions"
    :label="item.header"
    v-model="item.value"
    :rules="item.required ? rules : []"
    :required="item.required"
    :class="item.required ? 'required' : null"
    :clearable="!multiple"
    @input="submit"
  >
    <template slot="selection" slot-scope="data">
      <v-avatar>
        <span :style="{background: data.item.color, width: '80%', height: '40%'}"></span>
      </v-avatar>
      &nbsp;
      {{ data.item.text }}
    </template>
    <template slot="item" slot-scope="data">
      <template>
        <v-list-tile-avatar>
          <span :style="{background: data.item.color, width: '100%', height: '50%'}"></span>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title v-html="data.item.text"></v-list-tile-title>
        </v-list-tile-content>
      </template>
    </template>
  </v-select>
</template>

<script>
export default {
  name: "color-drop-down",
  props: {
    item: Object,
    multiple: Boolean
  },
  data() {
    return {
      value: null,
      rules: [v => !!v || "Dit veld is vereist"]
    };
  },
  methods: {
    submit: function(event) {
      this.$emit("submit", this.item.input, event);
    }
  },
  mounted() {
    if (this.item.value != null) {
      this.value = this.item.value.includes(",")
        ? this.item.value.split(",").map(x => parseInt(x))
        : parseInt(this.item.value);
    }
  }
};
</script>

