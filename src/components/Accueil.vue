<template>
    <div>
        <v-subheader><v-chip color="primary" disabled class="ml-2">Accueil</v-chip></v-subheader>
        <v-container fill-height>
            <v-row justify="center" align="center">
                <v-col cols="12" sm="7">
                    <v-card
                            class="mx-auto"
                            max-width="1000px"
                    >
                        <v-card-title>
                            Que voulais vous faire
                        </v-card-title>
                        <v-card-text>
                            <v-btn block class="mb-2" to="/new">Ajouter une fiche</v-btn>
                            <v-btn block class="mb-2" to="/searchInfo/-1">Rechercher un collaborateur</v-btn>
                            <v-btn block to="/liste">Lister tout les collaborateurs</v-btn>
                        </v-card-text>
                    </v-card>
                    <v-btn class="mx-2 mt-2" fab dark small color="primary" to="/settings">
                        <v-icon dark>mdi-cog-outline</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    export default {
        name: "Accueil"
    }
</script>

<style scoped>

</style>
