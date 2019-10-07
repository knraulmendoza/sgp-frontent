<template>
  <v-container grid-list-xs>
    <v-card>
      <v-card-title>
        <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="desserts" :search="search"></v-data-table>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
@Component
export default class ConsultarProyectos extends Vue {
  public name = "kenneth" as string;
  mounted() {}
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Proyectos viables",
          align: "left",
          filterable: false,
          value: "name"
        },
        { text: "Codigo", value: "codigo" },
        { text: "Nombre", value: "nombre" },
        { text: "Estado", value: "estado" },
        { text: "Archivo", value: "archivo" }
      ],
      desserts: []
    };
  }
}
</script>

<style>
</style>