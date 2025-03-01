function chat() {
  var planilha = SpreadsheetApp.getActiveSpreadsheet();
  var aba = planilha.getActiveSheet();
  var prompt = aba.getRange('H2').getValue();

  // wow
  //Logger.log('prompt:' + prompt)
}
