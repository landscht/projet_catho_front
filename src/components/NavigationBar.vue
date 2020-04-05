<template>
    <v-navigation-drawer
            v-if="showUserBoard"
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
            <v-list-item link to="/admin" v-if="showAdminBoard">
                <v-tooltip right>
                    <template v-slot:activator="{ on }">
                        <v-list-item-icon v-on="on">
                            <v-icon>mdi-account-cog</v-icon>
                        </v-list-item-icon>
                    </template>
                    <span>Administration</span>
                </v-tooltip>

                <v-list-item-content>
                    <v-list-item-title>Administration</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item link @click="logOut">
                <v-tooltip right>
                    <template v-slot:activator="{ on }">
                        <v-list-item-icon v-on="on">
                            <v-icon color="error">mdi-logout</v-icon>
                        </v-list-item-icon>
                    </template>
                    <span>Se déconnecter</span>
                </v-tooltip>

                <v-list-item-content>
                    <v-list-item-title>Se déconnecter</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
    export default {
        name: "NavigationBar",
        data: () => ({
            mini : true,
            items: [
                { title: 'Accueil', icon: 'mdi-view-dashboard', path: '/accueil', display: true },
                { title: 'Nouvelle fiche', icon: 'mdi-plus-box', path: '/new', display: true },
                { title: 'Rechercher', icon: 'mdi-magnify', path: '/searchInfo/-1', display: true },
                { title: 'Vue d\'ensemble', icon: 'mdi-format-list-bulleted', path: '/liste', display: true},
                { title: 'Copier', icon: 'mdi-content-copy', path: '/copie', display: true},
                { title: 'Profile', icon: 'mdi-account', path: '/profile', display: true},
            ],
        }),
        computed: {
            currentUser() {
                return this.$store.state.auth.user;
            },
            showAdminBoard() {
                if (this.currentUser && this.currentUser.roles) {
                    return this.currentUser.roles.includes('ROLE_ADMIN');
                }

                return false;
            },
            showUserBoard() {
                if (this.currentUser && this.currentUser.roles) {
                    return this.currentUser.roles.includes('ROLE_USER') || this.currentUser.roles.includes('ROLE_ADMIN');
                }

                return false;
            }
        },
        methods: {
            logOut() {
                this.$store.dispatch('auth/logout');
                this.$router.push('/login');
            },
        }
    }
</script>

<style scoped>

</style>
