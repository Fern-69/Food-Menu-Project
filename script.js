// ---- MENÚ EXTRAS (reutilizable) ----//
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

// Función para mostrar mensaje de cancelación
function mostrarCancelacion() {
  alert("Operación cancelada. Esperamos volverle a ver pronto.\n¡Qué tenga un buen día!");
  return null;
}

function seleccionarExtras(pedidoFinal, total) {
  alert("Ahora puede añadir algunos extras a su pedido:");
  
  for (const [categoria, platos] of Object.entries(menuExtras)) {
    while (true) {
      const opciones = Object.keys(platos).map(p => `${p}: ${platos[p].toFixed(2).replace('.', ',')}€`).join('\n');
      const seleccionCancelar = prompt(
        `¿Desea algún ${categoria.toLowerCase()}?\n` +
        `Opciones:\n${opciones}\n\n` +
        `(Escriba el nombre del extra o "saltar" para finalizar)`
      );
      
      // Manejar cancelación
      if (seleccionCancelar === null) {
        return mostrarCancelacion();
      }
      
      const seleccion = seleccionCancelar.trim().toLowerCase();

      if (seleccion === "saltar" || seleccion === "") {
        break;
      }

      const extraElegido = Object.keys(platos).find(
        opcion => opcion.toLowerCase() === seleccion
      );

      if (extraElegido) {
        const precio = platos[extraElegido];
        const confirmacion = confirm(
          `¿Desea añadir "${extraElegido}" por ${precio.toFixed(2).replace('.', ',')}€?`
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

// Función para mostrar resumen (reutilizable)
function mostrarResumen(pedidoFinal, total) {
  if (Object.keys(pedidoFinal).length > 0) {
    let resumen = "SU PEDIDO:\n\n";
    
    // Mostrar platos seleccinados
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
    
    // Mostrar extras
    if (pedidoFinal["EXTRA"]) {
      resumen += `\n• EXTRAS:\n`;
      pedidoFinal["EXTRA"].forEach(extra => {
        resumen += `  - ${extra.plato}: ${extra.precio.toFixed(2).replace('.', ',')}€\n`;
      });
    }
    
    resumen += `\n💰 TOTAL: ${total.toFixed(2).replace('.', ',')}€`;
    
    // Mostrar resumen y despedida
    alert(resumen);
    alert("¡Muchas gracias por su visita! Esperamos verle pronto");
    
    // Si no se completa pedido que reinicie o cancele
    return true;
  } else {
    alert("No ha seleccionado ningún plato.");
    const opcionFinal = prompt(
        `¿Desea volver a empezar su pedido?\n` +
        `(Por favor, escriba SI para iniciar o "saltar" para finalizar)`
     );
    
    if (opcionFinal) {
      pedirHora()
    } else {
      mostrarCancelacion();
    }
    return false;
  }
}   

// ---- MENÚ DESAYUNO ----//
function mostrarMenuDesayuno() {
  const menuDesayuno = {
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
  };

  let pedidoFinal = {};
  let total = 0;

  // Mostrar menú principal
  let menuStr = "🌅 MENÚ DE DESAYUNO 🌅\n\n";
  for (const [categoria, platos] of Object.entries(menuDesayuno)) {
    menuStr += `${categoria}:\n`;
    for (const [plato, precio] of Object.entries(platos)) {
      menuStr += `- ${plato}: ${precio.toFixed(2).replace('.', ',')}€\n`;
    }
    menuStr += "\n";
  }
  alert(menuStr);

  // Selección de menú principal
  for (const [categoria, platos] of Object.entries(menuDesayuno)) {
    while (true) {
      const opciones = Object.keys(platos).map(p => `${p}: ${platos[p].toFixed(2).replace('.', ',')}€`).join('\n');
      const seleccion = prompt(
        `¿Desea algo de ${categoria.toLowerCase()}?\n` +
        `Opciones:\n${opciones}\n\n` +
        `(Escriba el nombre del extra o "saltar" para finalizar)`
      );
      
      if (seleccion === null) {
        return mostrarCancelacion();
      }

      if (seleccion === "saltar" || seleccion === "") {
        break;
      }

      const platoElegido = Object.keys(platos).find(
        opcion => opcion.toLowerCase() === seleccion.toLowerCase()
      );

      if (platoElegido) {
        const precio = platos[platoElegido];
        const confirmacion = confirm(
          `¿Desea añadir "${platoElegido}" por ${precio.toFixed(2).replace('.', ',')}€ en su desayuno?`//${categoria.toLowerCase()}?`
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

  // Seleccionar extras (función reutilizable)
  const resultadoExtras = seleccionarExtras(pedidoFinal, total);
  if (resultadoExtras === null) return null;
  
  pedidoFinal = resultadoExtras.pedidoFinal;
  total = resultadoExtras.total;

  // Mostrar resumen (función reutilizable)
 const resumenMostrado = mostrarResumen(pedidoFinal, total);
 if (!resumenMostrado) {
   return; // Salir si no hay pedido
 }
}

// ---- MENÚ COMIDA ----//
function mostrarMenuComida() {
  const menuComida = {
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
  };

  let pedidoFinal = {};
  let total = 0;

  // Mostrar menú principal
  let menuStr = "☀️ MENÚ DE COMIDA ☀️\n\n";
  for (const [categoria, platos] of Object.entries(menuComida)) {
    menuStr += `${categoria}:\n`;
    for (const [plato, precio] of Object.entries(platos)) {
      menuStr += `- ${plato}: ${precio.toFixed(2).replace('.', ',')}€\n`;
    }
    menuStr += "\n";
  }
  alert(menuStr);

  // Selección de menú principal
  for (const [categoria, platos] of Object.entries(menuComida)) {
    while (true) {
      const opciones = Object.keys(platos).map(p => `${p}: ${platos[p].toFixed(2).replace('.', ',')}€`).join('\n');
      const seleccion = prompt(
        `¿Desea algún ${categoria.toLowerCase()}?\n` +
        `Opciones:\n${opciones}\n\n` +
        `(Escriba el nombre del extra o "saltar" para finalizar)`
      );

      if (seleccion === null) {
        return mostrarCancelacion();
      }

      if (seleccion === "saltar" || seleccion === "") {
        break;
      }

      const platoElegido = Object.keys(platos).find(
        opcion => opcion.toLowerCase() === seleccion.toLowerCase()
      );

      if (platoElegido) {
        const precio = platos[platoElegido];
        const confirmacion = confirm(
         `¿Desea añadir "${platoElegido}" por ${precio.toFixed(2).replace('.', ',')}€ en su comida?`
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

  // Seleccionar extras (función reutilizable)
  const resultadoExtras = seleccionarExtras(pedidoFinal, total);
  if (resultadoExtras === null) return null;
  
  pedidoFinal = resultadoExtras.pedidoFinal;
  total = resultadoExtras.total;

  // Mostrar resumen (función reutilizable)
  const resumenMostrado = mostrarResumen(pedidoFinal, total);
  if (!resumenMostrado) {
    return; // Salir si no hay pedido
  }
}

// ---- MENÚ CENA ----//
function mostrarMenuCena() {
  const menuCena = {
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
  };

  let pedidoFinal = {};
  let total = 0;

  // Mostrar menú principal
  let menuStr = "🌙 MENÚ DE CENA 🌙\n\n";
  for (const [categoria, platos] of Object.entries(menuCena)) {
    menuStr += `${categoria}:\n`;
    for (const [plato, precio] of Object.entries(platos)) {
      menuStr += `- ${plato}: ${precio.toFixed(2).replace('.', ',')}€\n`;
    }
    menuStr += "\n";
  }
  alert(menuStr);

  // Selección de menú principal
  for (const [categoria, platos] of Object.entries(menuCena)) {
    while (true) {
      const opciones = Object.keys(platos).map(p => `${p}: ${platos[p].toFixed(2).replace('.', ',')}€`).join('\n');
      const seleccion = prompt(
        `¿Desea algún ${categoria.toLowerCase()}?\n` +
        `Opciones:\n${opciones}\n\n` +
        `(Escriba el nombre del extra o "saltar" para finalizar)`
      );

      if (seleccion === null) {
        return mostrarCancelacion();
      }

      if (seleccion === "saltar" || seleccion === "") {
        break;
      }

      const platoElegido = Object.keys(platos).find(
        opcion => opcion.toLowerCase() === seleccion.toLowerCase()
      );

      if (platoElegido) {
        const precio = platos[platoElegido];
        const confirmacion = confirm(
           `¿Desea añadir "${platoElegido}" por ${precio.toFixed(2).replace('.', ',')}€ en su comida?`
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

  // Seleccionar extras (función reutilizable)
  const resultadoExtras = seleccionarExtras(pedidoFinal, total);
  if (resultadoExtras === null) return null;
  
  pedidoFinal = resultadoExtras.pedidoFinal;
  total = resultadoExtras.total;

  // Mostrar resumen (función reutilizable)
  const resumenMostrado = mostrarResumen(pedidoFinal, total);
  if (!resumenMostrado) {
    return; // Salir si no hay pedido
  }
}

// ---- CUADRO INICIAL: BIENVENIDA ---- // 
alert("¡Hola! Bienvenido al Restaurante Bottega. Aquí encontrará el menú adecuado al gustos de su paladar y su bolsillo");

function pedirHora() {
  const regexHora = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/; // Formato HH:MM (24h)
  
  while (true) {
    let hora = prompt("Por favor, escriba la hora actual en formato HH:MM (ejemplo: 14:30):");
    
    // Si el usuario cancela
    if (hora === null) {
      return mostrarCancelacion();
    }
    
    if (regexHora.test(hora)) {  // Validamos el formato HH:MM
      const confirmacion = confirm(`¿Confirma que la hora es ${hora}?`);
      
      if (confirmacion) {
        const [horasStr, minutosStr] = hora.split(':');
        const horas = parseInt(horasStr);
        const minutos = parseInt(minutosStr);
        
        const tiempoTotal = horas * 60 + minutos;  // Calculamos el tiempo total en minutos para comparar fácilmente
        
        // Horario de DESAYUNO (7:00 - 11:59)
        if (tiempoTotal >= 7 * 60 && tiempoTotal < 12 * 60) {
          alert(`¡Hora confirmada: ${hora}! Enseguida le presento nuestro MENU DE DESAYUNO`);
          mostrarMenuDesayuno();
        } 
        // Horario de COMIDA (12:00 - 15:59)
        else if (tiempoTotal >= 12 * 60 && tiempoTotal < 16 * 60) {
          alert(`¡Hora confirmada: ${hora}! Enseguida le presento nuestro MENU DE COMIDA`);
          mostrarMenuComida();
        } 
        // Horario de CENA (16:00 - 22:00)
        else if (tiempoTotal >= 16 * 60 && tiempoTotal <= 22 * 60) {
          alert(`¡Hora confirmada: ${hora}! Enseguida le presento nuestro MENU DE CENA`);
          mostrarMenuCena();
        } 
        // Fuera de horario (22:01 - 6:59)
        else {
          alert("¡Lo sentimos mucho! La cocina del Restaurante cierra a las 22:00. Estará disponible nuevamente a partir de las 7:00.");
          return null;
        }
        
        return hora;
      } else {
        alert("Por favor, vuelva a intentarlo.");
      }
    } else {
      alert("Formato incorrecto. Debe ser HH:MM (ejemplo: 07:00 o 23:00).");
    }
  }
}

pedirHora();