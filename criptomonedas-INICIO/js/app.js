const YOUR_API_KEY = 'XXXXXXXXXXXXXXXXXX'; // Tienes que logear en CryptoCompare.com e insertar aqui tu propia api_key para que la app funcione.
const cotizador = new API(YOUR_API_KEY);
const ui = new Interfaz();

// Leer el formulario

const formulario = document.querySelector('#formulario');

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    // Leer la moneda seleccionada
    const monedaSelect = document.querySelector('#moneda');
    const monedaSeleccionada = monedaSelect.options[monedaSelect.selectedIndex].value;
    
    // Leer la cryptomoneda seleccionada
    const cryptoMonedaSelect = document.querySelector('#criptomoneda');
    const cryptoMonedaSeleccionada = cryptoMonedaSelect.options[cryptoMonedaSelect.selectedIndex].value;

    // Comprobar que ambos campos tengan algo seleccionado
    if(monedaSeleccionada === '' || cryptoMonedaSeleccionada === '') {
        // Arrojar una alerta de error
        ui.mostrarMensaje('Rellena ambos campos para poder cotizar', 'alert bg-danger text-center');
    } else {
        // Todo bien, consultar la API
        cotizador.obtenerValores(monedaSeleccionada, cryptoMonedaSeleccionada)
            .then(data => {
                ui.mostrarResultado(data.resultado.RAW, monedaSeleccionada, cryptoMonedaSeleccionada);
            })
    }
    
});