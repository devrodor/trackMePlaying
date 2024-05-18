import './assets/css/style.css'; 
import Router from './Router'; 
import UserData from './classes/UserData';
import { getGames } from './use-cases/getGames'; 
import { loadMore } from './use-cases/loadMoreGames';  
import { doSearch, doSuggestSearch } from './use-cases/searchGames'; 

const user = new UserData();

const root = document.getElementById('app'); 
const searchBar = document.getElementById('default-search');

const limitEntries = 50; 
 
const router = Router();    
  
// load template
switch(router.templateName){
  default:
  case 'gridPost':

            await getGames('/games', 
                          { fields: `fields name, summary, cover.url, artworks.url, screenshots.url, similar_games.name; limit ${limitEntries};` })
                          .then(( games )=> { user.initState(games); return games; })
                          .then(( games )=> router.renderMethod( root, games )) 
            //search
            searchBar.addEventListener('keyup', () => {    
                doSearch(searchBar);
            });

            //loadMore
            const butonMore = document.getElementById('loadMore'); 
            butonMore.style.display = 'flex';
            butonMore.addEventListener('click',  () => {  
              loadMore();  
            });  
            break;

  case 'singlePost':
            await getGames('/games', 
                          { fields: `fields name, summary, cover.url, artworks.url, cover.image_id, screenshots.url, similar_games.name; where id = ${router.itemId};` }) 
                          .then(( games )=> router.renderMethod( root, games ));
                          document.addEventListener('keyup', () => {   
                              doSuggestSearch();
                          });  
                          
            break;         

}
 


                  

  