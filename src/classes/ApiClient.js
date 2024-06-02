export class ApiClient {

    constructor() {

        this.proxyUrl       = import.meta.env.VITE_PROXY_URL;
        this.twitchUrl      = import.meta.env.VITE_GENERATE_TOKEN_ENDPOINT;
        this.endPoint       = import.meta.env.VITE_API_ENDPOINT; 
        this.clientId       = import.meta.env.VITE_CLIENT_ID
        this.clientSecret   = import.meta.env.VITE_CLIENT_SECRET 
  
    }
  
    /**
     * Get service credentials
     * @returns {Object}
     */
    async generateToken() {
  
        if(!this.proxyUrl) throw new Error(`Initialization error. No valid proxy URL`); 
        if(!this.twitchUrl) throw new Error(`Initialization error. No valid endpoint`); 
 
        try {

            const response = await fetch(`${this.twitchUrl}?client_id=${this.clientId}&client_secret=${this.clientSecret}&grant_type=client_credentials`, {
                method: 'POST'
            });
            if(response.status !== 200){ 
                throw new Error(`Client error! status: ${response.status}`);
            }
            const data = await response.json();
 
            /*let credentials = {
                access_token: data.access_token, 
                expires_in: data.expires_in,
                token_type: data.token_type
            } 
            localStorage.setItem('client', JSON.stringify(credentials));*/
            
            localStorage.setItem('accesstoken', data.access_token); 
 
            return data.access_token;   

        } catch( err ) {
            throw err;
        }
    } 

    /**
     * api call
     * @param {string} servicePath - api endpoint (ejemplo: '/games/31910'). 
     * @returns {Promise<Object>} - api response
     */
     async apiConn( accessToken, servicePath = '/games', body = { fields: '*' }, params = { limit: 1 } ) {
 
            const url = `${this.endPoint}${servicePath}`; 
  
            try {
                const response = await fetch(this.proxyUrl + url, {
                    method: 'POST',
                    headers: {
                        'Client-ID': this.clientId,
                        'Authorization': `Bearer ${accessToken}`,
                        'Accept': 'application/json',
                        'Content-Type': 'text/plain',
                    },
                    body: body.fields,
                });  
 
                if(response !== 401) {
                    //control 401 response
                    await this.generateToken(); // instancio metodo
                } 
                return response.json();
            } catch (error) {  
                console.log(response.json);
                console.error("Error fetching data: ", error);
                throw error;
             
            }
  
        }

    }
 
