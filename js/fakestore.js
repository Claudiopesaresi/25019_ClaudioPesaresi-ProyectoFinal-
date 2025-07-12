async function asyncLoadProducts() {
  try {
    //a response le asigno lo que me devuelve la consulta a la API que pide todos los productos
    const response = await fetch("https://fakestoreapi.com/products");
    //a data le asigno todos los productos en formato .json
    const data = await response.json();
    let shortTitle = '';
    //Iteramos producto por producto y los vamos agregando al contenedor de productos.
    //Guardamos los datos de cada producto en un div con la clase card
    data.forEach(producto => {
      contenedorProductos.innerHTML += `
      <div class="card">
          <div>
            <img id="imagen" class="imagen" src="${producto.image}"></img>
          </div>
          <br>
          <div id="precio" name="precio" class="precio">${producto.price} $</div>
          <br>
          <div id="nombre" name="nombre" class="nombre">${producto.title.slice(0,20)}</div>
          <br>
          <div>
            <button onclick="addWishList(${producto.id} )" class="button">Agregar 🛒</button>
          </div>
      </div>
    `;
    
    //una vez que tengamos el contenedor con todos los productos/cards, lo inserto en la sección 
    // "seccion_productos" del HTML
    seccionProductos.append(contenedorProductos);
    });
  } catch (error) {
    console.error("Error al obtener productos:", error);
  }
}

//añadimos un listener para que se ejecute la función
document.addEventListener("DOMContentLoaded", asyncLoadProducts);

//Creo una variable para asociar a mi contenedor html de productos
const seccionProductos = document.getElementById('seccion_productos');

//Creo un div contenedor para los productos y le agrego una clase 
const contenedorProductos = document.createElement('div');
contenedorProductos.classList.add('contenedor-productos');

//función que arma un objeto nuevo , que tiene los atributos
//id: id del objeto de fakestore
//favId: id único que sirve de key para interactuar con LocalStorage
function addWishList(productoId) {
  console.log("Producto");
  const prodToAdd = {
    "id": productoId,
    "favId": Date.now()
  }

  //LocalStorage
  if (typeof(Storage) !== "undefined") {
    localStorage.setItem(prodToAdd.favId, JSON.stringify(prodToAdd));
    location.reload();
  }
  return false;
}

//Creo un div contenedor para los favoritos y le agrego una clase 
const contenedorFavoritos = document.createElement('div');
contenedorFavoritos.classList.add('contenedor-favoritos');

let seccionFavs = document.getElementById("seccion_favs");

let tituloCarrito = document.getElementById('titulo_favs');

let totalFavoritos = document.getElementById('total_favoritos');


function loadFavourites() {
  try {
    if(localStorage.length > 0) {
      seccionFavs.style.display = "block";
      totalFavoritos.innerText = localStorage.length;
    }
    Object.keys(localStorage).forEach(function(key) {
      let item = JSON.parse(localStorage.getItem(key));
      console.log(item.id);
      console.log(typeof item.itemId);
      //const jsonObject = JSON.parse(item.itemId)
      //console.log(jsonObject.title);
      contenedorFavoritos.innerHTML += `
          <div class="card-fav">
            <div>
              <h5>Product ID ${item.id}</h5>
              <h5>Fav Id ${item.favId}</h5>
              <div>
                <button onclick="eliminar(${item.favId})" class="button-del" value="Eliminar">Eliminar</button>
              </div>
            </div>
          </div>
        `;
    });
    seccionFavs.appendChild(contenedorFavoritos);
    } catch (error) {
    console.error("Error al obtener los favoritos:", error);
  }
}

document.addEventListener("DOMContentLoaded", loadFavourites);

function eliminar(id) {
  let idx = id.toString();
  console.log(idx);
  localStorage.removeItem(idx);
  actualizarPagina();
}

//boton deleteAll del html que elimina todos los favoritos.
const btnDeleteAll = document.getElementById('delete_all');
btnDeleteAll.addEventListener('click', eliminarDeseados);

async function eliminarDeseados() {
  try {
    localStorage.clear();
    actualizarPagina();
  } catch(error) {
    console.log(error);
  }
}

function actualizarPagina() {
  location.reload();
}