/**
 * 
 * @param {HTMLElement} container 
 * @param {HTMLElement} items 
 * @returns {HTMLDivElement} 
 */
export const renderSinglePost =  (container, singleElement) => {
 
    const [item] = singleElement; 
 
    const screenshots = item.screenshots.map(element => {
        return `<li class="inline-block mr-2 mb-2"><img src="${element.url}" alt="Screenshot" class="w-24 h-24 object-cover rounded"></li>`;
    }).join('');

    const finalCover = (item.cover) ? "//images.igdb.com/igdb/image/upload/t_1080p/" + item.cover.image_id + ".jpg" : '/assets/images/blank.jpg'; 
   
    container.innerHTML = `
    <div">
        <div class="flex flex-col md:flex-row -mx-4">
            <div class="md:flex-1 px-4">
                <div class="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                    <img class="w-full h-full object-cover" src="${finalCover}"> 
                </div>
            </div>
            <div class="md:flex-1 px-4">
                <h1 class="text-4xl font-bold mb-2">${item.name}</h1>
                <p class="text-sm mb-4">
                    ${item.summary}
                </p>
                <div>
                    <h2 class="text-2xl font-bold mb-2">Screenshots</h2>
                    <ul class="flex flex-wrap p-0 m-0 list-none mt-4">
                        ${screenshots}
                    </ul>
                </div>
            </div>
        </div>
    </div>
    `;
  

 

    return container;

} 
 