<template>
  <v-container fluid>
    <v-data-table
      :headers="headersProyectosRP"
      :items="proyectosConRP"
      :search="search"
      class="elevation-1 wrap-content"
      no-data-text="No se encontraron proyectos"
      no-results-text="No se encontraron proyectos"
    >
      <template v-slot:top>
        <v-toolbar dark color="green">
          <v-toolbar-title>Proyectos con RP</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-row>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Busqueda"
              single-line
              hide-details
            ></v-text-field>
            <v-container>
              <v-dialog v-model="dialog" persistent scrollable max-width="900px">
                <v-card>
                  <v-card-title primary-title color="secondary">
                    <v-row style="height: 40px">
                      <v-col xs="4" sm="5">
                        <h4 class="headline">Gastos</h4>
                      </v-col>
                      <v-col xs="6" sm="6" justify="end" class>
                        Codigo:
                        {{proyectoARegistrarGasto.Codigo}}
                      </v-col>
                      <v-col xs="2" sm="1" justify="end" class="text-right">
                        <v-btn icon @click="dialog = false">
                          <v-icon>mdi-close</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card-title>
                  <v-card-text>
                    <v-row>
                      <v-col cols="12" sm="8">
                        <h2 class="text-center">{{proyectoARegistrarGasto.Nombre}}</h2>
                      </v-col>
                      <v-col cols="12" sm="4">
                        <p class="text-center">
                          Presupuesto Aprobado: {{proyectoARegistrarGasto.PresupuestoAprobado | currency}}
                          Presupuesto Disponible: {{renderPresupuestoDisponible | currency}}
                        </p>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-container fluid>
                        <v-data-table
                          :headers="headersGastos"
                          :items="gastosProyecto"
                          :search="search"
                          :items-per-page="itemsPerPageGastos"
                          class="elevation-1"
                          no-data-text="El proyecto no tiene gastos"
                        ></v-data-table>
                      </v-container>
                    </v-row>
                  </v-card-text>
                  <v-card-actions>
                    <v-container fluid>
                      <v-col xs12 sm4>
                        <v-text-field
                          :rules="[validarMonto]"
                          v-model="valorGasto"
                          prepend-icon="mdi-transfer-down"
                          type="number"
                          autofocus
                          label="Valor de Gasto"
                          clearable
                          prefix="$"
                        ></v-text-field>
                      </v-col>
                      <v-col xs12 sm6>
                        <v-textarea
                          v-model="conceptoDeGasto"
                          :rules="[validarTextArea]"
                          no-resize
                          rows="2"
                          counter="100"
                          prepend-icon="mdi-file-document-edit-outline"
                          clearable
                          label="Concepto de Gasto"
                        ></v-textarea>
                      </v-col>
                      <v-col x12 sm2>
                        <v-btn
                          :dark="!gastoCorrecto"
                          @click="registrarGasto"
                          color="green"
                          justify="space-around"
                          :disabled="gastoCorrecto"
                        >Registrar Gasto</v-btn>
                      </v-col>
                    </v-container>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-container>
          </v-row>
        </v-toolbar>
      </template>
      <template slot="headerCell" slot-scope="{ header }">
        <span
          class="subheading font-weight-light text-success text--darken-3"
          v-text="header.text"
        />
      </template>
      <template v-slot:item.actionDeGasto="{ item }">
        <v-icon
          color="blue-grey darken-2"
          class="mr-2"
          @click="accionarGasto(item)"
        >mdi-transfer-down</v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>