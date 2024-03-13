<template>
  <main>
    <div class="container redColor">
      <div
        v-if="erro !== ''"
        class="alert alert-danger alert-dismissible fade show"
        role="alert"
        id="error"
      >
        <strong>{{ erro }}</strong>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
          @click="greet"
        ></button>
      </div>

      <h1 class="text-center rounded-top text-bg-success mb-0">BTMS</h1>
      <form @submit.prevent="login" class="bg-dark p-4">
        <h2>Login</h2>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Empresa</label>
          <input
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            v-model="empresa"
            aria-describedby="emailHelp"
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Nome</label>
          <input
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            v-model="name"
            aria-describedby="emailHelp"
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Senha</label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            v-model="password"
          />
        </div>

        <button type="submit" class="btn btn-success">Entrar</button>
      </form>
    </div>
  </main>
</template>

<script>
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      name: "",
      password: "",
      empresa: "",
      erro: "",
    };
  },
  methods: {
    greet() {
      var error = document.getElementById("error");

      error.classList.remove("show");

      setTimeout(() => {
        error.classList.add("show");
      }, 3000);

      this.erro = "";
    },
    async login() {
      var dados = {
        dados: {
          head: {
            servico: "autenticacao",
            chave: "",
          },
          data: {
            empresa: this.empresa,
            login: this.name,
            senha: this.password,
          },
        },
      };

      try {
        const response = await axios.post(
          "https://btms5.com.br/ws/wsbtms.php",
          dados
        );

        if (response.data.dados.chave != "") {
          localStorage.setItem(
            "chave",
            JSON.stringify(response.data.dados.chave)
          );
          this.$router.push({ name: "home" });
        } else {
          this.erro = "Credencias incorretas!";
        }
      } catch (error) {
        console.error("Error logging in:", error);
      }
    },
  },
};
</script>

<style scoped>
.redColor {
  width: 400px;
  color: hsla(160, 100%, 37%, 1);
  margin-top: 20vh;
}
</style>
