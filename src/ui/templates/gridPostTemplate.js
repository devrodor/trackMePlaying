/**
 * 
 * @param {HTMLElement} container 
 * @param {HTMLElement} items 
 * @returns {HTMLDivElement} 
 */
export const render =  ( container, items ) => {

    container.innerHTML = ''; 
    const wrapper = document.createElement('div');
    wrapper.classList.add('grid','gap-3','grid-cols-1','md:grid-cols-2','lg:grid-cols-3');

    items.forEach( item => {
        
        const element = createGridPost( item  );
        wrapper.appendChild( element );

    });

    return container.appendChild(wrapper);

} 


/**
 * 
 * @param {HTMLElement} item 
 * @returns {HTMLDivElement} 
 */
const createGridPost = ( item ) => {
 
    const container = document.createElement('a');
    container.classList.add(
            'flex',
            'border',
            'items-center',
            'rounded-md',
            'cursor-pointer',
            'transition',
            'duration-500',
            'shadow-sm',
        );

    const itemCover = (item.cover) ? item.cover.url : './assets/images/blank.jpg'; 
    const itemSummary = (item.summary) ? item.summary.slice(0, 30) + " ..." : 'Sin descripción'; 

    container.innerHTML = `<div class="w-16 p-2 shrink-0">
                                <img src="${itemCover}" alt="" class="h-12 w-12">
                            </div>
                            <div class="p-2">
                                <p class="font-semibold text-lg">${item.name}</p>
                                <span class="text-gray-600">${itemSummary}</span>
                            </div>`; 
    return container;

}