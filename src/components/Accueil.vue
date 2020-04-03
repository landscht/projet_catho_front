<template>
    <div>
        <Navigation :links="[{text: 'Accueil', disabled : true, href: '/accueil'}]"></Navigation>
        <v-container fill-height>
            <v-row justify="center" align="center">
                <v-col cols="12" sm="7">
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
                    </v-tooltip>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    import Navigation from "./Navigation";
    export default {
        name: "Accueil",
        components: {Navigation},
        data : () => ({
            colorButton : '',
            nav : true,
        }),
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
