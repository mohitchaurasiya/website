<template>
  <v-layout row wrap fill-height class="wrapper__range">
    <v-flex xs12 md6>
      <v-text-field
        v-model="from"
        :label="item.header +  ' vanaf'"
        clearable
        type="number"
        @input="submit(item.input + '_F', $event)"
      ></v-text-field>
    </v-flex>
    <v-flex xs12 md6>
      <v-text-field
        v-model="to"
        :label="item.header +  ' tot'"
        clearable
        type="number"
        @input="submit(item.input + '_T', $event)"
      ></v-text-field>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "text-range",
  props: ["item"],
  data() {
    return {
      to: null,
      from: null
    };
  },
  created() {
    this.to = this.item.value;
    this.from = this.item.value;
  },
  methods: {
    submit(name, value) {
      this.$emit("submit", name, value == "" ? null : value);
    }
  }
};
</script>

