<template>
    <v-app>
        <AppBar :datos='[1,2,3,4,5]'></AppBar>
        <!-- <SideBar /> -->
        <Vista />
    </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component'
 
import AppBar from './AppDrawer.vue';
import Vista from './ViewComponent.vue';

@Component({
    name: 'App',
    components: {
      AppBar,
      Vista,
    },
})
export default class App extends Vue{}
</script>

<style scoped>

</style>
