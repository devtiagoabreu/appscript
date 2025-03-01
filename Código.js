function chat() {
  var planilha = SpreadsheetApp.getActiveSpreadsheet();
  var aba = planilha.getActiveSheet();
  var prompt = aba.getRange('H2').getValue();

  
  //Logger.log('prompt:' + prompt)
}
