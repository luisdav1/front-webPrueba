<template>
    <div>
      <p>Bienvenid@ {{ nombre }}</p>
    </div>
  </template>
  
  <script>
  export default {
    components:{

    },
    props: {
      nombre: {
        type: String,
        required: true
      }
    }
  };
  </script>
  
  
  
  
  