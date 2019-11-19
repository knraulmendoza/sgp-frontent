<template>
    <v-container>
        <v-data-table
            :headers="headersProyectosRP"
            :items="renderProyectosPorEstado"
            :search="search"
            class="elevation-1 wrap-content"
            no-data-text="No se encontraron proyectos"
            no-results-text="No se encontraron proyectos"
        >
            <template v-slot:top>
                <v-toolbar dark color="green">
                    <v-toolbar-title>Proyectos Contratados</v-toolbar-title>
                    <v-divider vertical class="mx-6"></v-divider>
                    <v-row>
                        <v-text-field
                            v-model="search"
                            append-icon="search"
                            label="Búsqueda"
                            single-line
                            hide-details
                        ></v-text-field>
                        <v-container>
                            <v-dialog
                                v-model="dialog"
                                persistent
                                scrollable
                                max-width="900px"
                            >
                                <v-card>
                                    <v-card-title
                                        primary-title
                                        color="secondary"
                                    >
                                        <v-row style="height: 40px">
                                            <v-col xs="4" sm="5">
                                                <h4 class="headline">Gastos</h4>
                                            </v-col>
                                            <v-col
                                                xs="6"
                                                sm="6"
                                                justify="end"
                                                class
                                            >
                                                Codigo:
                                                {{
                                                    proyectoARegistrarGasto.codigo
                                                }}
                                            </v-col>
                                            <v-col
                                                xs="2"
                                                sm="1"
                                                justify="end"
                                                class="text-right"
                                            >
                                                <v-btn
                                                    icon
                                                    @click="dialog = false"
                                                >
                                                    <v-icon>mdi-close</v-icon>
                                                </v-btn>
                                            </v-col>
                                        </v-row>
                                    </v-card-title>
                                    <v-card-text>
                                        <v-row>
                                            <v-col cols="12" sm="8">
                                                <h2 class="text-center">
                                                    {{
                                                        proyectoARegistrarGasto.nombre
                                                    }}
                                                </h2>
                                            </v-col>
                                            <v-col cols="12" sm="4">
                                                <p class="text-center">
                                                    Presupuesto Aprobado:
                                                    {{
                                                        proyectoARegistrarGasto.presupuestoAprobado
                                                            | currency
                                                    }}
                                                    Presupuesto Ejecutado:
                                                    {{
                                                        proyectoARegistrarGasto.presupuestoEjecutado
                                                            | currency
                                                    }}
                                                    Presupuesto Disponible:
                                                    {{
                                                        renderPresupuestoDisponible
                                                            | currency
                                                    }}
                                                </p>
                                            </v-col>
                                        </v-row>

                                        <v-row>
                                            <v-container fluid>
                                                <v-data-table
                                                    :headers="headersGastos"
                                                    :items="gastosProyecto"
                                                    :search="search"
                                                    :sort-by="['fecha']"
                                                    :sort-desc="[true]"
                                                    :items-per-page="
                                                        itemsPerPageGastos
                                                    "
                                                    class="elevation-1"
                                                    no-data-text="El proyecto no tiene gastos"
                                                    ><template
                                                        v-slot:item.fecha="{
                                                            item
                                                        }"
                                                    >
                                                        <span>{{
                                                            item.fecha.getDate() + " - " + (item.fecha.getMonth() + 1) + " - " + item.fecha.getFullYear()
                                                        }}</span>
                                                    </template>
                                                    <template
                                                        v-slot:item.monto="{
                                                            item
                                                        }"
                                                    >
                                                        <span>{{
                                                            parseFloat(
                                                                item.monto
                                                            ) | currency
                                                        }}</span>
                                                    </template>
                                                </v-data-table>
                                            </v-container>
                                        </v-row>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-container fluid>
                                            <v-col xs12 sm4>
                                                <v-text-field
                                                    :rules="[validarMonto]"
                                                    v-money="money"
                                                    v-model.lazy="valorGasto"
                                                    prepend-icon="mdi-transfer-down"
                                                    autofocus
                                                    label="Valor de Gasto"
                                                    clearable
                                                    prefix="$"
                                                ></v-text-field>
                                            </v-col>
                                            <v-col xs12 sm6>
                                                <v-textarea
                                                    v-model="conceptoDeGasto"
                                                    :rules="[validarTextArea]"
                                                    no-resize
                                                    rows="2"
                                                    counter="100"
                                                    prepend-icon="mdi-file-document-edit-outline"
                                                    clearable
                                                    label="Concepto de Gasto"
                                                ></v-textarea>
                                            </v-col>
                                            <v-col x12 sm2>
                                                <v-btn
                                                    :dark="!gastoCorrecto"
                                                    @click="registrarGasto"
                                                    color="green"
                                                    justify="space-around"
                                                    :disabled="gastoCorrecto"
                                                    >Registrar Gasto</v-btn
                                                >
                                            </v-col>
                                        </v-container>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-container>
                    </v-row>
                </v-toolbar>
            </template>
            <template slot="headerCell" slot-scope="{ header }">
                <span
                    class="subheading font-weight-light text-success text--darken-3"
                    v-text="header.text"
                />
            </template>
            <template v-slot:item.actionDeGasto="{ item }">
                <v-icon
                    color="blue-grey darken-2"
                    class="mr-2"
                    @click="accionarGasto(item)"
                    >mdi-transfer-down</v-icon
                >
            </template>
            <template v-slot:item.presupuestoAprobado="{ item }">
                <span>{{
                    parseFloat(item.presupuestoAprobado) | currency
                }}</span>
            </template>
        </v-data-table>
    </v-container>
</template>
