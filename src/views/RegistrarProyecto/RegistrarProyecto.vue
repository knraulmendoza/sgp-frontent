<template>
  <v-container grid-list-xs>
    
    <v-alert v-if="registrado=='exitoso'" type="succes">
        Registro Exitoso!!!
      </v-alert>
      <v-alert v-if="registrado=='error'" type="error">
        Ah ocurrido un error!!!
      </v-alert>
    <v-card elevation="10">
      <v-card-title primary-title>
        <v-row style="height: 40px">
          <v-col cols="12" sm="6" md="6">
            <h3 class="headline mb-0">Registrar Propuesta</h3>
          </v-col>

          <v-col cols="12" sm="6" md="5" justify="end" class="text-right">
            <p>
              <strong>Código:</strong>
              {{codigoGenerado}}
            </p>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text>
        
          <v-form enctype="multipart/form-data" v-model="valid" ref="form" id="form"  :lazy-validation="lazy">
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-text-field
                  hint="Ej: Sistema de acueducto"
                  persistent-hint
                  label="Nombre"
                  v-model="propuesta.nombre"
                  required
                  :rules="validacionPropuesta.Nombre"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
             

              <v-col cols="12" sm="6" md="6">
                <v-text-field
                v-model="propuesta.numeroDeFamilias"
                  hint="Ej: 500"
                  persistent-hint
                  label="Número de familias beneficiadas"
                  type="number"
                  required
                  :rules="validacionPropuesta.NumeroDeFamilia"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  hint="Ej: 1000000,43"
                  prefix="$"
                  v-model="propuesta.presupuestoEstimado"
                  persistent-hint
                  label="Presupuesto estimado del proyecto"
                  type="number"
                  required
                  :rules="validacionPropuesta.presupuestoEstimado"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col cols="12" md="12" sm="8">

                 <v-file-input
                  @change="obtenerArchivo($event)"
                  hint="Ej: proyecto.pdf"              
                  accept=".pdf"
                  persistent-hint
                  :rules="validacionPropuesta.Documento"
                  label="Cargar documento"
                  required
                ></v-file-input> 
               
              </v-col>
              <!-- <input type="file" @change="obtenerArchivo" class="form-control-file"> -->
            </v-row>

            <v-row justify="center">
              <v-col cols="12" md="12">
                <v-btn outlined color="primary"  rounded
                :disabled="!valid"
                 @click="guardarProyecto"
                >Postular Proyecto</v-btn>

                <v-btn color="warning" @click="resetValidation" rounded>
                Limpiar
                </v-btn>
              
              </v-col>
         <v-col cols="12" md="12">
          
              </v-col>

            </v-row>
            </v-container>
          </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>