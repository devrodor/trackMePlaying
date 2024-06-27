import './assets/css/style.css'; 
import Router from './router'; 
import UserData from './classes/UserData';
import { getData } from './use-cases/getData';  
import { loadMore } from './use-cases/loadMoreGames';  
import { getPlatforms } from './use-cases/getPlatforms';
//import { doSearch, doSuggestSearch } from './use-cases/searchGames';  
import { doSearch, doSuggestSearch } from './use-cases/search';  

const user = new UserData();

//elements
const root = document.getElementById('app'); 
const searchBar = document.getElementById('default-search'); 
const selectPlatforms = document.getElementById('platforms');
 
const limitEntries = 50;  
const router = Router();    
 
// load template
switch(router.templateName){
  default:
  case 'gridPost':

            await getData('/games', 
                          { fields: `fields name, summary, cover.url, artworks.url, screenshots.url, similar_games.name; limit ${limitEntries};` })
                          .then(( games )=> { user.initState(games); return games; })
                          .then(( games )=> router.renderMethod( root, games )) 
            //search
            searchBar.addEventListener('keyup', () => {    
                doSearch(searchBar);
            }); 

            //filter 
            getPlatforms(selectPlatforms); 

            selectPlatforms.addEventListener('change',()=>{
              if(searchBar.value !== '') {
                doSearch(searchBar);
              }

            })

            //loadMore
            const butonMore = document.getElementById('loadMore'); 
            butonMore.style.display = 'flex';
            butonMore.addEventListener('click',  () => {  
              loadMore();  
            });  
            break;

  case 'singlePost':
            await getData('/games', 
                          { fields: `fields name, summary, cover.url, artworks.url, cover.image_id, screenshots.url, similar_games.name; where id = ${router.itemId};` }) 
                          .then(( games )=> router.renderMethod( root, games ));
                          document.addEventListener('keyup', () => {   
                              doSuggestSearch();
                          });  
                          
            break;         

}
 


                  

  