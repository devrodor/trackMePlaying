import { getData } from "./getData";
import Router from "../router";  

const router = Router(); 
const root = document.getElementById('app'); 
const searchBar = document.getElementById('default-search'); 
const loadMoreButton = document.getElementById('loadMore'); 

//todo: refactor
export const loadMore = async(datauser) => {  
        
       const userSearch = searchBar.value;
       const userPlatform = datauser.userObj.platform; 
       const userOffset = datauser.userObj.offset;
       const userTerms = datauser.userObj.resulTerms; 
       const offset = userOffset + 30;
       const limit = datauser.userObj.limit;
 
       let searchValue;
       let platformValue;
       (userSearch) ? searchValue = `name ~ "${userSearch}"*;` : searchValue = `name ~ ""*;`;
       (userPlatform) ? platformValue = `platforms = ${userPlatform} &` : platformValue = ``;

       console.log(`fields name, summary, cover.url, artworks.url, cover.image_id, screenshots.url, similar_games.name; limit ${limit}; offset ${offset}; where ${platformValue} ${searchValue}`);
 
       await getData('/games', 
       { fields: `fields name, summary, cover.url, artworks.url, cover.image_id, screenshots.url, similar_games.name; limit ${limit}; offset ${offset}; where ${platformValue} ${searchValue}` }) 
       .then(games => { 
            loadMoreButton.disabled = false;

            if(games.length <= 1) { 
                loadMoreButton.disabled = true; 
            } 

            const newGames = [...userTerms,...games];
            return newGames;
        })
        .then((newGames) => { 
            router.renderMethod( root, newGames ); 
            datauser.userObj.resulTerms = newGames;
            datauser.userObj.lastSearchTerm = searchBar.value;
         
        })
        .catch(error => {
            console.error('Error fetching games:', error);
        })
        .finally(()=>{
            datauser.userObj.offset = offset; 
        })  
         
 
}
