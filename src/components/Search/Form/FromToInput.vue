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
          @change="submit(fromRange.input + '_F', $event)"
        ></v-select>
      </div>
    </v-flex>
    <v-flex xs12 md6 pa-2>
      {{toRange.header + " tot"}}
      <v-select
        v-model="to"
        v-bind:items="from == null || isNaN(from) ? toRange.options : toRange.options.filter(x => x.value > from)"
        :placeholder="'Kies een ' + toRange.header.toLowerCase() + ' tot'"
        :disabled="disabled"
        clearable
        @change="submit(toRange.input + '_T', $event)"
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
      this.$emit(
        "submit",
        this.fromRange.input + "_F",
        isNaN(this.from) ? null : this.from
      );
      this.$emit(
        "submit",
        this.toRange.input + "_T",
        isNaN(this.to) || this.from >= this.to ? null : this.to
      );
    }
  },
  computed: {
    disabled() {
      return (
        this.from ==
        Math.max.apply(null, this.fromRange.options.map(x => x.value))
      );
    }
  }
};
</script>

