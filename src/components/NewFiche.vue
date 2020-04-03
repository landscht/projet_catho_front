<template>
    <div>
        <Navigation :links="links"></Navigation>
        <v-container>
            <v-row>
                <v-col cols="12" sm="6">
                    <Formulary v-on:fiche="submit" :form-fiche="formFiche" :update-flag="false"></Formulary>
                </v-col>
                <v-col cols="12" sm="6">
                    <Fiche  v-if="generate" :collaborateur="this.collab"></Fiche>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>

    import Fiche from "./Fiche";
    import Formulary from "./Formulary";
    import DateService from "../services/DateService";
    import Navigation from "./Navigation";

    export default {
        name: "NewFiche",
        components: {Navigation, Formulary, Fiche},
        data : () => ({
            formFiche : {
                service : '',
                commentaire : '',
                totalCongeAnciennete : 0,
                penalisationConge : 0,
                heure_hebdomadaire : 35,
                nom : '',
                prenom : '',
                matricule : '',
                statut: '',
                date_entree : new Date(new Date().getFullYear(), 0 ,1 ,10).toISOString().substr(0, 10),
                date_sortie : new Date(new Date().getFullYear(), 11, 31, 10).toISOString().substr(0, 10),
                year : new Date().getFullYear().toString(),
                reporte : 0
            } ,
            generate : false,
            links: [
                {
                    text: 'Accueil',
                    disabled: false,
                    href: '/accueil',
                },
                {
                    text: 'Nouvelle fiche',
                    disabled: true,
                    href: '/new',
                },

            ],
            collab : {},
        }),
        created() {
            DateService.getFerie(new Date().getFullYear());
        },
        methods : {
            submit(value) {
                this.collab = value;
                this.generate = value;

            }
        }
    }
</script>

<style scoped>

</style>
