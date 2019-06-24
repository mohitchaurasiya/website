<template>
  <div>
    <v-checkbox :color="checkbox.color" :label="checkbox.text" v-model="value" @change="submit"></v-checkbox>
  </div>
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
    this.value = this.checkbox.checked;
  }
};
</script>

