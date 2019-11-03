
<template>
  <v-container grid-list-xs>
    <v-data-table
        :headers="headers"
        :items="sgps"
        hide-actions
        class="elevation-1"
        select-all
        :pagination.sync="pagination"
        :item-key="id"
        :loading="true"
        :search="search"
    >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>SGP</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        
        <v-text-field
            v-model="search"
            append-icon="search"
            label="Busquedá"
            single-line
            hide-details
        ></v-text-field>
        <!-- <v-spacer></v-spacer> -->
        <v-dialog v-model="dialog" max-width="700px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">nuevo SGP</v-btn>
          </template>
          <v-card>
            <v-form v-model="valid" ref="form" :lazy-validation="lazy">
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <!-- <v-text-field v-model="sgp.archivo" label="Mes"></v-text-field> -->
                      <v-select
                        :items="meses"
                        v-model="sgp.mes"
                        label="mes"
                        :error-messages="mesErrors"
                        required
                        @input="$v.sgp.mes.$touch()"
                        @blur="$v.sgp.mes.$touch()"
                      ></v-select>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                      v-model="sgp.valor"
                      label="valor"
                      :error-messages="valorErrors"
                      type="number"
                      required
                      @input="$v.sgp.valor.$touch()"
                      @blur="$v.sgp.valor.$touch()"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <!-- <v-text-field v-model="sgp.archivoValor" label="archivo valor"></v-text-field> -->
                      <v-file-input
                      @change="obtenerArchivo($event)"
                      v-model="sgp.archivoValor"
                      hint="Ej: proyecto.pdf"
                      accept=".pdf"
                      persistent-hint
                      label="Archivo Valor"
                      :error-messages="archivoValorErrors"
                      required
                      ></v-file-input>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                      v-model="sgp.interes"
                      label="Interes"
                      :error-messages="interesErrors"
                      type="number"
                      required
                      @input="$v.sgp.interes.$touch()"
                      @blur="$v.sgp.interes.$touch()"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <!-- <v-text-field v-model="sgp.archivoInteres" label="Archivo Interes"></v-text-field> -->
                      <v-file-input
                      @change="obtenerArchivo($event)"
                      v-model="sgp.archivoInteres"
                      hint="Ej: proyecto.pdf"
                      accept=".pdf"
                      persistent-hint
                      label="Archivo Interes"
                      :error-messages="archivoInteresErrors"
                      required
                      ></v-file-input>
                    </v-col>
                  </v-row>
                </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="saveSgp" :disabled="!valid">Guardar</v-btn>
            </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ sgp }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(sgp)"
      >
        edit
      </v-icon>
      <v-icon
        small
        @click="deleteItem(sgp)"
      >
        delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
  </v-container>
</template>