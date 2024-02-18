import './assets/css/style.css'; 
import { getGames } from './use-cases/getGames';
import { RenderItems } from './classes/RenderItems'; 
 
const gamesList = new RenderItems('app');
const show = await getGames(
                    '/games', 
                    { fields: 'fields name, summary, cover.url, artworks.url, screenshots.url, similar_games.name;' }, 
                    { limit: 10 })
                    //.then(( elements ) => console.log( elements ))
                    .then(( games )=> gamesList.render( games ));

 
