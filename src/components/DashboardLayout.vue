<template>
    <v-app>
      <v-navigation-drawer app>
        <v-list>
          <v-list-item-group>
            <v-list-item >
              <v-list-item-title></v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
  
      <v-app-bar app color="primary" dark>
        <v-toolbar-title>Minha Dashboard</v-toolbar-title>
      </v-app-bar>
  
      <v-main>
        <v-container>
          <router-view />
        </v-container>
      </v-main>
    </v-app>
  </template>