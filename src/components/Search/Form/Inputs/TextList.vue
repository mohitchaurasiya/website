<template>
  <div>
    <v-text-field append-icon="add" @click:append="addValue" v-model="value" :label="item.header"></v-text-field>
    <div v-if="values.length > 0">
      <v-text-field
        v-for="value in values"
        :key="value.id"
        :value="value.value"
        append-icon="delete"
        @click:append="deleteValue(value.id)"
        @input="updateValue(value.id, $event)"
      ></v-text-field>
    </div>
  </div>
</template>

<script>
export default {
  name: "text-list",
  props: ["item"],
  data() {
    return {
      index: 0,
      value: null,
      values: []
    };
  },
  methods: {
    addValue() {
      this.values.push({ id: this.index, value: this.value });
      this.index++;
      this.value = null;
      this.submit();
    },
    deleteValue(id) {
      this.values = this.values.filter(x => x.id !== id);
      this.submit();
    },
    updateValue(id, value) {
      this.values.find(x => x.id === id).value = value;
      console.log(value);
      this.submit();
    },
    submit() {
      this.$emit(
        "submit",
        this.item.input,
        this.values.length > 0 ? this.values.map(x => x.value) : null
      );
    }
  }
};
</script>



