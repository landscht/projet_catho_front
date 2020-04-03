<template>
    <div>
        <Navigation :links="lin"></Navigation>
        <v-card class="mb-5">
            <v-card-title>
                Selectionnez les fiches à copier pour l'année {{yearSearch}}
                <v-spacer></v-spacer>
                <v-select
                        v-model="yearSearch"
                        :items="yearsSelect"
                        label="Année à copier"
                        @change="updateSearch"
                ></v-select>
            </v-card-title>
            <v-data-table
                    v-model="selected"
                    :headers="headers"
                    :items="collsOrigin"
                    item-key="matricule"
                    show-select
                    class="elevation-1"
                    :footer-props="{
                                itemsPerPageText : 'Lignes par page'
                            }"
            >
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
        <div class="text-center mb-5">
            <v-icon large color="success">mdi-arrow-down</v-icon>
        </div>
        <v-card>
            <v-card-title>
                Copier la selection pour l'année {{yearCopie}}
                <v-spacer></v-spacer>
                <v-select
                        v-model="yearCopie"
                        :items="yearsSelect"
                        label="Année à coller"
                        @change="updateCopie"
                ></v-select>
            </v-card-title>
            <v-data-table
                    :headers="hearders2"
                    :items="selected"
                    item-key="name"
                    class="elevation-1"
                    hide-default-footer
                    :no-data-text="`Les fiches de ${yearSearch} seront copié pour l'année ${yearCopie}`"
            >
            </v-data-table>
        </v-card>
        <div class="mt-5 text-center">
            <v-btn @click="launchCopie" color="success">Copier</v-btn>
        </div>
        <v-dialog v-model="dialog" persistent max-width="510" >
            <v-card>
                <Fiche :collaborateur="coll"></Fiche>
                <v-card-actions>
                    <v-btn @click="dialog = false">Fermer</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import Navigation from "./Navigation";
    import Collaborateur from "../services/Collaborateur";
    import Fiche from "./Fiche";
    import YearService from "../services/YearService";
    import DateService from "../services/DateService";
    export default {
        name: "Copie",
        components: {Fiche, Navigation},
        data : () => ({
            lin : [
                {
                    text: 'Accueil',
                    disabled: false,
                    href: '/accueil'
                },
                {
                    text: 'Copie',
                    disabled: true,
                    href: '/copie'
                }
            ],
            selected : [],
            headers : [
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
                { text: 'Date fin periode', value: 'date_sortie' },
                { text: 'Année d\'étude', value: 'year' },
                { text: 'Nombre congés', value: 'totalConge'},
                { text: 'Nombre RTT', value: 'totalRtt'},
                { text: 'Durée annualisée', value: 'totalHeure'},
                { text: 'Nombre jour', value: 'totalWorkPeriod'},
            ],
            hearders2 : [
                {
                    text: 'Matricule',
                    align: 'start',
                    sortable: false,
                    value: 'matricule',
                },
                { text: 'Nom', value: 'nom' },
                { text: 'Prenom', value: 'prenom' },
            ],
            yearSearch : new Date().getFullYear().toString(),
            collsOrigin : [],
            coll : {},
            dialog : false,
            yearsSelect : YearService.yearsSelect,
            yearCopie : (new Date().getFullYear()+1).toString()
        }),
        created() {
            Collaborateur.getAllByYear(this.yearSearch).then((data) => {this.collsOrigin = data});
            DateService.getFerie(this.yearCopie);
        },
        methods : {
            testTouch(value) {
                this.coll = value;
                this.dialog = true;
            },
            updateSearch() {
                this.selected = [];
                Collaborateur.getAllByYear(this.yearSearch).then((data) => {this.collsOrigin = data});

            },
            updateCopie() {
                DateService.getFerie(this.yearCopie);
            },
            launchCopie() {
                this.selected.forEach((c) => {
                    c.id = undefined;
                    c.year = this.yearCopie;
                    c.date_sortie = new Date(this.yearCopie, 11, 31, 10).toISOString().substr(0 ,10);
                    c.commentaire = '';
                    let newValue = DateService.getStatsDate(c, true);
                    let myHeaders = new Headers({
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                    });
                    fetch('http://localhost:8081/coll/add', {
                        method : 'POST',
                        headers : myHeaders,
                        body : JSON.stringify(newValue),
                    });
                    console.log(newValue);
                })
            }
        }
    }
</script>

<style scoped>

</style>
