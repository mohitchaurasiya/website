<template>
  <v-checkbox
    :items="item.options"
    :label="stringify(item.header)"
    v-model="value"
    @change="submit"
  ></v-checkbox>
</template>

<script>
import stringify from "../../../../mixins/stringify.vue";
export default {
  name: "checkbox-list",
  props: {
    item: Object
  },
  data() {
    return {
      value: null
    };
  },
  mixins: [stringify],
  methods: {
    submit: function(event) {
      this.$emit("submit", this.item.input, event);
    }
  },
  mounted() {
    if (this.item.value != null) {
      this.value = this.item.value;
    }
  }
};
</script>
