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
            <apexcharts
              type="bar"
              :options="chartOptions"
              :series="chartData"
            />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import { VueApexCharts } from "vue3-apexcharts";
  import axios from 'axios';
  
  export default {
    components: { apexcharts: VueApexCharts,
    },
    data() {
      return {
        totalUsers: 0,
        sales: 3000,
        chartData: [],
        chartOptions: {
            chart: {
              id: "performance-chart",
            toolbar: {
              show: false,
            },
          },
          xaxis: {
            categories: ["Jan", "Fev", "Mar", "Abr"],
          },
          title: {
            text: "Vendas Mensais",
            align: "center",
          },
        },
      };
    },
    mounted() {
        this.getCorredoresCount();
        this.fetchChartData();
    },
    methods: {
        async getCorredoresCount() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/corredores-count');
                this.totalUsers = response.data.total;
            } catch (error) {
                console.error('Erro ao buscar o total de inscritos', error);
            }
        },
        fetchChartData() {
          // Exemplo de dados, você pode substituir por dados dinâmicos
          this.chartData = [
            {
              name: "Vendas",
              data: [100, 200, 300, 400],
            },
          ];
        },
    }
  };
  </script>
  