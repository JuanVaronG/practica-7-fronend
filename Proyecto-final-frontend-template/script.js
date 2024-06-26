const tareas = [
    {
        "_id": "1",
        "titulo": "caminar",
        "descripcion": "salir a caminar en las mañanas",
        "estado": "activa",
        "responsable": "sebas"
    },
    {
        "_id": "2",
        "titulo": "ir al gimnasio",
        "descripcion": "salir al gimnasio en las tardes luego del trabajo",
        "estado": "activa",
        "responsable": "sebas"
    },
    {
        "_id": "3",
        "titulo": "Pasear al perror",
        "descripcion": "salir a caminar en las mañanas con el perro",
        "estado": "activa",
        "responsable": "sebas"
    },
    {
        "_id": "4",
        "titulo": "limpiar la cocina",
        "descripcion": "limpiar la cocina despues de cocinar",
        "estado": "activa",
        "responsable": "sebas"
    }
]

const crearTarea = async (tarea) => {
    // enviar consulta a la API para crear una tarea
    //alert('tarea creada')

    tareas.estado = "inactiva"
    tareas.push(tarea)
}

const obtenerTareas = async () => {
    // enviar consulta a la API para obtener todas las tareas

    return tareas
}

const verTarea = async (id) => {
    // enviar consulta a la API para obtener la tarea con el id
    alert('tera obtenida')
    return {
        "_id": "4",
        "titulo": "caminata en las mañanas",
        "descripcion": "salir a caminar en las mañanas",
        "estado": "activa",
        "responsable": "sebas"
    }
}

const editarTarea = async (id, tareaEditada) => {
    // enviar consulta a la API para obtener la tarea con el id
    alert('tarea editada')
}


const eliminarTarea = async (id) => {
    // enviar consulta a la API para eliminar la tarea con el id
    alert('tarea eliminada')
}

// -----------------------  Renderizar tareas en el HTML -----------------------
const listaTareas = document.getElementById('lista-tareas')
const renderTareas = async () => {

    listaTareas.innerHTML = ""
    
    const listaTareasObtenidas = await obtenerTareas()

    // crear bucle para recorrer cada tarea 
    listaTareasObtenidas.forEach((tarea) => {
        /* console.log(tarea) */

        const listItem = document.createElement("li")
        const article = document.createElement("article")
        const datos = document.createElement("div")
        datos.classList.add("tarea")

        const titulo = document.createElement("h4")
        const estado = document.createElement("p")
        const responsable = document.createElement("p")

        titulo.innerText = `Titulo: ${tarea.titulo}`
        estado.innerText = `Estado: ${tarea.estado}`
        responsable.innerText = `Responsable: ${tarea.responsable}`

        datos.appendChild(titulo)
        datos.appendChild(estado)
        datos.appendChild(responsable)

        article.appendChild(datos)
        listItem.appendChild(article)
        
        listaTareas.appendChild(listItem)

        // -----Botones---------
        const wrapperBotones = document.createElement("div")
        wrapperBotones.classList.add("wrapper-botones")

        const buttonVerMas = document.createElement("button")
        const buttonEditar = document.createElement("button")
        const buttonEliminar = document.createElement("button")

        buttonVerMas.innerText = `Ver mas`
        buttonEditar.innerText = `Editar`
        buttonEliminar.innerText = `Eliminar`

        wrapperBotones.appendChild(buttonVerMas)
        wrapperBotones.appendChild(buttonEditar)
        wrapperBotones.appendChild(buttonEliminar)

        article.appendChild(wrapperBotones)

        // -------agregar evento click al buton ver mas-------

        buttonVerMas.addEventListener("click", async () =>{
            //console.log(tarea._id)
            const tareaObtenida = await verTarea(tarea._id)
            //console.log(tareaObtenida)

            const descripcion = document.createElement("p")
            descripcion.innerText = `Descripcion: ${tareaObtenida.descripcion}`
            datos.appendChild(descripcion)
            //deshabilitar el botos
            buttonVerMas.disabled = true

        })

        //-----------------agregar evento click al boton editar-----------------------------
        buttonEditar.addEventListener("click", async () => {
            console.log(tarea._id)

            const wrapperEditarTarea = document.getElementById("wrapper-form-editar")
            wrapperEditarTarea.style.display = "grid"

            const tareaObtenida = await verTarea(tarea._id)

            const inputEditarTitulo = document.getElementById("editar-titulo")
            const inputEditarDescripcion = document.getElementById("editar-descripcion")
            const inputEditarResponsable = document.getElementById("editar-responsable")
            const inputEditarEstado = document.getElementById("editar-estado")

            inputEditarTitulo.value = tareaObtenida.titulo
            inputEditarDescripcion.value = tareaObtenida.descripcion
            inputEditarResponsable.value = tareaObtenida.responsable
            inputEditarEstado.value = tareaObtenida.estado
            
            const formEditarTarea = document.getElementById("form-editar-tarea")
            formEditarTarea.addEventListener("submit", async (event) =>{
                event.preventDefault()

                const data = Object.fromEntries(new FormData(event.target))

                await editarTarea(tarea._id, data)
            })

        })

    })
}

// -----------------------  Abrir y Cerra ventana crear tarea -----------------------
const wrapperFormCrear = document.getElementById('wrapper-form-crear')

const buttonAbrirFormCrear = document.getElementById('abrir-form-crear')
buttonAbrirFormCrear.addEventListener('click', () => {
    wrapperFormCrear.style.display = 'grid'
})

const buttonCerrarFormCrear = document.getElementById('cerrar-form-crear')
buttonCerrarFormCrear.addEventListener('click', () => {
    wrapperFormCrear.style.display = 'none'
})

// -----------------------  Abrir ventana editar tarea -----------------------
const buttonCerrarFormEditar = document.getElementById('cerrar-form-editar')
buttonCerrarFormEditar.addEventListener('click', () => {
    const editarTarea = document.getElementById('wrapper-form-editar')
    editarTarea.style.display = 'none'
})

// -----------------------  Crear tarea -----------------------
const formCrearTarea = document.getElementById('form-crear-tarea')
formCrearTarea.addEventListener('submit', async (event) => {
   
    event.preventDefault()
    
    // ---leer los datos del formulario

    const data = Object.fromEntries(new FormData(event.target))
    //console.log(data)

    await crearTarea(data)

    wrapperFormCrear.style.display = "none"
   
    renderTareas()



})

// -----------------------  Filtrar tareas por estado -----------------------
let estado = ''
const selectEstado = document.getElementById('select-estado')
selectEstado.addEventListener('change', (e) => {
})

window.addEventListener('load', renderTareas)