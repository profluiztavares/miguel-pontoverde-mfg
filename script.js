// Navegação de Abas
const botoesAbas = document.querySelectorAll('.btn-aba');
const conteudosAbas = document.querySelectorAll('.conteudo-aba');

botoesAbas.forEach(botao => {
    botao.addEventListener('click', () => {
        botoesAbas.forEach(b => b.classList.remove('ativa'));
        conteudosAbas.forEach(c => c.classList.remove('ativa'));
        botao.classList.add('ativa');
        document.getElementById(`aba-${botao.dataset.aba}`).classList.add('ativa');
    });
});

// Banco de Dados do Mural de Conhecimento (Cards)
const bancoDeCards = {
    'ilpf': {
        titulo: 'Integração Lavoura-Pecuária-Floresta (ILPF)',
        informacao: 'O ILPF é uma estratégia de produção que integra diferentes sistemas produtivos em uma mesma área. Isso melhora as propriedades físicas, químicas e biológicas do solo.',
        dinamica: 'Divida a turma em grupos e peça para desenharem um croqui de uma fazenda utilizando consórcio de milho, braquiária e eucalipto.'
    },
    'carbono': {
        titulo: 'Mercado de Créditos de Carbono',
        informacao: 'Cada tonelada de CO2 não emitida ou absorvida pela fazenda gera um certificado que pode ser vendido no mercado financeiro global.',
        dinamica: 'Simule uma "bolsa de valores" na sala. Cada aluno representa uma fazenda com diferentes práticas de manejo e eles devem negociar créditos entre si.'
    }
};

// Lógica de Abertura dos Cards
const modal = document.getElementById('modal-card');
const tituloModal = document.getElementById('modal-titulo');
const infoModal = document.getElementById('modal-info');
const sugestaoModal = document.getElementById('txt-sugestao');

function abrirCardDetalhe(id) {
    const dados = bancoDeCards[id];
    if (dados) {
        tituloModal.textContent = dados.titulo;
        infoModal.textContent = dados.informacao;
        sugestaoModal.textContent = dados.dinamica;
        modal.style.display = 'flex';
    }
}

function fecharCard() {
    modal.style.display = 'none';
}

// Fechar modal clicando fora
modal.addEventListener('click', (e) => {
    if (e.target === modal) fecharCard();
});

// Lógica do Chatbot Central
const inputChat = document.getElementById('chat-mensagem');
const btnEnviarChat = document.getElementById('btn-enviar-chat');
const historicoChat = document.getElementById('chat-historico');

function acionarIA() {
    const msg = inputChat.value.trim().toLowerCase();
    if (!msg) return;

    // Mensagem do usuário
    historicoChat.innerHTML += `<p class="chat-msg usuario">${inputChat.value}</p>`;
    inputChat.value = "";

    // Lógica simples de resposta
    let resposta = "Processando comando... Sugiro consultar os Cards de Conhecimento para diretrizes detalhadas.";
    
    if (msg.includes('clima') || msg.includes('chuva')) {
        resposta = "Análise meteorológica: Sem previsão de geada para a próxima semana. Janela de plantio ideal ativa.";
    } else if (msg.includes('cota') || msg.includes('preço')) {
        resposta = "Acessando CEASA-PR: O mercado indica alta no valor das folhosas. Ótimo momento para negociar.";
    }

    setTimeout(() => {
        historicoChat.innerHTML += `<p class="chat-msg bot">${resposta}</p>`;
        historicoChat.scrollTop = historicoChat.scrollHeight;
    }, 600);
}

btnEnviarChat.addEventListener('click', acionarIA);
inputChat.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') acionarIA();
});
