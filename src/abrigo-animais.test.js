import { AbrigoAnimais } from "./abrigo-animais";

describe("Abrigo de Animais", () => {
  test("Deve rejeitar um animal invalido", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "CAIXA,RATO",
      "RATO,BOLA",
      "Lulu"
    );
    expect(resultado.erro).toBe("Animal inválido");
    expect(resultado.lista).toBeFalsy();
  });

  test("Deve rejeitar nomes de animais duplicados", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "CAIXA,RATO",
      "RATO,BOLA",
      "Rex,Rex"
    );
    expect(resultado.erro).toBe("Nomes de animais duplicados");
    expect(resultado.lista).toBeFalsy();
  });

  test("Deve rejeitar brinquedos duplicados ou invalidos", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "CAIXA,RATO,BOLA",
      "BOLA,BOLA",
      "Fofo,Rex"
    );
    expect(resultado.erro).toBe("Brinquedo inválido");
    expect(resultado.lista).toBeFalsy();
  });

  test("Deve encontrar pessoa para um animal", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "RATO,BOLA",
      "RATO,NOVELO",
      "Rex,Fofo"
    );
    expect(resultado.lista[0]).toBe("Fofo - abrigo");
    expect(resultado.lista[1]).toBe("Rex - pessoa 1");
    expect(resultado.lista.length).toBe(2);
    expect(resultado.erro).toBeFalsy();
  });

  test("Deve encontrar pessoa para um animal intercalando brinquedos", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "BOLA,LASER",
      "BOLA,NOVELO,RATO,LASER",
      "Mimi,Fofo,Rex,Bola"
    );

    expect(resultado.lista[0]).toBe("Bola - abrigo");
    expect(resultado.lista[1]).toBe("Fofo - pessoa 2");
    expect(resultado.lista[2]).toBe("Mimi - abrigo");
    expect(resultado.lista[3]).toBe("Rex - abrigo");
    expect(resultado.lista.length).toBe(4);
    expect(resultado.erro).toBeFalsy();
  });

  test("Teste para gatos", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "BOLA,NOVELO,RATO,LASER",
      "RATO,SKATE",
      "Mimi,Fofo"
    );

    expect(resultado.lista[0]).toContain("Fofo - abrigo");
    expect(resultado.lista[1]).toContain("Mimi - pessoa 1");
    expect(resultado.erro).toBeFalsy();
  });

  test("Teste para o caso do loco (sem amiguinho)", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "RATO,SKATE",
      "BOLA,NOVELO,RATO,LASER",
      "Mimi,Fofo,Rex,Loco"
    );

    expect(resultado.lista[0]).toBe("Fofo - abrigo");
    expect(resultado.lista[1]).toBe("Loco - abrigo");
    expect(resultado.lista[2]).toBe("Mimi - pessoa 2");
    expect(resultado.lista[3]).toBe("Rex - abrigo");
    expect(resultado.lista.length).toBe(4);
    expect(resultado.erro).toBeFalsy();
  });

  test("Teste para o caso do loco (com amiguinho)", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "RATO,SKATE,BOLA",
      "BOLA,NOVELO,RATO,LASER",
      "Bebe,Mimi,Loco,Rex"
    );

    expect(resultado.lista[0]).toBe("Bebe - abrigo");
    expect(resultado.lista[1]).toBe("Loco - pessoa 1");
    expect(resultado.lista[2]).toBe("Mimi - pessoa 2");
    expect(resultado.lista[3]).toBe("Rex - pessoa 1");
    expect(resultado.lista.length).toBe(4);
    expect(resultado.erro).toBeFalsy();
  });
});
