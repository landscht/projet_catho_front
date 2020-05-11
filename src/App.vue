<template>
  <v-app>
    <NavigationBar></NavigationBar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>

  import DateService from "./services/DateService";
  import NavigationBar from "./components/NavigationBar";

  export default {
    name: 'App',
    components: {NavigationBar},
    created() {
      if(localStorage.getItem('dark-mode') !== null) {
        this.$vuetify.theme.dark = true;
      }
    },
    mounted() {
      DateService.getFerie('2020');
    }
  };
</script>
