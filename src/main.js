import './assets/css/style.css'; 
import { getGames } from './use-cases/getGames'; 
import { TemplateEngine } from './classes/TemplateEngine';
 
const gameGrid = new TemplateEngine('app');
 
await getGames(
                    '/games', 
                    { fields: 'fields name, summary, cover.url, artworks.url, screenshots.url, similar_games.name;' }, 
                    { limit: 10 }) 
                    .then(( games )=> gameGrid.render( games ));
                  

  