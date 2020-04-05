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
    mounted() {
      DateService.getFerie('2020');
    }
  };
</script>
