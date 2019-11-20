<template>
  
<container>
  <v-data-table
    :headers="headersEmitirCDP"
    :items="proyectos"
    :search="search"
    :items-per-page="itemsPerPage"
    class="elevation-1 ml-2"
    no-data-text="No se encontraron proyectos"
    no-results-text="No se encontraron proyectos"
  >
    <template v-slot:top>
      <v-toolbar dark color="green">
        <v-col cols="3">
          <v-select
            v-model="estado"
            :items="itemsEstado"
            persistent-hint
            return-object
            single-line
            @change="consultarProyectos($event,1)"
          ></v-select>
        </v-col>

        <v-divider class="mx-4" inset vertical></v-divider>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Busqueda"
              single-line
              hide-details
            ></v-text-field>

        <v-row>
          <v-col>
          </v-col>
        </v-row>
        <v-dialog v-model="dialog" persistent scrollable max-width="900px">
          <v-card elevation="10">
            <v-card-title primary-title>
              <v-row style="height: 40px">
                <v-col sm="7">
                  <h3 class="headline mb-0">Asignacion de Presupuesto</h3>
                </v-col>
                <v-col sm="1">
                  <v-icon class="mr-2" sm="1">mdi-coin-outline</v-icon>                  
                </v-col>
                <v-col sm="3">                  
                  <h3 class="headline mb-0" v-text="presupuestoGeneral" ></h3>
                </v-col>
                <v-col sm="1" justify="end" class="text-right">
                  <v-btn icon @click="dialog = false">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row style="height: 40px">
                  <v-col sm="2" class="text-left">
                    <p v-text="proyecto.codigo"></p>
                  </v-col>
                  <v-col sm="7">
                    <p class="text-left" v-text="proyecto.nombre"></p>
                  </v-col>
                  <v-col sm="3">
                    <p class="text-left" v-text="proyecto.presupuestoAprovado"></p>
                  </v-col>
                </v-row>
                <v-row style="height: 90px;">
                  <v-col sm="5">
                    <v-select
                      v-model="transancionCDP.nombreFondo"
                      label ="Seleccione un fondo"
                      :items="nombresFondos()"
                      persistent-hint
                      return-object
                      single-line
                      @change="asignarValor(transancionCDP.nombreFondo)"
                    ></v-select>
                  </v-col>
                  <v-col sm="3">
                    <v-text-field
                      v-model="transancionCDP.valorFondo"
                      single-line
                      disabled
                    ></v-text-field>
                  </v-col>    
                   <v-col sm="3">
                    <v-text-field 
                      v-model="transancionCDP.valorRetirado"
                      type="number" 
                      label = "Valor a Retirar"
                      :rules="[validarMonto(proyecto.presupuestoAprovado)]"    
                      :disabled="transancionCDP.nombreFondo === undefined ? true : false"                                      
                    >
                    </v-text-field>
                  </v-col>
                   <v-col sm="1">
                    <v-icon class="mr-2"
                     @click="agregarTransancionCDP(transancionCDP)"
                     :disabled="validarBotom()"
                    >mdi-plus-circle</v-icon>
                  </v-col>                       
                </v-row>

                    <v-data-table
                      :headers="headersTransancion"
                      :items="transancionesCDP"
                      :search="search"
                      :items-per-page="itemsPerPage"
                      class="elevation-1 ml-2"
                      no-data-text="No se encontraron Transanciones"
                      no-results-text="No se encontraron Transanciones"
                    >
                       <template v-slot:item.eliminarTransancion="{ item }">
                        <v-icon class="mr-2" @click="eliminarTransancion(item)">mdi-delete-forever</v-icon>
                      </template>
                    </v-data-table>
                <v-row justify="center">
                  <v-btn color="primary" rounded @click="crearCDP(proyecto.id)">Completar CDP</v-btn>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogCDP" persistent scrollable max-width="900px">
            <template>
              <v-card elevation="10">
                <v-card-title primary-title>
                  <v-row style="height: 40px" borde="1">
                      <v-col sm="4"></v-col>
                      <v-col>
                        <v-row > </v-row>
                        <v-row > 
                            <v-col>FECHA DE VENCIMIENTO</v-col>
                            <v-col>31 DE DICIEMBRE DEL 2019</v-col>
                        </v-row>
                        <v-row >
                            <v-col>FECHA DE EXPEDICION</v-col>
                            <v-col>17 DE NOVIEMBRE DEL 2019</v-col>
                        </v-row>
                        <v-row > </v-row>
                      </v-col>
                  </v-row>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row style="height: 40px">
                      <v-col sm="2" class="text-left">
                        <p ></p>
                      </v-col>
                    </v-row>
                    <v-row style="height: 90px;">                      
                      <v-col sm="3">
                        
                      </v-col>    
                      <v-col sm="3">
                      </v-col>                    
                    </v-row>
                    <v-row justify="center">
                      <v-btn color="primary" rounded @click="crearCDP(proyecto.id)">Completar CDP</v-btn>
                    </v-row>
                  </v-container>
                </v-card-text>
              </v-card>
          </template>        
        </v-dialog>


      </v-toolbar>
    </template>
    <template v-slot:item.actionEmitirCDP="{ item }">
      <v-icon class="mr-2" @click="editItem(item)" v-if="estado==1" >mdi-note-plus</v-icon>
      <v-icon class="mr-2" @click="editItem(item)" v-if="estado==2" >mdi-eye</v-icon>
    </template>
  </v-data-table>


    <v-row align="center">
      <v-col class="text-center" cols="12" sm="4">
        <div class="my-2">
          <v-btn depressed small @click="abrirModalCDP()">Normal</v-btn>
        </div>      
      </v-col>
    </v-row>
</container>
</template>

  
