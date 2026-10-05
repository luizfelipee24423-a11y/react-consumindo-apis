export async function listarPokemons() {
  const resposta = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=10"
  );

  if (!resposta.ok) {
    throw new Error("Erro ao listar Pokémons.");
  }

  const dados = await resposta.json();

  return dados.results;
}

export async function buscarPokemon(nome) {
  const resposta = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${nome.trim().toLowerCase()}`
  );

  if (!resposta.ok) {
    throw new Error("Pokémon não encontrado.");
  }

  return resposta.json();
}