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
                  v-model="proyecto.Nombre"
                  required
                  :rules="rules.proyecto.Nombre"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                v-model="proyecto.NumeroDeFamilia"
                  hint="Ej: 500"
                  persistent-hint
                  label="Número de familias beneficiadas"
                  type="number"
                  required
                  :rules="rules.proyecto.NumeroDeFamilia"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  hint="Ej: 1000000,43"
                  prefix="$"
                  v-model="proyecto.PresupuestoEstimado"
                  persistent-hint
                  label="Presupuesto estimado del proyecto"
                  type="number"
                  required
                  :rules="rules.proyecto.presupuestoEstimado"
                ></v-text-field>
              </v-col>
              <!-- <v-col cols="12" sm="6" md="6">
                <v-select
                  hint="Ej: 500"
                  persistent-hint
                  :items="dimensiones"
                  v-model="proyecto.dimension"
                  @change="select(1,$event)"
                  label="Dimensión"
                  required
                  :rules="rules.proyecto.dimension"
                ></v-select>
              </v-col> -->
            </v-row>
            <!-- <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-select
                  hint="Ej: 500"
                  persistent-hint
                  label="Componente"
                  :disabled="proyecto.dimension==0"
                  required
                  @change="select(2,$event)"
                  :item="componentes"
                  v-model="proyecto.componente"
                  :rules="rules.proyecto.componente"
                />
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-select
                  hint="Ej: 500"
                  persistent-hint
                  @change="select(3,$event)"
                  :items="estrategias"
                  v-model="proyecto.estrategia"
                  :disabled="proyecto.componente==0"
                  label="Estrategia"
                  required
                  :rules="rules.proyecto.estrategia"
                ></v-select>
              </v-col>
            </v-row> -->
            <!-- <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-select
                  hint="Ej: 500"
                  persistent-hint
                  :items="programas"
                  v-model="proyecto.programa"
                  label="Programa"
                  :disabled="proyecto.estrategia==0"
                  required
                  :rules="rules.proyecto.programa"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-select
                  hint="Ej: Atanquez, Guatapuri"
                  persistent-hint
                  :items="comunidades"
                  v-model="proyecto.comunidades"
                  label="Comunidades"
                  multiple
                  required
                  :rules="rules.proyecto.comunidades"
                >
                  <template v-slot:selection="{ item, index }">
                    <v-chip>
                      <span>{{ item.text }}</span>
                    </v-chip>
                  </template>
                </v-select>
              </v-col>
            </v-row> -->

            <!-- <v-row >
              <v-col cols="12" sm="3" md="3">
                <v-select
                  hint="Ej: sena"
                  persistent-hint
                  :items="cofinanciamiento"
                  v-model="proyecto.cofinanciador"
                  label="co-financiador"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="3" md="3">
                <v-text-field
                  hint="Ej: 1000000,43"
                  v-model="proyecto.valorCofinanciador"
                  persistent-hint
                  label="valor"
                  type="number"
                  :disabled="!proyecto.cofinanciador>0"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  hint="Ej: 1000000,43"
                  v-model="proyecto.PresupuestoEstimado"
                  persistent-hint
                  label="Presupuesto estimado del proyecto"
                  type="number"
                  required
                  :rules="rules.proyecto.presupuestoEstimado"
                ></v-text-field>
              </v-col>
            </v-row> -->
            <v-row justify="center">
              <v-col cols="12" md="12" sm="8">

                 <v-file-input
                  @change="obtenerArchivo($event)"
                  v-model="proyecto.documento"
                  hint="Ej: proyecto.pdf"              
                  accept=".pdf"
                  persistent-hint
                  label="Cargar documento"
                  required
                  :error-messages="validarDocumento"
                ></v-file-input> 
               
              </v-col>
              <!-- <input type="file" @change="obtenerArchivo" class="form-control-file"> -->
            </v-row>

            <v-row justify="center">
              <v-col cols="12" md="12">
                <v-btn outlined color="primary"  rounded
                :disabled="!valid"
                 @click="validate"
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