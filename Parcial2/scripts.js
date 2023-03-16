var peliculas = localStorage.getItem('peliculas')
if (!peliculas){
    localStorage.setItem('peliculas', [])
}

function crearCards(){
    var cards = document.querySelector('#cards .row')
    cards.innerHTML = ''

    if (peliculas){
        var listadoPeliculas = JSON.parse (peliculas)

        for (var i = 0; i < listadoPeliculas.length; i++){
            var pelicula = listadoPeliculas[i]
            var htmlCard = `                
            <div class="card" style="width: 18rem;">
            <img src="${pelicula.imagen}" class="card-img-top" alt="Portada de ${pelicula.titulo}">
            <div class="card-body">
                <h5 class="card-title">${pelicula.titulo}</h5>
                <p class="card-text">${pelicula.descripcion}</p>
                <a href="#" class="btn btn-primary">Editar</a>
            </div>
        </div>`

        cards.innerHTML += htmlCard
        }
    }
}


var verFormulario = false

function mostrarFormulario() {
    var formulario = document.getElementById('crearFormulario')
    var cards = document.getElementById('cards')
    var crearBtn = document.getElementById('crearBtn')
    console.log(crearBtn)

    if (!verFormulario) {
        formulario.style.display = 'block'
        cards.style.display = 'none'
        verFormulario = true
        crearBtn.innerText = 'Cancelar'
    } else {
        formulario.style.display = 'none'
        cards.style.display = 'block'
        verFormulario = false
        crearBtn.innerText = 'Crear'
    }
}

var crearFormulario = document.getElementById('crearFormulario')
crearFormulario.addEventListener('submit', function(e) {
e.preventDefault()

var formulario = new FormData(crearFormulario)
var pelicula = {
    'titulo' : formulario.get('formTitle'),
    'imagen' : formulario.get('formImage'),
    'descripcion' : formulario.get('formDescription')
}
if (!peliculas) {
    var listadoPeliculas = [
        pelicula
    ]

    localStorage.setItem('peliculas', JSON.stringify(listadoPeliculas))
} else {
    var listadoPeliculas = JSON.parse(peliculas)
    listadoPeliculas.push(pelicula)
    localStorage.setItem('peliculas', JSON.stringify(listadoPeliculas))
}

crearFormulario.reset()
mostrarFormulario()
crearCards()

})