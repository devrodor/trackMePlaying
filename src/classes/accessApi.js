export class apiConnection {

    constructor() {

        this.endPoint = import.meta.env.VITE_API_ENDPOINT;
        //this.endPoint = 'http://localhost/v1'
        this.apiKey = import.meta.env.VITE_API_KEY;
        //this.apiKey = "1234";

    }

    /**
     * Realiza una solicitud a la API.
     * @param {string} servicePath - El path del servicio de la API (ejemplo: '/games/31910').
     * @param {Object} params - Parámetros adicionales para la solicitud.
     * @returns {Promise<Object>} Una promesa que resuelve con la respuesta de la API.
     */
     async requestExample( servicePath = '/games', params = { limit: 1} ) {

            params['api_key'] = this.apiKey;
            const urlParams = { ...params, api_key: this.apiKey };

            // Construye la cadena de consulta
            const queryString  = Object.keys(urlParams)
                .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(urlParams[key])}`)
                .join('&');

            const url = `${this.endPoint}${servicePath}?${queryString}`; 
 
            try {
                const response = await fetch(url, {
                    method: 'GET',
                    mode: 'no-cors'
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            } catch (error) {
                console.error("Error fetching data: ", error);
                throw error;
            }
  
        }

    }
 
