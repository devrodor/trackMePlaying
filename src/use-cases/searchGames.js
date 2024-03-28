import { getGames } from "./getGames"; 
import { renderSuggestedPost } from "../ui/templates/suggestedPostTemplate";
import Router from "../Router";

const root = document.getElementById('app'); 
const router = Router(); 


const searchGames = async( searchTerm ) => {

        //element.value;
        return await getGames('/games', 
        { fields: `fields name, summary, cover.url, artworks.url, cover.image_id, screenshots.url, similar_games.name; where name = *"${searchTerm}"*;` }) 
        .then( (games) => games );

} 
 
let timerElement = null;

export const doSearch = (searchelement,loading) => {

       loading.style.display = 'flex';
                            
        clearTimeout(timerElement);
        timerElement = setTimeout(async() => {

            const games = await searchGames(searchelement.value);
            router.renderMethod( root, games ); 
            loading.style.display = 'none';

        }, 400); 

}

export const doSuggestSearch = () => {

        const pathname = window.location.pathname; 
        console.log(pathname);

        if(pathname != '/') { //must work only in single element view

             const searchBar  = document.getElementById('default-search');
             const suggestBox = document.getElementById('suggestedBox');
             const loading    = document.getElementById('spinner');

             document.addEventListener('keyup', () => {  
 
                loading.style.display = 'flex';

                clearTimeout(timerElement);
                timerElement = setTimeout(async() => {
        
                const games = await searchGames(searchBar.value);
                renderSuggestedPost(suggestBox,games); 
                loading.style.display = 'none';
                suggestBox.style.display = 'flex';
        
                }, 400); 

             }); 
             
        }

        return;
 
 }