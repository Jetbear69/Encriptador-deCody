document.addEventListener("DOMContentLoaded", function() {
    let inputText = document.getElementById('inputText');
    let infoText = document.querySelector('.info-text');
    let encryptButton = document.querySelector('.encrypt-btn');
    let copyButton = document.querySelector('.copy-btn');
    let copyMessage = document.createElement('div');

    // Crear el mensaje flotante y agregarlo al DOM
    copyMessage.id = 'copyMessage';
    copyMessage.innerText = "Texto Copiado!";
    copyMessage.classList.add('floating-message');
    document.body.appendChild(copyMessage);

    // Validar el texto ingresado
    function validateText() {
        let text = inputText.value;
        let isValid = /^[a-z]+$/.test(text);
        
        if (!isValid) {
            infoText.style.color = 'red';
            encryptButton.disabled = true;
        } else {
            infoText.style.color = '';
            encryptButton.disabled = false;
        }
    }

    // Escuchar los cambios en el área de texto
    inputText.addEventListener('input', validateText);

    // Encriptar el texto
    function encrypt() {
        if (encryptButton.disabled) return;
        let text = inputText.value;
        let encryptedText = text
            .replace(/e/g, "enter")
            .replace(/i/g, "imes")
            .replace(/a/g, "ai")
            .replace(/o/g, "ober")
            .replace(/u/g, "ufat");

        let outputText = document.querySelector('.output-text');
        let outputMessage = document.getElementById('outputMessage');
        let outputInstructions = document.getElementById('outputInstructions');
        let randomImage = document.getElementById('randomImage');
        let buttonContainer = document.getElementById('buttonContainer');

        outputText.innerText = encryptedText;
        outputText.style.display = 'block';
        randomImage.style.display = 'none';
        outputMessage.style.display = 'none';
        outputInstructions.style.display = 'none';
        buttonContainer.style.display = 'flex';
    }

    // Desencriptar el texto
    function decrypt() {
        let text = inputText.value;
        let decryptedText = text
            .replace(/enter/g, "e")
            .replace(/imes/g, "i")
            .replace(/ai/g, "a")
            .replace(/ober/g, "o")
            .replace(/ufat/g, "u");

        let outputText = document.querySelector('.output-text');
        let outputMessage = document.getElementById('outputMessage');
        let outputInstructions = document.getElementById('outputInstructions');
        let randomImage = document.getElementById('randomImage');
        let buttonContainer = document.getElementById('buttonContainer');

        outputText.innerText = decryptedText;
        outputText.style.display = 'block';
        randomImage.style.display = 'none';
        outputMessage.style.display = 'none';
        outputInstructions.style.display = 'none';
        buttonContainer.style.display = 'flex';
    }

    // Copiar el texto al portapapeles
    function copyToClipboard() {
        let outputText = document.querySelector('.output-text').innerText;
        navigator.clipboard.writeText(outputText).then(() => {
            // Mostrar el mensaje flotante
            copyMessage.style.display = 'block';
            // Posicionar el mensaje flotante sobre el botón de copiar
            let rect = copyButton.getBoundingClientRect();
            copyMessage.style.top = `${rect.top - -100}px`;
            copyMessage.style.left = `${rect.left + rect.width / 2 - copyMessage.offsetWidth / 2}px`;

            setTimeout(() => {
                copyMessage.style.display = 'none';
            }, 2000); // Ocultar después de 2 segundos
        });
    }

    // Restablecer el área de salida a su estado original
    function reloadOutput() {
        document.querySelector('.output-text').style.display = 'none';
        document.getElementById('randomImage').style.display = 'block';
        document.getElementById('outputMessage').style.display = 'block';
        document.getElementById('outputInstructions').style.display = 'block';
        document.querySelector('.output-text').innerText = '';
        document.getElementById('buttonContainer').style.display = 'none';
    }

    // Asignar funciones a los botones
    encryptButton.addEventListener('click', encrypt);
    document.querySelector('.decrypt-btn').addEventListener('click', decrypt);
    copyButton.addEventListener('click', copyToClipboard);
    document.querySelector('.reload-btn').addEventListener('click', reloadOutput);
});
