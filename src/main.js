import './assets/css/style.css'; 
import Router from './router';  
 
import SearchData from './classes/SearchData';
import { getData } from './use-cases/getData';  
import { loadMore } from './use-cases/loadMoreGames';  
import { getPlatforms } from './use-cases/getPlatforms';
//import { doSearch, doSuggestSearch } from './use-cases/searchGames';  
import { doSearch, doSuggestSearch } from './use-cases/search';  


//const user = new UserData();
const datauser = new SearchData();

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
                          .then(( games )=> { datauser.initState(games); return games; })
                          .then(( games )=> router.renderMethod( root, games )) 
            //search
            searchBar.addEventListener('keyup', () => {    
                doSearch(searchBar);
            }); 

            //filter 
            getPlatforms(selectPlatforms); 

            //todo: reset filter in userObject to search all platforms in case no platform is selected
            selectPlatforms.addEventListener('change',()=>{
                doSearch(searchBar); 
                datauser.setUserData('platform', eval(selectPlatforms.value));
            })

            //loadMore
            const butonMore = document.getElementById('loadMore'); 
            butonMore.style.display = 'flex';
            butonMore.addEventListener('click',  () => {  
              loadMore(datauser);  
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
 


                  

  