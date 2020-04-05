<template>
    <v-card
            class="mx-auto"
            max-width="1000px"
    >
        <v-card-title>
            Entrez les informations de la fiche
        </v-card-title>
        <v-card-text>
            <v-alert type="success" v-if="generate">
                Fiche générée
            </v-alert>
            <v-form v-model="valid" ref="form">
                <v-select
                        v-model="formFiche.year"
                        :items="yearsSelect"
                        v-if="!updateFlag"
                        label="Année"
                        :rules="[v => !!v || 'L\'année est requise']"
                        @change="updateFerie"
                >
                </v-select>
                <v-select
                        v-model="formFiche.service"
                        :items="services"
                        label="Service"
                        :rules="[v => !!v || 'Veuillez selectionner un service']"
                ></v-select>
                <v-text-field
                        v-model="formFiche.nom"
                        label="Nom"
                        :rules="[v => !!v || 'Veuillez entrer le nom du collaborateur']"
                        required
                ></v-text-field>
                <v-text-field
                        v-model="formFiche.prenom"
                        label="Prenom"
                        :rules="[v => !!v || 'Veuillez entrer le prenom du collaborateur']"
                        required
                ></v-text-field>
                <v-text-field
                        v-model="formFiche.matricule"
                        label="Matricule"
                        :rules="[
                                            v => !!v || 'Veuillez entrer le matricule du collaborateur',
                                            v => v.length === 5 || 'Le matricule correspond à 5 chiffre'
                                        ]"
                        counter="5"
                        required
                ></v-text-field>
                <v-select
                        v-model="formFiche.statut"
                        :items="status"
                        label="Statut"
                        :rules="[v => !!v || 'Veuillez selectionner un statut']"
                ></v-select>
                <v-dialog v-model="dialog" persistent max-width="510" >
                    <template v-slot:activator="{ on }">
                        <v-text-field
                                v-on="on"
                                hint="AAAA-MM-JJ"
                                v-model="formFiche.date_entree"
                                label="Date d'entrée"
                                :rules="dateRules"
                        >
                        </v-text-field>
                    </template>
                    <v-card>
                        <v-card-title class="headline">Date d'entrée</v-card-title>
                        <v-card-text><v-date-picker  @click:date="dialog = false" landscape v-model="formFiche.date_entree" header-color="primary"></v-date-picker></v-card-text>
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
                                v-model="formFiche.date_sortie"
                                hint="AAAA-MM-JJ"
                                label="Date de sortie"
                                :rules="dateRules"
                        >
                        </v-text-field>
                    </template>
                    <v-card>
                        <v-card-title class="headline">Date d'entrée</v-card-title>
                        <v-card-text><v-date-picker @click:date="dialog2" landscape v-model="formFiche.date_sortie" header-color="primary"></v-date-picker></v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn @click="dialog2 = false">Valider</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-text-field
                        v-model="formFiche.heure_hebdomadaire"
                        label="Heure hebdomadaire"
                        suffix="h/semaine"
                        type="number"
                ></v-text-field>
                <v-text-field
                        v-model="formFiche.totalCongeAnciennete"
                        label="Conge d'anciennte"
                        type="number"
                ></v-text-field>
                <v-text-field
                        v-model="formFiche.penalisationConge"
                        label="Penalite de conge"
                        type="number"
                ></v-text-field>
                <v-checkbox
                        v-model="flagConge"
                        label="Calculer automatiquement les congés"
                ></v-checkbox>
                <v-text-field
                        v-model="formFiche.totalConge"
                        v-if="!flagConge"
                        label="Nombre de congé"
                        outlined
                        type="number"
                ></v-text-field>
                <v-text-field
                        v-model="formFiche.reporte"
                        label="Report"
                        type="number"
                ></v-text-field>
                <v-textarea
                        v-model="formFiche.commentaire"
                        label="Commentaire"
                        :rules="commentaireRules"
                        counter="100"
                        outlined
                >
                </v-textarea>
                <v-btn class="mr-4" @click="submit" :disabled="!valid">Créer</v-btn>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script>

    import DateService from "../services/DateService";
    import Services from "../services/Services";
    import YearService from "../services/YearService";
    import ApiService from "../services/ApiService";
    import authHeader from "../services/Auth-header";

    export default {
        name: "Formulary",
        props : {
            formFiche : {},
            updateFlag: Boolean
        },
        data : () => ({
            dateRules: [
                v => !!v || 'Veuillez entrer la date',
            ],
            commentaireRules: [
                t => t.length <= 100 || '100 caractères maximum'
            ],
            valid : true,
            dialog : false,
            dialog2 : false,
            flagConge : true,
            status : [
                'Admin jour',
                'Admin heure',
                'Enseignant'
            ],
            collab : {},
            generate : false,
            services : Services.services,
            yearsSelect: YearService.yearsSelect
        }),
        methods : {
            submit() {
                if(this.$refs.form.validate()) {
                    this.collab = DateService.getStatsDate(this.formFiche, this.flagConge);
                    fetch(`${ApiService.API_ENDPOINT}/coll/add`, {
                        method : 'POST',
                        headers : authHeader(),
                        body : JSON.stringify(this.collab),
                    });
                    this.generate = true;
                    this.$emit('fiche', this.collab);
                }
            },
            updateFerie() {
                DateService.getFerie(this.formFiche.year)
                this.formFiche.date_entree = new Date(this.formFiche.year, 0, 1, 10).toISOString().substr(0,10);
                this.formFiche.date_sortie = new Date(this.formFiche.year, 11, 31, 10).toISOString().substr(0,10);
            }
        }
    }
</script>

<style scoped>

</style>
