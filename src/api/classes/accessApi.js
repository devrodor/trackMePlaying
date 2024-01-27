export class accessApi {

    constructor( tokenGenerator ) {

        /**
         * @type {tokenGenerator} tokenGenerator
         */
        this.tokenGenerator = tokenGenerator;

    }

    /**
     * 
     * @param {string} endPoint 
     * @param {Object} options 
     * @returns {Promise<Object>}
     */
    async request( endPoint, options = {}) {

        const tokenData = this.tokenGenerator.getTokenData;

        if(!tokenData) {
            throw new Error('No token has been generated.');
        }

        const headers = {
            ...options.headers,
            'Client-ID': tokenData.clientId, 
            Authorization: `Bearer ${tokenData.access_token}`, 
            // Otros encabezados que tu API pueda requerir
        };

        const response = await fetch(endPoint, {
            ...options,
            headers,
            method: 'POST'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();


    }

}