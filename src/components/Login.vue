<template>
    <v-container fill-height>
        <v-row justify="center" align="center">
            <v-col cols="12" sm="6">
                <v-alert dark color="warning" v-if="dialog">
                    <v-spacer></v-spacer>
                    <v-btn icon @click="dialog = false"><v-icon>mdi-close</v-icon></v-btn>
                    <p>
                        Vous êtes actuellement sur un environnement de développement hébergé sur des serveurs gratuits
                        , cela explique que vous pouvez rencontrer des ralentissements durant les différentes requêtes
                    </p>
                </v-alert>
                <v-card class="mx-auto"
                        max-width="800px"
                        :loading="loading">
                    <v-card-title>Se connecter</v-card-title>
                    <v-card-subtitle>Calcul de durée annualisée</v-card-subtitle>
                    <v-alert v-if="wrong" color="error">Login ou mot de passe incorrect</v-alert>
                    <v-card-text>
                        <v-form v-model="valid" ref="form">
                            <v-text-field
                                    outlined
                                    v-model="user.username"
                                    label="Login"
                                    :rules="[v => !!v || 'Veuillez entrer votre login']"
                            ></v-text-field>
                            <v-text-field
                                    outlined
                                    v-model="user.password"
                                    type="password"
                                    label="Mot de passe"
                                    :rules="[v => !!v || 'Veuillez entrer votre mot de passe']"
                            ></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn :loading="loading" @click="handleLogin" :disabled="!valid">Se connecter</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import User from "../models/user";

    export default {
        name: "Login",
        data : () => ({
            user : new User('', ''),
            valid: false,
            wrong: false,
            loading: false,
            dialog: true,
            message : ''
        }),
        created() {
            if(this.$store.state.auth.status.loggedIn) {
                this.$router.push('/accueil');
            }
        },
        methods: {
            handleLogin() {
                if(this.$refs.form.validate()) {
                    this.loading = true;
                    if (this.user.username && this.user.password) {
                        this.$store.dispatch('auth/login', this.user).then(
                            () => {
                                this.$router.push('/accueil');
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
