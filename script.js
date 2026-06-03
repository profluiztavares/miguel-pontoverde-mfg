document.addEventListener('DOMContentLoaded', () => {
    const selectCategoria = document.getElementById('categoria');
    const selectSubcategoria = document.getElementById('subcategoria');

    // Banco de dados simulado para as subcategorias
    const dadosSubcategorias = {
        'servicos': [
            'Colheita (Café, Milho, etc)',
            'Preparação de Solo',
            'Aplicação de Defensivos',
            'Manutenção de Maquinário',
            'Consultoria Agronômica',
            'Transporte e Frete'
        ],
        'venda': [
            'Grãos (Milho, Soja, Café)',
            'Sementes e Mudas',
            'Maquinário e Implementos',
            'Acessórios e Ferramentas',
            'Agricultura de Precisão',
            'Animais e Pecuária'
        ]
    };

    // Evento que escuta quando o usuário muda a Categoria principal
    selectCategoria.addEventListener('change', function() {
        const categoriaEscolhida = this.value;
        
        // Limpa as opções atuais da subcategoria
        selectSubcategoria.innerHTML = '<option value="" disabled selected>Subcategorias</option>';
        
        if (categoriaEscolhida && dadosSubcategorias[categoriaEscolhida]) {
            // Habilita o select de subcategoria
            selectSubcategoria.disabled = false;
            
            // Popula com as novas opções
            dadosSubcategorias[categoriaEscolhida].forEach(sub => {
                const option = document.createElement('option');
                option.value = sub.toLowerCase().replace(/ /g, '-');
                option.textContent = sub.toUpperCase();
                selectSubcategoria.appendChild(option);
            });
        } else {
            // Se algo der errado, desabilita novamente
            selectSubcategoria.disabled = true;
        }
    });

    // Simulação da ação do botão de busca
    const formBusca = document.getElementById('form-busca');
    formBusca.addEventListener('submit', function(e) {
        e.preventDefault(); // Impede o recarregamento da página
        
        const local = document.getElementById('local').value;
        const termo = document.getElementById('termo').value;
        const categoria = selectCategoria.options[selectCategoria.selectedIndex].text;
        const subcat = selectSubcategoria.disabled ? '' : selectSubcategoria.options[selectSubcategoria.selectedIndex].text;

        // Aqui, em um sistema real, enviaria os dados para o backend.
        alert(`Buscando por:\nLocal: ${local}\nTermo: ${termo}\nCategoria: ${categoria}\nSubcategoria: ${subcat}`);
    });
});
