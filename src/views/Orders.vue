<script lang="ts">
import moment from 'moment';
import axios from 'axios'
import Welcome from '../components/Welcome.vue'
export default {
  name:"orders.vue",
  components:{
    Welcome,

  },
  data(){
    return{
      nombre: localStorage.getItem("nombre"),
      showModalAdd: false,
      range: {
      start: null,
      end: null
      },
      json:null,
      test:false,
      columns: [
      {
        label: 'ID',
        field: 'id',
      },
      {
        label: 'Name',
        field: 'name',
      },
      {
        label: 'Medicamentos',
        field: 'medicamentos',
      },
      {
        label: 'Date',
        field: 'date',
      },
    ],
    rows: []
    }
  },
  methods:{
    showModalAddT(){
      this.showModalAdd = true
      console.log(this.showModalAdd)
    },
    filtrarFechas(){
      const formattedStartDate = moment(this.range.start).format('YYYY/MM/DD').replace(/\//g,"-")
      const formattedEndDate = moment(this.range.end).format('YYYY/MM/DD').replace(/\//g,"-")  
      const url = `http://localhost:4000/api/ordenes/date?start_date=${encodeURIComponent(formattedStartDate)}&end_date=${encodeURIComponent(formattedEndDate)}`;
      axios.get(url)
        .then( response => {
          this.json = response.data
          const rows = []
          for (let i = 0; i < this.json.length ; i++) {
            const row = {
              id: this.json[i].ordenes_medicamentos_id,
              name: this.json[i].name,
              medicamentos: medicamentosFormato(i),
              date: this.json[i].date,
            }
            rows.push(row)
          }
          this.rows = rows; 
        })
        const medicamentosFormato = (i) => {
          const jsonObject = JSON.parse(this.json[i].medicamentos)
          const formattedString = Object.keys(jsonObject)
            .map(key => `${key}: $${jsonObject[key]}`)
            .join(', ')
          return formattedString
        }
    }
  }
}      
</script>
<template>
  <div class="columns is-multiline">
    <!-- Welcome message (This will be a component) -->
    <div class="column is-12 mt-5 mb-6">
      <div class="notification title is-size-5 is-primary"><Welcome :nombre="nombre"></Welcome></div>
    </div>

    <!-- Buttons -->
    <div class="column is-5">
      <VDatePicker v-model="range" is-range :masks="{ input: 'DD/MM/YYYY' }">
        <template #default="{ inputValue, inputEvents }">
          <div class="field has-addons">
            <div class="control">
              <input class="input" :value="inputValue.start" v-on="inputEvents.start" />
            </div>
            <div class="control">
              <button class="button is-primary">
                <span class="icon"> <i class="fa fa-arrow-right"></i> </span>
              </button>
            </div>
            <div class="control">
              <input class="input" :value="inputValue.end" v-on="inputEvents.end" />
            </div>
            <div class="control">
              <button class="button is-primary" @click="filtrarFechas">
                <span class="icon mr-2"> <i class="fa fa-search"></i> </span> Consultar
              </button>
            </div>
          </div>
        </template>
      </VDatePicker>
    </div>
    <div class="column is-7 has-text-right">
      
      <button class="button is-primary" @click="showModalAddT">
        <span class="icon mr-1"> <i class="fa fa-plus"></i> </span> Agregar
      </button>
    </div>

    <!-- Table (This will be a component) -->
    <!-- TODO: add a button to download the pdf -->
    <div class="column is-12">
      <vue-good-table
      :columns="columns"
      :rows="rows"
      :sort-options="{ enabled: true }"
      :search-options="{ enabled: true }"
      :pagination-options="{
        enabled: true,
        mode: 'records',
        perPage: 5,
        position: 'top',
        perPageDropdown: [10, 20, 50],
        dropdownAllowAll: false,
        setCurrentPage: 1,
        nextLabel: 'Siguiente',
        prevLabel: 'Anterior',
        rowsPerPageLabel: 'Filas por página',
        ofLabel: 'de',
        allLabel: 'Todas'
      }"

      >
        <template #emptystate>No hay datos disponibles para mostrar</template>
      </vue-good-table>
    </div>

    <!-- Modal (This will be a component) -->
    <div v-show="showModalAdd" class="custom-modal-overlay">
      <div class="custom-modal">
        <div class="columns is-multiline px-5">
          <div class="column is-12 mt-5">
            <h3 class="title is-size-5 is-bordered">Información del paciente</h3>
          </div>
          <div class="column is-3">
            <div class="field">
              <label class="has-text-grey has-text-weight-light">Nombres del paciente</label>
              <div class="control">
                <input class="input" type="text" />
              </div>
            </div>
          </div>
          <div class="column is-3">
            <div class="field">
              <label class="has-text-grey has-text-weight-light">Apellidos del paciente</label>
              <div class="control">
                <input class="input" type="text" />
              </div>
            </div>
          </div>
          <div class="column is-3">
            <div class="field">
              <label class="has-text-grey has-text-weight-light">Cedula</label>
              <div class="control">
                <input class="input" type="text" />
              </div>
            </div>
          </div>
          <div class="column is-3">
            <div class="field">
              <label class="has-text-grey has-text-weight-light">EPS</label>
              <div class="control has-icons-left">
                <div class="select is-fullwidth">
                  <select>
                    <option selected>Seleccione una opción</option>
                    <option>SURA</option>
                    <option>PONAL</option>
                    <option>SALUD TOTAL</option>
                  </select>
                </div>
                <div class="icon is-small is-left">
                  <i class="fa fa-building"></i>
                </div>
              </div>
            </div>
          </div>

          <!-- Selector de medicamentos -->
          <div class="column is-12 mt-5">
            <h3 class="title is-size-5 is-bordered">Receta medica</h3>
          </div>
          <div class="column is-6">
            <div class="field">
              <label class="has-text-grey has-text-weight-light">Medicamento</label>
              <div class="control has-icons-left">
                <div class="select is-fullwidth">
                  <select>
                    <option selected>Seleccione una opción</option>
                    <option>Medicamento 1</option>
                    <option>Medicamento 2</option>
                    <option>Medicamento 3</option>
                  </select>
                </div>
                <div class="icon is-small is-left">
                  <i class="fa fa-building"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="column is-2">
            <div class="field">
              <label class="has-text-grey has-text-weight-light">Cantidad</label>
              <div class="control">
                <input class="input" type="number" />
              </div>
            </div>
          </div>
          <div class="column is-4">
            <div class="field">
              <label style="opacity: 0">Empty</label>
              <div class="control">
                <button class="button is-primary is-outlined is-fullwidth">
                  <span class="icon mr-1"> <i class="fa fa-plus"></i> </span>Agregar
                </button>
              </div>
            </div>
          </div>

          <!-- Tabla de medicamentos seleccionados -->
          <div class="column is-12">
            <vue-good-table
              :columns="[]"
              :rows="[]"
              :sort-options="{
                enabled: true
              }"
            >
              <template #emptystate>No se ha agregado ningún medicamento</template>
            </vue-good-table>
          </div>

          <div class="column is-12">
            <div class="field">
              <label class="has-text-grey has-text-weight-light">Comentarios</label>
              <div class="control">
                <textarea class="textarea" />
              </div>
            </div>
          </div>
          <div class="column is-12">
            <div class="field">
              <label class="has-text-grey has-text-weight-light">Firma del doctor</label>
              <div class="control">
                <input class="input" type="text" />
              </div>
            </div>
          </div>
          <div class="column is-12 mt-6">
            <button class="button is-primary is-fullwidth">Guardar</button>
          </div>
        </div>
        <button class="modal-close" @click="showModalAdd = false">
          <i class="fa fa-times"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #000000da;
  z-index: 9999;
}

.custom-modal {
  background-color: white;
  height: 830px;
  width: 1200px;
  margin-top: 10%;
  padding: 40px 0;
  border-radius: 10px;
}
.close {
  margin: 10.5% 0 0 -25px;
  cursor: pointer;
}

.is-bordered {
  border-bottom: 1px solid black;
}


.custom-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.custom-modal {
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  max-width: 800px;
  width: 100%;
}

/* Estilos adicionales para personalizar el modal */
.custom-modal .title {
  color: #333;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.custom-modal .field {
  margin-bottom: 10px;
}

.custom-modal .field .label {
  color: #666;
  font-size: 14px;
}

.custom-modal .field .input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}





.custom-modal .field .icon {
  color: #ccc;
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
}

.custom-modal .button {
  background-color:rgba(19, 218, 168, 0.9);
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.custom-modal .button:hover {
  background-color: #0f5d75;
}

.custom-modal .button:active {
  background-color: rgba(86, 221, 187, 0.9);
}
.modal-close {
  background-color: rgba(19, 218, 168, 0.9);
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 50%;
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
}


</style>