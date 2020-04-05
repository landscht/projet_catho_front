<template>
    <div>
        <Navigation :links="links"></Navigation>
        <v-card>
            <v-card-title>{{content}}</v-card-title>
        </v-card>
    </div>
</template>

<script>

    import Navigation from "./Navigation";

    export default {
        name: "BoardAdmin",
        components: {Navigation},
        data : () => ({
            content : '',
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
            ]
        }),
        mounted() {
            if(!this.$store.state.auth.user.roles.includes('ROLE_ADMIN')) {
                this.$router.push('/accueil');
            }
        }
    }
</script>

<style scoped>

</style>
