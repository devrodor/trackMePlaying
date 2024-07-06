import './assets/css/style.css'; 
import Router from './router';  
  
import searchData from './helpers/searchData'; 

import { getData } from './use-cases/getData';  
import { loadMore } from './use-cases/loadMoreGames';  
import { getPlatforms } from './use-cases/getPlatforms';
//import { doSearch, doSuggestSearch } from './use-cases/searchGames';  
import { doSearch, doSuggestSearch } from './use-cases/search';  
 

//elements
const root = document.getElementById('app'); 
const searchBar = document.getElementById('default-search'); 
const selectPlatforms = document.getElementById('platforms');
 
const limitEntries = 50;  
const router = Router();    
 
//filters by platform
getPlatforms(selectPlatforms); 
selectPlatforms.addEventListener('change',()=>{
  doSearch(searchBar); 
  searchData.platform = eval(selectPlatforms.value); 
})
 
// load template
switch(router.templateName){
  default:
  case 'gridPost':

            await getData('/games', 
                          { fields: `fields name, summary, cover.url, artworks.url, screenshots.url, similar_games.name; limit ${limitEntries};` })
                          .then(( games )=> { searchData.resulTerms = games; return games; })
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
            await getData('/games', 
                          { fields: `fields name, summary, cover.url, artworks.url, cover.image_id, screenshots.url, similar_games.name; where id = ${router.itemId};` }) 
                          .then(( games )=> router.renderMethod( root, games ));
            //suggested search
            document.addEventListener('keyup', () => {   
                doSuggestSearch();
            });  
                          
            break;         

}
 


                  

  