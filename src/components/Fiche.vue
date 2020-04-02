<template>
    <div>
        <v-card max-width="1000px">
            <v-card-title>
                {{collaborateur.nom}} {{collaborateur.prenom}}
            </v-card-title>
            <v-card-subtitle>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <span v-on="on">{{collaborateur.year}}</span>
                    </template>
                    <span>Année d'etude</span>
                </v-tooltip>
                <br/>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <span v-on="on">{{collaborateur.date_entree}}</span>
                    </template>
                    <span>Date d'entrée à la catho</span>
                </v-tooltip>
                 /
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <span v-on="on">{{collaborateur.matricule}}</span>
                    </template>
                    <span>Matricule</span>
                </v-tooltip>
                 /
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <span v-on="on">{{collaborateur.service}}</span>
                    </template>
                    <span>Service</span>
                </v-tooltip>
                <v-divider></v-divider>
                <v-card-text>
                    <div>
                        {{collaborateur.totalJour}} jours sur l'année civile<br/>
                        -{{collaborateur.totalWe}} jours de repos (samedi/dimanche)<br/>
                        <span v-if="collaborateur.statut ==='Enseignant'">-{{collaborateur.avenant}} jours avenant n°1<br/></span>
                        -{{collaborateur.totalJourFerie}} jours fériés ouvrés<br/>
                        -{{collaborateur.totalConge}} jours de congés payés sur droits au 31 mai de l'année<br/>
                        -{{collaborateur.totalCongeAnciennete}} jours de congés d'anciennetée<br/>
                        -{{collaborateur.penalisationConge}} jours de penalite<br/>
                        <span style="color: dodgerblue">{{collaborateur.totalJourTravail}} jours travaillés</span>
                    </div>
                    <v-divider></v-divider>
                    <div>
                        {{collaborateur.totalJourTravail}} jours travaillés<br/>
                        /5 jours pas semaine<br/>
                        <span style="color: dodgerblue">{{collaborateur.totalSemaine.toFixed(2)}} semaines</span>
                    </div>
                    <v-divider></v-divider>
                    <div>
                        {{collaborateur.totalSemaine.toFixed(2)}} semaines<br/>
                        *{{collaborateur.heure_hebdomadaire}} heures par semaine<br/>
                        <span v-if="collaborateur.statut === 'Admin heure'">{{collaborateur.reporte}} heures à reporter<br/></span>
                        <span style="color: dodgerblue">{{Math.ceil(collaborateur.totalHeure)}} heures de travail à effectuer sur l'année</span>
                    </div>
                    <v-divider></v-divider>
                    <div v-if="collaborateur.statut === 'Admin jour' || collaborateur.statut === 'Enseignant'">
                        {{Math.ceil(collaborateur.totalHeure)}} heures de travail à effectuer sur l'année<br/>
                        /8 heures par jour en moyenne<br/>
                        <span style="color: dodgerblue">{{Math.ceil(collaborateur.totalMinDay)}} jours</span>
                    </div>
                    <v-divider></v-divider>
                    <div v-if="collaborateur.statut === 'Admin jour' || collaborateur.statut === 'Enseignant'">
                        {{Math.ceil(collaborateur.totalMinDay)}} jours<br/>
                        +{{Math.ceil(collaborateur.totalDayProra)}} jours à proratiser sur l'année civile<br/>
                        {{collaborateur.reporte}} jours à reporter<br/>
                        <span style="color: dodgerblue">{{Math.ceil(collaborateur.totalWorkPeriod)}} jours de travail sur la periode</span>
                    </div>
                    <div>
                        <span style="color: green">{{collaborateur.totalRtt}} RTT</span>
                    </div>
                    <div>
                        <v-divider></v-divider>
                        <span v-if="!switchCom">{{collaborateur.commentaire}}</span>
                        <v-textarea
                                v-else
                                v-model="collaborateur.commentaire"
                                counter="100"
                                :rules="[t => t.length <= 100 || '100 caractères maximum']"
                        ></v-textarea>
                        <v-btn v-if="!switchCom" icon x-small @click="switchCom = !switchCom"><v-icon>mdi-pencil</v-icon></v-btn>
                        <v-btn v-else icon x-small @click="validateCom"><v-icon>mdi-check</v-icon></v-btn>
                    </div>
                </v-card-text>
            </v-card-subtitle>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <span v-on="on" class="font-weight-thin">{{collaborateur.id}}</span>
                    </template>
                    <span>Id fiche</span>
                </v-tooltip>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>

    import Collaborateur from "../services/Collaborateur";

    export default {
        name: "Fiche",
        props : {
            collaborateur : {}
        },
        data : () => ({
            switchCom : false,
        }),
        methods : {
            validateCom() {
                Collaborateur.updateFiche(this.collaborateur);
                this.switchCom = !this.switchCom;
            }
        }
    }
</script>

<style scoped>

</style>
