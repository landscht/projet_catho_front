<template>
        <v-subheader><v-chip v-for="(v, key) in links" color="primary" :key="key" :to="v.href" :disabled="v.disabled" class="ml-2">{{v.text}}</v-chip></v-subheader>
</template>

<script>
    export default {
        name: "Navigation",
        props : {
            links: Array

        }
    }
</script>

<style scoped>

</style>
