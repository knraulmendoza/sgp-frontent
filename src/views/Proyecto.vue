<template>
<v-container grid-list-xs>
  <v-data-table
    :headers="headers"
    :items="proyectos"
    :search="search"
    :items-per-page=5
    :locale="es"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Proyectos</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-row>
          <v-col md="2">
            <v-select :items="filtros" label="Filtro" single-line hide-details></v-select>
          </v-col>
          <v-col md="10">
            <v-text-field
                v-model="search"
                append-icon="search"
                label="Busquedá"
                single-line
                hide-details
            ></v-text-field>
          </v-col>
        </v-row>
        <!-- <v-spacer></v-spacer> -->
        <v-dialog v-model="dialog" persistent scrollable max-width="900px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">Nuevo Proyecto</v-btn>
          </template>
          <v-card elevation="10">
            <v-card-title primary-title>
              <v-row style="height: 40px">
                <v-col cols="12" sm="6" md="6">
                  <h3 class="headline mb-0">Registrar Proyecto</h3>
                </v-col>
                <v-col cols="12" sm="6" md="5" justify="end" class="text-right">
                  <p><strong>Código: </strong> OIK_002S</p>
                </v-col>
                <v-col md="1" justify="end" class="text-right"><v-btn icon @click="dialog = false">
                    <v-icon>mdi-close</v-icon>
                  </v-btn></v-col>
              </v-row>
            </v-card-title>
            <v-card-text>
            <v-container>
              <v-form>
                  <v-row style="height: 90px;">
                <v-col cols="12" sm="12" md="12">
                  <v-text-field hint="Ej: Sistema de acueducto" persistent-hint label="Nombre" required></v-text-field>
                </v-col>
              </v-row>
              <v-row style="height: 90px;">
                <v-col cols="12" sm="6" md="6">
                  <v-text-field hint="Ej: 500" persistent-hint label="Número de familias beneficiadas" type="number" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-select hint="Ej: 500" persistent-hint :items="dimensiones" label="Dimensión" required></v-select>
                </v-col>
              </v-row>
              <v-row style="height: 90px;">
                <v-col cols="12" sm="6" md="6">
                  <v-select hint="Ej: 500" persistent-hint :items="componentes" label="Componente" required></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-select hint="Ej: 500" persistent-hint :items="estrategias" label="Estrategia" required></v-select>
                </v-col>
              </v-row>
              <v-row style="height: 90px;">
                <v-col cols="12" sm="6" md="6">
                  <v-select hint="Ej: 500" persistent-hint :items="programas" label="Programa" required></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-select hint="Ej: 500" persistent-hint :items="tiposProyectos" label="Tipo de proyecto" required></v-select>
                </v-col>
              </v-row>
              <v-row style="height: 90px;">
                <v-col cols="12" sm="12" md="12">
                  <v-select hint="Ej: Atanquez, Guatapuri" persistent-hint :items="comunidades" label="Comunidades" multiple required>
                    <template v-slot:selection="{ item, index }">
                      <v-chip>
                        <span>{{ item.text }}</span>
                      </v-chip>
                    </template>
                  </v-select>
                </v-col>
              </v-row>
              <v-row style="height: 90px;">
                <v-col cols="12" sm="6" md="3">
                  <v-select hint="Ej: sena" persistent-hint :items="componentes" label="co-financiador" required></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field hint="Ej: 1000000 sin puntos ni coma" persistent-hint label="valor" type="number" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field hint="Ej: 1000000 sin puntos ni coma" persistent-hint label="Presupuesto estimado del proyecto" type="number" required></v-text-field>
                </v-col>
              </v-row>
              <v-row justify="center" style="height: 90px;">
                <v-col cols="12" md="6" sm="12"><v-file-input hint="Ej: proyecto.pdf" persistent-hint label="Cargar documento" required></v-file-input></v-col>
              </v-row>
              </v-form>
            </v-container>
            <v-row justify="center" style="height: 90px;">
              <!-- <v-col cols="12" md="12"></v-col> -->
              <v-btn outline color="primary" rounded>Postular Proyecto</v-btn>
            </v-row>
        </v-card-text>
      </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        edit
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from 'vue-class-component';
import { Iproyecto } from "../interfaces/interface";
import { proyectoService } from "../services/proyectoService";

@Component({})
export default class Proyecto extends Vue{
  proyecto:Iproyecto = <Iproyecto>{};
  headers = [{
          text: '',
          align: 'left',
          sortable: false,
          value: 'num',
        },
        { text: 'Código', value: 'cod' },
        { text: 'Nombre', value: 'name' },
        { text: 'Documento', value: 'doc' },
        { text: 'Acción', value: 'action', sortable: false },];
  proyectos = [{cod: 'asdsaa21', name: 'Kenneth', doc: 'abrir'}];
  editedIndex = -1;
  editedProyecto = {};
  dialog = false;
  search = '';
  dimensiones = [];
  componentes = [];
  programas = [];
  comunidades = [];
  estrategias = [];
  tiposProyectos = [];
  filtros = [
    {value:0, text: 'Filtro'},
    {value: 1, text: 'Propuesto'},
    {value: 2, text: 'Viable'},
  ]
  editItem (item) {
    this.editedIndex = this.proyectos.indexOf(item)
    this.editedProyecto = Object.assign({}, item)
    this.dialog = true
  }
  mounted() {
    this.dimensiones = proyectoService.dimensiones;
    this.comunidades = proyectoService.comunidades;
    this.componentes = proyectoService.componentes;
    this.programas = proyectoService.programas;
  }
}
</script>

<style>
</style>