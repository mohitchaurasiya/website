<template>
  <v-layout row wrap fill-height>
    <v-flex xs12 md6 pa-2>
      <div>
        {{fromRange.header}}
        <v-select
          v-model="from"
          :items="fromRange.options"
          :placeholder="'Kies een ' + fromRange.header.toLowerCase()"
          clearable
          @change="submit(fromRange.header, $event)"
        ></v-select>
      </div>
    </v-flex>
    <v-flex xs12 md6 pa-2>
      {{toRange.header}}
      <v-select
        v-model="to"
        :items="toRange.options.filter(x => x.value > from)"
        :placeholder="'Kies een ' + toRange.header.toLowerCase()"
        clearable
        @change="submit(toRange.header, $event)"
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
    this.to = parseInt(this.toRange.value);
    this.from = parseInt(this.fromRange.value);
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

