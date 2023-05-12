<script lang="ts">
import axios from 'axios';
export default {
  name: "Home.vue",
  components:{

  },
  data() {
    return {
      gmail: "",
      password:"",
      Error: false,
      msgError:"",
    }
  },
  methods: {
    login() {
      const password = this.password;
      const json = {
        email: this.gmail,
        password: password
      }

      axios.post("http://localhost:4000/api",json)
      .then( response => {
          this.Error = false
          this.msgError = ""
          localStorage.setItem("token",response.data.token)
          this.$router.push("ordenes")
      })
      .catch(error => {
        this.Error = true
        this.msgError = error.response.data.msg
      })
      axios.post("http://localhost:4000/api/nombre",{
        token:localStorage.getItem("token")
      }).then(response => {
        localStorage.setItem("nombre",response.data.nombre)
      })
    }   
  }
}
</script>
<template>
    <div class="card">
        <div class="d-flex justify-content-center align-items-center">
          <h3 class="mb-4 text-center">Iniciar sesión</h3>
        </div>
        <form v-on:submit.prevent="login">
          <div class="mb-3">
            <label for="username" class="form-label">Correo Electronico</label>
            <input  type="email" class="form-control" id="username" v-model="gmail" required>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Contraseña</label>
            <input type="password" class="form-control" id="password" v-model="password" required>
          </div>
          <div class="d-flex justify-content-center">
            <p>¿No tienes cuenta?<RouterLink to="/registro"> registrate </RouterLink></p>
          </div>
          <div class="d-flex justify-content-center">
            <button type="submit" class="btn btn-primary">Iniciar sesión</button>
          </div>
        </form>
        <div class="alert alert-danger" role="alert" v-if="Error" style="margin: 20px;">
          {{ msgError }}
        </div>
      </div>
</template>
<style>
body {
  background-color: #f8f9fa;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.card {
  max-width: 400px;
  width: 100%;
  padding: 20px;
}
</style>