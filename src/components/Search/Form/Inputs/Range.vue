<template>
  <v-layout row wrap fill-height class="wrapper__range">
    <v-flex xs12 md6>
      <v-select
        v-model="from"
        :items="fromRange.options"
        :label="fromRange.header +  ' vanaf'"
        clearable
        @change="submit(fromRange.input + '_F', $event)"
      ></v-select>
    </v-flex>
    <v-flex xs12 md6>
      <v-select
        v-model="to"
        v-bind:items="from == null || isNaN(from) ? toRange.options : toRange.options.filter(x => x.value > from)"
        :label="fromRange.header +  ' tot'"
        :disabled="disabled"
        clearable
        class="range__to-input"
        @change="submit(toRange.input + '_T', $event)"
      ></v-select>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "range",
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

<style>
.wrapper__range .flex:first-child {
  position: relative;
}

.wrapper__range .flex:first-child:after {
  content: "";
  height: 48px;
  width: 1px;

  position: absolute;
  right: 0;
  top: 0px;

  background-color: rgba(0, 0, 0, 0.42);
}

.range__to-input .v-select__selection,
.range__to-input .v-label {
  margin-left: 15px;
}

@media (max-width: 960px) {
  .range__to-input .v-select__selection,
  .range__to-input .v-label {
    margin-left: 0;
  }

  .wrapper__range .flex:first-child:after {
    width: 0;
  }
}
</style>
