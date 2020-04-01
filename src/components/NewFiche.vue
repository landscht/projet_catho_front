<template>
    <div>
        <v-subheader><v-chip v-for="(v, key) in links" color="primary" :key="key" :to="v.href" :disabled="v.disabled" class="ml-2">{{v.text}}</v-chip></v-subheader>
        <v-container>
            <v-row>
                <v-col cols="12" sm="6">
                    <v-card
                            class="mx-auto"
                            max-width="1000px"
                    >
                        <v-card-title>
                            Entrez les informations de la fiche
                        </v-card-title>
                        <v-card-text>
                            {{this.currentYear}}
                            <v-alert type="success" v-if="generate">
                                Fiche générée
                            </v-alert>
                            <v-form v-model="valid" ref="form">
                                <v-select
                                        v-model="service"
                                        :items="services"
                                        label="Service"
                                        :rules="[v => !!v || 'Veuillez selectionner un service']"
                                ></v-select>
                                <v-text-field
                                        v-model="nom"
                                        label="Nom"
                                        :rules="[v => !!v || 'Veuillez entrer le nom du collaborateur']"
                                        required
                                ></v-text-field>
                                <v-text-field
                                        v-model="prenom"
                                        label="Prenom"
                                        :rules="[v => !!v || 'Veuillez entrer le prenom du collaborateur']"
                                        required
                                ></v-text-field>
                                <v-text-field
                                        v-model="code"
                                        label="Matricule"
                                        :rules="[
                                            v => !!v || 'Veuillez entrer le matricule du collaborateur',
                                            v => v.length === 5 || 'Le matricule correspond à 5 chiffre'
                                        ]"
                                        counter="5"
                                        required
                                ></v-text-field>
                                <v-select
                                        v-model="statut"
                                        :items="status"
                                        label="Statut"
                                        :rules="[v => !!v || 'Veuillez selectionner un statut']"
                                ></v-select>
                                <v-dialog v-model="dialog" persistent max-width="510" >
                                    <template v-slot:activator="{ on }">
                                        <v-text-field
                                                v-on="on"
                                                hint="AAAA-MM-JJ"
                                                v-model="date_entree"
                                                label="Date d'entrée"
                                                :rules="dateRules"
                                        >
                                        </v-text-field>
                                    </template>
                                    <v-card>
                                        <v-card-title class="headline">Date d'entrée</v-card-title>
                                        <v-card-text><v-date-picker landscape v-model="date_entree" header-color="primary"></v-date-picker></v-card-text>
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn @click="dialog = false">Valider</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                                <v-dialog v-model="dialog2" persistent max-width="510" >
                                    <template v-slot:activator="{ on }">
                                        <v-text-field
                                                v-on="on"
                                                v-model="date_sortie"
                                                hint="AAAA-MM-JJ"
                                                label="Date de sortie"
                                                :rules="dateRules"
                                        >
                                        </v-text-field>
                                    </template>
                                    <v-card>
                                        <v-card-title class="headline">Date d'entrée</v-card-title>
                                        <v-card-text><v-date-picker landscape v-model="date_sortie" header-color="primary"></v-date-picker></v-card-text>
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn @click="dialog2 = false">Valider</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                                <v-text-field
                                        v-model="heure_hebdomadaire"
                                        label="Heure hebdomadaire"
                                        suffix="h/semaine"
                                        type="number"
                                ></v-text-field>
                                <v-text-field
                                        v-model="anciennete"
                                        label="Conge d'anciennte"
                                        type="number"
                                ></v-text-field>
                                <v-text-field
                                        v-model="penalite"
                                        label="Penalite de conge"
                                        type="number"
                                ></v-text-field>
                                <v-text-field
                                    v-model="reporte"
                                    label="Report"
                                    type="number"
                                ></v-text-field>
                                <v-textarea
                                    v-model="commentaire"
                                    label="Commentaire"
                                    :rules="commentaireRules"
                                    counter="100"
                                >
                                </v-textarea>
                                <v-btn class="mr-4" @click="submit" :disabled="!valid">Créer</v-btn>
                            </v-form>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="12" sm="6">
                    <Fiche  v-if="generate" :collaborateur="this.collab"></Fiche>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>

    import Services from "../services/Services";
    import DateService from "../services/DateService";
    import Fiche from "./Fiche";

    export default {
        name: "NewFiche",
        components: {Fiche},
        data : () => ({
            service: "",
            generate : false,
            commentaire : '',
            anciennete : 0,
            penalite : 0,
            currentYear : DateService.stats.yearCurrent,
            heure_hebdomadaire : 35,
            reporte : 0,
            nom: "",
            prenom : "",
            code: "",
            statut: "",
            collab : {},
            date_entree: new Date().toISOString().substr(0,10),
            date_sortie: new Date().toISOString().substr(0,10),
            services: Services.services,
            status : [
                'Admin jour',
                'Admin heure',
                'Enseignant'
            ],
            dialog : false,
            dialog2 : false,
            dateRules: [
                v => !!v || 'Veuillez entrer la date',
            ],
            commentaireRules: [
                t => t.length <= 100 || '100 caractères maximum'
            ],
            valid : true,
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
            stats : {}
        }),

        methods : {
            submit() {
                if(this.$refs.form.validate()) {
                    let dateIn = new Date(`${this.date_entree}T00:00:00`);
                    let dateOut = new Date(`${this.date_sortie}T00:00:00`);
                    let conge = this.calculJourConge(dateIn, dateOut);
                    this.stats = DateService.getStatsDate(dateIn, dateOut);
                    this.generate = true;
                    let totalWorkDay = this.stats.totalDay-this.stats.totalWeekEnd-this.stats.totalHoliday-conge-this.anciennete-this.penalite;
                    let totalWeek = totalWorkDay/5;
                    let totalHour = totalWeek*this.heure_hebdomadaire;
                    let totalMin = totalHour/8;
                    let dayProra = (5*this.heure_hebdomadaire)/35*(this.stats.totalDay/365);
                    let totalWorkPeriod = totalMin + dayProra;
                    let totalRtt = this.getRtt(this.statut, totalWorkPeriod, totalHour);
                    let avenant = (this.statut === 'Enseignant') ? 10*this.stats.totalDay/365*this.heure_hebdomadaire/35 : 0;
                    this.collab = {
                        nom : this.nom.toUpperCase(),
                        matricule : this.code,
                        prenom : this.prenom.toUpperCase(),
                        totalCongeAnciennete : this.anciennete,
                        penalisationConge : this.penalite,
                        date_entree : this.date_entree,
                        date_sortie : this.date_sortie,
                        heure_hebdomadaire : this.heure_hebdomadaire,
                        service : this.service,
                        statut : this.statut,
                        totalJour : this.stats.totalDay.toFixed(2),
                        totalConge : conge,
                        totalWe : this.stats.totalWeekEnd.toFixed(2),
                        totalJourFerie : this.stats.totalHoliday.toFixed(2),
                        totalJourTravail : totalWorkDay.toFixed(2),
                        totalSemaine : totalWeek.toFixed(2),
                        totalHeure : Math.ceil(totalHour),
                        totalMinDay : totalMin,
                        totalDayProra : dayProra.toFixed(2),
                        totalWorkPeriod : Math.ceil(totalWorkPeriod),
                        totalRtt : totalRtt,
                        avenant : avenant,
                        year : DateService.stats.yearCurrent,
                        commentaire : this.commentaire,
                        reporte : 0,
                    };
                    let myHeaders = new Headers({
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                    });
                    fetch('http://localhost:8081/coll/add', {
                        method : 'POST',
                        headers : myHeaders,
                        body : JSON.stringify(this.collab),
                    });
                    console.log(JSON.stringify(this.collab));
                }
            },
            calculJourConge(dateIn, dateOut) {
                let coeff = (this.statut === 'Enseignant') ? 3.333 : 2.5;
                let dateFlag;
                let dateFlagOut;
                if(this.statut === 'Enseignant') {
                    dateFlag = new Date(DateService.stats.yearCurrent, 0,1);
                    dateFlagOut = new Date(DateService.stats.yearCurrent, 11, 31);
                }else {
                    dateFlag = new Date(DateService.stats.yearCurrent-1, 4, 31);
                    dateFlagOut = new Date(DateService.stats.yearCurrent, 4, 31);
                }
                let res = 0;
                let dateTmpIn = new Date(dateIn.getFullYear(), dateIn.getMonth(), 1);
                let dateTmpOut = new Date(dateOut.getFullYear(), dateOut.getMonth(), 1);
                if(dateIn > dateFlag && dateIn < dateFlagOut) {
                    res += ((30-dateIn.getDate()+1)*coeff)/30;
                    dateTmpIn.setFullYear(dateTmpIn.getFullYear(), dateTmpIn.getMonth()+1, 1);
                    console.log(res)
                }
                if(dateOut > dateFlag && dateOut < dateFlagOut) {
                    res += (dateOut.getDate()*coeff)/30;
                    dateTmpOut.setFullYear(dateTmpOut.getFullYear(), dateTmpOut.getMonth()-1, 1);
                    console.log(res)
                }
                while(dateTmpIn <= dateTmpOut) {
                    if(dateTmpIn > dateFlag && dateTmpIn < dateFlagOut) {
                        res += coeff
                    }
                    dateTmpIn.setFullYear(dateTmpIn.getFullYear(), dateTmpIn.getMonth()+1, 1);
                }

                console.log(res);
                return Math.ceil(res);
            },

            getRtt(statut, totalWorkPeriod, totalHour) {
                if(statut === 'Admin jour') {
                    let rttJour = Math.ceil((22*totalWorkPeriod)/200);
                    return (rttJour > 22) ? 22 : rttJour;
                }else if(statut === 'Admin heure') {
                    let rttHeure = Math.ceil((27*totalHour)/1554);
                    console.log('coucou');
                    console.log(rttHeure);
                    return (rttHeure > 27) ? 27 : rttHeure;
                }else if(statut === 'Enseignant') {
                    let rttEns = Math.ceil((12*totalWorkPeriod)/200);
                    return (rttEns > 12) ? 12 : rttEns;
                }
            }
        }
    }
</script>

<style scoped>

</style>
