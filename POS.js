var fs = require('fs');
var samu = fs.readfile('samu.json');
var ClienteRest = require('node-rest-client+').Client;
var rest = new ClienteRest();
var url = "http://api.pgi.gov.br/api/1/serie/27.json";
var array = require(__dirname + '/' + arquivoNome);
var contador1 = 0;
var contador2 = 0;

//objeto responsalvel por guardar os resultados do processo
var resultado = new Object();
resultado.uf = {};
resultado.fontes = [url];
resultado.valores = [];

function get_id(array){
  for(var i = 0; i<array.valores.lenght; i++){
    if (array.valores[i].nome == 'Rio Grande do Norte') {
      resultado.uf.id = array.valores[i].id;
      resultado.uf.nome = array.valores[i].nome;
      resultado.fontes.push(array.url_origem);
      return resultado.uf.id;
    }
  }
};

var id = get_id(array);

function resultado_media(data){
  for (var i = 0; i < data.valores.length; i++) {
    if(data.valores[i].estado_ibge == id){
			resultado.valores[contador1] = {};
			resultado.valores[contador1].ano = dados.valores[i].ano;
			resultado.valores[contador1].municipios_atendidos = dados.valores[i].valor;
			contador2 += dados.valores[i].valor;
			contador1++;
    }
  }
  resultado.media = math.round(contador2/contador1);
  return resultado;
};

var resposta = function resposta(data, response){
  fs.writeFile('resultado.json', JSON.stringify(get_result(data), null, 4), function (err) {
		if (err) return console.log(err);
		console.log("sucesso!<3")
	});
}

rest.get(url, resposta);
