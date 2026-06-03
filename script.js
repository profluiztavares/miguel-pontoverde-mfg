document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. SISTEMA DE BUSCA E CATEGORIAS DINÂMICAS (VITRINE)
       ========================================================================== */
    const selectCategoria = document.getElementById('categoria');
    const selectSubcategoria = document.getElementById('subcategoria');

    const subcategoriasData = {
        'servicos': [
            'Colheita (Café, Milho, Soja)',
            'Preparação de Solo',
            'Manutenção de Maquinário',
            'Frete e Transporte'
        ],
        'venda': [
            'Grãos (Milho, Soja, Café)',
            'Sementes e Mudas',
            'Fertilizantes e Adubos',
            'Maquinário Agrícola'
        ]
    };

    selectCategoria.addEventListener('change', function() {
        const cat = this.value;
        selectSubcategoria.innerHTML = '<option value="" disabled selected>Subcategorias</option>';
        
        if (cat && subcategoriasData[cat]) {
            selectSubcategoria.disabled = false;
            subcategoriasData[cat].forEach(sub => {
                const opt = document.createElement('option');
                opt.value = sub.toLowerCase();
                opt.textContent = sub;
                selectSubcategoria.appendChild(opt);
            });
        } else {
            selectSubcategoria.disabled = true;
        }
    });

    // Animação ao enviar busca (apenas desce a página até a vitrine)
    document.getElementById('form-busca').addEventListener('submit', (e) => {
        e.preventDefault();
        document.getElementById('vitrine').scrollIntoView({ behavior: 'smooth' });
    });

    /* ==========================================================================
       2. NAVEGAÇÃO ENTRE AS FERRAMENTAS (ABAS)
       ========================================================================== */
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

    /* ==========================================================================
       3. CALCULADORA DE VIABILIDADE FINANCEIRA
       ========================================================================== */
    const btnCalcular = document.getElementById('btn-calcular');
    
    btnCalcular.addEventListener('click', () => {
        const cAlim = parseFloat(document.getElementById('alimentacao').value) || 0;
        const cEnerg = parseFloat(document.getElementById('energia').value) || 0;
        const cMao = parseFloat(document.getElementById('mao-obra').value) || 0;
        const pVenda = parseFloat(document.getElementById('preco-venda').value) || 0;
        const qVenda = parseFloat(document.getElementById('quantidade-venda').value) || 0;

        const custoTotal = cAlim + cEnerg + cMao;
        const faturamento = pVenda * qVenda;
        const lucroFinal = faturamento - custoTotal;

        document.getElementById('res-custo-total').innerHTML = `Custo Operacional Total: <strong>R$ ${custoTotal.toFixed(2)}</strong>`;
        document.getElementById('res-faturamento').innerHTML = `Faturamento Bruto: <strong>R$ ${faturamento.toFixed(2)}</strong>`;
        
        const statusEl = document.getElementById('res-status');
        if (lucroFinal >= 0) {
            statusEl.innerHTML = `✅ Lucro Líquido Estimado: R$ ${lucroFinal.toFixed(2)}`;
            statusEl.style.color = "var(--cor-verde-medio)";
        } else {
            statusEl.innerHTML = `⚠️ Risco de Prejuízo: R$ ${Math.abs(lucroFinal).toFixed(2)}`;
            statusEl.style.color = "#dc2626";
        }

        document.getElementById('resultado-calculo').style.display = 'block';
    });
});
