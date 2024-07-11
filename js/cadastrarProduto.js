import { conectaApi } from "./conectaApi.js";
const formulario = document.querySelector("[data-formulario]");
const salvarDados = document.getElementById("salvar-dados");
const finalizarCadastro = document.querySelector("[data-finalizar]");
let produtosCadastrados = 0;
const MAX_PRODUTOS = 10;

async function obterQuantidadeProdutos() {
    try {
        const listaApi = await conectaApi.listaProdutos();
        return listaApi.length;
    } catch (error) {
        console.error("Erro ao obter a quantidade de produtos:", error);
        return 0;
    }
}

async function cadastrarProduto(evento) {
    evento.preventDefault();

    if (produtosCadastrados < MAX_PRODUTOS) {
        const nomeProduto = document.querySelector("[data-produto]").value;
        const valor = document.querySelector("[data-valor]").value;
        try {
            await conectaApi.cadastrarProduto(nomeProduto, valor);
            produtosCadastrados++;
            
        } catch (e) {
            alert(e);
        }
    } else {
        alert(`Você atingiu a quantidade máxima de ${MAX_PRODUTOS} produtos cadastrados.`);
    }
}

async function mudarPagina(evento) {
    evento.preventDefault();

    if (produtosCadastrados < MAX_PRODUTOS) {

        const nomeProduto = document.querySelector("[data-produto]").value;
        const valor = document.querySelector("[data-valor]").value;
        try {
            await conectaApi.cadastrarProduto(nomeProduto, valor);
            produtosCadastrados++;
            
            window.location.href = "../pages/cadastroFinalizado.html";
        } catch (e) {
            alert(e);
        }
    } else {
        alert(`Você atingiu a quantidade máxima de ${MAX_PRODUTOS} produtos cadastrados.`);
    }
}

async function inicializarProdutosCadastrados() {
    produtosCadastrados = await obterQuantidadeProdutos();
}

inicializarProdutosCadastrados();
salvarDados.addEventListener("click", cadastrarProduto);
finalizarCadastro.addEventListener("submit", mudarPagina);
formulario.addEventListener("submit", mudarPagina);
