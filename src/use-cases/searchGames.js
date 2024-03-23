import { getGames } from "./getGames"; 
import Router from "../Router";

const root = document.getElementById('app'); 
const router = Router(); 


export const searchGames = async( searchTerm ) => {

        //element.value;
        return await getGames('/games', 
        { fields: `fields name, summary, cover.url, artworks.url, cover.image_id, screenshots.url, similar_games.name; where name = *"${searchTerm}"*;` }) 
        .then( (games) => games );

} 


let timerElement = null;


export const doSearch = (searchelement,loading) => {
 
        console.log('Searching...');

       loading.style.display = 'flex';
                            
        clearTimeout(timerElement);
        timerElement = setTimeout(async() => {

            const games = await searchGames(searchelement.value);
            router.renderMethod( root, games );
            root.prepend(router.additionalComponent);
            loading.style.display = 'none';

        }, 400); 

}