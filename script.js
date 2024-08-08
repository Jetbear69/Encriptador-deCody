// Selección de elementos
const darkModeToggle = document.getElementById('darkModeCheckbox');
const languageToggle = document.getElementById('languageCheckbox');
const inputText = document.getElementById('inputText');
const outputMessage = document.getElementById('outputMessage');
const outputInstructions = document.getElementById('outputInstructions');
const outputText = document.querySelector('.output-text');
const body = document.body;
const copyButton = document.querySelector('.copy-btn');
const reloadButton = document.querySelector('.reload-btn');
const buttonContainer = document.getElementById('buttonContainer');
const infotext = document.querySelector('.info-text');
const alertIcon = document.querySelector('.alert');
const robot = document.getElementById('robot');

// Cambio de modo oscuro
if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const slider = darkModeToggle.querySelector('.slider');
        if (slider) {
            slider.classList.toggle('active');
        }
    });
}

// Cambio de idioma
document.addEventListener('DOMContentLoaded', () => {
    languageToggle.checked = false;
    const isSpanish = !languageToggle.checked;
    toggleLanguage(isSpanish);

    languageToggle.addEventListener('change', () => {
        const isSpanish = !languageToggle.checked;
        toggleLanguage(isSpanish);
    });

    function toggleLanguage(isSpanish) {
        const encryptBtn = document.querySelector('.encrypt-btn');
        const decryptBtn = document.querySelector('.decrypt-btn');
        const inputText = document.getElementById('inputText');
        const outputMessage = document.getElementById('outputMessage');
        const outputInstructions = document.getElementById('outputInstructions');
        const copyButton = document.querySelector('.copy-btn');

        encryptBtn.textContent = isSpanish ? 'Encriptar' : 'Encrypt';
        decryptBtn.textContent = isSpanish ? 'Desencriptar' : 'Decrypt';
        inputText.placeholder = isSpanish ? 'Ingrese el texto aquí' : 'Enter text here';
        outputMessage.textContent = isSpanish ? 'Ningún mensaje fue encontrado' : 'No message was found';
        outputInstructions.textContent = isSpanish ? 'Ingresa el texto que desees encriptar o desencriptar.' : 'Enter the text you want to encrypt or decrypt.';
        copyButton.textContent = isSpanish ? 'Copiar' : 'Copy';
        infotext.innerHTML = isSpanish ? '<img class="alert" src="./assets/img/alerta.png" alt="Alerta"> Solo letras minúsculas y sin acento' : '<img class="alert" src="./assets/img/alerta.png" alt="Alert"> Only lowercase letters without accents';
    }

    // Validar el texto
    function validateInput(text) {
        const isValid = /^[a-z\s]+$/.test(text);
        infotext.classList.toggle('error', !isValid);
        alertIcon.classList.toggle('error', !isValid);
        return isValid;
    }

    inputText.addEventListener('input', () => {
        validateInput(inputText.value);
    });

    // Encriptar el texto
    function encrypt() {
        const text = inputText.value;
        if (validateInput(text)) {
            const encryptedText = text.replace(/e/g, 'enter')
                .replace(/i/g, 'imes')
                .replace(/a/g, 'ai')
                .replace(/o/g, 'ober')
                .replace(/u/g, 'ufat');
            displayOutput(encryptedText);
            robot.style.display = 'none'; 
        }
    }

    // Desencriptar el texto
    function decrypt() {
        const text = inputText.value;
        if (validateInput(text)) {
            const decryptedText = text.replace(/enter/g, 'e')
                .replace(/imes/g, 'i')
                .replace(/ai/g, 'a')
                .replace(/ober/g, 'o')
                .replace(/ufat/g, 'u');
            displayOutput(decryptedText);
            robot.style.display = 'none'; 
        }
    }

    // Mostrar el texto de salida
    function displayOutput(text) {
        outputText.textContent = text;
        outputText.style.display = 'block';
        outputMessage.style.display = 'none';
        outputInstructions.style.display = 'none';
        robot.style.display = 'none';
        buttonContainer.style.display = 'flex';
    }

    // Crear el mensaje flotante para mostrar el texto copiado
    const copyMessage = document.createElement('div');
    copyMessage.id = 'copyMessage';
    copyMessage.classList.add('floating-message');

    document.body.appendChild(copyMessage);

    // Copiar el texto al portapapeles
    function copyToClipboard() {
        let outputTextContent = document.querySelector('.output-text').innerText;
        navigator.clipboard.writeText(outputTextContent).then(() => {
            copyMessage.innerText = !languageToggle.checked ? '¡Copiado!' : 'Copied!';
            // Mostrar el mensaje flotante
            copyMessage.style.display = 'block';
            // Posicionar el mensaje flotante sobre el botón de copiar
            let rect = copyButton.getBoundingClientRect();
            copyMessage.style.top = `${rect.top - 30}px`;
            copyMessage.style.left = `${rect.left + rect.width / 2 - copyMessage.offsetWidth / 2}px`;

            setTimeout(() => {
                copyMessage.style.display = 'none';
            }, 2000); // Ocultar después de 2 segundos
        });
    }

    reloadButton.addEventListener('click', reloadOutput);

    // Recargar el área de salida
    function reloadOutput() {
        outputText.textContent = '';
        outputText.style.display = 'none';
        buttonContainer.style.display = 'none';
        outputMessage.style.display = 'block';
        outputInstructions.style.display = 'block';
        alertIcon.style.display = 'inline-block';
        robot.style.display = 'block'; 
    }

    // Asignar funciones a los botones
    document.querySelector('.encrypt-btn').addEventListener('click', encrypt);
    document.querySelector('.decrypt-btn').addEventListener('click', decrypt);
    copyButton.addEventListener('click', copyToClipboard);
    reloadButton.addEventListener('click', reloadOutput);
});
