<script>
var isMobile = {
  data() {
    return {
      isMobile: true,
      minMobileWidth: 960
    };
  },
  methods: {
    stringify: function(string) {
      return string.split("_").join(" ");
    }
  },
  mounted() {
    window.addEventListener("resize", () => {
      this.isMobile = window.innerWidth < this.minMobileWidth;
    });
    this.isMobile = window.innerWidth < this.minMobileWidth;
  }
};

export default isMobile;
</script>
