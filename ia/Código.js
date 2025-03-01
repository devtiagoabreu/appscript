function chat() {
  var prompt = lerPrompt();
  var resposta = chamarAPI(prompt)
  escreverResposta(resposta);
  
  //Logger.log('prompt:' + prompt)
}

function lerPrompt() {
  var planilha = SpreadsheetApp.getActiveSpreadsheet();
  var aba = planilha.getActiveSheet();

  return aba.getRange('H2').getValue();
}

function escreverResposta(resposta) {
  var planilha = SpreadsheetApp.getActiveSpreadsheet();
  var aba = planilha.getActiveSheet();

  aba.getRange('H3').setValue(resposta);
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
        content: "You are a helpful assistant."
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
