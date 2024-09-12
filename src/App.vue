<template>
  <v-app>
    <v-main>
      <CustomMenu />
    </v-main>
  </v-app>
</template>

<script>
import CustomMenu from './components/Menu.vue'

export default {
  name: 'App',

  components: {
    CustomMenu,
  },

  data: () => ({
    //
  }),
}
</script>
