import { getGames } from "./getGames";

export const search = ( searchTerm ) => {

        console.log(searchTerm);
        //element.value;
        return  getGames('/games', 
        { fields: `fields name, summary, cover.url, artworks.url, cover.image_id, screenshots.url, similar_games.name; where name = "${searchTerm}"*;` }) 
        .then( (games) => games );

} 