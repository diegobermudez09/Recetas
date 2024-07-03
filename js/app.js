function iniciarApp() {

    const selectCategorias = document.querySelector('#categorias');
    selectCategorias.addEventListener('change', seleccionarCategoria);

    const resultado = document.querySelector('#resultado');

    obtenerCategorias();

    function obtenerCategorias() {
        const url = 'https://www.themealdb.com/api/json/v1/1/categories.php';
        fetch(url) // llamado a la url

            .then(respuesta => respuesta.json()) // hacemos que nos de la respuesta en tipo json
            .then(resultado => mostrarCategorias(resultado.categories)); // el resultado a la respuesta es la información

    }

    function mostrarCategorias(categorias = []) {
        categorias.forEach(categoria => {

            const { strCategory } = categoria;

            const option = document.createElement('OPTION');
            option.value = strCategory;
            option.textContent = strCategory;

            selectCategorias.appendChild(option);
        })
    }

    function seleccionarCategoria(e) {

        const categoria = e.target.value;
        const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoria}`;
        fetch(url)
            .then(respuesta => respuesta.json())
            .then(resultado => mostrarRecetas(resultado.meals));


    }

    function mostrarRecetas(recetas = []) {

        limpiarHtml(resultado);

        const heading = document.createElement('H2');
        heading.classList.add('text-center', 'text-black', 'my-5');
        heading.textContent = recetas.length ? 'Resultados' : 'No hay resultados';
        resultado.appendChild(heading);

        // Iterar en los resultados
        recetas.forEach(receta => {


            const { idMeal, strMeal, strMealThumb } = receta;

            const recetaContenedor = document.createElement('DIV');
            recetaContenedor.classList.add('col-md-4');

            const recetaCard = document.createElement('DIV');
            recetaCard.classList.add('card', 'mb-4');

            const recetaImagen = document.createElement('IMG');
            recetaImagen.classList.add('card-img-top');
            recetaImagen.alt = `Imagen de la receta ${strMeal}`;
            recetaImagen.src = strMealThumb;

            const recetaCardBody = document.createElement('DIV');
            recetaCardBody.classList.add('card-body');

            const recetaHeading = document.createElement('H3');
            recetaHeading.classList.add('card-title', 'mb-3');
            recetaHeading.textContent = strMeal;

            const recetaButton = document.createElement('BUTTON');
            recetaButton.classList.add('btn', 'btn-danger', 'w-100');
            recetaButton.textContent = 'Ver Receta';

            // Inyectar en el HTML
            recetaCardBody.appendChild(recetaHeading);
            recetaCardBody.appendChild(recetaButton);

            recetaCard.appendChild(recetaImagen);
            recetaCard.appendChild(recetaCardBody);

            recetaContenedor.appendChild(recetaCard);

            /*
            .card
                img
                .card-body
                    h3
                    button
            */

            resultado.appendChild(recetaContenedor);
        })

    }

    function limpiarHtml(selector) {
        while (selector.firstChild) {
            selector.removeChild(selector.firstChild);
        }
    }
}

document.addEventListener('DOMContentLoaded', iniciarApp);