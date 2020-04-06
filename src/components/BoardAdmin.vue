<template>
    <div>
        <Navigation :links="links"></Navigation>
        <v-card>
            <v-card-title>{{content}}</v-card-title>
            <v-alert color="success" v-if="succ">Compte créé</v-alert>
            <v-card-text>
                <v-data-table
                        :headers="headers"
                        :items="users"
                        :search="search"
                        no-data-text="Aucune fiche collaborateur"
                        :footer-props="{
                                itemsPerPageText : 'Lignes par page'
                            }"
                >
                </v-data-table>
            </v-card-text>
            <v-card-actions>
                <v-dialog v-model="dialog" persistent max-width="600px">
                    <template v-slot:activator="{ on }">
                        <v-btn color="primary" v-on="on">Créer un utilisateur</v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="headline">Créer un utilisateur</span>
                        </v-card-title>
                        <v-alert color="error" v-if="wrong">email ou nom d'utilisateur déja utilisé</v-alert>
                        <v-card-text>
                            <v-container>
                                <v-form v-model="valid" ref="form">
                                    <v-row>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field
                                                    v-model="user.username"
                                                    label="Nom d'utilisateur*"
                                                    required
                                                    counter="20"
                                                    :rules="[
                                                    v => !!v || 'Veuillez entrer un nom d\'utilisateur',
                                                    v => v.length <= 20 || '20 caractères maximum'
                                                ]"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field
                                                    v-model="user.email"
                                                    label="email*"
                                                    type="email"
                                                    :rules="[
                                                     v => !!v || 'Veuillez entrer un email',
                                                     v => /.+@.+/.test(v) || 'Email non valide',
                                                ]"
                                                    hint="prenom.nom@univ-catholillr.fr"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field
                                                    v-model="user.password"
                                                    label="Mot de passe*"
                                                    type="password"
                                                    :rules="[
                                                    v => !!v || 'Veuillez entrer un mot de passe',
                                                    v => v.length > 6 || '6 caractères minimum',
                                                    v => v.length <= 40 || '40 caractères maximum'
                                                ]"
                                                    required
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-form>
                            </v-container>
                            <small>*Indique les champs requis</small>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="dialog = false">Annuler</v-btn>
                            <v-btn color="primary" :loading="loading" :disabled="!valid" @click="handleRegister">Créer</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>

    import Navigation from "./Navigation";
    import User from "../models/user";
    import UserService from "../services/User.service";

    export default {
        name: "BoardAdmin",
        components: {Navigation},
        data : () => ({
            content : '',
            user : new User('', ''),
            valid : false,
            users : [],
            loading : false,
            succ : false,
            wrong : false,
            dialog : false,
            links: [
                {
                    text: 'Accueil',
                    disabled: false,
                    href: '/accueil'
                },
                {
                    text: 'Admin',
                    disabled: true,
                    href: '/admin'
                }
            ],
            headers: [
                {
                    text: 'Id',
                    align: 'start',
                    sortable: false,
                    value: 'id',
                },
                { text: 'Nom d\'utilisateur', value: 'username' },
                { text: 'Email', value: 'email'},
                { text: 'role', value: 'authorities[0].authority'},
            ],
            search : ''
        }),
        mounted() {
            if(!this.$store.state.auth.user.roles.includes('ROLE_ADMIN')) {
                this.$router.push('/accueil');
            }
            UserService.getAll().then(response => { console.log(response.data); this.users = response.data});
        },
        methods: {
            handleRegister() {
                if(this.$refs.form.validate()) {
                    this.loading = true;
                    if (this.user.username && this.user.password) {
                        this.$store.dispatch('auth/register', this.user).then(
                            () => {
                                this.dialog = false;
                                this.succ = true;
                            },
                            error => {
                                this.loading = false;
                                this.message =
                                    (error.response && error.response.data) ||
                                    error.message ||
                                    error.toString();
                                this.wrong = true;
                                this.loading = false;
                                this.$refs.form.reset();
                            }
                        );
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>
