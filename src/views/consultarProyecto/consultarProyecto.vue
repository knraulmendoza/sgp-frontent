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
        <v-toolbar-title>Proyectos</v-toolbar-title>
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
        <v-dialog v-model="dialog" persistent scrollable max-width="900px">
          <v-card elevation="10">
            <v-card-title primary-title>
              <v-row style="height: 40px">
                <v-col cols="12" sm="6" md="6">
                  <h3 class="headline mb-0">Modificar Proyecto</h3>
                </v-col>
                <v-col cols="12" sm="6" md="5" justify="end" class="text-right">
                  <p>
                    <strong>Código:</strong>
                    {{propuesta.codigo}}
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
                    <h1 class="text-center">{{propuesta.nombre}}</h1>
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
                      :items="propuesta.estado"
                      v-model="propuesta.estado"
                      required
                    ></select>
                  </v-col>
                </v-row>

                <v-row justify="center">
                  <v-btn color="primary" rounded>Actualizar proyecto</v-btn>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogAprobarPropuesta" persistent scrollable max-width="900px">
          <v-card elevation="10">
            <v-card-title primary-title>
              <v-row style="height: 40px">
                <v-col cols="12" sm="6" md="6">
                  <h3 class="headline mb-0">Modificar Proyecto</h3>
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
                      :items="propuesta.estado"
                      v-model="propuesta.estado"
                      required
                    ></select>
                  </v-col>
                </v-row>

                <v-row justify="center">
                  <v-btn color="primary" rounded>Actualizar proyecto</v-btn>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon class="mr-2" @click="editItem(item)">edit</v-icon>
    </template>
    <template v-slot:item.verPDF="{item}">
      <v-icon large @click="showPDF(item)">mdi-file-pdf-box</v-icon>
    </template>
    <template v-slot:item.actionAprobarPropuesta="{item}">
      <v-icon large @click="aprobarPropuesta(item)">mdi-file-pdf-box</v-icon>
    </template>
  </v-data-table>
</template>