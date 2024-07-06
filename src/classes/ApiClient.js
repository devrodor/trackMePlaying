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
     * Stablish expiration date
     * @returns {Object}
     */
    async generateToken() {
  
        if(!this.proxyUrl) throw new Error(`Initialization error. No valid proxy URL`); 
        if(!this.twitchUrl) throw new Error(`Initialization error. No valid endpoint`); 

        const clientString = localStorage.getItem('clientdata');
        let client = clientString ? JSON.parse(clientString) : null; 
        const now = Date.now(); 

        if (!client || (client && (now > client.expires_limit))) { // fixed both checks...

             try {

                const response = await fetch(`${this.twitchUrl}?client_id=${this.clientId}&client_secret=${this.clientSecret}&grant_type=client_credentials`, {
                    method: 'POST'
                });
                if(response.status !== 200){ 
                    throw new Error(`Client error! status: ${response.status}`);
                }
                const data = await response.json(); 
 
                let expiration = now + data.expires_in * 1000; // converts expires_in to miliseconds and adds now time in miliseconds

                client = {
                        access_token: data.access_token, 
                        expires_in: data.expires_in, 
                        expires_limit: expiration,  
                        token_type: data.token_type
                } ;
                localStorage.setItem('clientdata', JSON.stringify(client)); 
             } catch( err ) {
                 throw err;
             }

        }    

        return client.access_token;
    } 
//}

    /**
     * api call
     * @param {string} servicePath - api endpoint (ex: '/games/31910'). 
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
 
                console.log(body.fields); 

                if(response !== 401) {
                    //control 401 response
                    await this.generateToken(); 
                } 
 
                const headers = response.headers;
                const totals = headers.get('x-count');
             
                const data = await response.json(); // await here is necessary, as we want to get the whole json before inserting headers
                data.totals = totals; 
        
                return data;

            } catch (error) {    
                throw error;
            }
  
        }

    }
 
