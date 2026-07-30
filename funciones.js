const HOJA = SpreadsheetApp.openById('1jRl0YxrBSrQuv09W53iDkRJWTIGNkJJZr8lm77gE77k').getActiveSheet();

function doGet()
{
    return HtmlService.createTemplateFromFile('web').evaluate().setTitle('Agenda Google Apps Script');
}

function doPost(datos)
{
    insertarContacto(datos.parameter.nombre, datos.parameter.correo);
    return HtmlService.createTemplateFromFile('web').evaluate().setTitle('Agenda Google Apps Script');
}

function obtenerDatosHTML(nombre)
{
    return HtmlService.createHtmlOutputFromFile(nombre).getContent();
}

function obtenerContactos()
{
    return HOJA.getDataRange().getValues();
}

function insertarContacto(nombre, apellidos, correo, telf)
{
    HOJA.appendRow([nombre, apellidos, correo, telf]);
}