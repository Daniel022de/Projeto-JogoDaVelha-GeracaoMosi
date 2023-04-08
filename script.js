// Declaração das variáveis globais

let marca_jogador_atual = "X"; // Variável para acompanhar a marca do jogador atual
let celulas_jogo = document.getElementsByClassName("celula"); // HTMLCollection que contém todas as células do jogo, obtidas pelo uso da função document.getElementsByClassName()
let jogo_acabado = false; //  Variável usada para rastrear o estado do jogo, indicando se o jogo acabou ou não 
let botao_reiniciar = document.getElementById("botao-reiniciar") //Variável usada para implementar um evento de click

// Função executada quando uma célula é clicada pelo jogador humano

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

function jogada_ia() {
  for (let i = 0; i < celulas_jogo.length; i++) {
    let celula = celulas_jogo[i];
    if (celula.innerHTML === "") {
      setTimeout(() => {
      celula.innerHTML = marca_jogador_atual; 
      if (marca_jogador_atual === "X") {
              marca_jogador_atual = "O";
             } else {
              marca_jogador_atual = "X";
             }
             verificar_vencedor();
            }, 500);
      break;
    }
  }
}

// Função executada quando o botão reiniciar jogo é clicado

function reiniciar_jogo() {
  for (let celula of celulas_jogo) {
    celula.innerHTML = "";
  }
  marca_jogador_atual = "X";
  jogo_acabado = false;
}

// Função para verificar se há um vencedor após cada jogada

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
        alert("A IA venceu. Você perdeu. Tente novamente!");
      } else {
        alert("Parabéns. Você venceu da IA!");
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

// Adiciona um evento de clique a cada célula do tabuleiro
// Associa a função jogada_humana() para ser executada quando uma célula é clicada, passando o índice da célula como argumento. 

for (let indice = 0; indice < celulas_jogo.length; indice++) {
  let celula = celulas_jogo[indice];
  celula.addEventListener("click", function() {
    jogada_humana(indice);
  });
}
  
// Adiciona um evento de clique ao botão de reiniciar do jogo associando a função reiniciar_jogo()

botao_reiniciar.addEventListener("click", reiniciar_jogo);