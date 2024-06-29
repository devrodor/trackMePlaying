import { getData } from "./getData";  
import { renderSuggestedPost } from "../ui/templates/suggestedPostTemplate";
import searchData from '../helpers/searchData';
import Router from "../router"; 

const root = document.getElementById('app'); 
const router = Router();   

const searchBar                 = document.getElementById('default-search');
const searchFilterPlatform      = document.getElementById('platforms');   

const loading = document.getElementById('spinner');
const loadMoreButton = document.getElementById('loadMore');
const cancelButton = document.getElementById('clear-search');  

let timerElement = null;
let searchCancelled = false; 
let filters = '';

document.addEventListener('click', (event) => {
        if(event.target !== searchBar) {
                cancelButton.style.display = 'none';
        }

})

const searchGames = async(searchelement, filters, limit = 30) => {
  
        return await getData('/games',  
        { fields: `fields name, summary, cover.url, artworks.url, cover.image_id, screenshots.url, similar_games.name; limit ${limit}; where ${filters} name ~ "${searchelement}"*;` }) 
        .then( (games) => games );

} 

const noResults = (element, message) => {

        element.innerHTML = '';
   
        const wrapper = document.createElement('div');
        wrapper.classList.add('grid','grid-cols-1');
        wrapper.innerHTML = `<p>${message}</p>`;

        return element.appendChild(wrapper);

 }
 
 /**
  * 
  * @param {*} searchelement 
  */
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

        //filter logic here
        const filterPlatform = searchFilterPlatform.value;
 
        //dataUser.setUserData('platform', eval(filterPlatform));
     
        if(filterPlatform === '') {  
                filters = '';
        }
        else {
                filters = `platforms = ${filterPlatform} &`;
        }  
 
        console.log(filters);
        const games = await searchGames(searchelement.value, filters);    
        // seeking no results
        if(games.length === 0){
                noResults(root,'No results!');
                loading.style.display = 'none';
                return;
        }

        searchData.lastSearchTerm = searchelement.value;
        searchData.platform = eval(filterPlatform); 
        searchData.resulTerms = games;  
        searchData.offset = 0;   

        router.renderMethod( root, games ); 
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
 
