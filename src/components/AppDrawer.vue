<template>
    <div>
    <v-app-bar
      absolute
    app
    color="transparent"
    flat
    height="60"
    >
      <v-app-bar-nav-icon v-if="!drawer" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title color="green darken-2" dark  class="tertiary--text font-weight-light align-self-center">Sístema gestor de proyectos > {{title}}</v-toolbar-title>

      <div class="flex-grow-1"></div>
      <!-- <v-breadcrumbs :items="items" divider=">"></v-breadcrumbs> -->

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-filter</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>exit_to_app</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      id="app-drawer"
        app
        dark
        floating
        color="primary"
        mobile-break-point="991"
        persistent
        width="230"
        src="https://demos.creative-tim.com/vue-material-dashboard/img/sidebar-2.32103624.jpg"
    >
    <!-- fondo transparente negro -->
    <template v-slot:img="attrs">
      <v-img
        v-bind="attrs"
        gradient="to top, rgba(0, 0, 0, .7), rgba(0, 0, 0, .7)"
      />
    </template>
    <v-list-item two-line>
      <!-- <v-list-item-avatar color="white">
        <v-img
          src="https://cdn.vuetifyjs.com/images/logos/v.png"
          height="34"
          contain
        />
      </v-list-item-avatar> -->

      <v-list-item-title class="title">
        Kenneth mendoza
      </v-list-item-title>
    </v-list-item>

    <v-divider class="mx-3 mb-3" />
    <v-list nav>
      <!-- Bug in Vuetify for first child of v-list not receiving proper border-radius -->
      <div />

      <v-list-item
        v-for="(link, i) in links"
        :key="i"
        :to="link.name"
        active-class="primary"
        id="item"
      >
        <v-list-item-action>
          <v-icon>{{ link.icon }}</v-icon>
        </v-list-item-action>

        <v-list-item-title v-text="link.text" />
      </v-list-item>
    </v-list>
    </v-navigation-drawer>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Emit, Watch } from 'vue-property-decorator'
@Component
export default class AppDrawer extends Vue {
  // @Prop({ required: true, type: [] }) readonly datos: [];
    public drawer: boolean = false;
    public group = null;
    public links = [
          {name: '/addProyecto', icon: 'person', text: 'Registrar proyecto'},
          {name: '/proyecto', icon: 'book', text: 'Proyecto'},
          {name: '/sgp', icon: 'book', text: 'SGP'},
      ];
    public title =  '';
    public items = ['Practics'];

    // @Watch('$route',{
    //     this.title = val.name;
    //     this.items.push(val.name);
    //   }
    // )
    mounted () {
            this.onResponsiveInverted()
            window.addEventListener('resize', this.onResponsiveInverted)
        }
    beforeDestroy () :void {
        window.removeEventListener('resize', this.onResponsiveInverted)
    }
    openTarea(){
        // this.$router.push({name: 'tarea'})
    }
    onResponsiveInverted ():void {
        if (window.innerWidth < 991) {
          if(!this.drawer){this.drawer = false}
        } else {
        this.drawer = true
        }
    }
}
</script>

<style>
    #appBar {
    width: auto;
  }
  #user {
      font-size: 15px
  }
  #item {
      text-decoration: none
  }
</style>