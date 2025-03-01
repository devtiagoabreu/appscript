function chat() {
  var planilha = SpreadsheetApp.getActiveSpreadsheet();
  var aba = planilha.getActiveSheet();
  var prompt = aba.getRange('H2').getValue();
  
  //Logger.log('prompt:' + prompt)
}

function chamarAPI() {
  var url = 'https://api.openai.com/v1/chat/completions';
  var prompt = 'Como calcular o valor médio de um estoque contábil';
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
  var jsonResponse= response.getContentText();

  var respostaModelo = jsonResponse.choices[0].message.content;

  Logger.log(respostaModelo)

  return jsonResponse;
}
