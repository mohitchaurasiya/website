<script>
var bearer = {
  methods: {
    getBearer() {
      var user = localStorage.getItem("user");
      if (user != "" && user != null) {
        return {
          headers: {
            Authorization: `Bearer ${JSON.parse(user).token}`
          }
        };
      } else {
        return "UNAUTHORIZED";
      }
    }
  }
};

export default bearer;
</script>
