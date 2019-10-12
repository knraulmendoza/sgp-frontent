<template>
  <v-container grid-list-xs>
    <v-data-table
      :headers="headers"
      :items="proyectos"
      :search="search"
      :items-per-page="5"
      :locale="es"
      class="elevation-1"
      no-data-text="No se encontraron proyectos"
      no-results-text="No se encontraron proyectos"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Proyectos</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-row>
            
            <v-col >
              <v-text-field
                v-model="search"
                append-icon="search"
                label="Busquedá"
                single-line
                hide-details
              ></v-text-field>
            </v-col>
          </v-row>
          <v-dialog v-model="dialog" persistent scrollable max-width="900px">
            <v-card elevation="10">
              <v-card-title primary-title>
                <v-row style="height: 40px">
                  <v-col cols="12" sm="6" md="6">
                    <h3 class="headline mb-0">Registrar Proyecto</h3>
                  </v-col>
                  <v-col cols="12" sm="6" md="5" justify="end" class="text-right">
                    <p>
                      <strong>Código:</strong>
                      {{proyecto.codigo}}
                    </p>
                  </v-col>
                  <v-col md="1" justify="end" class="text-right">
                    <v-btn icon @click="dialog = false">
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row style="height: 90px;">
                    <v-col cols="12" sm="12" md="12">
                      
                      <h1 class="text-center">{{proyecto.nombre}}</h1>
                    </v-col>
                  </v-row>

                  <v-row style="height: 90px;">
                    <v-col cols="12" sm="4">
                      <v-text-field
                        hint="Ej: 1000000 sin puntos ni coma"
                        persistent-hint
                        label="Valor presupuestado"
                        type="number"
                        disabled
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-text-field
                        hint="Ej: 1000000 sin puntos ni coma"
                        persistent-hint
                        label="Presupuesto estimado del proyecto"
                        type="number"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <select
                        
                        persistent-hint
                        label="Estado"
                        :items="proyecto.estado"
                        v-model="proyecto.estado"
                        required
                      ></select>
                    </v-col>
                  </v-row>

                  <v-row justify="center">
                    <v-btn outline color="primary" rounded>Actualizar proyecto</v-btn>
                  </v-row>
                </v-container>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">edit</v-icon>
      </template>
      <template v-slot:item.verPDF="{item}">
        <!-- <v-icon small class="mr-2" @click="showPDF(item)">fas fa-file-pdf</v-icon> -->
        <v-btn color="primary" @click="showPDF(item)">
        
        </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Iproyecto } from "../interfaces/interface";
import axios from "axios";
import { AxiosResponse } from "axios";

const BASE_URL:string = "https://localhost:5001/api/proyecto";

@Component({})
export default class Proyecto extends Vue {
  proyecto: Iproyecto = <Iproyecto>{};
  headers = [
    {
      text: "",
      align: "left",
      sortable: false,
      value: "num"
    },
    { text: "Código", value: "codigo" },
    { text: "Nombre", value: "nombre" },
    { text: "Estado", value: "estado" },
    { text: "Acción", value: "action", sortable: false },
    { text: "Archivo", value: "verPDF", sortable: false }
  ];
  proyectos: Iproyecto[] = [
  ];
  editedIndex = -1;
  editedProyecto = {};
  dialog = false;
  search = "";

  editItem(item: any) {
    this.editedIndex = this.proyectos.indexOf(item);
    this.editedProyecto = Object.assign({}, item);
    this.abrirModal(item);
  }
  abrirModal(item: any) {
    this.dialog = true;
    this.proyecto = item;
  }
  showPDF(item: any){
    this.proyecto = item;
    this.getPDFProyecto(this.proyecto.id);
    
  }
  getData() {
    
    axios
      .get(BASE_URL)
      .then((response: AxiosResponse) => {
        this.proyectos = response.data.map((val: any) => ({
          codigo: val.codigo,
          nombre: val.nombre,
          estado: val.estado,
          id: val.id
        }));
      });
  }
  getPDFProyecto(id:number){
    let urlPDF:string="";
    axios.get(BASE_URL+"/"+id, { responseType: 'blob' })
      .then(({ data }) => {
        const blob = new Blob([data], { type: 'application/pdf' })
        let link = document.createElement('a')
        console.log(blob);
        urlPDF = window.URL.createObjectURL(blob)
        link.href=urlPDF
        // link.setAttribute('download','file.pdf')
        // link.download="donwload.pdf",
        link.target ="_blank"
        link.click()
        document.body.appendChild(link)
        console.log(urlPDF);
      }).catch(error => console.error(error))
      return urlPDF;
    }
  mounted() {
    this.getData();
  }
}

</script>

<style>
</style>