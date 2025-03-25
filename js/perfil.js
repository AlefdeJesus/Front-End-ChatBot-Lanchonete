import { API_LINK } from "../js/API.js";

const msgQrCode = document.querySelector('.msgConectarZap');
const qrImage = document.getElementById('qrCodeImage');
const desconectar = document.getElementById('DesconectarWhatsapp');

function updateQRCode() {
    
    // A cada 2 segundos, faz uma requisição para obter o QR code da API
    qrImage.src = `${API_LINK}/qrcode?${new Date().getTime()}`; // Timestamp para evitar cache
    qrImage.onerror = () => {
        msgQrCode.style.display = 'none';
        qrImage.style.display = 'none';
        console.log('QR code não encontrado');
    }
    console.log('QR code atualizado');
}

// Atualiza a cada 2 segundos
setInterval(updateQRCode, 2000);

window.gerarQRCode = function(){
    updateQRCode();
    msgQrCode.style.display = 'block';
    qrImage.style.display = 'block';
    desconectar.style.display = 'block';
    console.log('Gerando QR code...');
}

//deslogar whatsapp
desconectar.addEventListener('click', async () => {
//confirmação para deslogar
const confirmacao = confirm('Tem certeza que deseja deslogar do WhatsApp?');
if (!confirmacao) {
    return;
}else{
    fetch(`${API_LINK}/desconectar`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
 }) .then(response => response.json())
    .then(data => {
     alert(data.message); // Exibe a mensagem de deslogado
     document.getElementById('qrCodeImage').style.display = 'none'; // Esconde o botão de deslogar
    
 })
 .catch(error => {
    console.error('Erro ao deslogar:', error);
});
}

})
