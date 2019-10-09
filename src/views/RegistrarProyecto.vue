<template>
  <v-container>
      <v-card elevation="10">
        <v-card-media src="src" height="200px">
        </v-card-media>
        <v-card-title primary-title>
          <v-row>
                <v-col cols="12" sm="6" md="6">
                  <h3 class="headline mb-0">Registrar Proyecto</h3>
                </v-col>
                <v-col cols="12" sm="6" md="6" justify="end" class="text-right">
                  <p><strong>Código: </strong> OIK_002S</p>
                </v-col>
              </v-row>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-text-field  label="Nombre del proyecto"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field  label="Número de familias beneficiadas"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-select :items="dimensiones" label="Dimensiones"></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field  label="telefono"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field label="ciudad"></v-text-field>
              </v-col>
            </v-row>
            <v-row justify="end">
              <!-- <v-col cols="12" md="12"></v-col> -->
              <v-btn outline color="primary" rounded>Registrar</v-btn>
            </v-row>
            <v-text-field label="ciudad" cols="12" md="4"></v-text-field>
            <v-text-field label="ciudad" cols="12" md="4"></v-text-field>
            <v-text-field label="ciudad" cols="12" md="4"></v-text-field>
          </v-container>
        </v-card-text>
      </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({})
export default class RegistrarProyecto extends Vue {
  dimensiones = [
    {value: 1, text: 'Consolidación territorial del pueblo indígena kankuamo para la protección de la madre naturaleza'}
  ]
}
</script>

<style>

</style>