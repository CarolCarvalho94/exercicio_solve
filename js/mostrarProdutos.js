import { conectaApi } from "./conectaApi.js";
const lista = document.querySelector("[data-lista]");
let totalProdutos = 0;

export default function constroiCard(nomeProduto, valor) {
    const produto = document.createElement("li");
    produto.className = "produtos_lista";
    produto.innerHTML = `
        <div class="descricao_produto">
            <h3>Nome do produto: ${nomeProduto}</h3>
            <p>Valor: R$ ${valor}</p>
        </div>
    `

    return produto;
}

async function listaProdutos() {
    try {
        const listaApi = await conectaApi.listaProdutos();
        if (listaApi.length === 0) {
            lista.innerHTML = `
                <h2 class="mensagem_titulo">Não há produtos cadastrados</h2>
            `;
        } else {
            listaApi.forEach(elemento => {
                lista.appendChild(constroiCard(elemento.nomeProduto, elemento.valor));
                totalProdutos += parseFloat(elemento.valor.replace(",", "."));
            });
            console.log(totalProdutos);
            exibeTotalProdutos();
        }
    } catch (error) {
        console.error("Erro ao carregar a lista de produtos:", error);
        lista.innerHTML = `
            <h2 class="mensagem_titulo">Não foi possível carregar a lista de produtos</h2>
        `;
    }
}

const notas = [100, 50, 20, 10, 5, 2, 1];

function calculaNotas(valorTotal) {

    const resultado = {
        "100": 0,
        "50": 0,
        "20": 0,
        "10": 0,
        "5": 0,
        "2": 0,
        "1": 0
    };

    for (let i = 0; i < notas.length; i++) {
        const nota = notas[i];
        const quantidade = Math.floor(valorTotal / nota);
        resultado[nota] = quantidade;
        valorTotal %= nota;
    }

    return resultado;
}

function exibeTotalProdutos() {
    const totalProdutosElementos = document.createElement("div");
    totalProdutosElementos.className = "total_produtos";
    totalProdutosElementos.textContent = `Total dos produtos: R$ ${totalProdutos.toFixed(2)}`;
    lista.appendChild(totalProdutosElementos);

    const quantidadesNotas = calculaNotas(totalProdutos);

    const notasTexto = Object.entries(quantidadesNotas)
        .filter(([nota, quantidade]) => quantidade > 0)
        .map(([nota, quantidade]) => `<tr><td>${quantidade} nota(s)</td><td>R$ ${nota}</td></tr>`)
        .join("\n");
    const notasElemento = document.createElement("div");
    notasElemento.className = "notas";
    notasElemento.innerHTML = `
        <div class="notas_titulo">Quantidade mínima de notas:</div> 
    `

    const tabela = document.createElement("table");
    tabela.innerHTML = `
        <thead>
            <tr>
                <th>Quantidade</th>
                <th>Valor</th>
            </tr>
         </thead>
        <tbody>
            ${notasTexto}
        </tbody>
    `
    notasElemento.appendChild(tabela);
    lista.appendChild(notasElemento);

    console.log("Quantidade de notas:", quantidadesNotas);
}



listaProdutos();

