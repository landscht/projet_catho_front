<template>
    <div>
        <Navigation :links="links"></Navigation>
        <v-container>
            <v-row>
                <v-col cols="12" sm="6">
                    <v-card>
                        <v-card-title>Profile</v-card-title>
                        <v-card-text>
                            <header class="jumbotron">
                                <h3>
                                    <strong>{{currentUser.username}}</strong> Profile
                                </h3>
                            </header>
                            <p>
                                <strong>Token:</strong>
                                {{currentUser.accessToken.substring(0, 20)}} ... {{currentUser.accessToken.substr(currentUser.accessToken.length - 20)}}
                            </p>
                            <p>
                                <strong>Id:</strong>
                                {{currentUser.id}}
                            </p>
                            <p>
                                <strong>Email:</strong>
                                {{currentUser.email}}
                            </p>
                            <strong>Authorities:</strong>
                            <ul>
                                <li v-for="(role,index) in currentUser.roles" :key="index">{{role}}</li>
                            </ul>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    import Navigation from "./Navigation";
    export default {
        name: 'Profile',
        components: {Navigation},
        data : () => ({
           links : [
               {
                   text: 'Accueil',
                   disabled: false,
                   href: '/accueil'
               },
               {
                   text: 'Profile',
                   disabled: true,
                   href: '/profile'
               }]
        }),
        computed: {
            currentUser() {
                return this.$store.state.auth.user;
            }
        },
        mounted() {
            if (!this.currentUser) {
                this.$router.push('/login');
            }
        }
    };
</script>
