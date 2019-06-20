<script>
var validationRules = {
  data() {
    return {
      shortRules: [v => v.length <= 25 || "Max 25 tekens"],
      longRules: [v => v.length <= 250 || "Max 250 tekens"],
      rules: [v => !!v || "Dit veld is vereist"]
    };
  }
};

export default validationRules;
</script>
