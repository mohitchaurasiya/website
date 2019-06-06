<template>
  <v-checkbox
    :items="item.options"
    :color="checkbox.color"
    :label="stringify(checkbox.text)"
    v-model="value"
    @change="submit"
  ></v-checkbox>
</template>

<script>
import stringify from "../../../../mixins/stringify.vue";
export default {
  name: "checkbox-color-list",
  props: {
    item: Object,
    checkbox: Object,
    multiple: Boolean
  },
  data() {
    return {
      value: null
    };
  },
  mixins: [stringify],
  methods: {
    submit: function(event) {
      this.$emit("submit", this.item.input, event, this.checkbox.value);
    }
  },
  mounted() {
    if (this.item.value != null) {
      this.value = this.item
        ? this.item.value.split(",").includes(this.checkbox.value.toString())
        : false;
    }
  }
};
</script>
