import './assets/css/style.css'; 
import { tokenGenerator, apiConsumer } from './api/igdbAPI'; 


tokenGenerator.generateToken()
                .then( () => {

                    apiConsumer.request('https://api.igdb.com/v4/games', tokenGenerator.getTokenData)
                    .then(response => {
                        console.log('Respuesta de la API:', response);
                    }).catch(error => {
                        console.error('Error en la solicitud de la API:', error);
                    });

                    
                }).catch(error => {
                    console.error('Error generating token:', error);
                });