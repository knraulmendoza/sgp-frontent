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
            <v-dialog v-model="dialog" persistent scrollable max-width="900px">
              <v-card >
                <v-container>
                  <v-card-title primary-title color="secondary">
                    <v-row style="height: 40px">
                      <v-col xs="4" sm="5">
                        <h4 class="headline">Gastos</h4>
                      </v-col>
                      <v-col xs="6" sm="6" justify="end" class>
                        Codigo:
                        {{proyectoARegistrarGasto.codigo}}
                      </v-col>
                      <v-col xs="2" sm="1" justify="end" class="text-right">
                        <v-btn icon @click="dialog = false">
                          <v-icon>mdi-close</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="8">
                          <h2 class="text-center">{{proyectoARegistrarGasto.nombre}}</h2>
                        </v-col>
                        <v-col cols="12" sm="4">
                          <p
                            class="text-center"
                          >Presupuesto Aprobado: {{proyectoARegistrarGasto.presupuestoAprobadoString}}</p>
                        </v-col>
                      </v-row>

                      <v-row>
                        <v-container>
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
                    </v-container>
                  </v-card-text>
                  <v-card-actions >
                    <v-text-field
                      :rules="[validarMonto]"
                      v-model="valorGasto"
                      prepend-icon="mdi-transfer-down"
                      type="number"
                      autofocus
                      label="Valor de Gasto"
                    ></v-text-field>
                    <v-spacer></v-spacer>
                    <v-btn
                      :dark="!gastoPermitido"
                      @click="registrarGasto"
                      align="center"
                      color="green"
                      :disabled="gastoPermitido"
                    >Registrar Gasto</v-btn>
                  </v-card-actions>
                </v-container>
              </v-card>
            </v-dialog>
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
        <v-icon class="mr-2" @click="accionarGasto(item)">mdi-transfer-down</v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>