export class ApiClient {

    constructor() {

        this.proxyUrl       = import.meta.env.VITE_PROXY_URL;
        this.twitchUrl      = import.meta.env.VITE_GENERATE_TOKEN_ENDPOINT;
        this.endPoint       = import.meta.env.VITE_API_ENDPOINT;
        this.apiKey         = import.meta.env.VITE_API_KEY;
        this.clientId       = import.meta.env.VITE_CLIENT_ID
        this.clientSecret   = import.meta.env.VITE_CLIENT_SECRET 

    }

    /**
     * Obtiene credenciales de servicio
     * @returns {Object}
     */
    async generateToken() {

        try {

            const response = await fetch(`${this.twitchUrl}?client_id=${this.clientId}&client_secret=${this.clientSecret}&grant_type=client_credentials`, {
                method: 'POST'
            });
            if(response.status !== 200){ 
                throw new Error(`Client error! status: ${response.status}`);
            }
            const data = await response.json();
            return data.access_token;

        } catch( err ) {
            throw err;
        }
    }

    
    // TODO: actualmente sólo se retornan ids. 
    // TODO: excepciones por field desconocido o 0 o -n limit 

    /**
     * Realiza una solicitud a la API.
     * @param {string} servicePath - El path del servicio de la API (ejemplo: '/games/31910').
     * @param {Object} params - Parámetros adicionales para la solicitud.
     * @returns {Promise<Object>} Una promesa que resuelve con la respuesta de la API.
     */
     async getGames( accessToken, servicePath = '/games', body = { fields: '*' }, params = { limit: 1 } ) {
 
            const urlParams = { ...params };

            // Construye la cadena de consulta
            const queryString  = Object.keys(urlParams)
                .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(urlParams[key])}`)
                .join('&');

            // URL final de consulta con parametros
            const url = `${this.endPoint}${servicePath}?${queryString}`; 
 
            try {
                const response = await fetch(this.proxyUrl + url, {
                    method: 'POST',
                    headers: {
                        'Client-ID': this.clientId,
                        'Authorization': `Bearer ${accessToken}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify( body ),
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
 