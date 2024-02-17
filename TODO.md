# Pending

- Save info from every request to a local DB.json file

# Todo Structure

Para renderizar eficientemente los 10 items en tu aplicación utilizando VanillaJS, puedes seguir un enfoque modular que separe las responsabilidades de tu código, asegurando así un mantenimiento más sencillo y una estructura clara. Dado que tu proyecto ya está organizado en clases (para la lógica de conexión con la API) y casos de uso (para obtener credenciales y datos), puedes añadir una capa adicional para el manejo de la vista (renderizado).

1. Preparar la estructura HTML

Primero, asegúrate de tener un contenedor en tu HTML donde se renderizarán los items. Por ejemplo:

``` 
<div id="items-container"></div>
```

2. Crear una clase o función para el renderizado

Podrías crear una clase o función dedicada en tu JavaScript que se encargue de recibir los datos (los 10 items) y renderizarlos en el contenedor previamente definido. Esto podría verse de la siguiente manera:

```
class RenderizadorDeItems {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
    }

    render(items) {
        // Limpiar el contenedor antes de renderizar nuevos items
        this.container.innerHTML = '';

        // Crear y añadir cada item al contenedor
        items.forEach(item => {
            const element = this.crearElementoDeItem(item);
            this.container.appendChild(element);
        });
    }

    crearElementoDeItem(item) {
        // Crear el elemento HTML para el item
        // Esto dependerá de la estructura de tus datos y cómo quieras mostrarlos
        const div = document.createElement('div');
        div.className = 'item';
        div.innerHTML = `<h2>${item.titulo}</h2><p>${item.descripcion}</p>`;
        // Añade más campos según sea necesario

        return div;
    }
}
```

3. Integración con la lógica de negocio y casos de uso

Una vez que tienes preparada la clase o función de renderizado, puedes integrarla con la lógica de negocio existente. Esto implica obtener los datos desde la API a través de tu clase y métodos existentes, y luego pasar esos datos al renderizador para su visualización. Por ejemplo:

```
// Supongamos que tienes una clase para manejar la conexión con la API y la obtención de datos
class MiApi {
    async obtenerItems() {
        // Aquí iría tu lógica para llamar a la API y obtener los datos
        return datos; // Esto debería ser un array con los 10 items
    }
}

// Y en otro lugar de tu código, donde integras todo
const api = new MiApi();
const renderizador = new RenderizadorDeItems('items-container');

api.obtenerItems().then(items => {
    renderizador.render(items);
});
```

# Implementation

- mongoDB

# Errors

- Catch error when proxy server is not running
- Catch error on bad request on getGames
- Catch error on expired token