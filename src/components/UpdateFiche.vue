<template>
    <div>
        <Navigation :links="links"></Navigation>
        <v-card>
            <v-card-title>Modifier la fiche {{coll.id}}</v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="6">
                            <Fiche :collaborateur="coll"></Fiche>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <Formulary v-on:fiche="submit" :form-fiche="coll" :update-flag="true"></Formulary>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>

    import Collaborateur from "../services/Collaborateur";
    import Fiche from "./Fiche";
    import Navigation from "./Navigation";
    import Formulary from "./Formulary";
    import DateService from "../services/DateService";

    export default {
        name: "UpdateFiche",
        components: {Formulary, Navigation, Fiche},
        props : {
            coll : {}
        },
        data : () => ({
            links: [
                {
                    text: 'Accueil',
                    disabled: false,
                    href: '/accueil',
                },
                {
                    text: 'Recherche collaborateur',
                    disabled: false,
                    href: `/searchInfo/-1`,
                },
                {
                    text: 'Modification',
                    disabled: true,
                    href: '/update'
                }
            ],
        }),
        created() {
            Collaborateur.getFicheById(this.$route.params.id).then((data) => {
                this.coll = data;
                DateService.getFerie(data.year);
            });
        },
         methods : {
             submit(value) {

                 console.log(value)
                 this.coll = value

             }
         }
    }
</script>

<style scoped>

</style>
