/* ==========================================================
   1. ESTADO GLOBAL E INTERFACE BÁSICA
   ========================================================== */
const estadoGlobal = {
    saldoVerde: 0,
    clima: 'ideal'
};

// Fechar Tela de Bloqueio
document.getElementById('btn-entrar-site').addEventListener('click', () => {
    document.getElementById('tela-entrada').style.opacity = '0';
    setTimeout(() => document.getElementById('tela-entrada').style.display = 'none', 800);
});

// Alternar Modo Escuro
document.getElementById('btn-alternar-tema').addEventListener('click', (e) => {
    document.body.classList.toggle('dark-mode');
    e.target.textContent = document.body.classList.contains('dark-mode') ? "☀️ Modo Claro" : "🌙 Modo Escuro";
});

// Navegação em Abas
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

/* ==========================================================
   2. GAMIFICAÇÃO (MEDALHAS)
   ========================================================== */
function liberarMedalha(idMedalha) {
    const card = document.getElementById(idMedalha);
    if(card && card.classList.contains('bloqueada')) {
        card.classList.remove('bloqueada');
        card.classList.add('desbloqueada');
    }
}

/* ==========================================================
   3. GESTÃO E CRÉDITO DE CARBONO (Integração)
   ========================================================== */
const formGestao = document.getElementById('formulario-gestao');
formGestao.addEventListener('submit', (e) => {
    e.preventDefault();
    const custo = parseFloat(document.getElementById('custo-total').value) || 0;
    const area = parseFloat(document.getElementById('tamanho-area').value) || 0;
    const manejo = document.getElementById('tipo-manejo').value;

    let fatorCarbono = 1.1;
    if (manejo === 'direto') fatorCarbono = 2.5;
    if (manejo === 'ilpf') {
        fatorCarbono = 4.2;
        liberarMedalha('medalha-solo'); // Desbloqueia medalha
    }

    const retencaoCO2 = area * fatorCarbono;
    const valorCreditos = retencaoCO2 * 75; // R$ 75 por tonelada
    const lucroLiquido = valorCreditos - custo;

    estadoGlobal.saldoVerde += valorCreditos;

    if(retencaoCO2 >= 100) liberarMedalha('medalha-carbono');
    if(estadoGlobal.saldoVerde > 0) liberarMedalha('medalha-investidor');

    document.getElementById('res-carbono').innerHTML = `Retenção de CO₂: <strong>${retencaoCO2.toFixed(1)} t/ano</strong>`;
    document.getElementById('res-creditos').innerHTML = `Bônus Verde Gerado: <strong>R$ ${valorCreditos.toFixed(2)}</strong>`;
    
    const txtLucro = document.getElementById('res-lucro');
    txtLucro.innerHTML = `Saldo Final Operacional: <strong>R$ ${lucroLiquido.toFixed(2)}</strong>`;
    txtLucro.style.color = lucroLiquido >= 0 ? "var(--cor-sucesso)" : "var(--cor-erro)";

    document.getElementById('resultado-gestao').classList.remove('resultado-oculto');
});

/* ==========================================================
   4. SIMULADOR CLIMÁTICO E GRÁFICOS
   ========================================================== */
const formClima = document.getElementById('formulario-clima');
formClima.addEventListener('submit', (e) => {
    e.preventDefault();
    const clima = document.getElementById('cenario-clima').value;
    estadoGlobal.clima = clima;

    const barraTomate = document.getElementById('barra-tomate');
    const barraPepino = document.getElementById('barra-pepino');
    const txtTomate = document.getElementById('valor-tomate');
    const txtPepino = document.getElementById('valor-pepino');
    const painelAlerta = document.getElementById('painel-dados-clima');

    if (clima === 'ideal') {
        painelAlerta.innerHTML = `<p style="color:var(--cor-sucesso); font-weight:bold;">🌦️ Clima Ideal: Condições ótimas para plantio.</p>`;
        barraTomate.style.width = "50%"; txtTomate.innerText = "R$ 90,00 / Cx";
        barraPepino.style.width = "40%"; txtPepino.innerText = "R$ 48,00 / Cx";
    } else if (clima === 'seca') {
        painelAlerta.innerHTML = `<p style="color:var(--cor-erro); font-weight:bold;">🚨 Seca Severa: Alta evapotranspiração. Preços dispararam por escassez!</p>`;
        barraTomate.style.width = "85%"; txtTomate.innerText = "R$ 160,00 / Cx";
        barraPepino.style.width = "95%"; txtPepino.innerText = "R$ 120,00 / Cx";
    } else {
        painelAlerta.innerHTML = `<p style="color:#d97706; font-weight:bold;">⚠️ Frente Fria: Risco de geada. Atraso no plantio recomendado.</p>`;
        barraTomate.style.width = "70%"; txtTomate.innerText = "R$ 130,00 / Cx";
        barraPepino.style.width = "60%"; txtPepino.innerText = "R$ 75,00 / Cx";
    }
});

/* ==========================================================
   5. BUSCA NA TABELA CEASA
   ========================================================== */
document.getElementById('busca-ceasa').addEventListener('keyup', (e) => {
    const termo = e.target.value.toLowerCase();
    document.querySelectorAll('.linha-busca').forEach(linha => {
        linha.style.display = linha.textContent.toLowerCase().includes(termo) ? "" : "none";
    });
});

/* ==========================================================
   6. ASSISTENTE IA FLUTUANTE
   ========================================================== */
const avatar = document.getElementById('avatar-ponto');
const balaoChat = document.getElementById('balao-assistente');
const btnFecharChat = document.getElementById('btn-fechar-chat');
const btnEnviarChat = document.getElementById('btn-enviar-chat');
const inputChat = document.getElementById('chat-mensagem');
const historicoChat = document.getElementById('chat-historico');

avatar.addEventListener('click', () => balaoChat.style.display = "block");
btnFecharChat.addEventListener('click', () => balaoChat.style.display = "none");

function responderIA() {
    const msg = inputChat.value.trim().toLowerCase();
    if (!msg) return;

    historicoChat.innerHTML += `<p class="chat-msg usuario">${inputChat.value}</p>`;
    inputChat.value = "";

    let resposta = "Desculpe, não entendi. Tente perguntar sobre 'solo', 'carbono', 'clima' ou 'tomate'.";
    
    if (msg.includes('solo') || msg.includes('ilpf')) {
        resposta = "A Integração Lavoura-Pecuária-Floresta (ILPF) aumenta a retenção orgânica para até 4.2 t/ha de carbono.";
    } else if (msg.includes('carbono')) {
        resposta = "Créditos de carbono convertem preservação em saldo financeiro (R$ 75 por tonelada)! Calcule na Aba 1.";
    } else if (msg.includes('clima') || msg.includes('seca')) {
        resposta = "Mudanças extremas (como Seca) geram escassez e elevam o preço dos vegetais na tabela CEASA.";
    } else if (msg.includes('tomate')) {
        resposta = "O tomate é sensível à geada. Na Aba 3 você pode simular como o preço sobe quando o clima piora.";
    }

    setTimeout(() => {
        historicoChat.innerHTML += `<p class="chat-msg bot">${resposta}</p>`;
        historicoChat.scrollTop = historicoChat.scrollHeight;
    }, 400);
}

btnEnviarChat.addEventListener('click', responderIA);
inputChat.addEventListener('keypress', (e) => { if(e.key === 'Enter') responderIA(); });
