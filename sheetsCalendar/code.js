function criarEventos() {
  var valores = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getDataRange().getValues();
  Logger.log(valores);
}
