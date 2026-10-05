export async function consultarCep(cep) {
  const resposta = await fetch(
    `https://viacep.com.br/ws/${cep}/json/`
  );

  if (!resposta.ok) {
    throw new Error("Erro ao consultar CEP.");
  }

  const dados = await resposta.json();

  if (dados.erro) {
    throw new Error("CEP não encontrado.");
  }

  return dados;
}