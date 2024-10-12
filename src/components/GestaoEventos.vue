<template>
    <v-btn color="primary" @click="addEvent">+ Evento</v-btn>
    <v-container>
        <v-row>
            <v-col
             v-for="(evento, index) in eventos"
             :key="index"
             cols="12"
             sm="6"
             md="4"
             >
            <v-card
            class="mx-auto"
            max-width="350"
            >
            <v-img
                v-if="evento.image"
                height="200px"
                :src="evento.image"
                cover
            ></v-img>
        
            <v-card-title>
                {{evento.title}}
            </v-card-title>
        
            <v-card-subtitle>
                {{evento.subtitle}}
            </v-card-subtitle>
        
            <v-card-actions>
                <v-btn
                color="orange-lighten-2"
                text="Inscreva-se"
                ></v-btn>
        
                <v-spacer></v-spacer>
        
                <v-btn :icon="evento.show ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="evento.show = !evento.show"></v-btn>
            </v-card-actions>
        
            <v-expand-transition>
                <div v-show="evento.show">
                <v-divider></v-divider>
        
                <v-card-text>
                    {{evento.description }}
                </v-card-text>
                </div>
            </v-expand-transition>
            </v-card>
         </v-col>
        </v-row>

        <!-- Modal para adicionar novo evento -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>Adicionar Evento</v-card-title>
        <v-card-text>
          <v-text-field label="Título" v-model="newEvent.title"></v-text-field>
          <v-text-field label="Subtítulo" v-model="newEvent.subtitle"></v-text-field>
          <v-textarea label="Descrição" v-model="newEvent.description"></v-textarea>
          <v-file-input label="Imagem" @change="onFileChange"></v-file-input>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="saveEvent">Salvar</v-btn>
          <v-spacer></v-spacer>
          <v-btn text @click="dialog = false">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


    </v-container>
  </template>

  <script>
    export default {
      data() {
        return {
            dialog: false,
            newEvent: {
                title: "",
                subtitle: "",
                description: "",
                image: "",
                show: false
            },
            eventos: []
        };
      },
      methods: {
        addEvent() {
            this.dialog = true;
        },
        onFileChange(e) {
            const file = e.target.files[0];
            if (file) {
                this.newEvent.image = URL.createObjectURL(file);
            }
        },
        saveEvent() {
            if (this.newEvent.title && this.newEvent.image) {
                this.eventos.push({ ...this.newEvent });

                this.newEvent = {
                    title: "",
                    subtitle: "",
                    description: "",
                    image: "",
                    show: false
                };
                this.dialog = false;
            }
        }
      }
    };
  </script>