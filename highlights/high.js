function showModal(name, production, description) {
    // Preencher o modal com informações do funcionário
    document.getElementById("modalName").innerText = name;
    document.getElementById("modalProduction").innerText = production;
    document.getElementById("modalDescription").innerText = description;

    // Mostrar o modal
    document.getElementById("employeeModal").style.display = "block";
}

function closeModal() {
    // Fechar o modal
    document.getElementById("employeeModal").style.display = "none";
}

// Fechar o modal quando o usuário clicar fora do conteúdo do modal
window.onclick = function(event) {
    var modal = document.getElementById("employeeModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
