import { renderGrid } from './ui/templates/gridPostTemplate';
import { renderSinglePost } from './ui/templates/singlePostTemplate';

/**
 * 
 * @returns {Object}
 */
//todo: check exceptions
const Router = () => {

        const pathname = window.location.pathname;
        const path = pathname.slice(1); 
 
        //if it is not a game URL or homepage...
        if(findGameUrl(path) === null && path != '') window.location.href = '/';
 
        const templates = [

            {
                path: '',
                additionalComponent: '',
                templateName: 'gridPost',
                renderMethod: renderGrid // ref
            },
            {
                path: `game/${findGameUrl(path)}`,
                additionalComponent: '',
                itemId: findGameUrl(path),
                templateName: 'singlePost',
                renderMethod: renderSinglePost              
            }

        ];

        const matchingTemplate = templates.find(element => element.path === path);
 
        if(!matchingTemplate) { 

            return {
                renderMethod: renderGrid
            }
        } 

        return matchingTemplate;
 

 }

 /**
  * 
  * @param {String} url 
  * @returns {String|null}
  */
  const findGameUrl = (url) => { 

    const gameUrlPattern = /^game\/(\d+)$/; 
    const result = url.match(gameUrlPattern);
  
    if (result) return result[1]; // returns id as a string
      return null;
  }

 export default Router;