import './assets/css/style.css'; 
import { getGames } from './use-cases/getGames'; 
import Router from './Router';

const root = document.getElementById('app');
const router = Router();

switch(router.templateName){
  default:
  case 'gridPost':
            await getGames('/games', 
                          { fields: 'fields name, summary, cover.url, artworks.url, screenshots.url, similar_games.name; limit 30;' }) 
                          .then(( games )=> router.renderMethod( root, games ));
            break;
  case 'singlePost':
    await getGames('/games', 
                  { fields: `fields name, summary, cover.url, artworks.url, cover.image_id, screenshots.url, similar_games.name; where id = ${router.itemId};` }) 
                  .then(( games )=> console.log( games ));
    await getGames('/games', 
                  { fields: `fields name, summary, cover.url, artworks.url, cover.image_id, screenshots.url, similar_games.name; where id = ${router.itemId};` }) 
                  .then(( games )=> router.renderMethod( root, games ));
    break;         

}


                  

  