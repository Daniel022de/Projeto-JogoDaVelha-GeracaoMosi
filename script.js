// Declaração das variáveis globais


let marca_jogador_atual = "X"; // Variável para acompanhar a marca do jogador atual
let celulas_jogo = document.getElementsByClassName("celula"); // HTMLCollection que contém todas as células do jogo, obtidas pelo uso da função document.getElementsByClassName()
let jogo_acabado = false; //  Variável usada para rastrear o estado do jogo, indicando se o jogo acabou ou não 



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



// Seleciona todos os elementos HTML com a classe "celula", adiciona um evento de clique a cada um deles associando a funçao jogada_humana()

document.querySelectorAll(".celula").forEach((celula, indice) => {
  celula.addEventListener("click", () => jogada_humana(indice));
  });
  
// Adiciona um evento de clique ao botão de reiniciar do jogo associando a função reiniciar_jogo()

document.getElementById("botao-reiniciar").addEventListener("click", reiniciar_jogo);