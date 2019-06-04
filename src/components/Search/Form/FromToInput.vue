<template>
  <v-layout row wrap fill-height>
    <v-flex xs12 md6 pa-2>
      <div>
        {{fromRange.header + " vanaf"}}
        <v-select
          v-model="from"
          :items="fromRange.options"
          :placeholder="'Kies een ' + fromRange.header.toLowerCase() + ' vanaf'"
          clearable
          @change="submit(fromRange.input + 'F', $event)"
        ></v-select>
      </div>
    </v-flex>
    <v-flex xs12 md6 pa-2>
      {{toRange.header + " tot"}}
      <v-select
        v-model="to"
        v-bind:items="from == null || isNaN(from) ? toRange.options : toRange.options.filter(x => x.value >= from)"
        :placeholder="'Kies een ' + toRange.header.toLowerCase() + ' tot'"
        clearable
        @change="submit(toRange.input + 'T', $event)"
      ></v-select>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "from-to-input",
  props: ["fromRange", "toRange"],
  data() {
    return {
      to: null,
      from: null
    };
  },
  created() {
    this.to = parseInt(this.toRange.toValue);
    this.from = parseInt(this.fromRange.fromValue);
  },
  methods: {
    submit(name, value) {
      this.$emit("submit", name, value);
      if (this.to != null && this.from > this.to) {
        this.$emit("submit", this.toRange.header, null);
      }
    }
  }
};
</script>

