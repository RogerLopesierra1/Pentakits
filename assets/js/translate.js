// Elementos del DOM

let selectLanguage = document.getElementById("selectLanguage");
let  textToTranslate = document.querySelectorAll('#content');
let oldLanguage = '';
let newLanguage = '';


// LISTA DE LENGUAJES DESDE UNA API POR MEDIO DEL METODO GET


//const URl_GET = 'https://text-translator2.p.rapidapi.com/getLanguages';
const options_get = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '88e8ec745dmshccc4b6a8a8c860ap16a910jsn04e3d492a68b',
		'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
	}

}

function getIdiomas(){

    fetch(URl_GET, options_get)
    .then(res => res.json())
    .then(objetoIdioma => {
   
        // Codigo para cargar los idiomas en los selects
        let idiomas =  objetoIdioma.data.languages;
        //recorremos con un foreach cada idioma del objeto
        idiomas.forEach(idioma => {
                if(idioma.code === "es"){
                // agregamos al select con un innerHTML la etiqueta Option pasandole el code y name del idioma
                selectLanguage.innerHTML += `<option selected value="${idioma.code}">${idioma.name}</option>`;
                }
                if(idioma.code === "en" || idioma.code === "pt" || idioma.code === "it" || idioma.code === "fr"){
                // agregamos al select con un innerHTML la etiqueta Option pasandole el code y name del idioma
                selectLanguage.innerHTML += `<option value="${idioma.code}">${idioma.name}</option>`;
                }
        });

        oldLanguage =  selectLanguage.value;

    }).catch(error => alert('Ha ocurrido un error con la API de Idiomas', error))
}


oldLanguage =  selectLanguage.value;



//el guion bajo en la función de flecha (_=>) actúa como un marcador para un parámetro que no se utiliza en la función
document.querySelector("#selectLanguage").addEventListener("change", _=>{
    newLanguage = selectLanguage.value;
    console.log("cambio de idioma " + newLanguage);                                                          
});



// CONSEGUIR EL CONTENIDO Y TRADUCIRLOS UTILIZANDO UNA API DE TRADUCCION (No funciona la traducción porque al ser una API gratuita la cantidad de caracteres es limitada)


// const URL_POST = 'https://text-translator2.p.rapidapi.com/translate';
// const options_post = {
// 	method: 'POST',
// 	headers: {
// 		'content-type': 'application/x-www-form-urlencoded',
// 		'X-RapidAPI-Key': '88e8ec745dmshccc4b6a8a8c860ap16a910jsn04e3d492a68b',
// 		'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
// 	},
// 	body: new URLSearchParams({
// 		source_language: oldLanguage,
// 		target_language: newLanguage,
// 		text: textToTranslate
// 	})
// };

// function translate(){
//     selectLanguage.addEventListener("change",async _=>{
//         if(!textToTranslate) return
//         try {
//             fetch(URL_POST, options_post)
//             .then(respuesta => respuesta.json())
//             .then(respuesta => textToTranslate.innerHTML = respuesta.data.translatedText)
//             .catch(err => console.log(err))

//         } catch (error) {
//             console.log(error)
//         }
//     });
// }



getIdiomas();
//translaste();






















