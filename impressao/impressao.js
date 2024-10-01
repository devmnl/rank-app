// scripts.js

// Dados fictícios organizados por operadores para a Máquina 1
const dataMachine1 = [
    { name: 'MARCIO', production: 0 },  // Produção de Marcio
    { name: 'MANOEL', production: 0 },   // Produção de Manoel
    { name: 'WESLEY', production: 0 },   // Produção de Wesley
    { name: 'LUIZ', production: 0 }      // Produção de Luiz
];

// Dados fictícios organizados por operadores para a Máquina 2
const dataMachine2 = [
    { name: 'RENÊ', production: 0 },     // Produção de Renê
    { name: 'VITOR', production: 0 },   // Produção de Vitor
    { name: 'DOUGLAS', production: 0 },  // Produção de Douglas
    { name: 'ERIC', production: 0 }      // Produção de Eric
];

const employeesMachine1 = [
    { name: 'SAMUEL', image: '/images/default-user.png', color: 'rgba(255, 99, 132, 0.6)' },
    { name: 'JONATAS', image: '/images/default-user.png', color: 'rgba(54, 162, 235, 0.6)' },
    { name: 'MAILSON', image: '/images/default-user.png', color: 'rgba(255, 159, 64, 0.6)' },
    { name: 'ANDERSON', image: '/images/default-user.png', color: 'rgba(153, 102, 255, 0.6)' }
];

const employeesMachine2 = [
    { name: 'GUILHERME', image: '/images/default-user.png', color: 'rgba(153, 102, 255, 0.6)' },
    { name: 'ALAN', image: '/images/default-user.png', color: 'rgba(255, 99, 132, 0.6)' },
    { name: 'DIOGO', image: '/images/default-user.png', color: 'rgba(54, 162, 235, 0.6)' },
    { name: '???', image: '/images/default-user.png', color: 'rgba(255, 159, 64, 0.6)' }
];

// Função de configuração do gráfico com cores personalizadas
const config = (data, employees) => ({
    type: 'bar',
    data: {
        labels: employees.map(e => e.name),
        datasets: [{
            data: data.map(e => e.production),  // Acesse a produção corretamente
            backgroundColor: employees.map(e => e.color),
            borderColor: employees.map(e => e.color.replace('0.6', '1')),
            borderWidth: 1
        }]
    },
    options: {
        plugins: {
            legend: {
                display: false // Oculta a legenda
            }
        },
        scales: {
            y: {
                beginAtZero: true
            },
            x: {
                title: {
                    display: false // Oculta o título do eixo X
                }
            }
        }
    }
});

// Função para calcular o total de produção
const calculateTotalProduction = (data) => {
    return data.reduce((total, operator) => total + operator.production, 0);
};

// Função para exibir o total de produção acima do gráfico
const displayTotalProduction = (total, elementId) => {
    const totalElement = document.getElementById(elementId);
    totalElement.innerHTML = `Total de produção: <span style="color: green; font-weight: bold;">${total.toLocaleString()} t</span>`;
};

// Criação dos gráficos para cada máquina
const ctx1 = document.getElementById('chartMachine1').getContext('2d');
const chartMachine1 = new Chart(ctx1, config(dataMachine1, employeesMachine1));

const ctx2 = document.getElementById('chartMachine2').getContext('2d');
const chartMachine2 = new Chart(ctx2, config(dataMachine2, employeesMachine2));

// Calcular e exibir o total de produção de cada máquina
const totalMachine1 = calculateTotalProduction(dataMachine1);
const totalMachine2 = calculateTotalProduction(dataMachine2);

displayTotalProduction(totalMachine1, 'totalMachine1');
displayTotalProduction(totalMachine2, 'totalMachine2');

// Função para formatar os valores com a unidade correta
const formatValueWithUnit = (value) => {
    if (value >= 1) {
        return `${value.toFixed(2).toLocaleString()} t`; // Exibe em toneladas com 2 casas decimais para valores maiores ou iguais a 1 tonelada
    } else {
        const kg = value * 1000; // Converte toneladas para kg
        return `${kg.toLocaleString()} kg`; // Exibe em kg para valores menores que 1 tonelada
    }
};

// Função para gerar o ranking de cada máquina com fotos e cores correspondentes
const generateRanking = (data, employees, elementId) => {
    const sortedData = data.map((value, index) => ({
        ...employees[index],
        value: value.production // Acesse a produção corretamente
    })).sort((a, b) => b.value - a.value);

    const rankingElement = document.getElementById(elementId);
    rankingElement.innerHTML = '';
    sortedData.forEach((item, index) => {
        const div = document.createElement('div');

        // Cria a imagem do funcionário
        const img = document.createElement('img');
        img.src = item.image; // Usa o caminho completo da imagem fornecido
        img.alt = item.name;

        // Formata o valor com a unidade correta (t ou kg)
        const formattedValue = formatValueWithUnit(item.value);

        // Cria o texto do funcionário com a colocação e cor correspondente
        const text = document.createElement('span');
        if (item.value === 0) {
            text.innerHTML = `${item.name}: <span style="color: gray; font-weight: bold;">-</span>`;
        } else {
            text.innerHTML = `${index + 1}º - ${item.name}: <span style="color: gray; font-weight: bold;">${formattedValue}</span>`;
        }
        text.style.color = item.color.replace('0.6', '1'); // Aplica a cor correspondente

        // Adiciona a imagem e o texto ao div
        div.appendChild(img);
        div.appendChild(text);

        rankingElement.appendChild(div);
    });
};

// Gerar o ranking para cada máquina
generateRanking(dataMachine1, employeesMachine1, 'rankingMachine1');
generateRanking(dataMachine2, employeesMachine2, 'rankingMachine2');