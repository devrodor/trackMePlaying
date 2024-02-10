import './assets/css/style.css'; 
import { ApiClient } from "./classes/ApiClient"; 
import { getGames } from './use-cases/getGames';
import { getCredentials } from './use-cases/getCredentials';

//getCredentials();
const games = await getGames().then(( games )=> console.log( games ));

 
