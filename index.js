function navigateTo(page) {
    window.location.href = page;
}

document.addEventListener("DOMContentLoaded", function() {
    const title = document.getElementById("title");
    const fullText = "ProRanker"; // Define o texto que queremos animar
    let index = 0; // Contador para as letras

    function type() {
        if (index < fullText.length) {
            title.innerHTML += fullText.charAt(index); // Adiciona a próxima letra
            index++;
            setTimeout(type, 100); // Chama a função novamente após 100ms
        } else {
            title.innerHTML += ' <i class="fas fa-trophy"></i>'; // Adiciona o ícone após a animação
        }
    }

    type(); // Inicia a animação
});

