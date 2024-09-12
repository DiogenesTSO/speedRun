<template>
  <v-navigation-drawer
    expand-on-hover
    rail
    theme="dark"
    permanent
  >
    <v-list>
      <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
        subtitle="sandra_a88@gmailcom"
        title="Diógenes Odisi"
      ></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item prepend-icon="mdi-finance" title="Dashboard" value="myfiles"></v-list-item>
      <v-list-item prepend-icon="mdi-history" title="Histórico" value="shared"></v-list-item>
      <v-list-group value="Cadastrar">
        <template #activator="{ props }">
          <v-list-item
          v-bind="props"
          prepend-icon="mdi-account-check"
          title="Cadastrar"></v-list-item>
        </template>
        <v-list-item prepend-icon="mdi-run-fast" title="Corredores" value="fast" @click="showCorredoresForms"></v-list-item>
        <v-list-item prepend-icon="mdi-run-fast" title="Listar Corredores" value="list-fast" @click="viewCorredores"></v-list-item>
      </v-list-group>
      <v-list-item prepend-icon="mdi-timer" title="Iniciar Treino" value="starred"></v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-main>
      <v-container>
        <cadastro-corredores v-if="showCadastro" />
        <corredores-list v-if="showCorredores" />
      </v-container>
    </v-main>

</template>
<v-card>
</v-card> 

<script>
import CorredoresList from './ListarCorredores.vue';
import CadastroCorredores from './CadastrarCorredores.vue';

export default {
  name: 'menuComponent',
  components: {
    CorredoresList,
    CadastroCorredores,
  },
  data() {
    return {
      showCadastro: false, 
      showCorredores: false,
    };
  },
  methods: {
    showCorredoresForms() {
      this.showCadastro = true;
      this.showCorredores = false;
    },
    viewCorredores() {
      this.showCorredores = true;
      this.showCadastro = false;
    },
  },
}; 

</script>


