import './assets/css/style.css'; 
import Router from './Router';
import { getGames } from './use-cases/getGames';  
import { searchGames,doSearch } from './use-cases/searchGames';
 
const root = document.getElementById('app'); 
const router = Router(); 
 
// load template
switch(router.templateName){
  default:
  case 'gridPost':

            await getGames('/games', 
                          { fields: 'fields name, summary, cover.url, artworks.url, screenshots.url, similar_games.name; limit 30;' }) 
                          .then(( games )=> router.renderMethod( root, games ));
                          root.prepend(router.additionalComponent); // aditional UI component (search)
  
                          //search
                            document.addEventListener('keyup', (event) => {  
                              if (event.target.id === 'default-search') {
                                const searchBar = event.target;
                                const loading = document.getElementById('spinner');
                                doSearch(searchBar, loading);
                              } 
                            });   
            break;

  case 'singlePost':
            await getGames('/games', 
                          { fields: `fields name, summary, cover.url, artworks.url, cover.image_id, screenshots.url, similar_games.name; where id = ${router.itemId};` }) 
                          .then(( games )=> router.renderMethod( root, games ));
            break;         

}


                  

  