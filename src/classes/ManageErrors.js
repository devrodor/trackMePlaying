
export class ManageErrors {

    container;
    error;
    
    constructor(container,error) {
        this.container = container;
        this.error = error;
    }

    printError() {

        const root = this.container;
        return root.innerHtml = this.error;

    }

}