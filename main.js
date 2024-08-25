const form = document.getElementById('form-atividade'); //constante form
const imgAprovado = '<img src="./images/aprovado.png" alt="Emoji celebrando" />' // criando constante para armazenar o emoji de aprovado
const imgReprovado = '<img src="./images/reprovado.png" alt="Emoji decepcionado" />' // criando constante para armazenar o emoji de reprovado
const atividades = []; // criando array para armazenar todas as atividades digitadas
const notas = []; // criando array para armazenar todas as notas digitadas
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>'; //criando constante para o span
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>';
const notaMinima = parseFloat(prompt("Digite a nota mínima:")); //Com esse prompt o usuário decide qual vai ser a nota mínima utilizada para verificar se o aluno foi aprovado ou reprovado


let linhas = ''; //criando variavel para começar a armazenar várias linhas (escopo global)


form.addEventListener('submit', function(e){
    e.preventDefault(); 

    adicionaLinha();
    atualizaTabela();
    atualizaMediaFinal();
});

function adicionaLinha(){
    const inputNomeAtividade = document.getElementById('nome-atividade'); 
    const inputNotaAtividade = document.getElementById('nota-atividade');

    if (atividades.includes(inputNomeAtividade.value)) { //.includes verifica se o valor digitado ja se encontra no array
        alert(`A atividade: ${inputNomeAtividade.value} ja foi inserida`);
    } else {
        atividades.push(inputNomeAtividade.value); //insere a nova atividade no array
        notas.push(parseFloat(inputNotaAtividade.value)); //insere a nova nota no array e transforma em tipo numérico
    
        let linha = '<tr>'; //criando variavel linha que recebe uma tag <tr> vazia
        linha += `<td>${inputNomeAtividade.value}</td>`; // a tag <tr> vazia recebe uma tag <td> com o valor digitado em nome atividade
        linha += `<td>${inputNotaAtividade.value}</td>`; // a tag <tr> vazia recebe uma tag <td> com o valor digitado em nota atividade
        linha += `<td>${inputNotaAtividade.value >= notaMinima ? imgAprovado : imgReprovado}</td>`; // recebe uma taga <td> com 'Aprovado' ou 'Reprovado' dependendo do IF
        linha += '</tr>';
    
        linhas += linha;
    }

    inputNomeAtividade.value = ''; //Limpando os campos de input
    inputNotaAtividade.value = '';
}


function atualizaTabela() {
    const corpoTabela = document.querySelector('tbody'); //criando variável que armazena o corpo da tabela (o tbody)
    corpoTabela.innerHTML = linhas;
}


function atualizaMediaFinal() {
    const mediaFinal = calculaMediaFinal();

    document.getElementById('media-final-valor').innerHTML = mediaFinal.toFixed(2); //escreve o valor da média final no html e limita as casas decimais para 2
    document.getElementById('media-final-resultado').innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanReprovado; //se a média final for igual ou maior que 7, o script irá escrever aprovado, caso contrário reprovado
}


function calculaMediaFinal() {
    let somaDasNotas = 0;

    for (let i = 0; i < notas.length; i++){ //loop para somar as notas
        somaDasNotas += notas[i];
    }

    return somaDasNotas / notas.length; //calculando a média
}