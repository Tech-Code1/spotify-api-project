//Rutinas para hablar con un servidor desde el cliente
//Rutinas para consumir un API con js puro

//Rutina para hacer una petición de tipo POST
const URLPOST="https://accounts.spotify.com/api/token";

let llave1 = "grant_type=client_credentials";
let llave2 = "client_id=4b30a16b75064a40876a7d391b6055c3";
let llave3= "client_secret=306ae98d322e4abcbcafb80bc981d601";


let peticionPOST={
    method: "POST",
    headers: {
        "content-type": "application/x-www-form-urlencoded"
    },
    body: llave1+'&'+llave2+'&'+llave3
}



fetch(URLPOST, peticionPOST)
    .then(function(respuesta){
        return(respuesta.json())
    })
    .then(function(datos){

        let token=`${datos.token_type} ${datos.access_token}`
        traerCanciones(token)
        console.log(token); 
    })

     function traerCanciones(token) {
        let URL="https://api.spotify.com/v1/artists/2miffAnnUvKSyB9ykA2su9/top-tracks?market=ES"

        let peticionGET= {
            method: "GET",
            headers:{
                Authorization:token}
            }

    fetch(URL, peticionGET)
        .then(function(respuesta){
        return(respuesta.json())
        })
        .then(function(datos){
            depurarDatos(datos);
        })
    }
 
  function depurarDatos(datos) {
        let pistas = datos.tracks;
        console.log(pistas);
        let datosFiltrados=pistas.map(function(pista){
            return {
                nombre: pista.name,
                audio: pista.preview_url,
                foto: pista.album.images[0].url,
                popularidad:pista.popularity
            }
           
        })
        console.log(datosFiltrados);
        pintarDatos(datosFiltrados)
    } 

function pintarDatos(datosFiltrados) {

console.log(datosFiltrados);
 
    //Imagenes
    let img1 = document.getElementById("img1")
    img1.src= datosFiltrados[1].foto
    let img2 = document.getElementById("img2")
    img2.src= datosFiltrados[2].foto
    let img3 = document.getElementById("img3")
    img3.src= datosFiltrados[0].foto


    //Titulo
    let titleSong1 = document.getElementById("titleSong1")
    titleSong1.innerHTML= datosFiltrados[1].nombre
    let titleSong2 = document.getElementById("titleSong2")
    titleSong2.innerHTML= datosFiltrados[2].nombre
    let titleSong3 = document.getElementById("titleSong3")
    titleSong3.innerHTML= datosFiltrados[0].nombre

    //Audio
    let audio1 = document.getElementById("audio1")
    audio1.src= datosFiltrados[1].audio
    let audio2 = document.getElementById("audio2")
    audio2.src= datosFiltrados[2].audio
    let audio3 = document.getElementById("audio3")
    audio3.src= datosFiltrados[0].audio


} 

 /* //1. url del servicio a consumir (uri) ¿Para donde voy?
const URL = "https://api.spotify.com/v1/artists/2miffAnnUvKSyB9ykA2su9/top-tracks?market=ES";

//2. Variable para almacenar TOKEN de acceso
const TOKEN="Bearer BQALhJ9blyQn9lAIvYw3q9MgBuTNXgmkDh6dMoE7Us3hQCzLO1kQVIHfmLA1HB-a2lXJPP8Px6KCRtN34DIjCUkRbXm4iyeSmt6kkv1SHZdGGzpImyah_iwlz_aUXeb-61b1eGHlHyNg-M5GXSfeB8NTcYYkyWyUIlE";

//3. Construir la peticion al servidor
let peticion = {
    method: "GET",
    headers: {
        Authorization: TOKEN
    }
}  */