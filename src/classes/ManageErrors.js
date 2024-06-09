
export class ManageErrors {

    container;
    error;
    
    constructor(container,error) {
        this.container = container;
        this.error = error;
    }

    printError() {

        const root = this.container;
        const errorDescription = `<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert"><p>${this.error}</p></div>`;
        return root.insertAdjacentHTML("afterbegin", errorDescription);

    }

}