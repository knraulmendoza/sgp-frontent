
<template>
<ValidationObserver ref="obs">
  <v-container grid-list-xs slot-scope="{ invalid}"> <!-- slot-scope="{invalid}" esto es para qué el boton registrar habilitar o deshabilitar -->
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
                      <validation-provider rules="required" v-slot="{ errors, valid }" name="sgp.valor">
                        <!-- este componente es el que se encarga de la respectiva validacion -->
                      <v-select
                        :items="meses"
                        v-model="mes"
                        :success="valid"
                        :error-messages="errors"
                        label="mes"
                        required
                      ></v-select>
                      <!-- :error-messages => para mostrar el error ; :success => lo muestra en verde (esta correcto)-->
                      </validation-provider>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <validation-provider rules="required" v-slot="{ errors, valid }" name="sgp.valor">
                        <v-text-field
                        v-model="sgp.valor"
                        label="valor"
                        type="number"
                        :counter="10"
                        :success="valid"
                        :error-messages="errors"
                        required
                        ></v-text-field>
                      </validation-provider>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <validation-provider rules="required" v-slot="{ errors, valid }" name="archivoValor">
                        <v-file-input
                        @change="obtenerArchivoValor($event)"
                        hint="Ej: proyecto.pdf"
                        accept=".pdf"
                        persistent-hint
                        label="Archivo Valor"
                        :valid="valid"
                        :error-messages="errors"
                        required
                        ></v-file-input>
                      </validation-provider>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <validation-provider rules="required" v-slot="{ errors, valid }" name="sgp.interes">
                        <v-text-field
                        v-model="sgp.interes"
                        label="Interes"
                        :success="valid"
                        :error-messages="errors"
                        type="number"
                        required
                        ></v-text-field>
                      </validation-provider>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <validation-provider rules="required" v-slot="{ errors, valid }" name="sgp.soporteInteres">
                        <v-file-input
                        @change="obtenerArchivoInteres($event)"
                        hint="Ej: proyecto.pdf"
                        :success="valid"
                        :error-messages="errors"
                        accept=".pdf"
                        persistent-hint
                        label="Archivo Interes"
                        required
                        ></v-file-input>
                      </validation-provider>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-textarea 
                        name="input-7-1"
                        label="Descripción"
                        v-model="sgp.descripcion"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="saveSgp" :disabled="invalid">Guardar</v-btn> <!-- :diabled="invalid" la varibale es la misma que esta en la Card-->
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
  </ValidationObserver>
</template>