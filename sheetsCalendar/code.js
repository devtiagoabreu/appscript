function criarEventos() {
  
  var planilha = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var valores = planilha.getDataRange().getValues();
  //Logger.log(valores);

  var agenda = CalendarApp.getDefaultCalendar();

  for (var i = 1; i < valores.length; i++) {
    var linha = valores[i];
    var sincronizado = linha[8];

    if ( sincronizado.toLowerCase() !== "Sim") {

      var dia = linha[0];
      var horaInicio = linha[1];
      var horaFim = linha[2];
      var titulo = linha[3];
      var descricao = linha[4];
      var prioridade = linha[6];
      
      var dataInicio = new Date(dia);
      var dataFim = new Date(dia);
      dataInicio.setHours(horaInicio.split(":")[0], horaInicio.split(":")[1]);
      dataFim.setHours(horaFim.split(":")[0], horaFim.split(":")[1]);

      var cor;
      switch (prioridade) {
        case "Alta":
          cor = CalendarApp.EventColor.RED;
          break;
        case "Média":
          cor = CalendarApp.EventColor.YELLOW;
          break;
        case "Baixa":
          cor = CalendarApp.EventColor.GREEN;
          break;
        default:
          cor = CalendarApp.EventColor.BLUE;
      }

      var evento = agenda.createEvent(titulo, dataInicio, dataFim,{description: descricao});
      evento.setColor(cor);

      // Atualiza coluna sincronizado
      planilha.getRange(i + 1, 9).setValue("Sim");

    }    
        
  }
}
