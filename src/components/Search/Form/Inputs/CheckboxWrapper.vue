<template>
  <v-checkbox
    v-model="item.value"
    :rules="item.required ? rules : []"
    :items="item.options"
    :label="item.header"
    :required="item.required"
    :class="item.required ? 'required' : null"
    @change="submit"
  ></v-checkbox>
</template>

<script>
export default {
  name: "checkbox-wrapper",
  props: {
    item: Object
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
      this.value = this.item.value;
    }
  }
};
</script>



