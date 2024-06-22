/**
 * 
 * @param {*} nodes 
 * @returns {}
 */
export const getFilters = (nodes) => {
    
    let filtersContainer = [];

    for (var i = 0; i < nodes.length; i++) {
 
        const filterName    = nodes[i].getAttribute('data-filter'); 
        const filterValue   = nodes[i].checked;
        
        filtersContainer.push({ 
            name: filterName,
            status: filterValue
        });
 

    } 
    return filtersContainer; 
   
}
 