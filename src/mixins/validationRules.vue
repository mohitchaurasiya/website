<script>
var validationRules = {
  data() {
    return {
      shortRules: [
        v => v.length <= 25 || "Max 25 tekens",
        v => !!v || "Dit veld is vereist"
      ],
      longRules: [
        v => v.length <= 250 || "Max 250 tekens",
        v => !!v || "Dit veld is vereist"
      ],
      rules: [v => !!v || "Dit veld is vereist"]
    };
  }
};

export default validationRules;
</script>
