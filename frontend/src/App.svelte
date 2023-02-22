<script>
  import Tarefas from "./Tarefas.svelte";
  import "./App.css";
</script>

<main>
  <div class="identificacao">
    <img src="/logo.png" class="logo" alt="App Logo" />
    <ul class="dados">
      <li><b>Trabalho Final - Sistemas Distribuídos</b></li>
      <li><b>Aluno:</b> Glenn de Aguiar Oliveira da Fonseca</li>
      <li><b>Matrícula:</b> 21953825</li>
      <li><b>Prazo de Entrega:</b> 23/02/2023 08:00</li>
    </ul>
  </div>
  <hr />
  <h1>Listagem de Tarefas</h1>
  <h2>O que precisa ser feito?</h2>

  <Tarefas />
</main>