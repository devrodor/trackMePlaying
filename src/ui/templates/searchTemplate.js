
/**
 * 
 * @returns {HTMLElement} 
 */
export const searchBar = () => {

    const container = document.createElement('div');
    container.innerHTML = `<form class="w-full mx-auto mb-5">   
                                <label for="default-search" class="mb-2 text-sm font-medium text-black sr-only dark:text-black">Search</label>
                                <div class="relative w-full">
                                    <input type="search" id="default-search" class="block w-full p-4 text-sm text-black border border-gray-200 rounded-lg bg-gray-50 focus:ring-sky-500 focus:border-sky-500 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black dark:focus:ring-sky-500 dark:focus:border-sky-500" placeholder="Search your game..." required />
                                    <button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800">Search</button>
                                    <div id="spinner" class="absolute inset-y-0 right-20 flex items-center pr-3">
                                        <div class="inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-current border-l-transparent text-indigo-500 motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                                    </div>
                                </div>
                            </form>`; 
    return container;


}