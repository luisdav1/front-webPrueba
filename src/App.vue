<script setup lang="ts">

import { RouterView } from 'vue-router'
import NavBar from './components/layout/NavBar.vue'
import Footer from './components/layout/Footer.vue'
const currentPath = window.location.pathname;

let routeSecond = true
if (currentPath === "/" || currentPath === "/register") routeSecond = false
</script>

<template>
  <NavBar v-if="routeSecond"/>
  <RouterView />
  <Footer/>
</template>
