<template>
  <v-app>
      <v-navigation-drawer
              mini-variant
              permanent
              app
      >
        <v-list
                dense
                nav
                class="mt-2"
        >
          <v-list-item
                  v-for="item in items"
                  :key="item.title"
                  link
                  :to="item.path"
                  active-class="blue--text"

          >
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <v-list-item-icon v-on="on">
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>
              </template>
              <span>{{item.title}}</span>
            </v-tooltip>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
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
      drawer :false,
      mini : true,
      items: [
        { title: 'Accueil', icon: 'mdi-view-dashboard', path: '/accueil' },
        { title: 'Nouvelle fiche', icon: 'mdi-plus-box', path: '/new' },
        { title: 'Rechercher', icon: 'mdi-magnify', path: '/searchInfo/-1' },
        { title: 'Vue d\'ensemble', icon: 'mdi-format-list-bulleted', path: '/liste'},
        { title: 'Copier', icon: 'mdi-content-copy', path: '/copie'}
      ],
    }),
    mounted() {
      DateService.getFerie('2020');
    }
  };
</script>
