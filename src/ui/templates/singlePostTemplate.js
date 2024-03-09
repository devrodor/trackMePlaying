/**
 * 
 * @param {HTMLElement} container 
 * @param {HTMLElement} items 
 * @returns {HTMLDivElement} 
 */
export const renderSinglePost =  (container, singleElement) => {
 
    const[item] = singleElement;

    container.innerHTML = `<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex flex-col md:flex-row -mx-4">
                    <div class="md:flex-1 px-4">
                        <div class="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                            <img class="w-full h-full object-cover" src="//images.igdb.com/igdb/image/upload/t_1080p/${item.cover.image_id}.jpg">
                        </div>
                       
                    </div>
                    <div class="md:flex-1 px-4">
                        <h2 class="text-2xl font-bold mb-2">${item.name}</h2>
                        <p class="text-sm mb-4">
                        ${item.summary}
                        </p>
                        
                        <div>
                            <span class="font-bold text-gray-700 dark:text-gray-300">Product Description:</span>
                            <p class="text-sm mt-2">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                                sed ante justo. Integer euismod libero id mauris malesuada tincidunt. Vivamus commodo nulla ut
                                lorem rhoncus aliquet. Duis dapibus augue vel ipsum pretium, et venenatis sem blandit. Quisque
                                ut erat vitae nisi ultrices placerat non eget velit. Integer ornare mi sed ipsum lacinia, non
                                sagittis mauris blandit. Morbi fermentum libero vel nisl suscipit, nec tincidunt mi consectetur.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `; 
  

 

    return container;

} 
 