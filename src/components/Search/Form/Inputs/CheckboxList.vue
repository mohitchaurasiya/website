<template>
  <v-checkbox
    :items="item.options"
    :color="checkbox.color"
    :label="checkbox.text"
    v-model="value"
    @change="submit"
  ></v-checkbox>
</template>

<script>
export default {
  name: "checkbox-list",
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

