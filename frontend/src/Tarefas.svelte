<script>
  import Icon from "@iconify/svelte";
  import { onMount } from "svelte";
  import axios from "axios";
  let tarefa = "";
  let tarefas = [];

  function inserirTarefa(db) {
    const nome = tarefa.trim().toUpperCase();
    tarefa = nome;
    if (nome) {
      axios
        .post(`http://localhost:3000/${db}`, {
          nome,
        })
        .then(atualizarListagem);
    }
  }
  function removerTarefa(db, nome) {
    axios
      .delete(`http://localhost:3000/${db}`, { data: { nome } })
      .then(atualizarListagem);
  }
  function atualizarListagem() {
    axios.get("http://localhost:3000/").then(({ data }) => {
      tarefas = data;
      tarefas.sort((a, b) => (a.nome < b.nome ? -1 : 1));
    });
  }
  onMount(atualizarListagem);
</script>

<form>
  <input bind:value={tarefa} placeholder="Digite uma nova tarefa aqui..." />
  <button type="button" class="db1" on:click={(e) => inserirTarefa("db1")}>
    <div class="bt">
      <Icon icon="material-symbols:add-circle" width="24" height="24" />
      DB1
    </div>
  </button>
  <button type="button" class="db2" on:click={(e) => inserirTarefa("db2")}>
    <div class="bt">
      <Icon icon="material-symbols:add-circle" width="24" height="24" />
      DB2
    </div>
  </button>
</form>
<!-- Listagem -->
<ul>
  {#each tarefas as { nome, db1, db2 }, i}
    {#if db1 || db2}
      <li>
        <div class="item">
          <div class="itemname">
            <Icon icon="mdi:lightning-alert" width="24" height="24" />
            &nbsp{nome}
          </div>
          <div class="acoes">
            {#if db1}
              <button
                type="button"
                class="db1"
                on:click={() => removerTarefa("db1", nome)}>
                <div class="bt">
                  <Icon
                    icon="material-symbols:delete-outline"
                    width="24"
                    height="24" />
                  DB1
                </div>
              </button>
            {/if}
            {#if db2}
              <button
                type="button"
                class="db2"
                on:click={() => removerTarefa("db2", nome)}>
                <div class="bt">
                  <Icon
                    icon="material-symbols:delete-outline"
                    width="24"
                    height="24" />
                  DB2
                </div>
              </button>
            {/if}
          </div>
        </div>
      </li>
    {/if}
  {/each}
</ul>

<style>
  .db1 {
    background-color: rgb(0, 22, 0);
  }
  .db2 {
    background-color: rgb(15, 8, 61);
  }
  button {
    margin-left: 4px;
    padding: 0.3em 0.5em;
  }
  form {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .itemname {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
  }
  .bt {
    min-width: 60px;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
  }
  .item {
    width: 600px;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
  }
  .acoes {
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-end;
  }
  li {
    border: 1px solid #242424;
    padding: 5px;
    margin: 3px;
    padding-left: 9px;
    border-radius: 7px;
    transition: filter 300ms;
  }
  li:hover {
    filter: drop-shadow(0 0 0.1em rgb(255, 245, 152));
  }
  li:nth-child(odd) {
    background-color: rgb(104, 88, 1);
  }
  li:nth-child(even) {
    background-color: rgb(56, 48, 3);
  }
</style>
