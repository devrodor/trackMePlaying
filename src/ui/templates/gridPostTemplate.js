/**
 * 
 * @param {HTMLElement} container 
 * @param {HTMLElement} items 
 * @returns {HTMLDivElement} 
 */
export const render =  ( container, items ) => {

    container.innerHTML = ''; 
    const wrapper = document.createElement('div');
    wrapper.classList.add('grid','grid-rows-3','grid-flow-col','gap-4');

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
 
    const container = document.createElement('div');

    const itemCover = (item.cover) ? item.cover.url : './assets/images/blank.jpg';
    

    container.classList.add('relative','flex','flex-col','mt-6','text-gray-700','bg-white','shadow-md','bg-clip-border','rounded-xl');
    container.innerHTML = `<img class="w-full" src="${itemCover}" alt="${item.name}">
                                <div class="px-6 py-4">
                                <div class="font-bold text-xl mb-2">${item.name}</div>
                                <p class="text-gray-700 text-base">
                                    ${item.summary}
                                 </p>
                                </div>`;

    return container;

}