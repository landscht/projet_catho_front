import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import './plugins/vue-router';
import VueRouter from "vue-router";
import Accueil from "./components/Accueil";
import NewFiche from "./components/NewFiche";
import Settings from "./components/Settings";
import Liste from "./components/Liste";
import SearchInfo from "./components/SearchInfo";
import UpdateFiche from "./components/UpdateFiche";

Vue.config.productionTip = false;

const router = new VueRouter({
  routes : [
    {path: '/', redirect: '/accueil'},
    {path: '/accueil', component: Accueil},
    {path: '/new', component: NewFiche},
    {path: '/settings', component : Settings},
    {path: '/liste', component: Liste},
    {path: '/searchInfo/:matricule', component: SearchInfo},
    {path: '/update/:id', component: UpdateFiche}
  ]
});

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
