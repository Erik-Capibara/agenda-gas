const HOJA = SpreadsheetApp.openById('1jRl0YxrBSrQuv09W53iDkRJWTIGNkJJZr8lm77gE77k').getActiveSheet();
const CARPETA = DriveApp.getFolderById('1znuu2m-x0LTcS7D7GYZlakozdZIdiqPH');
const CABECERA_URL_IMAGEN_DRIVE = 'https://drive.google.com/uc?export=view&id=';

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

function obtenerDatos()
{
    return HOJA.getDataRange().getValues();
}

function insertarContacto(contacto, imagen)
{
    if(imagen) contacto.imagen = guardarImagen(imagen);

    HOJA.appendRow([contacto.nombre, contacto.apellidos, contacto.correo, contacto.telf, contacto.imagen]);
}


function modificarContacto(contacto, imagen)
{
    if(imagen) contacto.imagen = guardarImagen(imagen);

    let celdas = HOJA.getRange('A'+contacto.fila+':E'+contacto.fila);
    celdas.setValues([[contacto.nombre, contacto.apellidos, contacto.correo, contacto.telf, contacto.imagen]]);
}

function guardarImagen(imagen)
{
    let blob = Utilities.newBlob(imagen.datos, imagen.tipo, imagen.nombre);
    let archivo = CARPETA.createFile(blob);
    contacto.imagen = CABECERA_URL_IMAGEN_DRIVE+archivo.getId();
}

function borrarContacto(numFila)
{
    HOJA.deleteRow(numFila);
}

function importarContactos()
{
    let url = 'https://randomuser.me/api/?results=5&inc=name,email,phone,picture'
    let respuesta = UrlFetchApp.fetch(url).getContentText();
    let datos = JSON.parse(respuesta);

    datos.results.forEach(insertarContactoJSON);

}

function insertarContactoJSON(contacto)
{
  HOJA.appendRow([contacto.name.first, contacto.name.last, contacto.email, contacto.phone, contacto.picture.large]);
}
















