import './assets/css/style.css'; 
import Router from './Router';
import { getGames } from './use-cases/getGames'; 
import { search } from './use-cases/searchGames'; 
 
const root = document.getElementById('app'); 
const router = Router(); 
 
// load template
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
                          .then(( games )=> router.renderMethod( root, games ));
            break;         

}

// search
root.prepend(router.additionalComponent);
const searchBar = document.getElementById('default-search');
const loading = document.getElementById('spinner');
let timer = null;

searchBar.addEventListener('keyup', ( ) => {

  loading.style.display = 'flex';
 
  clearTimeout(timer);
  timer = setTimeout(async() => {
    
    const games = await search(searchBar.value);
    router.renderMethod( root, games );

    root.prepend(router.additionalComponent);

    loading.style.display = 'none';

  }, 400);

}); 
                  

  