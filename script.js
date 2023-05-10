async function getApiValue(){
    try {
        const respuesta = await fetch('../json/archivo.json')
        let datosJson = JSON.parse(respuesta)
        
        const datos = await respuesta.json()
        console.log("Esto son los datos" + datosJson)
    } catch (err) {
        console.error("La api no funciono por el siguiente error" + err)
    } finally {
        console.log("La finalizacion cumplio con todo")
    }
}

getApiValue()

// prueba que hizo el profesor con todo junto llamando a su vez al JSON establecido