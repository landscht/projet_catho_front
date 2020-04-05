import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import './plugins/vue-router';
import VueRouter from "vue-router";
import Accueil from "./components/Accueil";
import NewFiche from "./components/NewFiche";
import Liste from "./components/Liste";
import SearchInfo from "./components/SearchInfo";
import UpdateFiche from "./components/UpdateFiche";
import Copie from "./components/Copie";
import store from "./store"
import Login from "./components/Login";
import Profile from "./components/Profile";

Vue.config.productionTip = false;

const router = new VueRouter({
  routes : [
    {path: '/', redirect: '/accueil'},
    {path: '/accueil', component: Accueil},
    {path: '/new', component: NewFiche},
    {path: '/liste', component: Liste},
    {path: '/searchInfo/:matricule', component: SearchInfo},
    {path: '/update/:id', component: UpdateFiche},
    {path: '/copie', component: Copie},
    {path: '/login', component: Login},
    {path: '/profile', component: Profile}
  ]
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register', '/home'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
