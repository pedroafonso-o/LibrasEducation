const perguntas = [
  {
    pergunta: "Qual é a palavra?",
    imagem: "assets/images/perg 1.jpeg",
    opcoes: ["Domingo", "Sexta-Feira", "Sábado", "Segunda-Feira"],
    correta: 2,
  },
  {
    pergunta: "Qual é a palavra?",
    imagem: "assets/images/perg 2.jpeg",
    opcoes: ["Chapéu", "Chagas", "Chico", "Chuva"],
    correta: 0,
  },
  {
    pergunta: "Quais são as letras correspondentes aos sinais apresentados na imagem?",
    imagem: "assets/images/perg 3.jpeg",
    opcoes: [
      "Z – B – V – X – A – U",
      "Z – D – V – X – A – W",
      "S – D – V – X – E – W",
      "Z – D – B – R – A – W",
    ],
    correta: 1,
  },
  {
    pergunta: "Quais são as letras correspondentes aos sinais apresentados na imagem?",
    imagem: "assets/images/perg 4.jpeg",  
    opcoes: [
      "L – B – S – H – M",
      "L – B – S – H – N",
      "L – D – S – R – M",
      "I – B – C – H – N",
    ],
    correta: 1,
  },
  {
    pergunta: "Quais são os números correspondentes aos sinais apresentados na imagem?",
    imagem: "assets/images/perg 5.jpeg",
    opcoes: [
      "7 – 1 – 0 – 6 – 8",
      "6 – 0 – 1 – 8 – 7",
      "7 – 0 – 8 – 1 – 6",
      "7 – 0 – 1 – 8 – 6",
    ],
    correta: 3,
  },
  {
    pergunta: "Quais são os números correspondentes aos sinais apresentados na imagem?",
    imagem: "assets/images/perg 6.jpeg",
    opcoes: [
      "4 – 9 – 2 – 3 – 5",
      "4 – 8 – 2 – 5 – 3",
      "9 – 4 – 3 – 2 – 5",
      "4 – 9 – 5 – 3 – 2",
    ],
    correta: 0,
  },
  {
    pergunta: "O que este sinal representa?",
    imagem: "assets/images/perg 7.jpeg",
    opcoes: ["Bom dia", "Qual seu nome?", "Com licença", "Desculpe"],
    correta: 1,
  },
  {
    pergunta: "O que este sinal representa?",
    imagem: "assets/images/perg 8.jpeg",
    opcoes: ["Bom dia", "Desculpe", "Obrigada", "Com licença"],
    correta: 2,
  },
  {
    pergunta: "O que este sinal representa?",
    imagem: "assets/images/perg 9.jpeg",
    opcoes: ["Por favor", "Adeus", "Desculpa", "Surdo"],
    correta: 2,
  },
  {
    pergunta: "O que este sinal representa?",
    imagem: "assets/images/perg 10.jpeg",
    opcoes: ["Por favor", "Com licença", "Tudo bem", "Até amanhã"],
    correta: 1,
  },
];

let indice = 0;
let respostasUsuario = Array(perguntas.length).fill(-1);

const $ = (seletor) => document.querySelector(seletor);
const pergunta = $("#pergunta");
const respostas = $("#respostas");
const anterior = $("#anterior");
const proxima = $("#proxima");
const numeroQuestao = $("#numeroQuestao");
const respondidas = $("#respondidas");
const barraQuiz = $("#barraQuiz");
const resultado = $("#resultado");
const imagemPergunta = document.getElementById("imagemPergunta");
const modalAviso = document.getElementById("modalAviso");
const fecharModal = document.getElementById("fecharModal");

function abrirModal() {
    modalAviso.classList.add("ativo");
}

function fecharAviso() {
    modalAviso.classList.remove("ativo");
}

fecharModal.addEventListener("click", fecharAviso);

function carregarPergunta() {
  const atual = perguntas[indice];

  pergunta.textContent = atual.pergunta;
  respostas.innerHTML = "";
  imagemPergunta.innerHTML = "";

  atual.opcoes.forEach((opcao, i) => {
    const botao = document.createElement("button");

    botao.type = "button";
    botao.className = "opcao";
    botao.textContent = opcao;

    if (respostasUsuario[indice] === i) {
      botao.classList.add("selecionada");
    }

    botao.addEventListener("click", () => selecionarResposta(i));
    respostas.appendChild(botao);
  });
  if (atual.imagem) {
    const img = document.createElement("img");

    img.src = atual.imagem;
    img.alt = "Sinal em Libras";

    imagemPergunta.appendChild(img);
  }

  atualizarInterface();
}

function selecionarResposta(resposta) {
  respostasUsuario[indice] = resposta;

  document.querySelectorAll(".opcao").forEach((botao, i) => {
    botao.classList.toggle("selecionada", i === resposta);
  });

  atualizarInterface();
}

function atualizarInterface() {
  const total = perguntas.length;
  const quantidadeRespondidas = respostasUsuario.filter((r) => r !== -1).length;

  numeroQuestao.textContent = `Questão ${indice + 1} de ${total}`;
  respondidas.textContent = `${quantidadeRespondidas} respondidas`;
  barraQuiz.style.width = `${((indice + 1) / total) * 100}%`;

  anterior.disabled = indice === 0;
  proxima.textContent = indice === total - 1 ? "Finalizar Quiz" : "Próxima →";
}

function irParaProxima() {
  if (indice < perguntas.length - 1) {
    indice++;
    carregarPergunta();
    return;
  }

if (respostasUsuario[indice] === -1) {
    abrirModal();
    return;
}

  finalizarQuiz();
}

function finalizarQuiz() {
  const pontos = respostasUsuario.reduce(
    (total, resposta, i) => total + (resposta === perguntas[i].correta ? 1 : 0),
    0,
  );

  $(".quiz").style.display = "none";
  $(".quiz-topo").style.display = "none";
  $(".quiz-progresso").style.display = "none";
  resultado.style.display = "block";

  $("#pontuacao").textContent =
    `Você acertou ${pontos} de ${perguntas.length} questões.`;

  const porcentagem = (pontos / perguntas.length) * 100;

  $("#mensagemResultado").textContent =
    porcentagem === 100
      ? "🏆 Perfeito! Você acertou todas as questões!"
      : porcentagem >= 70
        ? "👏 Muito bem! Você já está aprendendo bastante."
        : porcentagem >= 50
          ? "👍 Bom trabalho! Continue praticando."
          : "📚 Continue estudando e tente novamente.";
}

function reiniciarQuiz() {
  indice = 0;
  respostasUsuario = Array(perguntas.length).fill(-1);

  $(".quiz").style.display = "";
  $(".quiz-topo").style.display = "";
  $(".quiz-progresso").style.display = "";
  resultado.style.display = "none";

  carregarPergunta();
}

anterior.addEventListener("click", () => {
  if (indice > 0) {
    indice--;
    carregarPergunta();
  }
});

proxima.addEventListener("click", irParaProxima);
$("#refazer").addEventListener("click", reiniciarQuiz);

carregarPergunta();
