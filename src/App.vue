<template>
  <v-app>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>

  import DateService from "./services/DateService";

  export default {
    name: 'App',


    data: () => ({
      //
    }),
    mounted() {
      DateService.getFerie('2020');
    }
  };
</script>
