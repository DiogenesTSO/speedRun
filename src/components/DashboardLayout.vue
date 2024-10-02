<template>
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-card>
            <v-card-title>Total de Corredores Inscritos</v-card-title>
            <v-card-subtitle>{{ totalUsers }}</v-card-subtitle>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card>
            <v-card-title>Vendas</v-card-title>
            <v-card-subtitle>{{ sales }}</v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
  
      <v-row>
        <v-col>
          <v-card>
            <v-card-title>Gráfico de Desempenho</v-card-title>
            <vue-chart :data="chartData" />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios';
  import VueChart from 'vue-chartjs';
  
  export default {
    components: {
      VueChart
    },
    data() {
      return {
        totalUsers: 0,
        sales: 3000,
        chartData: {
          labels: ['Jan', 'Fev', 'Mar', 'Abr'],
          datasets: [
            {
              label: 'Vendas',
              data: [100, 200, 300, 400],
              backgroundColor: 'blue'
            }
          ]
        }
      };
    },
    mounted() {
        this.getCorredoresCount();
    },
    methods: {
        async getCorredoresCount() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/corredores-count');
                this.totalUsers = response.data.total;
            } catch (error) {
                console.error('Erro ao buscar o total de inscritos', error);
            }
        }
    }
  };
  </script>
  