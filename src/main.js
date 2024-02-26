import './assets/css/style.css'; 
import { getGames } from './use-cases/getGames'; 
import { render } from './ui/templates/gridPostTemplate';

const root = document.getElementById('app');

await getGames('/games', 
                { fields: 'fields name, summary, cover.url, artworks.url, screenshots.url, similar_games.name;' }, 
                { limit: 10 }) 
                .then(( games )=> console.log( games ));
 
await getGames('/games', 
                    { fields: 'fields name, summary, cover.url, artworks.url, screenshots.url, similar_games.name;' }, 
                    { limit: 10 }) 
                    .then(( games )=> render( root, games ));
                  

  