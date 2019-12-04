<template>
    <v-container grid-list-xs>
        <v-data-table
        :headers="headersProyecto"
        :items="proyecto"
        :search="search"
        :items-per-page="5"
        class="elevation-1 ml-2"
        no-data-text="No se encontraron transacciones"
        no-results-text="No se encontraron transacciones"
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
                                label="Búsqueda"
                                single-line
                                hide-details
                            ></v-text-field>
                        </v-col>
                   </v-row>


                <v-dialog v-model="dialog" max-width="700px">
                    <v-card>
                        <v-col cols="12" sm="6" md="6">
                        <h3 class="headline mb-0">Transacciones</h3>
                        </v-col>            
                        <v-card-text>
                            <v-data-table
                            :headers="headersTransaccion"
                            :items="transacciones"
                            class="elevation-1"
                            
                            
                        >
                        dawdwdaw
                        <template v-slot:item.tipo="{item}">
                            <span>
                                {{mostrarTipo(item.tipo)}}
                            </span>
                        </template>
                        </v-data-table>
                      
                        </v-card-text>
                        
                    </v-card>
                    
                    
                </v-dialog>
            </v-toolbar>
        </template>
        
        
        <template v-slot:item.transaccion="{item}">
            <v-icon @click="openTransaccion(item.proyectoId)">assessment</v-icon>
        </template>

        <template v-slot:item.state="{item}">
            <span>
            {{mostrarEstado(item.state)}}
            </span>
        </template>
    </v-data-table>

        
    </v-container>
    
</template>