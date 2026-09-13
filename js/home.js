var confirma_resetar = document.querySelector("#Resetar");
var confirma_maximo = document.querySelector("#Adicionarnovoconsumo");
var confirma_somarkcal = document.querySelector("#Adicionarnovakcal");
var maxkcal = document.querySelector(".Max");
var total = document.querySelector(".Total");
var add_novo_maximo = document.querySelector("#Maximo");
var add_kcal = document.querySelector("#Consumo");
var grafico = document.querySelector(".Grafico");

// Variáveis de estado do sistema
let valorMaximo = 0;
let valorTotal = 0;

// 1. Funções de Manipulação do localStorage
function salvarEstado() {
  const dados = {
    valorMaximo: valorMaximo,
    valorTotal: valorTotal
  };
  localStorage.setItem('dadosCalorias', JSON.stringify(dados));
}

function carregarEstado() {
  const estadoSalvo = localStorage.getItem('dadosCalorias');
  if (estadoSalvo) {
    const dados = JSON.parse(estadoSalvo);
    valorMaximo = dados.valorMaximo || 0;
    valorTotal = dados.valorTotal || 0;
  }
}

// 2. Restaurar o estado ao carregar a página
window.addEventListener('DOMContentLoaded', () => {
  carregarEstado();
  atualizarInterface();
});

// Função para atualizar as informações na tela e o gráfico
function atualizarInterface() {
  maxkcal.textContent = `${valorMaximo} kcal`;
  total.textContent = `${valorTotal} kcal`;

  if (valorMaximo <= 0) {
    grafico.style.background = "#e0e0e0";
    grafico.textContent = "0%";
    return;
  }

  const percentual = (valorTotal / valorMaximo) * 100;

  if (valorTotal <= valorMaximo) {
    // Consumo dentro do limite -> Ficha verde/azul + cinza
    grafico.style.background = `conic-gradient(#4caf50 ${percentual}%, #e0e0e0 ${percentual}% 100%)`;
    grafico.textContent = `${Math.round(percentual)}%`;
  } else {
    // Ultrapassou o limite -> Ficha verde até 100% e fatia em VERMELHO para o excesso
    const excesso = valorTotal - valorMaximo;
    const percentualExcesso = ((excesso / valorMaximo) * 100);
    const anguloExcesso = Math.min(100, 100 + percentualExcesso);

    grafico.style.background = `conic-gradient(#4caf50 0% 100%, #f44336 100% ${anguloExcesso}%, #e0e0e0 ${anguloExcesso}% 100%)`;
    grafico.textContent = `+${excesso} kcal`;
  }
}

// Evento: Alterar Meta Máxima
confirma_maximo.addEventListener("click", () => {
  const novoMax = Number(add_novo_maximo.value);
  if (!isNaN(novoMax) && novoMax >= 0) {
    valorMaximo = novoMax;
    add_novo_maximo.value = "";
    salvarEstado(); // Salva no banco local
    atualizarInterface();
  }
});

// Evento: Adicionar Consumo de Kcal
confirma_somarkcal.addEventListener("click", () => {
  const consumo = Number(add_kcal.value);
  if (!isNaN(consumo) && consumo > 0) {
    valorTotal += consumo;
    add_kcal.value = "";
    salvarEstado(); // Salva no banco local
    atualizarInterface();
  }
});

// Evento: Resetar Tudo para o padrão
confirma_resetar.addEventListener("click", () => {
  valorMaximo = 0;
  valorTotal = 0;
  add_novo_maximo.value = "";
  add_kcal.value = "";
  salvarEstado(); // Salva o reset no banco local
  atualizarInterface();
});