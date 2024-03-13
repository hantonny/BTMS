<template>
  <nav class="navbar bg-success mb-5">
    <div class="container-fluid">
      <a class="navbar-brand text-white">BTMS</a>
      <button class="d-flex btn btn-danger" @click="sair">
        <strong>SAIR</strong>
      </button>
    </div>
  </nav>
  <h2 class="redColor text-center mb-5">Passeios</h2>
  <div class="container">
    <table class="table table-dark table-bordered text-center">
      <thead>
        <tr>
          <th scope="col" class="redColor">#</th>
          <th scope="col" class="redColor">Nome do Passeio</th>
          <th scope="col" class="redColor">Data/Hora</th>
          <th scope="col" class="redColor">Nº da Reserva</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="index">
          <th scope="row" class="redColor">{{ index + 1 }}</th>
          <td>{{ item.nome_passeio }}</td>
          <td>{{ item.data_passeio }} - {{ item.hora_passeio }}</td>
          <td>{{ item.reserva }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      items: [],
    };
  },
  methods: {
    sair() {
      this.$router.push({ name: "login" });
      localStorage.clear();
    },
    async pegar() {
      var chave = JSON.parse(localStorage.getItem("chave"));

      var dados = {
        dados: {
          head: {
            servico: "historico_lista",
            chave: chave,
          },
          data: {
            cdgbtms_atrativo: "",
            cdgbtms_atividade: "",
            cdgbtms_agencia: "",
            quantidade: "10",
          },
        },
      };

      try {
        const response = await axios.post(
          "https://btms5.com.br/ws/wsbtms.php",
          dados
        );

        this.items = response.data.dados;
      } catch (error) {
        console.error("Error logging in:", error);
      }
    },
  },
  mounted() {
    this.pegar();
  },
};
</script>

<style scoped>
.redColor {
  color: hsla(160, 100%, 37%, 1);
}
</style>
