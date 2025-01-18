// Traductor Texto ↔ Binario
document.getElementById("toBinaryButton").addEventListener("click", () => {
    const inputText = document.getElementById("inputText").value;
    if (!inputText) {
        showNotification("Por favor, ingresa algun texto para convertir.");
      return;
    }
    const binaryResult = inputText
      .split("")
      .map(char => char.charCodeAt(0).toString(2).padStart(8, "0"))
      .join(" ");
    document.getElementById("outputText").value = binaryResult;
    document.getElementById("inputText").value = ""; 
  });
  
  document.getElementById("toTextButton").addEventListener("click", () => {
    const inputText = document.getElementById("inputText").value;
    if (!inputText || !/^[01\s]+$/.test(inputText)) {
        showNotification("Por favor, ingresa algun codigo binario válido.");
      return;
    }
    const textResult = inputText
      .split(" ")
      .map(bin => String.fromCharCode(parseInt(bin, 2)))
      .join("");
    document.getElementById("outputText").value = textResult;
    document.getElementById("inputText").value = ""; 
  });
  
// Traductor entre Bases
  const baseFrom = document.getElementById("baseFrom");
  const baseTo = document.getElementById("baseTo");
  const validBases = {
    binary: 2,
    decimal: 10,
    octal: 8,
    hexadecimal: 16
  };
  
  // Actualizar opciones dinámicas
  function updateBaseToOptions() {
    const fromValue = baseFrom.value;
    baseTo.innerHTML = ""; 
    for (const base in validBases) {
      if (base !== fromValue) {
        const option = document.createElement("option");
        option.value = base;
        option.textContent = base.charAt(0).toUpperCase() + base.slice(1);
        baseTo.appendChild(option);
      }
    }
  }
  baseFrom.addEventListener("change", updateBaseToOptions);
  updateBaseToOptions(); // Inicializar opciones
  
  document.getElementById("convertBaseButton").addEventListener("click", () => {
    const input = document.getElementById("baseInput").value.trim();
    if (!input) {
        showNotification("Por favor, ingresa un número para convertir.");
      return;
    }
  
    const fromBase = validBases[baseFrom.value];
    const toBase = validBases[baseTo.value];
  
    try {
      const segments = input.split(" ");
      const result = segments
        .map(segment => parseInt(segment, fromBase).toString(toBase).toUpperCase())
        .join(" ");
      document.getElementById("baseOutput").value = result;
      document.getElementById("baseInput").value = "";
    } catch (error) {
        showNotification("Entrada inválida para la base seleccionada.");
    }
  });
  

  // Función para mostrar notificaciones
function showNotification(message, type = "success") {
    const notificationContainer = document.getElementById("notification-container");
  
    // Crear la notificación
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.innerHTML = `
      <span>${message}</span>
      <button class="close-btn">&times;</button>
    `;
  
    // Agregar evento para cerrar la notificación
    notification.querySelector(".close-btn").addEventListener("click", () => {
      notification.remove();
    });
  
    // Agregar la notificación al contenedor
    notificationContainer.appendChild(notification);
  
    // Eliminar automáticamente después de 4 segundos
    setTimeout(() => {
      notification.remove();
    }, 4000);
  }