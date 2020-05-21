class Interfaz {
    constructor() {
        this.init();
    }
    init() {
        this.construirSelect();
    }

    construirSelect() {
        cotizador.obtenerMonedasAPI()
            .then(monedas => {

                // Crear un select con opciones
                const select = document.querySelector('#criptomoneda');

                // Iterar por los resultados de la API
                for (const [key, value] of Object.entries(monedas.monedas.Data)) {
                    // Añadir el symbol y el Nombre con opciones
                    const opcion = document.createElement('option');
                    opcion.value = value.Symbol;
                    opcion.appendChild(document.createTextNode(value.CoinName));
                    select.appendChild(opcion);
                }
            })
    }

    mostrarMensaje(mensaje, clases) {
        const div = document.createElement('div');
        div.className = clases;
        div.appendChild(document.createTextNode(mensaje));

        // Seleccionar mensajes
        const divMensaje = document.querySelector('.mensajes');
        divMensaje.appendChild(div)

        // Mostrar contenido
        setTimeout(() => {
            document.querySelector('.mensajes div').remove();
        }, 2000);
    }

    // Imprime el resultado de la cryptomoneda que le pasemos
    mostrarResultado(resultado, moneda, crypto) {

        const resultadoAnterior = document.querySelector('#resultado > div');

        if(resultadoAnterior) {
            resultadoAnterior.remove();
        }

        const datosMoneda = resultado[crypto][moneda];

        let precio = datosMoneda.PRICE.toFixed(2),
            porcentaje = datosMoneda.CHANGEPCTDAY.toFixed(2),
            actualizado = new Date(datosMoneda.LASTUPDATE * 1000).toLocaleDateString('es-ES');

        // Construir el template
        let templateHTML = `
            <div class="card bg-warning">
                <div class="card-body text-light">
                    <h2 class="card-title">Resultado:</h2>
                    <p>El Precio de ${datosMoneda.FROMSYMBOL} a moneda ${datosMoneda.TOSYMBOL} es de: $${precio}</p>
                    <p>Variación último dia: % ${porcentaje}</p>
                    <p>Ultima actualizadion: % ${actualizado}</p>
                </div>
            </div>
        `;
        this.mostrarOcultarSpinner('block');

        setTimeout(() => {
            // Insertar el resultado
            document.querySelector('#resultado').innerHTML = templateHTML;
            this.mostrarOcultarSpinner('none');
        }, 3000);
    }

    // Mostrar un spinner de carga al enviar la cotización
    mostrarOcultarSpinner(vista) {


        const spinner = document.querySelector('.contenido-spinner');
        spinner.style.display = vista;
    }
}