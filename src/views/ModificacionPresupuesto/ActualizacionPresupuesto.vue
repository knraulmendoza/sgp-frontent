<template>  
<div >
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
          <div id="pdf">
            <v-card elevation="10">
              <v-card-title primary-title>
                <v-row style="height: 40px">
                  <v-col sm="6">
                    <h3 class="headline mb-0">Asignacion de Presupuesto</h3>
                  </v-col>
                  <v-col sm="1">
                    <v-icon class="mr-2" sm="1">mdi-coin-outline</v-icon>                  
                  </v-col>
                  <v-col sm="4">                  
                    <h3 class="headline mb-0" >{{presupuestoGeneral | currency}}</h3>
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
                      <p v-text="proyecto.id"></p>
                    </v-col>
                    <v-col sm="7">
                      <p class="text-left" v-text="proyecto.nombre"></p>
                    </v-col>
                    <v-col sm="3">
                      <p class="text-left">{{proyecto.presupuestoAprobado | currency}}</p>
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
                      <v-currency-field
                        v-model="transancionCDP.valorFondo"
                        single-line
                        disabled
                      ></v-currency-field>
                    </v-col>    
                    <v-col sm="3">
                      <v-currency-field 
                        v-model="transancionCDP.valorRetirado"
                        type="number" 
                        label = "Valor a Retirar"
                        :rules="[validarMonto(proyecto.presupuestoAprovado)]"    
                        :disabled="transancionCDP.nombreFondo === undefined ? true : false"                                      
                      >
                      </v-currency-field>
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
                        <template v-slot:item.valorFondo="{ item }">
                            <span>{{
                                parseFloat(item.valorFondo) | currency
                            }}</span>
                        </template>
                        <template v-slot:item.valorRetirado="{ item }">
                            <span>{{
                                parseFloat(item.valorRetirado) | currency
                            }}</span>
                        </template>
                        <template v-slot:item.eliminarTransancion="{ item }">
                          <v-icon class="mr-2" @click="eliminarTransancion(item)">mdi-delete-forever</v-icon>
                        </template>
                      </v-data-table>
                  <v-divider class="mx-4"></v-divider>
                  <v-card-actions>
                    <v-row justify="center">
                      <v-btn 
                        color="primary" 
                        rounded 
                        @click="crearCDP(proyecto.id)"
                        :disabled="transancionesCDP.length==0?true:false"
                      >Completar CDP</v-btn>
                    </v-row>
                  </v-card-actions>
                </v-container>
              </v-card-text>
            </v-card>
          </div>
        </v-dialog>

        <v-dialog v-model="dialogCDP" persistent scrollable max-width="900px">
            <template>
              <v-card elevation="10" border="5">
                <v-card-title primary-title>
                  <v-row style="height:90px">
                      <v-col sm="5" ></v-col> 
                      <v-col sm="6">
                        <v-row >
                          <v-col>
                          </v-col>
                        </v-row>
                        <v-row style="height: 30px"> 
                            <v-col sm="6"><p class="subtitle-2 text-left">FECHA DE VENCIMIENTO:</p></v-col>
                            <v-col sm="6">
                              <p
                                class="subtitle-2 text-left"
                                v-text="fechaVencimiento" 
                              >31 DE DICIEMBRE DEL 2019</p>
                            </v-col>
                        </v-row>
                        <v-row >
                            <v-col><p class="subtitle-2 text-left" >FECHA DE EXPEDICION:</p></v-col>
                            <v-col>
                              <p
                                class="subtitle-2 text-left"
                                v-text="fechaExpedicion"
                              ></p>
                            </v-col>
                        </v-row>
                      </v-col>
                       <v-col sm="1" justify="end" class="text-right">
                        <v-btn icon @click="dialogCDP = false">
                          <v-icon>mdi-close</v-icon>
                        </v-btn>
                      </v-col>
                  </v-row>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row style="height: 50px">
                      <v-col sm="12" class="text-left text-center">
                        <p class="title"  >CERTIFICADO DE DISPONIBILIDAD PRESUPUESTAL</p>
                      </v-col>
                    </v-row>
                    <v-row style="height: 50px;">                      
                      <v-col sm="8">
                        <p class="text-left text-left">UNIDAD EJECUTORA: RESGUARDO INDIGENA KANKUAMO</p>
                      </v-col>    
                      <v-col sm="4">
                        <P class="text-left text-right">VIGENCIA FISCAL 2019</P>
                      </v-col>                    
                    </v-row>
                    <v-row style="height: 50px;">                      
                      <v-col sm="4">
                        <p class="text-left text-center">PROYECTO DE INVERSION</p>
                      </v-col>    
                      <v-col sm="8">
                        <P class="text-left text-center">SKK-0HW-OAA7A</P>
                      </v-col>                    
                    </v-row>
                    <v-row style="height: 90px;">                      
                      <v-col sm="4">
                        <p class="text-left text-center">NOMBRE DEL PROYECTO</p>
                      </v-col>    
                      <v-col sm="8">
                        <P>The v-img component is packed with features to support rich media. Combined with the vuetify-loader, you can add dynamic progressive images to provide a better user experience.</P>
                      </v-col>                    
                    </v-row>
                    <v-row >                      
                      <v-col sm="4">
                        <p class="text-left text-center">VALOR TOTAL DEL CDP</p>
                      </v-col>    
                      <v-col sm="8">
                        <P class="text-left text-center">CIENTO CIENTO CIEUNTA MIL MILLONES DE PESO</P>
                        <P class="text-left text-center">(1.1.1.1.1.1.)</P>
                      </v-col>                    
                    </v-row>
                    <v-row >                      
                      <v-col sm="12">
                        <p class="text-left text-center">The v-img component is packed with features to support rich media. Combined with the vuetify-loader, you can add dynamic progressive images to provide a better user experience.</p>
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
    <template v-slot:item.presupuestoAprobado="{ item }">
        <span>{{
            parseFloat(item.presupuestoAprobado) | currency
        }}</span>
    </template>
    <template v-slot:item.actionEmitirCDP="{ item }">
      <v-icon class="mr-2" @click="editItem(item)" v-if="estado==1" >mdi-note-plus</v-icon>
      <v-icon class="mr-2" @click="editItem(item)" v-if="estado==2" >mdi-eye</v-icon>
    </template>
  </v-data-table>

</div>
</template>

  
