import { getGames } from "./getGames";  
import { mapPlatforms } from "../helpers/mapPlatforms";
import Router from "../router";

const router = Router();  
const root = document.getElementById('app'); 

const filterGames =  async(filters, searchterm) => {
 
    let searchString = '';
    let platformsString = '';

    if(searchterm !== '') {
        searchString = `& name ~ "${searchterm}"*`;
    }   
 
    const objPlatforms = mapPlatforms(filters); 
    const platforms = objPlatforms.join(","); 

    if(platforms !== '') {
        platformsString = `where release_dates.platform = (${platforms})`;
    } 

    console.log(`fields name, summary, cover.url, artworks.url, cover.image_id, screenshots.url, similar_games.name; limit 30; ${platformsString} ${searchString}`);

    return await getGames('/games', 
        { fields: `fields name, summary, cover.url, artworks.url, cover.image_id, screenshots.url, similar_games.name; limit 30; ${platformsString} ${searchString};`}) 
        .then( (games) => games );



}

export const doFilterGames = async(filters, searchterm) => {

    const games = await filterGames(filters, searchterm);  
    router.renderMethod( root, games ); 

}