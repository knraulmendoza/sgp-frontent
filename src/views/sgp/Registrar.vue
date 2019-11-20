
<template>
  <v-container grid-list-xs> <!-- slot-scope="{invalid}" esto es para qué el boton registrar habilitar o deshabilitar -->
    <v-data-table
        :headers="headers"
        :items="sgps"
        class="elevation-1"
        show-select
        :search="search"
    >
    <template v-slot:top>
      <v-toolbar dark color="green">
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
            <v-form  enctype="multipart/form-data" v-model="valid" ref="form" :lazy-validation="lazy">
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-select
                        v-model="mesDato"
                        :items="meses"
                        @change="obtenerMes($event)"
                        :rules="sgpValidaciones.mes"
                        label="mes"
                        required
                      ></v-select>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                        <v-text-field
                        v-model.lazy="valor"
                        v-money="money"
                        label="valor"
                        :rules="sgpValidaciones.valor"
                        required
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                        <v-file-input
                        @change="obtenerArchivoValor($event)"
                        ref="archivoValor"
                        :rules="sgpValidaciones.soporteValor"
                        hint="Ej: proyecto.pdf"
                        accept=".pdf"
                        persistent-hint
                        label="Archivo Valor"
                        required
                        ></v-file-input>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                        <v-text-field
                        v-model.lazy="interes"
                        v-money="money"
                        label="Interes"
                        :rules="sgpValidaciones.interes"
                        required
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                        <v-file-input
                        @change="obtenerArchivoInteres($event)"
                        hint="Ej: proyecto.pdf"
                        ref="archivoInteres"
                        :rules="sgpValidaciones.soporteInteres"
                        accept=".pdf"
                        persistent-hint
                        label="Archivo Interes"
                        required
                        ></v-file-input>
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
              <v-btn color="blue darken-1" text @click="saveSgp" :disabled="!valid">Guardar</v-btn>
            </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary">Reset</v-btn>
    </template>
    <template v-slot:item.valor =" {item}">
      {{item.valor | currency}}
    </template>
    <template v-slot:item.interes =" {item}">
      {{item.interes | currency}}
    </template>
    <template v-slot:item.fecha="{ item }">
      <!-- <span>{{showMmeses.find((mes)=>{ return mes.value === item.fecha.getMonth()+1})}}</span> -->
      <span>{{item.fecha.getMonth()}}</span>
    </template>
    <template v-slot:item.soporteValor="{item}" class="text-center">
      <v-icon large @click="showPDFValor(item)" color="red">mdi-file-pdf-box</v-icon>
    </template>
    <template v-slot:item.soporteInteres="{item}">
      <v-icon large @click="showPDFInteres(item)" color="red">mdi-file-pdf-box</v-icon>
    </template>
  </v-data-table>
  </v-container>
</template>