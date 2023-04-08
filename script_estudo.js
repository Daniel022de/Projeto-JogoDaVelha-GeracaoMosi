// Declaração de variáveis


let marca_jogador_atual = "X"; // Variável para acompanhar a marca do jogador atual
let celulas_jogo = document.getElementsByClassName("celula"); // HTMLCollection que contém todas as células do jogo, obtidas pelo uso da função document.getElementsByClassName()
let jogo_acabado = false; //  Variável usada para rastrear o estado do jogo, indicando se o jogo acabou ou não 



// Função executada quando uma célula é clicada pelo jogador humano
// Verifica se a célula clicada está vazia e se o jogo acabou
// Coloca a marca do jogador humano (marca_jogador_atual) na célula clicada
// Alterna a marca do jogador atual entre "X" e "O" permitindo alternar entre os jogadores a cada jogada
// Chama uma função para verificar se o jogador atual ganhou após a jogada 
// Verifica se o jogo acabou 
// Chama uma função para realizar a jogada da inteligência artificial

function jogada_humana(indice) {
 if (celulas_jogo[indice].innerHTML === '' && jogo_acabado === false) {
   celulas_jogo[indice].innerHTML = marca_jogador_atual;  
   if (marca_jogador_atual === "X") {
    marca_jogador_atual = "O";
   } else {
    marca_jogador_atual = "X";
   }
   verificar_vencedor(); 
   if (jogo_acabado === false) {
   jogada_ia();
     }
    }
}


// Função que representa a jogada da IA (Inteligência Artificial)
// Cria um novo array "celulas_vazias" a partir do array "celulas_jogo",
// e usa o método "filter" para retornar apenas as células que não têm conteúdo (ou seja, estão vazias).
// Gera um índice aleatório baseado no tamanho do array "celulas_vazias" para selecionar uma célula vazia aleatória.
// Define um timeout para adicionar um atraso na jogada IA (simulando uma pausa)
// Insere o conteúdo (marca do jogador atual) na célula vazia selecionada aleatoriamente.
// Alterna a marca do jogador atual entre "X" e "O" usando o operador ternário, onde "X" se torna "O" e vice-versa.
// Verifica se houve vencedor após essa jogada da IA

function jogada_ia() {
 let celulas_vazias = Array.from(celulas_jogo).filter(function(celulas_jogo){return celulas_jogo.innerHTML === '';}); 
 let indice_aleatorio = Math.floor(Math.random() * celulas_vazias.length);
 setTimeout(() => {
     celulas_vazias[indice_aleatorio].innerHTML = marca_jogador_atual;
     if (marca_jogador_atual === "X") {
      marca_jogador_atual = "O";
     } else {
      marca_jogador_atual = "X";
     }
     verificar_vencedor();
  }, 500);
 
}


// Função executada quando o botão reiniciar jogo é clicado
// O contéudo da célula é zerado
// A marca do jogador atual retorna ao seu valor origem
// O jogo retornar ao seu estado origem

function reiniciar_jogo() {
  for (let celula of celulas_jogo) {
    celula.innerHTML = "";
  }
  marca_jogador_atual = "X";
  jogo_acabado = false;
}


// Função para verificar se há um vencedor após cada jogada
// É declarado um array "combinacoes_vencedoras" que contém todas as combinacoes vencedoras possíveis(linhas,colunas e diagonais) de índices
// Percorre cada combinação vencedora possível obendo os índices da combinação [a,b,c]
// É verificado se o conteúdo (innerHTML) das células a, b e c são iguais e diferentes de vazio, o que resultaria em um vencedor
// Se o contéudo da combinação vencedora é "X" o humano ganhou, caso contrário a IA ganhou
// Se não há vencedor e todas as células estão preenchidas, significa que o jogo empatou

function verificar_vencedor() {
 let combinacoes_vencedoras = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
    [0, 4, 8], [2, 4, 6] // Diagonais
  ];
  for (let combinacao of combinacoes_vencedoras) {
    let [a, b, c] = combinacao;
    if (celulas_jogo[a].innerHTML !== '' && celulas_jogo[a].innerHTML === celulas_jogo[b].innerHTML && celulas_jogo[a].innerHTML === celulas_jogo[c].innerHTML) {
      if (celulas_jogo[a].innerHTML === "O") {
        alert("A IA venceu. Tente novamente!");
      } else {
        alert("Parabéns. você venceu!");
      }
      jogo_acabado = true;
      return true;
    }
 }
  let empate = Array.from(celulas_jogo).every(celula => celula.innerHTML !== "");
  if (empate) {
    alert("O jogo empatou!");
    jogo_acabado = true;
    return true;
  }
  return false;
}



// Seleciona todos os elementos HTML com a classe "celula", adiciona um evento de clique a cada um deles 
// Associa a função jogada_humana() para ser executada quando uma célula é clicada, passando o índice da célula como argumento. 
// Permite capturar as jogadas do jogador humano.

document.querySelectorAll(".celula").forEach((celula, indice) => {
  celula.addEventListener("click", () => jogada_humana(indice));
  });
  

// Adiciona um evento de clique ao botão de reiniciar do jogo
// Quando o botão for clicado, a função reiniciar_jogo será executada

document.getElementById("botao-reiniciar").addEventListener("click", reiniciar_jogo);
  