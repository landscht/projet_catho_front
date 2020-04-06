<template>
    <div>
        <Navigation :links="[{text: 'Accueil', disabled : true, href: '/accueil'}]"></Navigation>
        <v-container fill-height>
            <v-row justify="center" align="center">
                <v-col cols="12" sm="7">
                    <v-alert dark color="warning" v-if="dialog">
                        Vous êtes actuellement sur un environnement de développement hébergé sur des serveurs gratuits
                        , cela explique que vous pouvez rencontrer des ralentissements durant les différentes requpetes<br/>
                        <v-spacer></v-spacer>
                        <v-btn icon @click="dialog = false"><v-icon>mdi-close</v-icon></v-btn>
                    </v-alert>
                    <v-card
                            class="mx-auto"
                            max-width="1000px"
                    >
                        <v-card-title>
                            Que voulais vous faire
                        </v-card-title>
                        <v-card-text>
                            <v-btn block class="mb-2" to="/new">Ajouter une fiche</v-btn>
                            <v-btn block class="mb-2" to="/searchInfo/-1">Rechercher un collaborateur</v-btn>
                            <v-btn block class="mb-2" to="/liste">Lister tout les collaborateurs</v-btn>
                            <v-btn block to="/copie">Copier des fiches</v-btn>
                        </v-card-text>
                    </v-card>
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                            <v-btn class="mx-2 mt-2" v-on="on"  :color="colorButton" @click="changeTheme">
                                <v-icon dark>mdi-compare</v-icon>
                            </v-btn>
                        </template>
                        <span>Mode nuit</span>
                        {{content}}
                    </v-tooltip>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>

    import Navigation from "./Navigation";
    import UserService from "../services/User.service"

    export default {
        name: "Accueil",
        components: {Navigation},
        data : () => ({
            colorButton : '',
            nav : true,
            content : '',
            dialog : true
        }),
        mounted() {
            UserService.getUserBoard().then(
                response => {
                    this.content = response.data;
                },
                error => {
                    this.content =
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString();
                }
            );
        },
        created() {
            this.colorButton = (this.$vuetify.theme.dark === true) ? 'success' : '';

        },
        methods : {
            changeTheme() {
                this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
                this.colorButton = (this.$vuetify.theme.dark === true) ? 'success' : '';
            },
        }
    }
</script>

<style scoped>

</style>
