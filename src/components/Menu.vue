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
        subtitle="Diogenes@gmailcom"
        title="Diógenes Odisi"
      ></v-list-item>
    </v-list> 

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item prepend-icon="mdi-finance" title="Dashboard" value="myfiles" @click="$router.push('/home/dashboard')"></v-list-item>
      <v-list-item prepend-icon="mdi-history" title="Histórico" value="shared"></v-list-item>
      <v-list-group value="Cadastrar">
        <template #activator="{ props }">
          <v-list-item
          v-bind="props"
          prepend-icon="mdi-account-check"
          title="Cadastrar"></v-list-item>
        </template>
        <v-list-item prepend-icon="mdi-run-fast" title="Corredores" value="fast" @click="$router.push('/home/cadastro-corredores')"></v-list-item>
        <v-list-item prepend-icon="mdi-view-list" title="Listar Corredores" value="list-fast" @click="$router.push('/home/listar-corredores')"></v-list-item>
      </v-list-group>
      <v-list-item prepend-icon="mdi-update" title="Interface de Controles" value="starred"></v-list-item>
      <v-list-item prepend-icon="mdi-calendar-edit" title="Gestão de Eventos" value="starred" @click="$router.push('/home/eventos')"></v-list-item>
    </v-list>

    <v-spacer></v-spacer>
    <v-list>
      <v-list-item prepend-icon="mdi-logout" title="Sair" @click="logout"></v-list-item>
    </v-list>

  </v-navigation-drawer>

    <v-main>
      <router-view></router-view>  
    </v-main>

</template>

<script>

export default {
  name: 'menuComponent',
  data() {
    return {
      showDashboard: false,
      showCadastro: false, 
      showCorredores: false,
      showEventos: false,
    };
  },
  methods: {
    viewDashboard() {
      this.showDashboard = true;
      this.showCadastro = false;
      this.showCorredores = false;
      this.showEventos = false;
    },
    showCorredoresForms() {
      this.showCadastro = true;
      this.showCorredores = false;
      this.showDashboard = false;
      this.showEventos = false;
    },
    viewCorredores() {
      this.showCorredores = true;
      this.showCadastro = false;
      this.showDashboard = false;
      this.showEventos = false;
    },
    viewEventos() {
      this.showEventos = true;
      this.showCorredores = false;
      this.showCadastro = false;
      this.showDashboard = false;
    },
    logout() {
      this.$router.push('/');
    }
  },
}; 

</script>


