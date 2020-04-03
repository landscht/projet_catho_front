<template>
    <div>
        <Navigation :links="links"></Navigation>
        <v-card>
            <v-card-title>
                Collaborateurs
                <v-spacer></v-spacer>
                <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Rechercher un collaborateur"
                        single-line
                        hide-details
                ></v-text-field>
            </v-card-title>

                    <v-data-table
                            :headers="headers"
                            :items="colls"
                            :search="search"
                            no-data-text="Aucune fiche collaborateur"
                            :footer-props="{
                                itemsPerPageText : 'Lignes par page'
                            }"
                    >
                        <template v-slot:item.totalHeure="{ item }">
                            <span v-if="item.statut === 'Admin heure'">{{item.totalHeure}}</span>
                            <span v-else>0</span>
                        </template>
                        <template v-slot:item.totalWorkPeriod="{ item }">
                            {{Math.ceil(item.totalWorkPeriod)}}
                        </template>
                        <template v-slot:item.detail="{item}">
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                    <v-btn icon color="primary" @click="testTouch(item)" v-on="on"><v-icon>mdi-dots-horizontal</v-icon></v-btn>
                                </template>
                                <span>{{item.commentaire}}</span>
                            </v-tooltip>

                        </template>
                    </v-data-table>
        </v-card>
        <v-dialog v-model="dialog" persistent max-width="510" >
            <v-card>
                    <Fiche :collaborateur="coll"></Fiche>
                <v-card-actions>
                    <v-btn @click="dialog = false">Fermer</v-btn>
                    <v-btn color="primary" @click="redirect">Voir plus</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>

    import Collaborateur from "../services/Collaborateur";
    import Fiche from "./Fiche";
    import Navigation from "./Navigation";

    export default {
        name: "Liste",
        components: {Navigation, Fiche},
        data : () => ({
            search: '',
            dialog : false,
            coll : {},
            headers: [
                {
                    text: 'Détails',
                    value: 'detail',
                    sortable: false
                },
                {
                    text: 'Matricule',
                    align: 'start',
                    sortable: false,
                    value: 'matricule',
                },
                { text: 'Nom', value: 'nom' },
                { text: 'Prenom', value: 'prenom' },
                { text: 'Service', value: 'service'},
                { text: 'Forfait', value: 'statut'},
                { text: 'Date d\'entree', value: 'date_entree' },
                { text: 'Date début période', value:'debut_periode'},
                { text: 'Date fin periode', value: 'date_sortie' },
                { text: 'Année d\'étude', value: 'year' },
                { text: 'Nombre congés', value: 'totalConge'},
                { text: 'Nombre RTT', value: 'totalRtt'},
                { text: 'Durée annualisée', value: 'totalHeure'},
                { text: 'Nombre jour', value: 'totalWorkPeriod'},
                { text: 'Horaire', value: 'heure_hebdomadaire'},
                { text: 'Congé ancienneté', value:'totalCongeAnciennete'},
                { text: 'Penalite', value: 'penalisationConge'},
                { text: 'Reporte', value: 'reporte'}
            ],
            colls: [],
            links: [
                {
                    text: 'Accueil',
                    disabled: false,
                    href: '/accueil',
                },
                {
                    text: 'Liste',
                    disabled: true,
                    href: '/liste',
                },

            ],
        }),
        created() {
            Collaborateur.getAll().then((data) => {
                this.colls = data;
            });
        },
        methods : {
            testTouch(value) {
                this.coll = value;
                this.dialog = true;
            },
            redirect() {
                this.$router.push(`/searchInfo/${this.coll.matricule}`)
            },
        },
    }
</script>

<style scoped>

</style>
