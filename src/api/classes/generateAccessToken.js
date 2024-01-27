export class generateAccessToken {

    constructor() {
        /**
         * @type {Object|null} tokenData 
         */
        this.tokenData = null; // Inicializa la propiedad que almacenará los datos del token
    }

    /**
     * 
     * @returns {Promise<Object>}
     */
    async generateToken() {
        const endPoint = import.meta.env.VITE_ENDPOINT_URL;
        const initParams = {
            method: 'POST',
        };

        try {
            const response = await fetch(endPoint, initParams);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            this.tokenData = data; // Almacena los datos del token en la propiedad de la instancia

            return data; // También puedes devolver los datos por si son necesarios inmediatamente

        } catch ( err ) {
            console.error("Error fetching data: ", err);
            throw err;
        }
    }

    /**
     * 
     * @returns {Object|null}
     */
    getTokenData() {
        return this.tokenData; // Método para obtener los datos del token más tarde
    }
}
