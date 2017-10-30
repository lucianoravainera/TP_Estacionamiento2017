function limpiar()
{
    var obj = $("txtUsr");
    var obj2 = $("pass");
    obj.value ="";
    obj2.value = "";
}
function verClase(clase){
    $(clase).hidden = false;
    }
function esconderClase(clase){
    $(clase).hidden = true; 
}
function $(idRecibido)
{
    return document.getElementById(idRecibido);
}
var xmlHttp = new XMLHttpRequest();
var callback = function(){
    console.log("Todavia no llego info del server "+xmlHttp.readyState);
    if(xmlHttp.readyState==4)//cuando la info esta lista el server devuelve 4
    {console.log("Respuesta del server(status):"+xmlHttp.status);
        if(xmlHttp.status==200)// si el server devuelve 200 esta todo OK
        {
            console.log("Llego respuesta del server");
            console.log("Respuesta del server: "+xmlHttp.response);//respuesta del servidor
            var respuestaServer = JSON.parse(xmlHttp.response);
            if(respuestaServer.autenticado == "si")
            {
                localStorage.setItem("emailLogueado",$("txtUsr").value);
                localStorage.setItem("preferenciasUSR",JSON.stringify(respuestaServer.preferencias));
                window.location.replace("./index.html");
            }
        }
    }
}
function peticionPost(){  // en el timepo q demora el post poner GIF de carga
    var datosLogin = {"email": $("txtUsr").value,"password": $("pass").value};
    xmlHttp.onreadystatechange = callback;//le asigno el puntero a la funcion
    xmlHttp.open("POST","http://localhost:1337/login",true);
    //xmlHttp.setRequestHeader("content-type","application/x-www-form-urlencoded"); //va antes de send-va siempre esto cuendo se trabaja por post
    //dejar comentado el setRequestHeader
    xmlHttp.send(JSON.stringify(datosLogin));
}


var callback2 = function(){
    console.log("Todavia no llego info del server "+xmlHttp.readyState);
    if(xmlHttp.readyState==4)//cuando la info esta lista el server devuelve 4
    {console.log("Respuesta del server(status):"+xmlHttp.status);
        if(xmlHttp.status==200)// si el server devuelve 200 esta todo OK
        {
            console.log("Respuesta del server: "+xmlHttp.response);
            esconderClase("imgCargando");
            cargarPost(xmlHttp.response);
        }
    }
}

function enviarPost(){
    var datosPost = {"title": $("txtTit").value,"header": $("txtHeader").value,"posttext": $("txtPost").value,"author": localStorage.getItem("emailLogueado")};
    xmlHttp.onreadystatechange = callback2;//le asigno el puntero a la funcion
    xmlHttp.open("POST","http://localhost:1337/postearNuevaEntrada",true);
    xmlHttp.send(JSON.stringify(datosPost));
    esconderClase("divMenuCarga");
    verClase("imgCargando");
}

function cargarPost(info){
    var preferencias = JSON.parse(localStorage.getItem("preferenciasUSR"))
    var aux = JSON.parse(info);
    var cuerpoAux = $("divPost");
    cuerpoAux.innerHTML = cuerpoAux.innerHTML+"<h1>"+aux.title+"</h1>"+"<article>"+"<h2>"+aux.header+"</h2>"+
    "<p style= color:"+preferencias.color+";font-family:"+preferencias.font+";>"+aux.posttext+
    "</p>"+"<br>"+"<label>"+"Escrito Por: "+aux.author+"</label>"+", Fecha de publicacion: "+aux.date+"</article>";

    verClase("divPost");
}