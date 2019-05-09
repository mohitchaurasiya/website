<template>
  <v-container fluid>
    <v-layout>
      <v-flex grow>
        <div v-for="card in cards" :key="card.id">
          <v-card>
            <v-img :src="card.img">
              <v-container pa-2>
                <span class="headline white--text" v-text="card.title"></span>
              </v-container>
            </v-img>
            <v-card-text v-text="card.text"></v-card-text>
          </v-card>
          <br>
        </div>
      </v-flex>
    </v-layout>
    <v-textarea auto-grow id="change-text"></v-textarea>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      delay: 700,
      clicks: 0,
      timer: null,
      cards: [
        {
          id: 0,
          title: "Header 1",
          text:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer porta molestie arcu. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Phasellus bibendum at nisl sit amet feugiat. Donec neque lectus, condimentum at odio vitae, consectetur congue odio. Quisque scelerisque odio a maximus lobortis. Vestibulum dolor quam, auctor ut sollicitudin a, dictum at mi. Fusce consequat ligula nulla. Aliquam euismod in tellus ut blandit. Ut dignissim tincidunt turpis, eget dictum purus placerat quis. Aenean et mi vitae risus sodales rhoncus. Nam ac lectus at dui imperdiet lacinia. Aenean sollicitudin pulvinar ipsum sit amet sodales. Nulla in massa commodo, malesuada turpis vitae, rhoncus ex. Mauris pulvinar augue et ligula eleifend, quis sodales nisl lobortis. Sed massa orci, commodo id pellentesque id, ultrices a lectus. Mauris non ante sollicitudin, tempor arcu in, vehicula sem. Aliquam gravida est vel tempor placerat. Aliquam auctor lacinia nisl vel dignissim. Phasellus id ultrices ex, id feugiat nisi. Quisque suscipit libero id velit ultrices finibus. Integer eu pellentesque nulla. Donec fermentum ligula erat, in finibus tellus tincidunt eget. Fusce scelerisque tellus lacinia, tristique urna ac, suscipit dui. Nam dignissim posuere magna, ut vestibulum nisi lobortis id. Morbi rhoncus laoreet turpis, vitae tempus orci efficitur non. Mauris fermentum mauris risus, sit amet suscipit eros porta pharetra. Aenean luctus ornare quam eu porttitor. Nulla neque nisl, fermentum vel lacinia a, efficitur luctus orci. Donec pharetra sapien a ipsum venenatis consequat. Cras in felis pharetra, gravida tortor sit amet, consequat diam. Nulla facilisi. Nunc elementum velit orci, gravida congue risus bibendum in. Duis arcu quam, semper sit amet nulla non, cursus pulvinar mauris.",
          img: "https://cdn.vuetifyjs.com/images/cards/desert.jpg"
        },
        {
          id: 1,
          title: "Header 2",
          text:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer porta molestie arcu. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Phasellus bibendum at nisl sit amet feugiat. Donec neque lectus, condimentum at odio vitae, consectetur congue odio. Quisque scelerisque odio a maximus lobortis. Vestibulum dolor quam, auctor ut sollicitudin a, dictum at mi. Fusce consequat ligula nulla. Aliquam euismod in tellus ut blandit. Ut dignissim tincidunt turpis, eget dictum purus placerat quis. Aenean et mi vitae risus sodales rhoncus. Nam ac lectus at dui imperdiet lacinia. Aenean sollicitudin pulvinar ipsum sit amet sodales. Nulla in massa commodo, malesuada turpis vitae, rhoncus ex. Mauris pulvinar augue et ligula eleifend, quis sodales nisl lobortis. Sed massa orci, commodo id pellentesque id, ultrices a lectus. Mauris non ante sollicitudin, tempor arcu in, vehicula sem. Aliquam gravida est vel tempor placerat. Aliquam auctor lacinia nisl vel dignissim. Phasellus id ultrices ex, id feugiat nisi. Quisque suscipit libero id velit ultrices finibus. Integer eu pellentesque nulla. Donec fermentum ligula erat, in finibus tellus tincidunt eget. Fusce scelerisque tellus lacinia, tristique urna ac, suscipit dui. Nam dignissim posuere magna, ut vestibulum nisi lobortis id. Morbi rhoncus laoreet turpis, vitae tempus orci efficitur non. Mauris fermentum mauris risus, sit amet suscipit eros porta pharetra. Aenean luctus ornare quam eu porttitor. Nulla neque nisl, fermentum vel lacinia a, efficitur luctus orci. Donec pharetra sapien a ipsum venenatis consequat. Cras in felis pharetra, gravida tortor sit amet, consequat diam. Nulla facilisi. Nunc elementum velit orci, gravida congue risus bibendum in. Duis arcu quam, semper sit amet nulla non, cursus pulvinar mauris.",
          img: "https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        }
      ]
    };
  }
};
</script>

<style scoped>
.v-image {
  height: 200px;
}
</style>
