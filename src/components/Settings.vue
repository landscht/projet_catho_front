<template>
    <div>
        <v-subheader><v-chip v-for="(v, key) in links" color="primary" :key="key" :to="v.href" :disabled="v.disabled" class="ml-2">{{v.text}}</v-chip></v-subheader>
        <v-container>
            <v-row justify="left" align="left">
                <v-col cols="12" sm="6">
                    <v-card max-width="600">
                        <v-card-title>Année sur laquelle travailler</v-card-title>
                        <v-card-text>
                            <v-form v-model="valid" ref="form2">
                                <v-select
                                        v-model="dateCurrent"
                                        :items="years"
                                        label="Année"
                                        :rules="[v => !!v || 'L\'année est requise']"
                                >
                                </v-select>
                                <v-btn @click="submit">Appliquer</v-btn>
                            </v-form>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>

    import DateService from "../services/DateService";

    export default {
        name: "Settings",
        data : () => ({
            ferie : [],
            valid: true,
            dateCurrent : DateService.stats.yearCurrent,
            links: [
                {
                    text: 'Accueil',
                    disabled: false,
                    href: '/accueil',
                },
                {
                    text: 'Parametres',
                    disabled: true,
                    href: '/settings',
                },
            ],
            years : [
                '2000',
                '2001',
                '2002',
                '2003',
                '2004',
                '2005',
                '2006',
                '2007',
                '2008',
                '2009',
                '2010',
                '2011',
                '2012',
                '2013',
                '2014',
                '2015',
                '2016',
                '2017',
                '2018',
                '2019',
                '2020',
                '2021',
                '2022',
                '2023',
                '2024'
            ]
        }),
        methods : {
            formatDate (a, withTime) {
                return withTime
                    ? `${a.getFullYear()}-${a.getMonth() + 1}-${a.getDate()} ${a.getHours()}:${a.getMinutes()}`
                    : `${a.getFullYear()}-${a.getMonth() + 1}-${a.getDate()}`
            },
            submit() {
                DateService.getFerie(this.dateCurrent);
            },
        },
    }
</script>

<style scoped>

</style>
