<template>
    <div>
        <Navigation :links="links"></Navigation>
        <v-card>
            <v-card-title>
                Obtenez les fiches par collaborateur
                <v-spacer></v-spacer>
                <v-select
                    :items="items"
                    v-model="selectMatricule"
                    label="Matricule du collaborateur"
                ></v-select>
            </v-card-title>
            <v-divider></v-divider>
            <v-container>
                <v-row>
                    <v-col cols="12" sm="4" v-for="(fiche,key) in fiches" v-bind:key="key">
                        <v-card >
                            <Fiche :collaborateur="fiche"></Fiche>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on }">
                                        <v-btn icon color="error" dark v-on="on" @click="updateId(fiche)"><v-icon>mdi-close-circle</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Supprimer</span>
                                </v-tooltip>
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on }">
                                        <v-btn icon color="warning" dark v-on="on" :to="`/update/${fiche.id}`"><v-icon>mdi-pencil</v-icon></v-btn>
                                    </template>
                                    <span>Modifier</span>
                                </v-tooltip>
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on }">
                                        <v-btn icon color="primary" @click="generatePdf(fiche)" dark v-on="on"><v-icon>mdi-pdf-box</v-icon></v-btn>
                                    </template>
                                    <span>Pdf</span>
                                </v-tooltip>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
        <v-bottom-sheet v-model="sheet" inset>
            <v-sheet class="text-center" height="200px">
                <v-btn
                        class="mt-6"
                        text
                        color="error"
                        @click="deleteFiche()"
                >Oui</v-btn>
                <v-btn
                        class="mt-6"
                        text
                        color="primary"
                        @click="sheet = !sheet"
                >Non</v-btn>
                <div class="my-3">Voulez vous vraiment supprimer ?</div>
            </v-sheet>
        </v-bottom-sheet>
    </div>
</template>

<script>

    import Collaborateur from "../services/Collaborateur";
    import Fiche from "./Fiche";
    import Navigation from "./Navigation";

    export default {
        name: "SearchInfo",
        components: {Navigation, Fiche},
        data : () => ({
            links: [
                {
                    text: 'Accueil',
                    disabled: false,
                    href: '/accueil',
                },
                {
                    text: 'Recherche collaborateur',
                    disabled: true,
                    href: '/searchInfo',
                },
            ],
            items : [],
            fiches : [],
            fiche : {},
            selectMatricule : '',
            sheet : false,
        }),
        watch : {
            selectMatricule : function() {
                Collaborateur.getAllFicheByMatricule(this.selectMatricule).then((data) => {this.fiches = data})
            }
        },
        created() {
            Collaborateur.getAllMatricule().then((data) => {this.items = data});
            if(this.$route.params.matricule !== '-1') {
                this.selectMatricule = this.$route.params.matricule
                Collaborateur.getAllFicheByMatricule(this.selectMatricule).then((data) => {this.fiches = data})
            }
        },
        updated() {
          console.log('changement');
        },
        methods : {
            deleteFiche() {
                this.sheet = !this.sheet;
                this.fiches.splice(this.fiches.indexOf(this.fiche), 1);
                Collaborateur.deleteFicheById(this.fiche.id);
            },
            updateId(fiche) {
                this.sheet = !this.sheet;
                this.fiche = fiche;
            },
            generatePdf() {
                let pdfMake = require('pdfmake/build/pdfmake');
                if (pdfMake.vfs == undefined){
                    var pdfFonts = require('pdfmake/build/vfs_fonts.js')
                    pdfMake.vfs = pdfFonts.pdfMake.vfs;
                }
                var docDefinition = { content: 'Durée annualisée ' };
                pdfMake.createPdf(docDefinition).download();
            }
        }
    }
</script>

<style scoped>

</style>
