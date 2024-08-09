// Selección de elementos del DOM
const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const encryptButton = document.getElementById('encrypt');
const decryptButton = document.getElementById('decrypt');
const copyText = document.getElementById('copyText');
const resultContainer = document.querySelector('.result-container');

// Validación de caracteres no permitidos
function validateText(text) {
    const regex = /^[a-z\s]+$/;
    return regex.test(text);
}

const mapVowelsToSecretKey = {
    a: "ai",
    e: "enter",
    i: "imes",
    o: "ober",
    u: "ufat"
};

//Función de encriptar
function encryptText() {
    const text = inputText.value;
    if (!validateText(text)) {
        alert("No es posible encriptar el texto. Por favor valida que no tenga mayúsculas ni caracteres especiales");
        return;
    }
    let encryptedText = text.replace(/[aeiou]/g, char => mapVowelsToSecretKey[char]);
    outputText.value = encryptedText;
    toggleImageVisibility();
}

//Función de desencriptar
function decryptText() {
    let text = inputText.value;
    if (!validateText(text)) {
        alert("No es posible desencriptar el texto. Por favor valida que no tenga mayúsculas ni caracteres especiales");
        return;
    }
    for (const [key, value] of Object.entries(mapVowelsToSecretKey)) {
        text = text.replace(new RegExp(value, 'g'), key);
    }
    outputText.value = text;
    toggleImageVisibility();
}

// Función para alternar la visibilidad de la imagen y los mensajes
function toggleImageVisibility() {
    if (outputText.value.trim() === "") {
        resultContainer.classList.add('no-text');
        document.getElementById('no-message').style.display = 'block';
        document.getElementById('instruction').style.display = 'block';
        copyText.style.display = 'none'; // Oculta el botón de copiar
    } else {
        resultContainer.classList.remove('no-text');
        document.getElementById('no-message').style.display = 'none';
        document.getElementById('instruction').style.display = 'none';
        copyText.style.display = 'block'; // Muestra el botón de copiar
    }
}

// Eventos para encriptar y desencriptar
encryptButton.addEventListener('click', encryptText);
decryptButton.addEventListener('click', decryptText);

// Evento para copiar
copyText.addEventListener('click', async () => {
    try {
        await navigator.clipboard.writeText(outputText.value);
        alert('Texto copiado al portapapeles');
    } catch (err) {
        console.error('Error al copiar al portapapeles:', err);
    }
});

// Inicialización de la visibilidad de la imagen
toggleImageVisibility();
