// CONSTANTES GLOBALES // 
const menuExtras = {
  "EXTRA": {
    "Pan": 1.00,
    "Aceite y Tomate": 1.40,
    "Mermelada": 0.80,
    "Agua": 1.50,
    "Refresco": 2.00,
    "Café": 1.80
  }
};

const menus = {
  DESAYUNO: {
    "CAFÉ E INFUSIONES": {
      "Café": 1.80,
      "Leche": 2.00,
      "Infusión": 1.90
    },
    "BOLLERÍA": {
      "Tarta": 3.00,
      "Coisant": 1.50,
      "Donut": 1.10
    },
    "PAN": {
      "Tostada": 1.50,
      "Integral": 1.80,
      "Pepito": 2.50
    }
  },
  COMIDA: {
    "ENTRANTES": {
      "Ensalada": 6.50,
      "Croquetas": 7.00,
      "Sopa": 3.50
    },
    "PLATOS PRINCIPALES": {
      "Pasta": 8.00,
      "Salmón": 12.50,
      "Risotto": 11.00
    },
    "POSTRES": {
      "Tiramisú": 4.00,
      "Tarta": 3.00,
      "Helado": 2.50
    }
  },
  CENA: {
    "ENTRANTES": {
      "Ensalada": 6.50,
      "Croquetas": 7.00,
      "Sopa": 3.50
    },
    "PLATOS PRINCIPALES": {
      "Pasta": 8.00,
      "Salmón": 12.50,
      "Risotto": 11.00
    },
    "POSTRES": {
      "Tiramisú": 4.00,
      "Tarta": 3.00,
      "Helado": 2.50
    }
  }
};

// FUNCIONES AUXILIARES //
// Muestra un mensaje de cancelación y devuelve null //
function mostrarCancelacion() {
  alert("Operación cancelada. Esperamos volverle a ver pronto.\n¡Qué tenga un buen día!");
  return null;
}

// Muestra un resumen del pedido y el total //
// Si no hay platos seleccionados, pregunta si quiere volver a empezar //
function mostrarResumen(pedidoFinal, total) {
  if (Object.keys(pedidoFinal).length > 0) {
    let resumen = "SU PEDIDO:\n\n";
    
    for (const [categoria, item] of Object.entries(pedidoFinal)) {
      if (categoria !== "EXTRA") {
        if (Array.isArray(item)) {
          item.forEach(plato => {
            resumen += `• ${categoria}: ${plato.plato} - ${plato.precio.toFixed(2).replace('.', ',')}€\n`;
          });
        } else {
          resumen += `• ${categoria}: ${item.plato} - ${item.precio.toFixed(2).replace('.', ',')}€\n`;
        }
      }
    }
    
    if (pedidoFinal["EXTRA"]) {
      resumen += `\n• EXTRAS:\n`;
      pedidoFinal["EXTRA"].forEach(extra => {
        resumen += `  - ${extra.plato}: ${extra.precio.toFixed(2).replace('.', ',')}€\n`;
      });
    }
    
    resumen += `\n💰 TOTAL: ${total.toFixed(2).replace('.', ',')}€`;
    
    alert(resumen);
    alert("¡Muchas gracias por su visita! Esperamos verle pronto");
    return true;
  } else {
    alert("No ha seleccionado ningún plato.");
    const opcionFinal = prompt(
      `¿Desea volver a empezar su pedido?\n` +
      `(Escriba SI para continuar o deje en blanco para cancelar)`
    );
    
    if (opcionFinal && opcionFinal.toLowerCase() === "si") {
      return iniciarPedido();
    } else {
      return mostrarCancelacion();
    }
  }
}

// Selecciona extras y actualiza el total //
// Si el usuario cancela, muestra un mensaje y devuelve null //
// Si el usuario no selecciona nada, devuelve el pedido y el total actualizados //
function seleccionarExtras(pedidoFinal, total) {
  alert("Ahora puede añadir algunos extras a su pedido:");
  
  for (const [categoria, platos] of Object.entries(menuExtras)) {
    while (true) {
      const opciones = Object.keys(platos).map(p => `${p}: ${platos[p].toFixed(2).replace('.', ',')}€`).join('\n');
      const seleccion = prompt(
        `¿Desea algún producto ${categoria.toLowerCase()}?\n` +
        `Opciones:\n${opciones}\n\n` +
        `(Escriba el nombre del extra o deje en blanco para continuar)`
      );

      if (seleccion === null) {
        return mostrarCancelacion();
      }

      if (seleccion.trim() === "") {
        break;
      }

      const extraElegido = Object.keys(platos).find(
        opcion => opcion.toLowerCase() === seleccion.trim().toLowerCase()
      );

      if (extraElegido) {
        const precio = platos[extraElegido];
        const confirmacion = confirm(
          `¿Desea añadir "${extraElegido}" por ${precio.toFixed(2).replace('.', ',')}€ como producto extra?`
        );
        
        if (confirmacion) {
          if (!pedidoFinal[categoria]) {
            pedidoFinal[categoria] = [];
          }
          pedidoFinal[categoria].push({
            plato: extraElegido,
            precio: precio
          });
          total += precio;
        }
      } else {
        alert(`⚠️ Opción no válida. Las opciones son:\n${opciones}`);
      }
    }
  }
  
  return { pedidoFinal, total };
}

// Procesa el menú seleccionado y muestra el resumen final //
// Si el usuario cancela, muestra un mensaje y devuelve null //
// Si el usuario no selecciona nada, devuelve el pedido y el total actualizados //
function procesarMenu(tipoMenu) {
  const menuData = menus[tipoMenu];
  const iconos = {
    DESAYUNO: "🌅",
    COMIDA: "☀️",
    CENA: "🌙"
  };
  
  let pedidoFinal = {};
  let total = 0;

  // Mostrar menú principal //
  let menuStr = `${iconos[tipoMenu]} MENÚ DE ${tipoMenu} ${iconos[tipoMenu]}\n\n`;
  for (const [categoria, platos] of Object.entries(menuData)) {
    menuStr += `${categoria}:\n`;
    for (const [plato, precio] of Object.entries(platos)) {
      menuStr += `- ${plato}: ${precio.toFixed(2).replace('.', ',')}€\n`;
    }
    menuStr += "\n";
  }
  alert(menuStr);

  // Selección de menú principal //
  for (const [categoria, platos] of Object.entries(menuData)) {
    while (true) {
      const opciones = Object.keys(platos).map(p => `${p}: ${platos[p].toFixed(2).replace('.', ',')}€`).join('\n');
      const seleccion = prompt(
        `¿Desea algo de ${categoria.toLowerCase()}?\n` +
        `Opciones:\n${opciones}\n\n` +
        `(Escriba el nombre del plato o deje en blanco para continuar)`
      );
      
      if (seleccion === null) {
        return mostrarCancelacion();
      }

      if (seleccion.trim() === "") {
        break;
      }

      const platoElegido = Object.keys(platos).find(
        opcion => opcion.toLowerCase() === seleccion.trim().toLowerCase()
      );

      if (platoElegido) {
        const precio = platos[platoElegido];
        const confirmacion = confirm(
          `¿Desea añadir "${platoElegido}" por ${precio.toFixed(2).replace('.', ',')}€  a su ${tipoMenu}?`
        );
        
        if (confirmacion) {
          if (!pedidoFinal[categoria]) {
            pedidoFinal[categoria] = [];
          }
          pedidoFinal[categoria].push({
            plato: platoElegido,
            precio: precio
          });
          total += precio;
          break;
        }
      } else {
        alert(`⚠️ Opción no válida. Las opciones son:\n${opciones}`);
      }
    }
  }

  // Seleccionar extras //
  const resultadoExtras = seleccionarExtras(pedidoFinal, total);
  if (resultadoExtras === null) return null;
  
  pedidoFinal = resultadoExtras.pedidoFinal;
  total = resultadoExtras.total;

  // Mostrar resumen
  const resumenMostrado = mostrarResumen(pedidoFinal, total);
  if (!resumenMostrado) {
    return iniciarPedido();
  }
}

//  FUNCIONES PRINCIPALES //

// Solicita hora y redirije al menú correspondiente //
function pedirHora() { 
  const regexHora = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/; // Formato HH:MM (24h)
  
  while (true) {
    let hora = prompt("Por favor, escriba la hora actual en formato HH:MM (ejemplo: 14:30):");
    
    if (hora === null) {
      return mostrarCancelacion();
    }
    
    if (regexHora.test(hora)) {
      const confirmacion = confirm(`¿Confirma que la hora es ${hora}?`);
      
      if (confirmacion) {
        const [horasStr, minutosStr] = hora.split(':');
        const horas = parseInt(horasStr);
        const minutos = parseInt(minutosStr);
        const tiempoTotal = horas * 60 + minutos;
        
        if (tiempoTotal >= 7 * 60 && tiempoTotal < 12 * 60) {
          alert(`¡Hora confirmada: ${hora}! Enseguida le presento nuestro MENU DE DESAYUNO`);
          return procesarMenu("DESAYUNO");
        } 
        else if (tiempoTotal >= 12 * 60 && tiempoTotal < 16 * 60) {
          alert(`¡Hora confirmada: ${hora}! Enseguida le presento nuestro MENU DE COMIDA`);
          return procesarMenu("COMIDA");
        } 
        else if (tiempoTotal >= 16 * 60 && tiempoTotal <= 22 * 60) {
          alert(`¡Hora confirmada: ${hora}! Enseguida le presento nuestro MENU DE CENA`);
          return procesarMenu("CENA");
        } 
        else {
          alert("¡Lo sentimos mucho! La cocina del Restaurante cierra a las 22:00. Estará disponible nuevamente a partir de las 7:00.");
          return null;
        }
      }
    } else {
      alert("Formato incorrecto. Debe ser HH:MM (ejemplo: 07:00 o 23:00).");
    }
  }
}

// Inicia el programa y muestra un mensaje de bienvenida //
function iniciarPedido() {
  alert("¡Hola! Bienvenido al Restaurante Bottega. Aquí encontrará el menú adecuado a su paladar y bolsillo");
  return pedirHora();
}

iniciarPedido(); 