var numerosSorteados = [];
var numerosSeriesCorretos = [];

function GerarCartelasClick(){
    var qntNumerosSortear = $("#quantidadeNumeros").val();
    var valorMaximoRange = $("#valorMaximoNumeros").val();
    GerarNumerosVencedores(qntNumerosSortear, valorMaximoRange);

    var qntPremiadas = $("#quantidadePremiadas").val();
    var qntNaoPremiadas = $("#quantidadeNaoPremiadas").val();
    DefinirNumerosSerieVencedores(qntPremiadas, qntNaoPremiadas);    

    GerarCartelas((+qntPremiadas + +qntNaoPremiadas), valorMaximoRange);

    ExibirCartelasVencedoras();
    ExibirNumerosVencedores();

    $('#printButton').show();
}

function GerarNumerosVencedores(qnt, rangeMax) {
    for(var i = 0; i < qnt; i++) {
        var valorSorteado = 0;

        do
            valorSorteado = SortearNumero(rangeMax);
        while(numerosSorteados.includes(valorSorteado));

        numerosSorteados[i] = valorSorteado;
    }
}

function ExibirNumerosVencedores(){
    var divNumerosVencedores = document.getElementById('numerosVencedores');
    for(var i=0; i<numerosSorteados.length; i++){
        var divNumero = document.createElement('div');
        divNumero.classList.add('numero');
        divNumero.textContent = numerosSorteados[i];

        divNumerosVencedores.appendChild(divNumero);
    }
}

function DefinirNumerosSerieVencedores(qntVencedores, qntNaoVencedores) {
    var total = +qntVencedores + +qntNaoVencedores;

    for(var i = 0; i < qntVencedores; i++) {
        var valorSorteado = 0;

        do
            valorSorteado = SortearNumero(total);
        while(numerosSeriesCorretos.includes(valorSorteado));

        numerosSeriesCorretos[i] = valorSorteado;
    }
}

function ExibirCartelasVencedoras(){
    var texto = 'As cartelas vencedoras são: ['
    for(var i=0; i<numerosSeriesCorretos.length; i++){
        if(i < (numerosSeriesCorretos.length - 1))
            texto += numerosSeriesCorretos[i] + ', ';
        else
            texto += numerosSeriesCorretos[i] + ']';
    }
    var span = document.createElement('span');
    span.textContent = texto;

    var div = document.getElementById('cartelasVencedoras');
    div.appendChild(span);
}

function GerarCartelas(quantidade, rangeMax) {
    for (var i = 1; i <= quantidade; i++){
        if(numerosSeriesCorretos.includes(i))
            GerarCartelaVencedora(i);
        else
            GerarCartelaPerdedora(rangeMax, i);
    }
}

function GerarCartelaVencedora(numSerie) {
    var valoresCartela = [];
    for(var i = 0; i < 8; i++){
        var novoValor = 0;
        do
            novoValor = numerosSorteados[(SortearNumero(numerosSorteados.length) - 1)];
        while(valoresCartela.includes(novoValor));
        valoresCartela[i] = novoValor;
    }
    GerarEstruturaCartela(valoresCartela, numSerie);
}

function GerarCartelaPerdedora(rangeMax, numSerie){
    var countSorteados = 0;
    var valoresCartela = [];
    for(var i = 0; i < 8; i++){
        var novoValor = 0;
        var valorValido = true;
        do {
            novoValor = SortearNumero(rangeMax);
            
            if(numerosSorteados.includes(novoValor)){
                countSorteados++;
                valorValido = ((!valoresCartela.includes(novoValor)) && (countSorteados <= 7));
            }
            else
                valorValido = (!valoresCartela.includes(novoValor))
        } while(!valorValido);
        valoresCartela[i] = novoValor;
    }
    GerarEstruturaCartela(valoresCartela, numSerie);
}

function SortearNumero(max){
    return Math.round(Math.random() * (max -1)) + 1;
}

function GerarEstruturaCartela(valores, numeroSerie){
    var divCartela = document.createElement('div');
    divCartela.classList.add('cartela');

    var titulo = document.createElement('span');
    titulo.classList.add('title');
    titulo.textContent = 'Bingo';
    divCartela.appendChild(titulo);

    var divNumeros = document.createElement('div');
    for(var i = 0; i < 9; i++){
        var divValor = document.createElement('div');
        if(i < 4) {
            divValor.classList.add('valor');
            divValor.textContent = valores[i];
        }
        else if(i == 4){
            divValor.classList.add('centro');
            var span1 = document.createElement('span');
            span1.textContent = 'Chá';
            divValor.appendChild(span1);

            var span2 = document.createElement('span');
            span2.textContent = 'da';
            divValor.appendChild(span2);

            var span3 = document.createElement('span');
            span3.textContent = 'Lu';
            divValor.appendChild(span3);
        }
        else {
            divValor.classList.add('valor');
            divValor.textContent = valores[i - 1];
        }
        divNumeros.appendChild(divValor);
    }
    divCartela.appendChild(divNumeros);

    var rodape = document.createElement('span');
    rodape.classList.add('footer');
    rodape.textContent = 'Você ganha se completar toda a cartela';
    divCartela.appendChild(rodape);

    var serialNumber = document.createElement('span');
    serialNumber.textContent = numeroSerie;
    divCartela.appendChild(serialNumber);

    // Adicionando à tela.
    var divPai = document.getElementById('todasCartelas');
    divPai.appendChild(divCartela);

    var br = document.createElement('br');
    divPai.appendChild(br);
    divPai.appendChild(br);
}

function PrintElem(){
    var mywindow = window.open('', 'PRINT', 'height=400,width=600');

    mywindow.document.write('<html><head><title>Cartelas Bingo</title>');
    mywindow.document.write('<link rel="stylesheet" type="text/css" href="bingo.css" media="print,screen" />');
    mywindow.document.write('</head><body >');
    mywindow.document.write('<h1>Cartelas Bingo</h1>');
    mywindow.document.write(document.getElementById('print').innerHTML);
    mywindow.document.write('</body></html>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    $(mywindow).on('load', function() {
        mywindow.print();
        mywindow.close();
    });

    return true;
}