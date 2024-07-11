

async function listaProdutos() {
    const conexao = await fetch("http://localhost:3000/produtos");
    const conexaoConvertida = await conexao.json();

    return conexaoConvertida;
}

async function cadastrarProduto(nomeProduto, valor) {
    const conexao = await fetch("http://localhost:3000/produtos", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            nomeProduto: nomeProduto,
            valor: valor
        })
    });
    if (!conexao.ok) {
        throw new Error("Não foi possível cadastrar o produto")
    }
    const conexaoConvertida = await conexao.json();

    return conexaoConvertida;
}

export const conectaApi = { listaProdutos, cadastrarProduto }