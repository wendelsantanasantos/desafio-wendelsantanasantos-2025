import { animais, brinquedosValidos } from "./dados/animais";

class AbrigoAnimais {
  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    let erro = null;
    const pessoa1 = brinquedosPessoa1.split(",");
    const pessoa2 = brinquedosPessoa2.split(",");
    const ordem = ordemAnimais.split(",");

    let r = [];
    let animaisAdotadosP1 = [];
    let animaisAdotadosP2 = [];
    let brinquedosUsadosP1 = [];
    let brinquedosUsadosP2 = [];

    //uma validação para brinquedos duplicados ou invalidos

    function testeDuplicados(arr) {
      const set = new Set(arr);
      return set.size !== arr.length;
    }

    if (testeDuplicados(pessoa1) || testeDuplicados(pessoa2)) {
      return { erro: "Brinquedo inválido", lista: false };
    }

    for (let brinquedos of pessoa1.concat(pessoa2)) {
      if (!brinquedosValidos.includes(brinquedos)) {
        return { erro: "Brinquedo inválido", lista: false };
      }
    }

    //validação para animais duplicados

    if (testeDuplicados(ordem)) {
      return { erro: "Nomes de animais duplicados", lista: false };
    }

    let temLoco = ordem.find((nome) => nome.toLowerCase() === "loco");

    function analisarBrinquedos(pessoa, brinquedosAnimal, brinquedosUsados) {
      let index = 0;

      for (let brinquedo of pessoa) {
        if (brinquedosUsados.includes(brinquedo)) continue;

        if (brinquedo === brinquedosAnimal[index]) {
          index++;
        }
        if (index === brinquedosAnimal.length) break;
      }

      return index === brinquedosAnimal.length;
    }

    function TemTodosBrinquedos(pessoa, brinquedosAnimal) {
      for (let brinquedo of brinquedosAnimal) {
        if (!pessoa.includes(brinquedo)) {
          return false;
        }
      }
      return true;
    }

    //logica principal para adoção

    for (let nomeAnimal of ordem) {
      if (nomeAnimal.toLowerCase() !== "loco") {
        if (!animais[nomeAnimal]) {
          return { erro: "Animal inválido" };
        }

        const { animal, brinquedos } = animais[nomeAnimal];

        const p1Pode =
          analisarBrinquedos(pessoa1, brinquedos, brinquedosUsadosP1) &&
          animaisAdotadosP1.length < 3;
        const p2Pode =
          analisarBrinquedos(pessoa2, brinquedos, brinquedosUsadosP2) &&
          animaisAdotadosP2.length < 3;

        if (p1Pode && p2Pode) {
          r.push(`${nomeAnimal} - abrigo`);
          continue;
        }

        if (p1Pode) {
          r.push(`${nomeAnimal} - pessoa 1`);
          animaisAdotadosP1.push(nomeAnimal);
          if (animal == "gato") {
            brinquedosUsadosP1.push(...brinquedos);
          }
          continue;
        } else if (p2Pode) {
          r.push(`${nomeAnimal} - pessoa 2`);
          animaisAdotadosP2.push(nomeAnimal);
          if (animal == "gato") {
            brinquedosUsadosP2.push(...brinquedos);
          }
          continue;
        } else {
          r.push(`${nomeAnimal} - abrigo`);
        }
      }
    }

    //tratando o loco por ultimo para conferir se alguém vai adotar um amiguinho com ele

    if (temLoco) {
      if (
        TemTodosBrinquedos(pessoa1, animais.Loco.brinquedos) &&
        animaisAdotadosP1.length > 0 &&
        animaisAdotadosP1.length < 3
      ) {
        r.push("Loco - pessoa 1");
        animaisAdotadosP1.push("Loco");
      } else if (
        TemTodosBrinquedos(pessoa2, animais.Loco.brinquedos) &&
        animaisAdotadosP2.length > 0 &&
        animaisAdotadosP2.length < 3
      ) {
        r.push("Loco - pessoa 2");
        animaisAdotadosP2.push("Loco");
      } else {
        r.push("Loco - abrigo");
      }
    }
    return { lista: r.sort(), erro };
  }
}

export { AbrigoAnimais as AbrigoAnimais };
