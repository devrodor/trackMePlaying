import { getData } from "./getData";
import Router from "../router";   
import searchData from '../helpers/searchData';

const router = Router(); 
const root = document.getElementById('app'); 
const searchBar = document.getElementById('default-search'); 
const loadMoreButton = document.getElementById('loadMore'); 
let fetched = searchData.limit;

//todo: refactor
export const loadMore = async() => {  
 
       const userSearch = searchBar.value;
       const userPlatform = searchData.platform; 
       const userOffset = searchData.offset;
       const userTerms = searchData.resulTerms; 
       const offset = userOffset + 30;
       let limit = searchData.limit;  
       
       console.log('Objeto obtenido para añadir: ', userTerms)
 
       let searchValue;
       let platformValue;
       (userSearch) ? searchValue = `name ~ "${userSearch}"*;` : searchValue = `name ~ ""*;`;
       (userPlatform) ? platformValue = `platforms = ${userPlatform} &` : platformValue = ``;

       console.log(`fields name, summary, cover.url, artworks.url, cover.image_id, screenshots.url, similar_games.name; limit ${limit}; offset ${offset}; where ${platformValue} ${searchValue}`);
 
       await getData('/games', 
       { fields: `fields name, summary, cover.url, artworks.url, cover.image_id, screenshots.url, similar_games.name; limit ${limit}; offset ${offset}; where ${platformValue} ${searchValue}` }) 
       .then(games => { 
        
            fetched = fetched + limit;
            loadMoreButton.disabled = false;   

            if(fetched >= games.totals) {
                console.log(limit);   
                loadMoreButton.classList.add('disabled:opacity-75');    
                loadMoreButton.disabled = true;
            }

            const newGames = [...userTerms,...games];
            return newGames;
        })
        .then((newGames) => { 
            router.renderMethod( root, newGames ); 
            searchData.resulTerms = newGames;
            searchData.lastSearchTerm = searchBar.value;
         
        })
        .catch(error => {
            console.error('Error fetching games:', error);
        })
        .finally(()=>{
            searchData.offset = offset; 
        })  
         
 
}
