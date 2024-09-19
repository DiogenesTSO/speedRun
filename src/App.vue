<template>
  <v-app>
    <v-main>
      <CustomLogin />
    </v-main>
  </v-app>
</template>

<script>
import CustomLogin from './components/LoginPage.vue'

export default {
  name: 'App',

  components: {
    CustomLogin,
  },

  data: () => ({
    //
  }),
}
</script>
