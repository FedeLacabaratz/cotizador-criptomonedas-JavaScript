class API {
    constructor(apikey) {
        this.apikey = apikey
    }

    // Obtener todas las monedas
    async obtenerMonedasAPI() {
        const url = `https://min-api.cryptocompare.com/data/all/coinlist?api_key=${this.apikey}`;

        // Fetch a la url
        const urlObtenerMonedas = await fetch(url);

        // Respuesta en JSON
        const monedas = await urlObtenerMonedas.json()
        return {
            monedas
        }
    }

    async obtenerValores(moneda, cryptoMoneda) {
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoMoneda}&tsyms=${moneda}&api_key=${this.apikey}`

        // Fetch a la url consultar REST API
        const urlConvertir = await fetch(url);

        const resultado = await urlConvertir.json();

        return {
            resultado
        }
    }
}