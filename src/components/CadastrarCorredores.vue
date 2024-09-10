<template>
    <h2>Cadastrar Corredores</h2>
      <v-form @submit.prevent="submitForm">
        <v-text-field
          v-model="formData.nome"
          :rules="nameRules"
          label="Nome"
          outlined
          required
          color="primary"
        ></v-text-field>

        <v-text-field
          v-model="formData.email"
          label="E-mail"
          type="email"
          required
        ></v-text-field>

        <v-text-field
          v-model="formData.telefone"
          label="Telefone"
          required
        ></v-text-field>

        <v-text-field
          v-model="formData.dataNascimento"
          label="Data de Nascimento"
          type="date"
          required
        ></v-text-field>

        <v-radio-group v-model="formData.sexo" label="Sexo" row>
          <v-radio label="Masculino" value="M" color="primary"></v-radio>
          <v-radio label="Feminino" value="F" color="pink"></v-radio>
        </v-radio-group>

        <v-sheet
    class="position-relative"
    min-height="450"
  >
    
      <v-btn
        type="submit"
        color="deep-purple-darken-2"
        size="small"
        @click="submitForm"
      >
        Cadastrar
      </v-btn>
    
    <v-dialog v-model="dialogSuccess" max-width="600">
      <v-card
        v-if="dialogSuccess"
        append-icon="$close"
        elevation="16"
        max-width="600"
        title="Sucesso"
      >
        <template v-slot:append>
          <v-btn icon="$close" variant="text" @click="dialogSuccess = false"></v-btn>
        </template>

        <v-divider></v-divider>

        <div class="py-12 text-center">
          <v-icon
            class="mb-6"
            color="success"
            icon="mdi-check-circle-outline"
            size="128"
          ></v-icon>

          <div class="text-h5 font-weight-bold">Cadastrado com sucesso!</div>
        </div>

        <v-divider></v-divider>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogError" max-width="600">
    <v-card
      v-if="dialogError"
      append-icon="$close"
      elevation="16"
      max-width="600"
      title="Erro"
    >
      <template v-slot:append>
        <v-btn icon="$close" variant="text" @click="dialogError = false"></v-btn>
      </template>

      <v-divider></v-divider>

      <div class="py-12 text-center">
        <v-icon
          class="mb-6"
          color="error"
          icon="mdi-alert-circle-outline"
          size="100"
        ></v-icon>

        <div class="text-h5 font-weight-bold">Ocorreu um erro no cadastro!</div>
      </div>

      <v-divider></v-divider>

    </v-card>
</v-dialog>
  </v-sheet>
      </v-form>
</template>

<script>

export default {
    data() {
        return {
            formData: {
                nome: "",
                email: "",
                telefone: "",
                dataNascimento: "",
                sexo: "",
            },
            dialogSuccess: false,
            dialogError: false, 
        };
    },
    methods: {
        submitForm() {
            const corredor = this.formData;

            fetch("http://127.0.0.1:8000/api/corredores", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", 
                },
                body: JSON.stringify(corredor),
            })
            .then(() => {
                this.dialogSuccess = true;

                this.formData = {
                    nome: "",
                    email: "", 
                    telefone: "",
                    dataNascimento: "",
                    sexo: "",
                };
            })
            .catch(() => {
                this.dialogError = true;
            });
        },
    },
};

</script>