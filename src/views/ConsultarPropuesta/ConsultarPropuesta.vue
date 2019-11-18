<template>
  <v-data-table
    :headers="headers"
    :items="propuestas"
    :search="search"
    :items-per-page="itemsPerPage"
    class="elevation-1 ml-2"
    no-data-text="No se encontraron proyectos"
    no-results-text="No se encontraron proyectos"
  >
    <template v-slot:top>
      <v-toolbar dark color="green">
        <v-toolbar-title>Propuestas</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-row>
          <v-col>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Busqueda"
              single-line
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>
        <v-dialog v-model="dialogAprobarPropuesta" persistent scrollable max-width="900px">
          <v-card elevation="10">
          <v-form v-model="valid" ref="form" :lazy-validation="lazy"> 
            <v-card-title primary-title>
              <v-row style="height: 40px">
                <v-col cols="12" sm="6" md="6">
                  <h3 class="headline mb-0">Registrar Proyecto</h3>
                </v-col>
                <v-col cols="12" sm="6" md="5" justify="end" class="text-right">
                  <p>
                    <strong>Código:</strong>
                    {{propuesta.codigo}}
                  </p>
                </v-col>
                <v-col md="1" justify="end" class="text-right">
                  <v-btn icon @click="dialogAprobarPropuesta = false">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row style="height: 90px;">
                  <v-col cols="12" sm="12" md="12">
                    <h1 class="text-center">{{propuesta.nombre}}</h1>
                  </v-col>
                </v-row>
                <v-row> 
                <v-col cols="12" sm="6" md="6">
                <v-select hint="Ej: 500" persistent-hint label="Dimensión" :rules="validacionProyecto.dimension" :items="dimensiones"
                  @change="select(1,$event)"
                  required
                >
                </v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="6">
                <v-select
                  hint="Ej: 500"
                  :rules="validacionProyecto.componente"
                  persistent-hint
                  label="Componente"
                  :items="componentes"
                  @change="select(2,$event)"
                  required
                ></v-select>
                 </v-col>
                 </v-row>

                  <v-row>
                  <v-col cols="12" sm="6" md="6">
                <v-select
                  hint="Ej: 500"
                  persistent-hint
                  label="Estrategia"
                   :items="estrategias"
                   :rules="validacionProyecto.estrategia"
                  @change="select(3,$event)"
                  required
                ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="6">
                <v-select
                  hint="Ej: 500"
                  persistent-hint
                  label="Programa"
                   :items="programas"
                   v-model="proyecto.programaId"
                   :rules="validacionProyecto.programa"
                  required
                ></v-select>
                 </v-col>
                 </v-row>


                 <v-row>
                  <v-col cols="12" sm="6" md="6">
             

                 <v-combobox
                :items="comunidades"
                label="Comunidad"
                v-model="proyecto.comunidadId"
                :rules="validacionProyecto.comunidad"
                multiple
              ></v-combobox> 
                 </v-col>
                 <v-col cols="12" sm="6" md="6">
                <v-text-field
                  :rules="validacionProyecto.presupuestoAprobado"
                  hint="Ej: 1000000,95"
                  persistent-hint
                   v-model="presupuesto"
                   v-money="money"
                  label="Presupuesto Aprobado"
                
                  ></v-text-field>
                 </v-col>
                 </v-row>
               
                <v-row justify="center">
                  <v-btn color="primary" :disabled="!valid" @click="registrarProyecto()" rounded>Actualizar proyecto</v-btn>
                </v-row>
              </v-container>
            </v-card-text>
          </v-form>
          </v-card>
         
        </v-dialog>
      </v-toolbar>
    </template>
    
    <template v-slot:item.verPDF="{item}">
      <v-icon large @click="showPDF(item) " color="red">mdi-file-pdf-box</v-icon>
    </template>
    <template v-slot:item.actionAprobarPropuesta="{item}">
      <v-icon large @click="aprobarPropuesta(item)" color="green">mdi-check</v-icon>
    </template>
  </v-data-table>
</template>