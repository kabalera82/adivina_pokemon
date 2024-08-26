// Obtener un número aleatorio entre 1 y 150 (número total de Pokémon en la API)
const getRandomPokemonId = () => Math.floor(Math.random() * 150) + 1;

const pokemonId = getRandomPokemonId(); // Obtener un número aleatorio entre 1 y 150
let pokemonImageUrl = ''; // Variable para almacenar la URL de la imagen del Pokémon

fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`) // Hacer una petición GET a la API de Pokémon con el ID del Pokémon aleatorio
  .then((response) => response.json()) // Convertir la respuesta a JSON para poder acceder a los datos de la API de Pokémon 
  .then((data) => { // Mostrar la imagen y los datos del Pokémon en la página
    const pokemonData = {
      name: data.name,
      imageUrl: data.sprites.front_default // URL de la imagen del Pokémon
    };

    pokemonImageUrl = pokemonData.imageUrl; // Guardar la URL de la imagen

    // Asegurarse de que el elemento con ID 'pokemon-data' exista en el DOM
    const pokemonDataElement = document.getElementById('pokemon-data');
    if (pokemonDataElement) {
      pokemonDataElement.textContent = JSON.stringify(pokemonData, null, 2);
    } else {
      console.error("Elemento con ID 'pokemon-data' no encontrado.");
    }

    console.log(data.name); // Imprime el nombre del Pokémon en la consola

    // ya tengo el nombre ahora toca convertirlo
    iniciarJuego(data.name);
  })
  .catch((error) => {
    console.error(error);
  });

function iniciarJuego(palabra) {
  const palabraOculta = palabra.split("").map(() => "_"); // Crea un array con guiones bajos
  const bodyElement = document.querySelector("body"); // Selecciona el elemento body
  const mainElement = document.createElement("main"); // Crea un elemento main
  bodyElement.appendChild(mainElement); // Añade el elemento main al body

  const divPalabra = document.createElement("div"); // Crea un elemento div
  divPalabra.setAttribute("class", "div1"); // Añade el atributo class al elemento div
  divPalabra.textContent = palabraOculta.join(" "); // Añade el contenido del array al elemento div
  mainElement.appendChild(divPalabra); // Añade el elemento div al elemento main

  let intentos = 0; // Inicializa la variable intentos
  const maxIntentos = 10; // Número máximo de intentos

  const divIntentos = document.createElement("div"); // Crea un elemento div
  divIntentos.setAttribute("class", "div2");
  divIntentos.textContent = `Intentos: ${intentos}/${maxIntentos}`; // Añade el texto "Intentos: 0/10" al elemento div
  mainElement.appendChild(divIntentos); // Añade el elemento div al elemento main

  document.addEventListener("keydown", (event) => { // Añade un evento al presionar cualquier tecla
    manejarLetra(event.key);
  });

  const buttonElement = document.getElementById("button"); // Asegúrate de que el botón exista en el DOM
  const inputElement = document.getElementById("input"); // Asegúrate de que el input exista en el DOM

  if (buttonElement && inputElement) {
    buttonElement.addEventListener("click", () => { // Añade un evento al hacer click en el botón
      const letra = inputElement.value; // Obtiene el valor del input
      manejarLetra(letra); // Llama a la función manejarLetra con la letra como argumento
    });
  }

  function manejarLetra(letra) {
    if (palabra.includes(letra)) { // Comprueba si la letra está en la palabra
      palabra.split("").forEach((letraPalabra, index) => { // Recorre la palabra
        if (letraPalabra === letra) { // Comprueba si la letra de la palabra es igual a la letra
          palabraOculta[index] = letra; // Añade la letra al array
        }
      });
      divPalabra.textContent = palabraOculta.join(" "); // Añade el contenido del array al elemento div
    } else { // Si la letra no está en la palabra
      intentos++; // Aumenta los intentos
      divIntentos.textContent = `Intentos: ${intentos}/${maxIntentos}`; // Actualiza el texto de intentos
    }

    if (intentos === maxIntentos) { // Si los intentos alcanzan el máximo
      mostrarMensaje("Has perdido - Pulsa F5, El Pokémon era: " + palabra); // Muestra el mensaje de que has perdido
    }

    if (!palabraOculta.includes("_")) { // Si no hay guiones bajos en el array
      mostrarMensaje("Has ganado"); // Muestra el mensaje de que has ganado
    }
  }

  function mostrarMensaje(mensaje) {
    bodyElement.innerHTML = ""; // Vacía el body
    const h2Element = document.createElement("h1"); // Crea un elemento h1
    h2Element.textContent = mensaje; // Añade el mensaje al elemento h1
    bodyElement.appendChild(h2Element); // Añade el elemento h1 al body

    if (mensaje === "Has ganado") {
        const imgElement = document.createElement("img"); // Crea un elemento img
        imgElement.src = pokemonImageUrl; // Establece la URL de la imagen
        imgElement.alt = "Imagen del Pokémon"; // Establece el texto alternativo de la imagen
      
        const divElement = document.createElement("div"); // Crea un elemento div
        divElement.id = "pokeimg"; // Asigna el ID "pokeimg" al div
        divElement.appendChild(imgElement); // Añade el elemento img al div
      
        bodyElement.appendChild(divElement); // Añade el elemento div al body
      }
  }
}

console.log(data.name); // Imprime el nombre del Pokémon en la consola