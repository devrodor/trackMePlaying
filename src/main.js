import './assets/css/style.css'; 
import { getGames } from './use-cases/getGames';
import { RenderItems } from './classes/RenderItems'; 

//getCredentials();
const renderGames = new RenderItems('app');
const foo = await getGames().then(( games )=> renderGames.render( games ));

 
