const listarPedidos = () =>{
    return fetch('http://localhost:3333/pedido')
    .then(response => {
        if(response.ok){
            return response.json();
            console.log(response.json());
        }else{
            throw new Error('Erro ao listar pedidos');
        }
    });
    
};
listarPedidos()