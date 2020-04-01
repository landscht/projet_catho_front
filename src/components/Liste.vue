<template>
    <div>
        <v-subheader><v-chip v-for="(v, key) in links" color="primary" :key="key" :to="v.href" :disabled="v.disabled" class="ml-2">{{v.text}}</v-chip></v-subheader>
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
                    >
                        <template v-slot:item.reporte="{ item }">
                            <v-switch v-model="item.reporte" @change="updateReporte(item)"></v-switch>
                        </template>
                        <template v-slot:item.detail="{item}">
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                    <v-btn icon color="primary" @click="testTouch(item)" v-on="on"><v-icon>mdi-dots-horizontal</v-icon></v-btn>
                                </template>
                                <span v-if="item.commentaire.length !== 0">{{item.commentaire}}</span><span v-else>...</span>
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

    export default {
        name: "Liste",
        components: {Fiche},
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
                { text: 'Date de sortie', value: 'date_sortie' },
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
        watch : {
            colls: function() {
                console.log(this.colls);
            }
        },
        created() {
            Collaborateur.getAll().then((data) => {
                this.colls = data;
                console.log(data);
            });
        },
        methods : {
            testTouch(value) {
                this.coll = value;
                this.dialog = true;
                 console.log(value)
            },
            redirect() {
                this.$router.push(`/searchInfo/${this.coll.matricule}`)
            },
            updateReporte(value) {
                Collaborateur.updateFiche(value);
                console.log(value);
            }
        },
    }
</script>

<style scoped>

</style>
