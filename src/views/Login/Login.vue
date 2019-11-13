<template>
  <v-container bg fill-height grid-list-md text-xs-center align-center>
    <v-col align-center>
        <v-row
          align="center"
          justify="center"
          class="grey lighten-5"
          style="height: 600px;"
        >
          <v-card class="elevation-12" width="500px">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title justify-center>Login</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  label="Login"
                  name="login"
                  prepend-icon="person"
                  type="text"
                ></v-text-field>

                <v-text-field
                  id="password"
                  label="Password"
                  name="password"
                  prepend-icon="lock"
                  :append-icon="showPassword?'visibility':'visibility_off'"
                  :type="showPassword? 'text':'password'"
                  @click:append="showPassword = !showPassword"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="openHome()">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-row>
      </v-col>
  </v-container>
</template>