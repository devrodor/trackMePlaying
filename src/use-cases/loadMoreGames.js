import { getGames } from "./getGames";
import Router from "../Router";

export const loadMore = () => {


    /* 
        todo: 
        * Check if items on screen are results of a search term (including the initial one)
        * if results are searched terms, check if there is more vs limit
        * if not, simply increase number of items on screen 
    
    */
 
}

export const createLoadMoreBtn = () => {

    const buttonContainer = document.createElement('div');
    buttonContainer.id = 'button-container';

    const buttn = document.createElement('button');
    buttn.textContent = 'Haz clic aquí';
    buttonContainer.appendChild(buttn);
    return buttonContainer;

}