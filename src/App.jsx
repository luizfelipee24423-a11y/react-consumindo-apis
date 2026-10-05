import { useEffect, useState } from "react";
import "./App.css";

import Titulo from "./components/titulo";
import CardProduto from "./components/CardProduto";

import {
  listarPokemons,
  buscarPokemon
} from "./services/pokemonService";

import { consultarCep } from "./services/cepService";

const App = () => {
  // Lista de Pokémons
  const [pokemons, setPokemons] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erroLista, setErroLista] = useState("");

  // Consulta individual de Pokémon
  const [pokemon, setPokemon] = useState("");
  const [pokemonEncontrado, setPokemonEncontrado] = useState(null);
  const [foto, setFoto] = useState("");
  const [erroPokemon, setErroPokemon] = useState("");

  // Consulta de CEP
  const [cep, setCep] = useState("");
  const [estado, setEstado] = useState("");
  const [regiao, setRegiao] = useState("");
  const [bairro, setBairro] = useState("");
  const [localidade, setLocalidade] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [erroCep, setErroCep] = useState("");

  // Produtos simulados
  const produtos = [
    {
      id: 1,
      nome: "Notebook",
      preco: 1500,
      categoria: "Eletrônico",
      estoque: 20
    },
    {
      id: 2,
      nome: "Mouse",
      preco: 100,
      categoria: "Periférico",
      estoque: 12
    },
    {
      id: 3,
      nome: "Teclado",
      preco: 140,
      categoria: "Periférico",
      estoque: 33
    }
  ];

  // Carrega a lista de Pokémons ao iniciar a aplicação
  useEffect(() => {
    async function carregarPokemons() {
      try {
        const dados = await listarPokemons();

        setPokemons(dados);
      } catch (erro) {
        setErroLista("Erro ao carregar Pokémons.");
      } finally {
        setCarregando(false);
      }
    }

    carregarPokemons();
  }, []);

  // Busca um Pokémon específico
  async function pesquisarPokemon() {
    try {
      setErroPokemon("");

      const dados = await buscarPokemon(pokemon);

      setPokemonEncontrado(dados);
      setFoto(dados.sprites.other.home.front_default);
    } catch (erro) {
      setErroPokemon("Pokémon não encontrado.");
      setPokemonEncontrado(null);
      setFoto("");
    }
  }

  // Consulta um CEP
  async function pesquisarCep() {
    try {
      setErroCep("");

      const dados = await consultarCep(cep);

      setLocalidade(dados.localidade);
      setBairro(dados.bairro);
      setLogradouro(dados.logradouro);
      setEstado(dados.estado);
      setRegiao(dados.regiao);
    } catch (erro) {
      setErroCep("Erro ao consultar CEP.");
    }
  }

  return (
    <>

    <div className = "App">
      
   
      <Titulo titulo="Consulta CEP" />

      <input
        type="text"
        value={cep}
        placeholder="Digite o CEP"
        onChange={(e) => setCep(e.target.value)}
      />

      <button onClick={pesquisarCep}>
        Consultar CEP
      </button>

      {erroCep && <p>{erroCep}</p>}

      {logradouro && (
        <>
          <h3>
            Endereço: {logradouro}, {bairro}, {localidade} - {estado}
          </h3>

          <p>Região: {regiao}</p>
        </>
      )}

      <hr />

      <h2>Consultar Pokémon</h2>

      <input
        type="text"
        value={pokemon}
        placeholder="Digite o nome do Pokémon"
        onChange={(e) => setPokemon(e.target.value)}
      />

      <button onClick={pesquisarPokemon}>
        Encontrar Pokémon
      </button>

      {erroPokemon && <p>{erroPokemon}</p>}

      {pokemonEncontrado && (
        <>
          <h2>{pokemonEncontrado.name}</h2>
          <p>Altura: {pokemonEncontrado.height/10}cm</p>
          <p>Peso: {pokemonEncontrado.weight/10}kg</p>

          <img
            src={foto}
            alt={`Imagem de ${pokemonEncontrado.name}`}
          />
        </>
      )}

      <hr />

      <h2>Pokémons carregados pela API</h2>

      {carregando && <p>Carregando Pokémons...</p>}

      {erroLista && <p>{erroLista}</p>}

      {pokemons.map((pokemon) => (
        <p key={pokemon.name}>
          {pokemon.name}
        </p>
      ))}

      <hr />

      <h2>Produtos</h2>

      {produtos.map((produto) => (
        <CardProduto
          key={produto.id}
          nome={produto.nome}
          preco={produto.preco}
          categoria={produto.categoria}
          estoque={produto.estoque}
        />
      ))}

      </div>
    </>
  );
};

export default App;