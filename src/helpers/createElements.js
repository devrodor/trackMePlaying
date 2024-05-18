export const createElementById = (element, id, classes = null, attributes = {}) => {

    const domElement = document.createElement(element);
    classes && domElement.classList.add(...classes);
   
    if(attributes) {

    Object.entries(attributes).forEach(([key, value]) => {
            domElement.setAttribute(key, value);
        });

    }
 
    const node = document.getElementById(id);

    node.appendChild(domElement);

    return domElement;

}
 