
export const renderSuggestedPost = (container,elements) => {

    container.innerHTML = '';
 
    if(elements.length === 0) {
        
        container.innerHTML = '<p>No se han encontrado resultados</p>';
        return;
    };

    const list = document.createElement('ul');
    list.className = 'list-none';

    elements.forEach((e)=> {

        const listItem = document.createElement('li');
        listItem.innerHTML = `<li>
                                <a href="${e.id}">
                                    <img class="w-8 h-8 inline mr-2" src="//images.igdb.com/igdb/image/upload/t_1080p/${e.cover.image_id}.jpg">
                                    ${e.name}
                                    </li>
                                </a>`; 
        list.appendChild(listItem);

    });

    container.appendChild(list);
 
    return container; 

}