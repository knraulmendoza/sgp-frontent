<template>
  <v-container grid-list-xs>
      <v-card>
        <v-card-media src="src" height="200px">
        </v-card-media>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">headline</h3>
            <div>description</div>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat color="primary">text</v-btn>
          <v-btn flat color="primary">text</v-btn>
        </v-card-actions>
      </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
@Component
export default class RegistrarProyecto extends Vue {
  public name = 'kenneth' as string;
}
</script>

<style>

</style>