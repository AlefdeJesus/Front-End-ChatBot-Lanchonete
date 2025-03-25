import {API_LINK} from "../js/API.js";

// Função para buscar pedidos do backend
 async function buscarPedidosDoBackend() {
    try {
        const response = await fetch(`${API_LINK}/pedido`); // Faz uma requisição GET para o backend
        const data = await response.json(); // Converte a resposta para JSON
        console.log('Pedidos:', data); // Exibe os pedidos no console
        return data; // Retorna os dados dos pedidos
    } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
    }
}

async function atualizarPedidoTempoReal() {
    await criarItemPedido();
    console.log('Atualizando pedidos em tempo real...');
    setTimeout(atualizarPedidoTempoReal, 5000);
};



// Função para criar os itens dos pedidos no Kanban
async function criarItemPedido() {
    const pedidos = await buscarPedidosDoBackend(); // Aguarda a função buscarPedidosDoBackend
    if (!pedidos || pedidos.length === 0) return; // Verifica se há pedidos

    // Limpa as colunas antes de adicionar os pedidos novamente
    document.querySelectorAll('.kanban-column').forEach(coluna => {
        coluna.innerHTML = `<h3>${coluna.id.replace('-', ' ')}</h3>`; // Mantém o título da coluna
    });
    // Ordena os pedidos pela data de criação (do mais recente para o mais antigo)
    pedidos.sort((a, b) => new Date(b.data) - new Date(a.data));
    // Mapeia os pedidos para as colunas corretas no Kanban
    pedidos.forEach(pedido => {
        const item = document.createElement('div');
        item.className = 'kanban-item';

                // Exemplo de data ISO 8601
        const dataISO = pedido.data;

        // Converter para objeto Date
        const data = new Date(dataISO);

        // Formatar para o padrão brasileiro (dd/mm/aaaa hh:mm)
        const dataFormatada = data.toLocaleString('pt-BR', {
            timeZone: 'America/Sao_Paulo', // Define o fuso horário de Brasília
            dateStyle: 'short', // Formato curto para a data (dd/mm/aaaa)
            timeStyle: 'short'  // Formato curto para a hora (hh:mm)
        });
        

        // Formata os itens e o total do pedido
        const itensFormatados = pedido.itens.map(item => `${item.quantidade}x ${item.produto} (R$${item.preco.toFixed(2).replace('.', ',')})`).join('<br>');
        // Construção do HTML para o item
        
        let pagamentoHTML = `<strong>Pagamento: </strong>${pedido.formaDepagamento.toUpperCase()} <br>`;
            if (pedido.formaDepagamento === 'Dinheiro 💵') {    
                  pagamentoHTML += `<strong>Troco: </strong><label class="observacaoPedido">Para R$${pedido.trocoPara.toFixed(2).replace('.', ',')}</label>`;
            }   

item.innerHTML = `
<div id="dadosPedido">
    <strong style="display:none">Pedido: #${pedido._id}</strong>
    <strong>Cliente:</strong> ${pedido.cliente.toUpperCase()} - 9${pedido.contatoDoCliente}<br>
    <div id="estiloItensPedido"><strong>Itens:</strong><br> ${itensFormatados}</div><br>
    <strong>Endereço:</strong>${pedido.endereco.toUpperCase()}<br>
    ${pagamentoHTML}<br>
    <strong>Observação: </strong><label class="observacaoPedido">${pedido.observacao}</label><br>
    <strong>Total: R$ ${pedido.totalDoPedido.toFixed(2).replace('.', ',')}</strong>
    <div id="data">Data: ${dataFormatada}</div>
</div>
`;

        item.draggable = true; // Tornar o item arrastável
        document.querySelector(`#${pedido.status.toLowerCase().replace(' ', '-')}`).appendChild(item); // Adiciona o item à coluna correspondente
    });
}

// Função para atualizar o status de um pedido
async function atualizarStatusPedido(id, novoStatus) {
    console.log(`Atualizando status do pedido ${id} para "${novoStatus}"`);
    try {
        // Envia o novo status para o backend
        const response = await fetch(`${API_LINK}/pedido/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: novoStatus }) // Envia o novo status para o backend
        });

        if (response.ok) {
            criarItemPedido(); // Atualiza os pedidos após a mudança de status
        } else {
            console.error('Erro ao atualizar o status do pedido');
        }
    } catch (error) {
        console.error('Erro ao atualizar o status do pedido:', error);
    }
}

// Inicializa a funcionalidade de arrastar e soltar no Kanban
document.querySelectorAll('.kanban-column').forEach(coluna => {
    new Sortable(coluna, {
        group: 'pedidos',
        animation: 150,
        onEnd: function(evt) {
            const pedidoElement = evt.item; // O elemento arrastado
            const pedidoId = pedidoElement.querySelector('strong').textContent.split('#')[1];
            const novoStatus = evt.to.id.replace('-', ' '); // Obtém o novo status pela coluna de destino

            // Atualiza o status do pedido no backend
            atualizarStatusPedido(pedidoId, novoStatus);

            // Limpa as colunas e atualiza a exibição dos pedidos
            criarItemPedido();
        }
    });
});

// Chama a função para criar os itens dos pedidos ao carregar a página
//criarItemPedido();
atualizarPedidoTempoReal();