<script>
import  axios from 'axios'
export default {
  name: "Register.vue",
  components:{

  },
  data(){
    return{
      user:"",
      password:"",
      email:"",
      name:"",
      error: false,
      msgError:""
    }
  },
  methods: {
    register() {
      axios.post("http://localhost:4000/api/register",{
        user: this.user,
        password: this.password,
        email: this.email,
        name: this.name
      })
      .then( (responsive => {
        this.$router.push("/")
      })
        )
      .catch((error => {
        this.error = true,
        this.msgError = error.response.data.msg
      } ))
    }   
  }
}
</script>
<template>
    <div class="card">
        <h3 class="mb-4 text-center">Registro</h3>
        <form v-on:submit.prevent="register">
          <div class="mb-3">
            <label for="name" class="form-label">Nombre</label>
            <input type="text" class="form-control" id="name"  v-model="name" required>
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Correo electrónico</label>
            <input type="email" class="form-control" id="email" v-model="email" required>
          </div>
          <div class="mb-3">
            <label for="username" class="form-label">Nombre de usuario</label>
            <input type="text" class="form-control" id="username"  v-model="user" required>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Contraseña</label>
            <input type="password" class="form-control" id="password"  v-model="password" required>
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-primary">Registrarse</button>
          </div>        
        </form>
        <div class="alert alert-danger" role="alert" v-if="error" style="margin: 20px;">
          {{ msgError }}
        </div>
    </div>    
</template>
<style scoped>
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