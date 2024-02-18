export class RenderItems {

    constructor( containerId ) {

        this.container = document.getElementById( containerId );

    }

    render ( items ) {

        this.container.innerHTML = '';
        items.forEach( item => {
            
            const element = this.createItemElement( item  );
            this.container.appendChild( element );

        });

    }

    createItemElement( item ) {
 
        const container = document.createElement('div');
        container.className = 'item';
        container.innerHTML = `<h2>${item.name}</h2>`;

        return container;

    }

}