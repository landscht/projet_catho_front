import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import Settings from "../services/Settings";

Vue.use(Vuetify);

export default new Vuetify({
    theme: {dark: Settings.dark},
    icons: {
        iconfont: 'mdi', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
    },
});
