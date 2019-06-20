<template>
  <v-bottom-nav fixed color="white" :value="true">
    <v-btn @click="goTo(1)" small>
      <v-icon>skip_previous</v-icon>
      <span>1</span>
    </v-btn>
    <v-btn @click="previousPage" small>
      <v-icon>keyboard_arrow_left</v-icon>
      <span>{{page > 1 ? page - 1 : 1}}</span>
    </v-btn>
    <v-btn flat disabled v-if="!isMobile">{{page}}/{{maxPages}}</v-btn>
    <v-btn @click="nextPage" small>
      <v-icon>keyboard_arrow_right</v-icon>
      <span>{{maxPages > page ? page + 1 : page}}</span>
    </v-btn>
    <v-btn @click="goTo(maxPages)" small>
      <v-icon>skip_next</v-icon>
      <span>{{maxPages}}</span>
    </v-btn>
  </v-bottom-nav>
</template>

<script>
import isMobile from "../mixins/isMobile.vue";
export default {
  props: {
    endPoint: String,
    pageLocation: String
  },
  mixins: [isMobile],
  data() {
    return {
      page: 1,
      maxPages: 0
    };
  },
  mounted() {
    var page = parseInt(this.$route.params.page);
    if (!isNaN(page) && page > 0) {
      this.page = page;
    } else {
      this.page = 1;
    }
    this.fetch();
  },
  methods: {
    fetch() {
      axios
        .get(`${this.endPoint.replace("{page}", this.page)}`)
        .then(response => {
          this.$emit("updateList", response.data.list);
          this.maxPages = response.data.pages;
          if (this.page > this.maxPages) {
            this.page = this.maxPages;
          }
        })
        .catch(error => console.log(error));
    },
    nextPage() {
      if (this.page < this.maxPages) {
        this.page++;
      }
    },
    previousPage() {
      if (this.page > 1) {
        this.page--;
      }
    },
    goTo(index) {
      if (1 > index <= this.maxPages) {
        this.page = index;
      }
    }
  },
  watch: {
    page() {
      this.fetch();
      this.$router.replace(this.pageLocation.replace("{page}", this.page));
    }
  }
};
</script>

