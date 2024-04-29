import UserData from "../classes/UserData";
import { getGames } from "./getGames";
import Router from "../Router";

const userData = new UserData(); // this causes the object to reset on every instantiation
const router = Router(); 
const root = document.getElementById('app'); 

//todo: refactor
export const loadMore = async() => {  
      
       const userLog = userData.getUserData();

       const userSearch = userLog.lastSearchTerm; 
       const userOffset = userLog.offset;
       const userTerms = userLog.resulTerms; 
       const offset = userOffset + 30;
       const limit = userLog.limit;
 
       let searchValue;
       (userSearch) ? searchValue = `where name ~ "${userLog.lastSearchTerm}"*;` : searchValue = ``;
 
       await getGames('/games', 
       { fields: `fields name, summary, cover.url, artworks.url, cover.image_id, screenshots.url, similar_games.name; limit ${limit}; offset ${offset}; ${searchValue}` }) 
       .then(games => { 
            const newGames = [...userTerms,...games];
            console.log(newGames);  
            return newGames;
        })
        .then((newGames) => { router.renderMethod( root, newGames ); userData.setUserData('resulTerms', newGames); })
        .catch(error => {
            console.error('Error fetching games:', error);
        }) 
        .finally(() => {   
            userData.setUserData('offset', offset);
        })
        
 
}
