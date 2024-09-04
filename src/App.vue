<template>
  <v-app>
    <v-main>
      <Menu/>
    </v-main>
  </v-app>
</template>

<script>
import Menu from './components/Menu.vue'

export default {
  name: 'App',

  components: {
    Menu,
  },

  data: () => ({
    //
  }),
}
</script>
