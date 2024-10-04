// scripts.js

// Dados fictícios organizados por operadores para a Máquina 1
const dataMachine1 = [
    { name: 'MARCIO', production: 1.66 },
    { name: 'MANOEL', production: 6.8 },
    { name: 'WESLEY', production: 1.07 },
    { name: 'LUIZ', production: 6.24 }
];

// Dados fictícios organizados por operadores para a Máquina 2
const dataMachine2 = [
    { name: 'RENÊ', production: 3.87 },
    { name: 'VITOR', production: 2.59 },
    { name: 'DOUGLAS', production: 4.55 },
    { name: 'ERIC', production: 1.96 }
];

const employeesMachine1 = [
    { name: 'MARCIO', image: '/images/marcio.jpeg', color: 'rgba(255, 99, 132, 0.6)', description: 'Dia' },
    { name: 'MANOEL', image: '/images/manoel.jpeg', color: 'rgba(54, 162, 235, 0.6)' , description: 'Noite'},
    { name: 'WESLEY', image: '/images/wesley.jpeg', color: 'rgba(255, 159, 64, 0.6)' , description: 'Noite'},
    { name: 'LUIZ', image: '/images/luiz.jpeg', color: 'rgba(153, 102, 255, 0.6)' , description: 'Dia'}
];

const employeesMachine2 = [
    { name: 'RENÊ', image: '/images/rene.jpeg', color: 'rgba(153, 102, 255, 0.6)' , description: 'Dia'},
    { name: 'VITOR', image: '/images/default-user.png', color: 'rgba(255, 99, 132, 0.6)' , description: 'Dia'},
    { name: 'DOUGLAS', image: '/images/default-user.png', color: 'rgba(54, 162, 235, 0.6)', description: 'Noite' },
    { name: 'ERIC', image: '/images/eric.jpeg', color: 'rgba(255, 159, 64, 0.6)' , description: 'Noite'}
];

// Função de configuração do gráfico com cores personalizadas
const createChartConfig = (data, employees) => ({
    type: 'bar',
    data: {
        labels: employees.map(e => e.name),
        datasets: [{
            data: data.map(e => e.production),
            backgroundColor: employees.map(e => e.color),
            borderColor: employees.map(e => e.color.replace('0.6', '1')),
            borderWidth: 1
        }]
    },
    options: {
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                beginAtZero: true
            },
            x: {
                title: {
                    display: false
                }
            }
        }
    }
});

// Função para calcular o total de produção
const calculateTotalProduction = (data) => data.reduce((total, operator) => total + operator.production, 0);

// Função para exibir o total de produção acima do gráfico
const displayTotalProduction = (total, elementId) => {
    const totalElement = document.getElementById(elementId);
    totalElement.innerHTML = `Total de produção: <span style="color: green; font-weight: bold;">${total.toLocaleString()} t</span>`;
};

// Criação dos gráficos para cada máquina
const createCharts = () => {
    const ctx1 = document.getElementById('chartMachine1').getContext('2d');
    new Chart(ctx1, createChartConfig(dataMachine1, employeesMachine1));

    const ctx2 = document.getElementById('chartMachine2').getContext('2d');
    new Chart(ctx2, createChartConfig(dataMachine2, employeesMachine2));
};

// Função para formatar os valores com a unidade correta
const formatValueWithUnit = (value) => {
    if (value >= 1) {
        return `${value.toFixed(2).toLocaleString()} t`;
    } else {
        return `${(value * 1000).toLocaleString()} kg`;
    }
};

// Função para gerar o ranking de cada máquina com fotos e cores correspondentes
const generateRanking = (data, employees, elementId) => {
    const sortedData = data.map((value, index) => ({
        ...employees[index],
        value: value.production
    })).sort((a, b) => b.value - a.value);

    const rankingElement = document.getElementById(elementId);
    rankingElement.innerHTML = '';

    sortedData.forEach((item, index) => {
        const div = document.createElement('div');
        
        // Cria a imagem do funcionário
        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.name;

        // Formata o valor com a unidade correta (t ou kg)
        const formattedValue = formatValueWithUnit(item.value);

        // Cria o texto do funcionário com a colocação e cor correspondente
        const text = document.createElement('span');
        text.innerHTML = item.value === 0
            ? `${item.name}: <span style="color: gray; font-weight: bold;">-</span>`
            : `${index + 1}º - ${item.name}: <span style="color: gray; font-weight: bold;">${formattedValue}</span>`;
        text.style.color = item.color.replace('0.6', '1');

        // Adiciona a imagem e o texto ao div
        div.appendChild(img);
        div.appendChild(text);

        // Adiciona evento de clique na imagem
        img.addEventListener('click', () => showEmployeeInfo(item));
        rankingElement.appendChild(div);
    });
};

// Gerar o ranking para cada máquina
const generateRankings = () => {
    generateRanking(dataMachine1, employeesMachine1, 'rankingMachine1');
    generateRanking(dataMachine2, employeesMachine2, 'rankingMachine2');
};

// Função para mostrar o modal com informações do funcionário
const showEmployeeInfo = (employee) => {
    const modal = document.getElementById('employeeModal');
    const modalImage = document.getElementById('modalImage');
    const modalName = document.getElementById('modalName');
    const modalDescription = document.getElementById('modalDescription');

    modalImage.src = employee.image;
    modalName.textContent = employee.name;
    modalDescription.textContent = `Turno: ${employee.description} `

    modal.style.display = 'block';
};

// Fechar modal ao clicar no botão de fechar
const closeModal = () => {
    const modal = document.getElementById('employeeModal');
    modal.style.display = 'none';
};

// Adiciona evento para fechar o modal ao clicar no 'x'
const closeButton = document.querySelector('.close');
closeButton.addEventListener('click', closeModal);

// Fecha o modal se o usuário clicar fora do conteúdo do modal
window.onclick = function(event) {
    const modal = document.getElementById('employeeModal');
    if (event.target === modal) {
        closeModal();
    }
};

// Inicializar gráficos e rankings
createCharts();
generateRankings();


// Função para formatar a data e hora sem "às"
function formatDateTime() {
    const now = new Date();
    const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = now.toLocaleDateString('pt-BR', optionsDate);
    
    // Formatar a hora sem o "às"
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const formattedTime = `${hours}:${minutes}`;
    
    return `${formattedDate} ${formattedTime}`;
}

// Função para atualizar a hora em tempo real
function updateDateTime() {
    document.getElementById('currentDate').textContent = formatDateTime();
}

// Atualizar a hora a cada segundo
setInterval(updateDateTime, 1000);

// Exibir a hora assim que a página carregar
updateDateTime();










