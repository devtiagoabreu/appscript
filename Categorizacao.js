function categorizar(avaliacao) {

  return chamarAPI(avaliacao)
}

function chamarAPI(prompt) {
  var url = 'https://api.openai.com/v1/chat/completions';
  //var prompt = 'Como calcular o valor médio de um estoque contábil';
  var apiKey = PropertiesService.getScriptProperties().getProperty('OPENAI_API_KEY');

  var data = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "Você é um classificador de avaliações de clientes. Pra cada avaliação responda com a categoria correspondente. As categorias possiveis são: Elogio, Sugestão, Qualidade do Produto, Logística e Atendimento. Exemplo de resposta: Elogio"
      },
      {
        role: "user",
        content: prompt
      }
    ]
  };

  var options = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      Authorization: 'Bearer ' + apiKey // SUA API KEY 
    },
    payload: JSON.stringify(data)
  };

  var response = UrlFetchApp.fetch(url, options);
  var jsonResponse= JSON.parse(response.getContentText());

  var respostaModelo = jsonResponse.choices[0].message.content;

  Logger.log(respostaModelo)

  return jsonResponse;
}