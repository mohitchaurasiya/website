<template>
  <v-select
    :multiple="multiple"
    :items="item.options"
    :label="item.header"
    v-model="value"
    @input="submit"
  ></v-select>
</template>

<script>
export default {
  name: "select-wrapper",
  props: {
    item: Object,
    multiple: Boolean
  },
  data() {
    return {
      value: null
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
