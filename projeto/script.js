/**
 * ==========================================================================
 * SPENDWISE - MY MONEY CONTROL
 * Arquitetura de Inteligência Financeira e Controle de Saldos (Front-end)
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // --------------------------------------------------------------------------
  // ESTADO DA APLICAÇÃO (Banco de Dados em Memória / Mock)
  // --------------------------------------------------------------------------
  let appState = {
    selectedMonth: 'Maio',
    
    // Dicionário com informações financeiras individuais por mês
    mensal: {
      'Janeiro': { saldoInicial: 4000.00, saldoFinalCadastrado: 6500.00 },
      'Fevereiro': { saldoInicial: 6500.00, saldoFinalCadastrado: 9000.00 },
      'Março': { saldoInicial: 6700.00, saldoFinalCadastrado: 6700.00 },
      'Abril': { saldoInicial: 6700.00, saldoFinalCadastrado: 6700.00 },
      'Maio': { saldoInicial: 8000.00, saldoFinalCadastrado: 22000.00 },
      'Junho': { saldoInicial: 0.00, saldoFinalCadastrado: 0.00 },
      'Julho': { saldoInicial: 0.00, saldoFinalCadastrado: 0.00 },
      'Agosto': { saldoInicial: 0.00, saldoFinalCadastrado: 0.00 },
      'Setembro': { saldoInicial: 0.00, saldoFinalCadastrado: 0.00 },
      'Outubro': { saldoInicial: 0.00, saldoFinalCadastrado: 0.00 },
      'Novembro': { saldoInicial: 0.00, saldoFinalCadastrado: 0.00 },
      'Dezembro': { saldoInicial: 0.00, saldoFinalCadastrado: 0.00 }
    },
    
    // Array com lançamentos mockados iniciais de alta fidelidade
    transacoes: [
      // MOCK JANEIRO (Sincronizado / Sem anomalias)
      {
        id: 101,
        mes: 'Janeiro',
        tipo: 'Entrada',
        descricao: 'Salário SpendWise',
        valor: 3000.00,
        data: '10 Jan'
      },
      {
        id: 102,
        mes: 'Janeiro',
        tipo: 'Despesa',
        descricao: 'Internet Fibra',
        valor: 500.00,
        data: '15 Jan'
      },
      
      // MOCK FEVEREIRO (Divergente / Anomalia de R$ 2.300,00)
      {
        id: 201,
        mes: 'Fevereiro',
        tipo: 'Entrada',
        descricao: 'Freelance Design',
        valor: 2000.00,
        data: '08 Fev'
      },
      {
        id: 202,
        mes: 'Fevereiro',
        tipo: 'Despesa',
        descricao: 'Aluguel Mensal',
        valor: 1800.00,
        data: '10 Fev'
      },

      // MOCK MAIO (Sincronizado / Alta Fidelidade)
      {
        id: 1,
        mes: 'Maio',
        tipo: 'Entrada',
        descricao: 'Salário SpendWise',
        valor: 15000.00,
        data: 'Hoje'
      },
      {
        id: 2,
        mes: 'Maio',
        tipo: 'Despesa',
        descricao: 'Condomínio',
        valor: 800.00,
        data: 'Ontem'
      },
      {
        id: 3,
        mes: 'Maio',
        tipo: 'Despesa do cartão de crédito',
        descricao: 'Supermercado',
        valor: 2000.00,
        data: '21 Mai'
      },
      {
        id: 4,
        mes: 'Maio',
        tipo: 'Entrada',
        descricao: 'Freelance Renda Extra',
        valor: 2000.00,
        data: '20 Mai'
      },
      {
        id: 5,
        mes: 'Maio',
        tipo: 'Despesa do cartão de crédito',
        descricao: 'Restaurante',
        valor: 200.00,
        data: '18 Mai'
      }
    ]
  };

  // --------------------------------------------------------------------------
  // SELETORES DO DOM
  // --------------------------------------------------------------------------
  // Abas e Navegação
  const tabDashboard = document.getElementById('tab-dashboard');
  const tabPlanilhas = document.getElementById('tab-planilhas');
  const navDashboard = document.getElementById('nav-dashboard');
  const navPlanilhas = document.getElementById('nav-planilhas');
  const pageTitle = document.getElementById('page-title');
  
  // Formulário
  const form = document.getElementById('transactionForm');
  const selectMes = document.getElementById('mes');
  const selectInformacao = document.getElementById('informacao');
  const inputDescricao = document.getElementById('descricao');
  const inputValor = document.getElementById('valor');
  const containerDescricao = document.getElementById('container-descricao');

  // Listas de Exibição
  const recentTransactionsList = document.getElementById('recentTransactionsList');
  const sheetEntradasList = document.getElementById('sheet-entradas-list');
  const sheetSaidasList = document.getElementById('sheet-saidas-list');

  // Overview Cards
  const overSaldoInicial = document.getElementById('overview-saldo-inicial');
  const overEntradas = document.getElementById('overview-entradas');
  const overSaidas = document.getElementById('overview-saidas');
  const overAiTip = document.getElementById('overview-ai-tip');

  // Planilha Detalhes e Comparativo
  const sheetSaldoInicial = document.getElementById('sheet-saldo-inicial');
  const sheetTotalEntradas = document.getElementById('sheet-total-entradas');
  const sheetTotalSaidas = document.getElementById('sheet-total-saidas');
  const compCalculatedVal = document.getElementById('comparison-calculated');
  const compRegisteredVal = document.getElementById('comparison-registered');
  const iaDivergenciaAlert = document.getElementById('ia-divergencia-alert');
  const iaDivergenciaVal = document.getElementById('ia-divergencia-val');
  const iaSucessoBox = document.getElementById('ia-sucesso-box');

  // --------------------------------------------------------------------------
  // FUNÇÕES AUXILIARES / FORMATADORES
  // --------------------------------------------------------------------------
  const formatCurrency = (value) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  // Retorna o ícone e classe apropriada para cada tipo de transação
  const getTransactionVisuals = (tipo) => {
    switch (tipo) {
      case 'Entrada':
        return { icon: 'fa-arrow-trend-up', class: 'entrada' };
      case 'Despesa':
        return { icon: 'fa-arrow-trend-down', class: 'despesa' };
      case 'Despesa do cartão de crédito':
        return { icon: 'fa-credit-card', class: 'cartao' };
      default:
        return { icon: 'fa-vault', class: 'saldo' };
    }
  };

  // --------------------------------------------------------------------------
  // SISTEMA DE ABAS (SPA)
  // --------------------------------------------------------------------------
  window.switchTab = (tabId) => {
    if (tabId === 'dashboard') {
      tabDashboard.classList.add('active');
      tabPlanilhas.classList.remove('active');
      navDashboard.classList.add('active');
      navPlanilhas.classList.remove('active');
      pageTitle.innerText = 'Página Inicial';
      
      // Quando volta ao dashboard, recalcula para o mês ativo
      recalculateAll();
    } else if (tabId === 'planilhas') {
      tabDashboard.classList.remove('active');
      tabPlanilhas.classList.add('active');
      navDashboard.classList.remove('active');
      navPlanilhas.classList.add('active');
      pageTitle.innerText = 'Minhas Planilhas';
      
      // Sempre que abrir abas de planilhas, garante exibição limpa do Grid
      closeMonthPlan();
      recalculateAll();
    }
  };

  // --------------------------------------------------------------------------
  // NAVEGAÇÃO DOS MESES (TELA "MINHAS PLANILHAS")
  // --------------------------------------------------------------------------
  window.openMonthPlan = (monthName) => {
    appState.selectedMonth = monthName;
    
    const gridContainer = document.getElementById('months-grid-container');
    const sheetDetails = document.getElementById('monthly-sheet-details');
    
    // Transição suave ocultando grid e exibindo planilha
    gridContainer.classList.add('hidden-view');
    sheetDetails.classList.remove('hidden-view');
    
    recalculateAll();
  };

  window.closeMonthPlan = () => {
    const gridContainer = document.getElementById('months-grid-container');
    const sheetDetails = document.getElementById('monthly-sheet-details');
    
    // Retorna para o grid de meses
    sheetDetails.classList.add('hidden-view');
    gridContainer.classList.remove('hidden-view');
  };

  // Atualiza dinamicamente as tags de status dos meses (Ativo vs Pendente) no Grid
  const updateMonthBadges = () => {
    const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    months.forEach(m => {
      const badge = document.getElementById(`status-${m}`);
      if (badge) {
        const hasTransactions = appState.transacoes.some(t => t.mes === m);
        if (hasTransactions) {
          badge.innerText = 'Ativo';
          badge.style.backgroundColor = 'var(--color-green-soft)';
          badge.style.color = 'var(--color-green)';
          badge.style.borderColor = 'rgba(44, 160, 74, 0.2)';
        } else {
          badge.innerText = 'Pendente';
          badge.style.backgroundColor = 'var(--color-bg)';
          badge.style.color = 'var(--color-text-muted)';
          badge.style.borderColor = 'var(--color-border)';
        }
      }
    });
  };

  // --------------------------------------------------------------------------
  // REGRA DE NEGÓCIO: COMPORTAMENTO CONDICIONAL DO FORMULÁRIO
  // --------------------------------------------------------------------------
  window.toggleDescriptionField = () => {
    const selectedType = selectInformacao.value;
    
    // O campo Descrição só deve estar visível e habilitado se for 'Despesa', 'Despesa do cartão de crédito' ou 'Entrada'
    if (selectedType === 'Saldo inicial' || selectedType === 'Saldo final') {
      // Oculta e desabilita o campo de descrição
      containerDescricao.classList.add('hidden');
      inputDescricao.disabled = true;
      inputDescricao.required = false;
      inputDescricao.value = ''; // Limpa o valor para evitar envios espúrios
    } else {
      // Mostra e habilita o campo de descrição
      containerDescricao.classList.remove('hidden');
      inputDescricao.disabled = false;
      inputDescricao.required = true;
      inputDescricao.placeholder = selectedType === 'Entrada' 
        ? 'Ex: Salário Principal, Freelance...' 
        : 'Ex: Conta de Luz, Aluguel, Supermercado...';
    }
  };

  // --------------------------------------------------------------------------
  // MOTOR DE CÁLCULO E ANÁLISE DE FECHAMENTO (CRÍTICO)
  // --------------------------------------------------------------------------
  const recalculateAll = () => {
    const selectedMonth = appState.selectedMonth || 'Maio';
    
    // 1. Filtrar transações do mês selecionado
    const transacoesMes = appState.transacoes.filter(t => t.mes === selectedMonth);

    // 2. Filtrar e somar as entradas do mês selecionado
    const totalEntradas = transacoesMes
      .filter(t => t.tipo === 'Entrada')
      .reduce((sum, t) => sum + t.valor, 0);

    // 3. Filtrar e somar as saídas (Despesa + Despesa do cartão de crédito) do mês selecionado
    const totalSaidas = transacoesMes
      .filter(t => t.tipo === 'Despesa' || t.tipo === 'Despesa do cartão de crédito')
      .reduce((sum, t) => sum + t.valor, 0);

    // 4. Obter saldo inicial e final informado pelo usuário para o mês selecionado
    const mensalInfo = appState.mensal[selectedMonth] || { saldoInicial: 0, saldoFinalCadastrado: 0 };
    const saldoInicial = mensalInfo.saldoInicial;
    const saldoFinalCadastrado = mensalInfo.saldoFinalCadastrado;

    // 5. Executar Equação Crítica: Saldo Final Calculado = Saldo Inicial + Entradas - Saídas
    const saldoFinalCalculado = saldoInicial + totalEntradas - totalSaidas;

    // 6. Atualizar os Cards de Overview no Dashboard (refletindo o período selecionado)
    overSaldoInicial.innerText = formatCurrency(saldoInicial);
    overEntradas.innerText = '+ ' + formatCurrency(totalEntradas);
    overSaidas.innerText = '- ' + formatCurrency(totalSaidas);

    // 7. Atualizar Textos e Labels Dinâmicos da Planilha Mensal
    const labelMesIds = [
      'sheet-selected-month-label',
      'sheet-selected-month-entradas',
      'sheet-selected-month-saidas',
      'sheet-selected-month-comparacao',
      'ia-divergencia-mes',
      'ia-sucesso-mes'
    ];
    labelMesIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.innerText = selectedMonth;
    });

    sheetSaldoInicial.innerText = formatCurrency(saldoInicial);
    sheetTotalEntradas.innerText = formatCurrency(totalEntradas);
    sheetTotalSaidas.innerText = formatCurrency(totalSaidas);
    compCalculatedVal.innerText = formatCurrency(saldoFinalCalculado);
    compRegisteredVal.innerText = formatCurrency(saldoFinalCadastrado);

    // 8. Análise de Inteligência Artificial para divergências
    const diferenca = Math.abs(saldoFinalCalculado - saldoFinalCadastrado);
    
    // Margem de tolerância a arredondamentos
    if (diferenca > 0.01) {
      // Exibe Alerta de Divergência
      iaDivergenciaVal.innerText = formatCurrency(diferenca);
      iaDivergenciaAlert.style.display = 'flex';
      iaSucessoBox.style.display = 'none';
      
      // Atualiza dica da IA no overview com foco analítico
      overAiTip.innerHTML = `⚠️ <span style="color: var(--color-red); font-weight:700;">Anomalia em ${selectedMonth}!</span> Há uma discrepância de <strong>${formatCurrency(diferenca)}</strong> no fechamento. Verifique em "Minhas Planilhas".`;
    } else {
      // Exibe Mensagem de Sucesso
      iaDivergenciaAlert.style.display = 'none';
      iaSucessoBox.style.display = 'flex';
      
      // Atualiza dica da IA de forma positiva
      overAiTip.innerHTML = `✨ <span style="color: var(--color-green); font-weight:700;">Saldos integrados (${selectedMonth})!</span> Os saldos batem com perfeição de centavos. Ótima gestão!`;
    }

    // 9. Renderizar as tabelas dinâmicas
    renderDynamicLists(selectedMonth, transacoesMes);
    
    // 10. Atualizar os crachás de status no grid de 12 meses
    updateMonthBadges();
  };

  // --------------------------------------------------------------------------
  // RENDERIZAÇÃO DINÂMICA DE TABELAS & EXTRATOS
  // --------------------------------------------------------------------------
  const renderDynamicLists = (selectedMonth, transacoesMes) => {
    // A) Renderiza Extrato Recente (Página Inicial) - Geral/Global (últimas 6)
    recentTransactionsList.innerHTML = '';
    
    appState.transacoes.slice(0, 6).forEach(t => {
      const visual = getTransactionVisuals(t.tipo);
      const li = document.createElement('li');
      
      let amountClass = 'saldo-reg';
      let signal = '';
      
      if (t.tipo === 'Entrada') {
        amountClass = 'receita';
        signal = '+ ';
      } else if (t.tipo === 'Despesa' || t.tipo === 'Despesa do cartão de crédito') {
        amountClass = 'despesa';
        signal = '- ';
      }
      
      li.innerHTML = `
        <div class="trans-icon-info">
          <div class="trans-icon ${visual.class}">
            <i class="fa-solid ${visual.icon}"></i>
          </div>
          <div class="trans-details">
            <span class="trans-desc">${t.descricao}</span>
            <span class="trans-meta">${t.mes} • ${t.tipo} • ${t.data}</span>
          </div>
        </div>
        <div class="trans-amount ${amountClass}">
          ${signal}${formatCurrency(t.valor)}
        </div>
      `;
      recentTransactionsList.appendChild(li);
    });

    if (appState.transacoes.length === 0) {
      recentTransactionsList.innerHTML = `
        <li style="justify-content: center; color: var(--color-text-muted); font-size: 0.9rem; padding: 2rem 0;">
          Nenhuma transação registrada ainda. Use o formulário ao lado.
        </li>
      `;
    }

    // B) Renderiza Entradas na Planilha (Filtrado pelo mês ativo)
    sheetEntradasList.innerHTML = '';
    const entradas = transacoesMes.filter(t => t.tipo === 'Entrada');
    
    entradas.forEach(t => {
      const row = document.createElement('div');
      row.className = 'planilha-row';
      row.innerHTML = `
        <span class="row-desc">${t.descricao} <small>${t.mes}</small></span>
        <span class="row-val positive">${formatCurrency(t.valor)}</span>
      `;
      sheetEntradasList.appendChild(row);
    });

    if (entradas.length === 0) {
      sheetEntradasList.innerHTML = `
        <div class="planilha-row" style="justify-content: center; color: var(--color-text-muted); font-style: italic;">
          Nenhuma entrada cadastrada para este período.
        </div>
      `;
    }

    // C) Renderiza Saídas na Planilha (Filtrado pelo mês ativo e mapeando tipo)
    sheetSaidasList.innerHTML = '';
    const saidas = transacoesMes.filter(t => t.tipo === 'Despesa' || t.tipo === 'Despesa do cartão de crédito');
    
    saidas.forEach(t => {
      const subLabel = t.tipo === 'Despesa do cartão de crédito' ? 'Cartão de Crédito' : 'À vista';
      const row = document.createElement('div');
      row.className = 'planilha-row';
      row.innerHTML = `
        <span class="row-desc">${t.descricao} <small>${subLabel} • ${t.mes}</small></span>
        <span class="row-val negative">${formatCurrency(t.valor)}</span>
      `;
      sheetSaidasList.appendChild(row);
    });

    if (saidas.length === 0) {
      sheetSaidasList.innerHTML = `
        <div class="planilha-row" style="justify-content: center; color: var(--color-text-muted); font-style: italic;">
          Nenhuma despesa cadastrada para este período.
        </div>
      `;
    }
  };

  // --------------------------------------------------------------------------
  // SUBMISSÃO E TRATAMENTO DO FORMULÁRIO
  // --------------------------------------------------------------------------
  window.handleFormSubmit = (event) => {
    event.preventDefault();
    
    const mesValue = selectMes.value;
    const tipoValue = selectInformacao.value;
    const valorValue = parseFloat(inputValor.value);
    let descValue = inputDescricao.value.trim();

    if (isNaN(valorValue) || valorValue <= 0) {
      alert('Por favor, insira um valor financeiro válido e maior que zero.');
      return;
    }

    // Garante inicialização segura do dicionário mensal para o mês selecionado
    if (!appState.mensal[mesValue]) {
      appState.mensal[mesValue] = { saldoInicial: 0.00, saldoFinalCadastrado: 0.00 };
    }

    // 1. Regra de Negócio: Tratamento para saldos e transações
    if (tipoValue === 'Saldo inicial') {
      appState.mensal[mesValue].saldoInicial = valorValue;
      descValue = 'Definição de Saldo Inicial';
      
      // Também insere transação virtual para histórico visual
      appState.transacoes.unshift({
        id: Date.now(),
        mes: mesValue,
        tipo: tipoValue,
        descricao: descValue,
        valor: valorValue,
        data: 'Agora'
      });
    } 
    else if (tipoValue === 'Saldo final') {
      appState.mensal[mesValue].saldoFinalCadastrado = valorValue;
      descValue = 'Definição de Saldo Final';
      
      // Também insere transação virtual para histórico visual
      appState.transacoes.unshift({
        id: Date.now(),
        mes: mesValue,
        tipo: tipoValue,
        descricao: descValue,
        valor: valorValue,
        data: 'Agora'
      });
    } 
    else {
      // Entradas e despesas requerem descrição informada
      if (!descValue) {
        alert('Por favor, informe uma descrição para esta movimentação.');
        return;
      }

      // Adiciona a transação real no início da lista
      appState.transacoes.unshift({
        id: Date.now(),
        mes: mesValue,
        tipo: tipoValue,
        descricao: descValue,
        valor: valorValue,
        data: 'Agora'
      });
    }

    // 2. Se o lançamento foi para o mês selecionado atualmente na planilha, mantém o foco nele
    // Se o usuário lançou em outro mês, podemos mudar o foco do dashboard/planilha para o mês lançado
    // para dar um feedback visual imediato das atualizações.
    appState.selectedMonth = mesValue;

    // 3. Recalcula todos os saldos e relatórios
    recalculateAll();

    // 4. Reset do formulário e re-aplicação da regra de visibilidade
    form.reset();
    toggleDescriptionField();

    // 5. Feedback visual de sucesso
    alert(`Lançamento de "${tipoValue}" para ${mesValue} registrado com sucesso!`);
  };

  // --------------------------------------------------------------------------
  // INICIALIZAÇÃO DA APLICAÇÃO (Primeira Carga)
  // --------------------------------------------------------------------------
  // Executa regras de visibilidade iniciais do form
  toggleDescriptionField();
  
  // Roda recálculo inicial com base no mock de alta fidelidade
  recalculateAll();
  
  // Feedback suave de transição de entrada
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.4s ease';
  setTimeout(() => { document.body.style.opacity = '1'; }, 50);
});
