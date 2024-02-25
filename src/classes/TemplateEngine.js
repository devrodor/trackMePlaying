export class TemplateEngine {

    constructor( containerId ) {
        this.container = document.getElementById( containerId );
        const container = document.createElement('div');
        container.classList.add('grid','grid-rows-3','grid-flow-col','gap-4');
 
    }
 
    render ( items ) {

        this.container.innerHTML = ''; 
        const wrapper = document.createElement('div');
        wrapper.classList.add('grid','grid-rows-3','grid-flow-col','gap-4');

        items.forEach( item => {
            
            const element = this.createItemGrid( item  );
            wrapper.appendChild( element );

        });

        this.container.appendChild(wrapper);

    } 

    //todo: clean way of evaluating undefined properties
    createItemGrid( item ) {
 
        const container = document.createElement('div');
        container.classList.add('relative','flex','flex-col','mt-6','text-gray-700','bg-white','shadow-md','bg-clip-border','rounded-xl','w-86');
        container.innerHTML = `<img class="w-full" src="" alt="Sunset in the mountains">
                                    <div class="px-6 py-4">
                                    <div class="font-bold text-xl mb-2">${item.name}</div>
                                    <p class="text-gray-700 text-base">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                                    </p>
                                    </div>
                                    <div class="px-6 pt-4 pb-2">
                                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                                    </div>`;
    
        return container;
    
    }

    //this goes to Render method & the template comes from Engine
    createItem( parentElement, classElement, template) {

        const container = document.createElement( parentElement );
        container.className = classElement;
        container.innerHTML = template;

        return container;

    }
 

}