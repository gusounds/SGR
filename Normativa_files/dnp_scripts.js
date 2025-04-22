
let DNPheader = document.getElementById('DNPheader');
let DNPnav = document.getElementById('DNPnav');
let DNPUp = document.getElementById('DNPUp');
let DNPheaderOffset = DNPheader.offsetHeight;

// Función para hacer scroll hasta un elemento
// Recibe como parámetro el id del elemento
function DNPscroll(el){
  let DNPelement_scroll = document.getElementById(el);
  let DNPscrollingObject = {
    top: (DNPelement_scroll.getBoundingClientRect().top - (window.innerHeight / 3)),
    left: 0,
    behavior: 'smooth'
  }
  if(DNPsharepointContainer){
    DNPsharepointContainer.scrollBy(DNPscrollingObject);
  } else{
    window.scrollBy(DNPscrollingObject);
  }
}


var DNPinterval = false;
var DNPintervalId = null;
// Funciones para avanzar, retroceder o reproducir sliders
// Parámetro el: id del slider
// Parámetro cl: clase de los slides
// Parámetro val: valida si el slider tiene puntos (dots) o no
// Parámetro num: número del slide sobre el que se realiza la acción
// Parámetro but: id del botón relacionado a la acción
// Parámetro time: tiempo para la ejecución de la acción 

// Funciones para avanzar, retroceder o reproducir sliders
// Parámetro el: id del slider
// Parámetro cl: clase de los slides
// Parámetro num: número del slide sobre el que se realiza la acción
// Parámetro time: tiempo para la ejecución de la acción 

function DNPnextSlide(el){
  DNPmoveSlide(el, true);
};

function DNPprevSlide(el){
  DNPmoveSlide(el, false);
};

function DNPmoveSlide(el, next){
  let slides = document.getElementsByClassName(el + '-element');
  // Número de elementos del slider
  let numberOfSlides = slides.length;
  // Tamaño de un solo elemento
  let oneElementSize = slides[0].offsetWidth;
  let container = document.getElementById(el);
  // Calcula cuántos elementos son visibles
  let visibleSlides = Math.round(container.parentElement.offsetWidth / oneElementSize);
  let position = parseInt(container.getAttribute('data-position'));
  let num;
  if(next){
    // Valida si es la última posición
    if(position >= Math.ceil(numberOfSlides / visibleSlides)){
      num = 1;
    } else {
      num = position + 1;
    }
  } else {
    // Valida si es laprimera posición
    if(position <= 1){
      num = Math.ceil(numberOfSlides / visibleSlides);
    } else {
      num = position - 1;
    }
  }
  DNPgotoSlide(el, num);
};

function DNPgotoSlide(el, num){
  let slides = document.getElementsByClassName(el + '-element');
  // Número de elementos del slider
  let numberOfSlides = slides.length;
  // Tamaño de un solo elemento
  let oneElementSize = slides[0].offsetWidth;
  let container = document.getElementById(el);
  // Calcula cuántos elementos son visibles
  let visibleSlides = Math.round(container.parentElement.offsetWidth / oneElementSize);
  let oneElementPercentage = 100/numberOfSlides;
  let percentageToMove = 0;
  let toSubstract = 0;
  // Si es la última posición, valida que no queden espacios vacíos
  if((num * visibleSlides) > numberOfSlides){
    toSubstract = ((num * visibleSlides) - numberOfSlides) * oneElementPercentage;
  }
  percentageToMove = ((num - 1) * (visibleSlides * oneElementPercentage)) - toSubstract;
  container.setAttribute('data-position', num);
  container.style.transform = 'translateX(-' + percentageToMove + '%)';
  DNPactiveDot(el, num);
};

//Activa el punto del slider
function DNPactiveDot(el, num){
  let dots = document.getElementsByClassName(el + '-dot');
  if(dots.length > 0){
    for (i = 0; i < dots.length; i++) {
      dots[i].classList.remove('active');
    }
    dots[num - 1].classList.add('active');
  }
}

//Activa o pausa la autoreproducción del slider
function DNPsliderPlay(el, time){
  if (!DNPinterval){
    DNPinterval = window.setInterval(function(){
      DNPnextSlide(el);
    }, time);
    DNPnextSlide(el);
    DNPintervalId = el;
  } else if (DNPintervalId != el){
    clearInterval(DNPinterval);
    DNPopen(DNPintervalId + 'Pause');
    DNPinterval = window.setInterval(function(){
      DNPnextSlide(el);
    }, time);
    DNPnextSlide(el);
    DNPintervalId = el;
  } else {
    clearInterval(DNPinterval);
    DNPinterval = false;
    DNPintervalId = null;
  }
  DNPopen(el + 'Pause');
}

// Función para abrir elementos
// Primer parámetro: id del elemento al que le agregará la clase 'opened'
// Segundo parámetro (opcional): clase de los elementos a los que les quitará la clase 'opened'
function DNPopen(el, cl){
  let element = document.getElementById(el);
  if(cl){
    let sameClass = document.getElementsByClassName(cl);
    for(i = 0; i < sameClass.length; i++){
      if(sameClass[i] != element){
        sameClass[i].classList.remove('opened');
      }
    }
  }
  element.classList.toggle('opened');
  document.activeElement.blur();
  setTimeout(() => DNPscroll(el), 200);
}

//Pone la clase fixed al menú si la página está más abajo de él, o se la quita si está más arriba
// Valida si encuentra el div de Sharepoint 
function DNPvalidatePosition(el){
  if ( el  > DNPheaderOffset ){
    DNPnav.classList.add('fixed');
    if(DNPUp){
      DNPUp.classList.add('show');
    }
  } else {
    DNPnav.classList.remove('fixed');
    if(DNPUp){
      DNPUp.classList.remove('show');
    }
  }
}

// Ordena de manera aleatoria los elementos del bloque Portales del Home 

let DNPlogos_container = document.querySelector('#DNPPortales');
let DNPlogos;

if(DNPlogos_container){
  DNPlogos = Array.prototype.slice.call(DNPlogos_container.getElementsByClassName('DNPPortales-element'));
}

function DNPshuffle_logos() {
  DNPlogos.forEach(function(element){
    DNPlogos_container.removeChild(element);
  })
  DNPshuffleArray(DNPlogos);
  DNPlogos.forEach(function(element){
    DNPlogos_container.appendChild(element);
  })
}

function DNPshuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
  return array;
}

//Si detecta los elementos (se trata del Home) se ejecuta la función 
if (DNPlogos_container && DNPlogos.length > 1) {
  DNPshuffle_logos();
}

// Crea un elemento punto, p.ej <button class="DNPSlider-buttons-dots-element DNPDestacados-dot active" onclick="DNPgotoSlide('DNPDestacados', 1);" aria-label="Ir a slider número 1"></button>
function DNPcreateDot(sliderid, slidenum, dotclass = 'DNPSlider-buttons-dots-element', descriptiondot = "slider"){
  let newButton = document.createElement("button");
  newButton.classList.add(dotclass);
  newButton.classList.add(sliderid + '-dot');
  if(slidenum == 1){
    newButton.classList.add('active');
  }
  newButton.setAttribute("onclick",`DNPgotoSlide('${sliderid}', ${slidenum});return false`);
  newButton.setAttribute("aria-label",'Ir a ' + descriptiondot + ` número ${slidenum}`);
  return(newButton);
}

// Crea la cantidad de elementos tipo punto requeridos recibiendo como parámetro el id del slider
function DNPcreateDots(sliderid, dotclass, descriptiondot){
  let slides = document.getElementsByClassName(sliderid + '-element');
  // Número de elementos del slider
  let numberOfSlides = slides.length;
  // Tamaño de un solo elemento
  let oneElementSize = slides[0].offsetWidth;
  let container = document.getElementById(sliderid);
  // Calcula cuántos elementos son visibles
  let visibleSlides = Math.round(container.parentElement.offsetWidth / oneElementSize);
  // Calcula cuántos puntos se necesitan
  let numberOfDots =  Math.ceil(numberOfSlides / visibleSlides);
  if( numberOfDots > 1){
    let dotsContainer = document.getElementById(`${sliderid}-dots`);
    for (var i = 1; i <= numberOfDots; i++){
      dotsContainer.appendChild(DNPcreateDot(sliderid, i, dotclass, descriptiondot));
    }
  }
}

// Si detecta el array DNPSliders, espera la carga del sitio y lo recorre creando puntos para cada slider
if(typeof DNPSliders !== 'undefined' ||  DNPSliders !== null){
  window.onload = function(){
    DNPSliders.map( function(el){
      DNPcreateDots(el);
    });
  }
}
