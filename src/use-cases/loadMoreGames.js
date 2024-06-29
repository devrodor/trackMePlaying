import { getData } from "./getData";
import Router from "../router";
import SearchData from "../classes/SearchData";

//const userData = new UserData(); // reset on every instantiation.
const dataUser = new SearchData();
const router = Router(); 
const root = document.getElementById('app'); 
const loadMoreButton = document.getElementById('loadMore');

//todo: refactor
export const loadMore = async() => {  
       
       const userLog = dataUser.getUserData();

       const userSearch = userLog.lastSearchTerm;
       const userPlatform = userLog.platform; 
       const userOffset = userLog.offset;
       const userTerms = userLog.resulTerms; 
       const offset = userOffset + 30;
       const limit = userLog.limit;
 
       let searchValue;
       let platformValue;
       (userSearch) ? searchValue = `name ~ "${userSearch}"*;` : searchValue = ``;
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
            dataUser.setUserData('resulTerms', newGames);  
        })
        .catch(error => {
            console.error('Error fetching games:', error);
        }) 
        .finally(() => {   
            dataUser.setUserData('offset', offset);
        })
        
 
}
