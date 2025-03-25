import {API_LINK} from "../js/API.js";

// Função para buscar produtos da API
async function buscarProdutosDoBackend() {
    try {
        const response = await fetch(`${API_LINK}/produto`);
        const data = await response.json();
        console.log('Produtos recebidos da API:', data);
        
        // Atualiza a variável produtos com os produtos da API
        produtos = data;
        
        // Atualiza a tabela de produtos com os dados recebidos da API
        atualizarTabelaProdutos();
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
    }
}

// Função para verificar se todos os campos estão preenchidos
function validarFormularioProduto(produto) {
    if (!produto.nome || produto.nome.trim() === '') {
        alert('O nome do produto é obrigatório.');
        return false;
    }
    if (!produto.preco || isNaN(produto.preco) || produto.preco <= 0) {
        alert('O preço do produto deve ser um número válido e maior que zero.');
        return false;
    }
    if (!produto.categoria || produto.categoria.trim() === '') {
        alert('A categoria do produto é obrigatória.');
        return false;
    }
    if (!produto.descricao || produto.descricao.trim() === '') {
        alert('A descrição do produto é obrigatória.');
        return false;
    }
    return true; // Retorna true se todos os campos estiverem preenchidos
}

// Variável que irá armazenar os produtos
let produtos = [];
let isEditing = false; // Flag para indicar se está em modo de edição
let produtoEditandoId = null; // Armazena o ID do produto sendo editado

// Evento de edição de produto
const editarProdutoBtn = document.getElementById('editarProduto');
editarProdutoBtn.addEventListener('click', async function() {
    // Criação do objeto produto com os dados do formulário
    const produto = {
        nome: document.getElementById('nome').value,
        preco: parseFloat(document.getElementById('preco').value),
        categoria: document.getElementById('categoria').value,
        descricao: document.getElementById('descricao').value
    };

    // Valida o formulário antes de prosseguir com a edição
    if (!validarFormularioProduto(produto)) {
        return; // Se a validação falhar, interrompe o processo de edição
    }

    try {
        let response;
        if (isEditing) {
            // Edição: faz requisição PUT para atualizar o produto
            response = await fetch(`${API_LINK}/produto/${produtoEditandoId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(produto)
            });

            if (response.ok) {
                const produtoSalvo = await response.json();
                alert('Produto atualizado com sucesso!');
                
                // Atualiza o produto na lista local
                produtos = produtos.map(p => (p._id === produtoEditandoId ? produtoSalvo : p));
                
                // Atualiza a tabela
                atualizarTabelaProdutos();

                // Resetar o formulário
                document.getElementById('produto-form').reset();
                isEditing = false;
                produtoEditandoId = null;
            } else {
                alert('Erro ao atualizar o produto.');
            }
        }
    } catch (error) {
        console.error('Erro ao salvar produto:', error);
    }
});

function editarProduto(index) {
    const produto = produtos[index];
    
    // Preenche o formulário com os dados do produto a ser editado
    document.getElementById('nome').value = produto.nome;
    document.getElementById('preco').value = produto.preco;
    document.getElementById('categoria').value = produto.categoria;
    document.getElementById('descricao').value = produto.descricao;
    
    // Muda o formulário para modo de edição
    isEditing = true;
    produtoEditandoId = produto._id;
    const btnCadastrar = document.getElementById('cadastrarProduto');
    btnCadastrar.style.display = 'none';
    const btnEditar = document.getElementById('editarProduto');
    btnEditar.style.display = 'block';
    // Foca no campo de nome ao iniciar a edição
    document.getElementById('nome').focus();
}

// Evento de cadastro de produto
const cadastrarProduto = document.getElementById('cadastrarProduto');
cadastrarProduto.addEventListener('click', async function() {
    const produto = {
        nome: document.getElementById('nome').value,
        preco: parseFloat(document.getElementById('preco').value),
        categoria: document.getElementById('categoria').value,
        descricao: document.getElementById('descricao').value
    };

    // Valida o formulário antes de prosseguir com o cadastro
    if (!validarFormularioProduto(produto)) {
        return; // Se a validação falhar, interrompe o processo de cadastro
    }

    try {
        // Criação: faz requisição POST para cadastrar novo produto
        const response = await fetch(`${API_LINK}/produto`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(produto)
        });

        if (response.ok) {
            const produtoSalvo = await response.json();
            alert('Produto cadastrado com sucesso!');
            
            // Adiciona o novo produto à lista local
            produtos.push(produtoSalvo);
            
            // Atualiza a tabela
            atualizarTabelaProdutos();
            
            // Resetar o formulário
            document.getElementById('produto-form').reset(); 
        } else {
            alert('Erro ao cadastrar o produto.');
        }
    } catch (error) {
        console.error('Erro ao salvar produto:', error);
    }
});

// Função para atualizar a tabela de produtos
function atualizarTabelaProdutos() {
    const tbody = document.querySelector('#produtos-table tbody');
    
    // Limpa a tabela antes de adicionar os novos produtos
    tbody.innerHTML = '';
   
    // Itera sobre os produtos e cria as linhas na tabela
    produtos.forEach((produto, index) => {
        const mudarPrecoParaNumero = parseFloat(produto.preco);
        const precoFormatado = mudarPrecoParaNumero.toFixed(2).replace('.', ',');
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${produto.nome}</td>
            <td>R$ ${precoFormatado}</td>
            <td>${produto.categoria}</td>
            <td>${produto.descricao}</td>
            <td> 
                <button class="btn-editar" data-index="${index}">Editar</button>
                <button class="btn-apagar" data-index="${index}">Apagar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    // Adiciona eventos de clique para os botões "Editar" e "Apagar"
    document.querySelectorAll('.btn-editar').forEach(button => {
        button.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            editarProduto(index);
        });
    });

    document.querySelectorAll('.btn-apagar').forEach(button => {
        button.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            apagarProduto(index);
        });
    });
}

// Função para editar o produto


// Função para apagar o produto
async function apagarProduto(index) {
    const produto = produtos[index];
    if (confirm('Tem certeza que deseja apagar este produto?')) {
        try {
            // Envia uma requisição DELETE para o backend para apagar o produto
            const response = await fetch(`${API_LINK}/produto/${produto._id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                produtos.splice(index, 1);  // Remove o produto da lista local
                atualizarTabelaProdutos();  // Atualiza a tabela
                alert('Produto apagado com sucesso!');
            } else {
                alert('Erro ao apagar produto.');
            }
        } catch (error) {
            console.error('Erro ao apagar produto:', error);
        }
    }
}

// Função para exibir as diferentes telas da aplicação
 window.showScreen = function (screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
    
    // Atualiza a navegação
    document.querySelectorAll('nav a').forEach(a => {
        a.classList.remove('active');
    });
    document.getElementById(`nav-${screenId}`).classList.add('active');
}

// Mostra a tela inicial de produtos
showScreen('produtos');

// Chama a função para buscar produtos da API ao carregar a página
buscarProdutosDoBackend();
