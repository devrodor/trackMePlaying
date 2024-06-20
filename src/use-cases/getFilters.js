export const getFilters = (node) => {
 
    const filters = node.querySelectorAll('[data-filter]'); 
    let filtersContainer = [];

    filters.forEach( filter =>{

        const filterInput = filter.querySelector('input[type="checkbox"]');
        const filterName = filter.getAttribute('data-filter');
        const filterValue = filterInput.checked;

        filtersContainer.push({ 
            name: filterName,
            estado: filterValue
        });
        

    })
    return filtersContainer; 
   
}