<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    lazy
    transition="scale-transition"
    offset-y
    full-width
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        v-model="item.value"
        @focus="menu = true"
        prepend-icon="event"
        readonly
        v-on="on"
        clearable
        :rules="item.required ? rules : []"
        :required="item.required"
        :class="item.required ? 'required' : null"
        :label="item.header"
        @input="submit"
      ></v-text-field>
    </template>
    <v-date-picker
      ref="picker"
      v-model="item.value"
      :max="item.input === 'MT' 
        ? getDate().toISOString().substr(0,10)
        : new Date().toISOString().substr(0, 10)"
      min="1885-01-01"
      locale="nl-NL"
      @change="save"
    ></v-date-picker>
  </v-menu>
</template>

<script>
import moment from "moment";

export default {
  name: "date-picker-wrapper",
  props: {
    item: Object
  },
  data() {
    return {
      menu: false,
      rules: [v => !!v || "Dit veld is vereist"]
    };
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    }
  },
  methods: {
    save(date) {
      this.item.value = this.formatDate(date);
      this.submit();
    },
    formatDate(date) {
      const [year, month, day] = date.split("-");
      return `${day}-${month}-${year}`;
    },
    submit() {
      this.$emit("submit", this.item.input, this.item.value);
    },
    getDate() {
      var date = new Date();
      var year = date.getFullYear() + 5;
      var month = date.getMonth();
      var day = date.getDay();
      return new Date(year, month, day);
    }
  }
};
</script>
