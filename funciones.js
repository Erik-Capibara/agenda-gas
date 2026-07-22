function doGet()
{
    return HtmlService.createTemplateFromFile('web').evaluate().setTitle('Agenda Google Apps Script');
}

function obtenerDatosHTML(nombre)
{
    return HtmlService.createHtmlOutputFromFile(nombre).getContent();
}

function obtenerContactos()
{
    let hoja = SpreadsheetApp.openById('1jRl0YxrBSrQuv09W53iDkRJWTIGNkJJZr8lm77gE77k').getActiveSheet();
    let datos = hoja.getDataRange().getValues();
    return datos;
}