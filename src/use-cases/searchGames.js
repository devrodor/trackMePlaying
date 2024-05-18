import { getGames } from "./getGames"; 
import { renderSuggestedPost } from "../ui/templates/suggestedPostTemplate";
import UserData from "../classes/UserData";
import Router from "../Router";

const root = document.getElementById('app'); 
const router = Router(); 
const userData = new UserData();

const searchBar = document.getElementById('default-search');
const loading = document.getElementById('spinner');
const loadMoreButton = document.getElementById('loadMore');
const cancelButton = document.getElementById('clear-search');

let searchCancelled = false; 


document.addEventListener('click', (event) => {
        if(event.target !== searchBar) {
                cancelButton.style.display = 'none';
        }

})

const searchGames = async( searchTerm ) => {

        //element.value;
        return await getGames('/games', 
        { fields: `fields name, summary, cover.url, artworks.url, cover.image_id, screenshots.url, similar_games.name; limit 30; where name ~ "${searchTerm}"*;` }) 
        .then( (games) => games );

} 

const noResults = (element, message) => {

        element.innerHTML = '';
   
        const wrapper = document.createElement('div');
        wrapper.classList.add('grid','grid-cols-1');
        wrapper.innerHTML = `<p>${message}</p>`;

        return element.appendChild(wrapper);

 }
 
let timerElement = null;

export const doSearch = (searchelement) => {

       loading.style.display = 'flex'; 
       cancelButton.style.display = 'flex';
       loadMoreButton.disabled = false;
                  
        clearTimeout(timerElement);
        
        timerElement = setTimeout(async() => {

        //canceling search
        if(cancelButton.addEventListener('click', ()=>{
                loading.style.display = 'none';
                searchelement.value = '';
                searchCancelled = true; 
        }));   
 
            if(searchelement.value != ''){
                cancelButton.style.display = 'none'; //prevents cancels while async search
            }

            const games = await searchGames(searchelement.value);   
            
            // seeking no results
            if(games.length === 0){
               noResults(root,'No results!');
               loading.style.display = 'none';
               return;
            }

            router.renderMethod( root, games ); 

            //todo: encapsulate userdata set
            userData.setUserData('lastSearchTerm', searchelement.value);
            userData.setUserData('resulTerms', games);
            userData.setUserData('offset', 0);
          
            loading.style.display = 'none';
            searchCancelled = false;


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
 
