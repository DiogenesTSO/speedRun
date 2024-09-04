<template>
  <v-card>
    <v-tabs
      v-model="tab"
      align-tabs="center"
      bg-color="deep-purple-accent-2"
      stacked
    >
      <v-tab value="tab-1">
        <v-icon icon="mdi-finance"></v-icon>

        Dashbord
      </v-tab>

      <v-tab value="tab-2">
        <v-icon icon="mdi-history"></v-icon>

        Histórico
      </v-tab>

      <v-tab value="tab-2">
        <v-icon icon="mdi-account-check"></v-icon>

        Cadastrar
      </v-tab>

      <v-tab value="tab-3">
        <v-icon icon="mdi-run-fast"></v-icon>

        Iniciar Treino
      </v-tab>
    </v-tabs>
  </v-card>
</template>

<script>

export default {
  name: 'menuComponent',
}

</script>

