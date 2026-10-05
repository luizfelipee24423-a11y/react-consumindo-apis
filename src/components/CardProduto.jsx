



const CardProduto =({nome,categoria,preco,estoque}) =>
{

return(<>

    <h2>{nome}</h2>
    <p>Categoria: {categoria}</p>
    <p>R$ {preco}</p>
    <p>Estoque: {estoque}</p>


</>);


};

export default CardProduto;