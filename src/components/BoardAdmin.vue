<template>
    <div>
        <v-card>
            <v-card-title>{{content}}</v-card-title>
        </v-card>
    </div>
</template>

<script>

    import UserService from '../services/User.service';

    export default {
        name: "BoardAdmin",
        data : () => ({
            content : ''
        }),
        mounted() {
            UserService.getUserBoard().then(
                response => {
                    this.content = response.data;
                },
                error => {
                    this.content =
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString();
                }
            );
        }
    }
</script>

<style scoped>

</style>
