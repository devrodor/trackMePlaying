 
import { getData } from "./getData";

export const getPlatforms = async(selectPlatforms) => { 
    
    try {
        const platforms = await getData('/platforms', { fields: `fields name; limit 500; sort name asc;` }); 
        platforms.unshift({id: undefined, name: "-- SELECCIONA --"}); 
        return selectPlatforms.innerHTML = platforms.map(platform => `<option value="${platform.id === undefined ? '' : platform.id}">${platform.name}</option>`).join(''); 

    } catch (error) {
        selectPlatforms.innerHTML = `<option value="">-- --</option>`; 
    }  
 
}
 