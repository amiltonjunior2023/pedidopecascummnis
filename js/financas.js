


function adicionarItem() {
    const descricao = document.getElementById("descricao").value;
    const valor = document.getElementById("valor").value; // valor agora é um texto
    const data = document.getElementById("data").value;
    document.getElementById("descricao").value = "";
    document.getElementById("valor").value = "";
    document.getElementById("data").value = "";
    alert('Pedido do ' + descricao + ' adicionado com sucesso');

    if (descricao && valor && data) {
        const item = { descricao, valor, data }; // Salvar como texto
        const listaItens = JSON.parse(localStorage.getItem("listaItens")) || [];
        listaItens.push(item);
        localStorage.setItem("listaItens", JSON.stringify(listaItens));
        atualizarLista();
    } else {
        alert("Preencha todos os campos corretamente.");
    }
}

// Função para atualizar a lista de itens
function atualizarLista() {
    const listaItens = JSON.parse(localStorage.getItem("listaItens")) || [];
    const listaItensElement = document.getElementById("lista-itens");
    listaItensElement.innerHTML = "";

    listaItens.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = `${item.descricao} - ${item.valor} - ${item.data}`; // Removido o toFixed(2)
        const removerBtn = document.createElement("button");
        removerBtn.textContent = "Remover";
        removerBtn.onclick = () => removerItem(index);
        li.appendChild(removerBtn);
        listaItensElement.appendChild(li);
    });
}

// Função para remover um item da lista
function removerItem(index) {
    const listaItens = JSON.parse(localStorage.getItem("listaItens")) || [];
    listaItens.splice(index, 1);
    localStorage.setItem("listaItens", JSON.stringify(listaItens));
    atualizarLista();
    alert('Excluído com sucesso');
}

// Função para filtrar itens por data
function filtrarPorData() {
    const dataFiltro = document.getElementById("data").value; // Pega a data no formato YYYY-MM-DD
    const listaItens = JSON.parse(localStorage.getItem("listaItens")) || [];
    
    // Filtrar itens pela data
    const listaFiltrada = listaItens.filter(item => item.data === dataFiltro);
    const listaItensElement = document.getElementById("lista-itens");
    listaItensElement.innerHTML = "";

    // Atualizar a lista filtrada
    listaFiltrada.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = `${item.descricao} - ${item.valor} - ${item.data}`; // Removido toFixed(2)
        const removerBtn = document.createElement("button");
        removerBtn.textContent = "Remover";
        removerBtn.classList.add("remover-btn");
        removerBtn.onclick = () => removerItem(index);
        li.appendChild(removerBtn);
        listaItensElement.appendChild(li);
    });
}

// Função para limpar o filtro
function limparFiltro() {
    document.getElementById("data").value = "";
    document.getElementById("valor").value = "";
    document.getElementById("descricao").value = "";
    atualizarLista();
}

// Carregar a lista inicial ao carregar a página
atualizarLista();

document.addEventListener('DOMContentLoaded', function () {
    const textElement = document.getElementById('welcome-text');
    const text = 'Seja bem-vindo a Lista de Finanças';
    let index = 0;

    function type() {
        textElement.textContent += text[index];
        index++;

        if (index < text.length) {
            setTimeout(type, 300); // Ajustar a velocidade (em milissegundos) de digitação
        }
    }

    type();
    // Solicitar permissão para notificações
    if (Notification.permission !== "granted") {
        Notification.requestPermission();
    }
    // Verificar notificações diariamente às 05:10
    verificarNotificacoesDiarias();
    setInterval(verificarNotificacoesDiarias, 24 * 60 * 60 * 1000); // Verifica a cada 24 horas
});

// Função para verificar notificações diárias
function verificarNotificacoesDiarias() {
    const agora = new Date();
    const horarioAlvo = new Date();
    horarioAlvo.setHours(5, 10, 0, 0); // Define as 05:10

    // Se já passou das 05:10 hoje, define o alvo para amanhã às 05:10
    if (agora > horarioAlvo) {
        horarioAlvo.setDate(horarioAlvo.getDate() + 1);
    }

    const tempoAteHorarioAlvo = horarioAlvo - agora;

    setTimeout(() => {
        exibirNotificacoesDoDia();
    }, tempoAteHorarioAlvo);
}

// Função para exibir notificações do dia
function exibirNotificacoesDoDia() {
    if (Notification.permission === "granted") {
        const hoje = new Date().toISOString().split('T')[0]; // Data de hoje no formato YYYY-MM-DD
        const listaItens = JSON.parse(localStorage.getItem("listaItens")) || [];

        listaItens.forEach(item => {
            if (item.data === hoje) {
                new Notification("Lembrete de Pagamento", {
                    body: `Hoje é o dia de pagamento para ${item.descricao} no valor de R$ ${item.valor.toFixed(2)}.`,
                });
            }
        });
    }
}

function redirecionar() {
    setTimeout(function() {
        window.location.href = "carregamento.html"; // Substitua com a URL desejada
    }, 3000); // 3000 milissegundos = 3 segundos
}