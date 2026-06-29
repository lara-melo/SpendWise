/**
 * ==========================================================================
 * SPENDWISE - MY MONEY CONTROL
 * Arquitetura de Inteligência Financeira e Controle de Saldos (Front-end)
 * ==========================================================================
 */

import { supabase } from './supabaseClient.js';
import { checkAuth, logout } from './auth.js';
import { ENV } from './config.js';

const GEMINI_API_KEY = ENV.GEMINI_API_KEY;

const escapeHTML = (str) => {
  if (!str) return '';
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
};

let currentUser = null;
let currentChart = null;

let appState = {
  selectedMonth: 'Maio',
  mensal: {
    'Janeiro': { saldoInicial: 0.00, saldoFinalCadastrado: 0.00 },
    'Fevereiro': { saldoInicial: 0.00, saldoFinalCadastrado: 0.00 },
    'Março': { saldoInicial: 0.00, saldoFinalCadastrado: 0.00 },
    'Abril': { saldoInicial: 0.00, saldoFinalCadastrado: 0.00 },
    'Maio': { saldoInicial: 0.00, saldoFinalCadastrado: 0.00 },
    'Junho': { saldoInicial: 0.00, saldoFinalCadastrado: 0.00 },
    'Julho': { saldoInicial: 0.00, saldoFinalCadastrado: 0.00 },
    'Agosto': { saldoInicial: 0.00, saldoFinalCadastrado: 0.00 },
    'Setembro': { saldoInicial: 0.00, saldoFinalCadastrado: 0.00 },
    'Outubro': { saldoInicial: 0.00, saldoFinalCadastrado: 0.00 },
    'Novembro': { saldoInicial: 0.00, saldoFinalCadastrado: 0.00 },
    'Dezembro': { saldoInicial: 0.00, saldoFinalCadastrado: 0.00 }
  },
  transacoes: []
};

// --------------------------------------------------------------------------
// SELETORES DO DOM
// --------------------------------------------------------------------------
const tabDashboard = document.getElementById('tab-dashboard');
const tabPlanilhas = document.getElementById('tab-planilhas');
const tabRelatorios = document.getElementById('tab-relatorios');
const navDashboard = document.getElementById('nav-dashboard');
const navPlanilhas = document.getElementById('nav-planilhas');
const navRelatorios = document.getElementById('nav-relatorios');
const pageTitle = document.getElementById('page-title');

const form = document.getElementById('transactionForm');
const selectMes = document.getElementById('mes');
const selectInformacao = document.getElementById('informacao');
const inputDescricao = document.getElementById('descricao');
const inputValor = document.getElementById('valor');
const containerDescricao = document.getElementById('container-descricao');

const recentTransactionsList = document.getElementById('recentTransactionsList');
const sheetEntradasList = document.getElementById('sheet-entradas-list');
const sheetSaidasList = document.getElementById('sheet-saidas-list');

const overSaldoInicial = document.getElementById('overview-saldo-inicial');
const overEntradas = document.getElementById('overview-entradas');
const overSaidas = document.getElementById('overview-saidas');
const overAiTip = document.getElementById('overview-ai-tip');

const sheetSaldoInicial = document.getElementById('sheet-saldo-inicial');
const sheetTotalEntradas = document.getElementById('sheet-total-entradas');
const sheetTotalSaidas = document.getElementById('sheet-total-saidas');
const compCalculatedVal = document.getElementById('comparison-calculated');
const compRegisteredVal = document.getElementById('comparison-registered');
const iaDivergenciaAlert = document.getElementById('ia-divergencia-alert');
const iaDivergenciaVal = document.getElementById('ia-divergencia-val');
const iaSucessoBox = document.getElementById('ia-sucesso-box');
const appMsgContainer = document.getElementById('app-msg-container');

function showAppMessage(msg, isError = false) {
  if (!appMsgContainer) {
    alert(msg);
    return;
  }
  appMsgContainer.style.display = 'block';
  appMsgContainer.innerText = msg;
  if (isError) {
    appMsgContainer.style.backgroundColor = '#FEE2E2';
    appMsgContainer.style.color = '#B91C1C';
    appMsgContainer.style.border = '1px solid #F87171';
  } else {
    appMsgContainer.style.backgroundColor = '#D1FAE5';
    appMsgContainer.style.color = '#047857';
    appMsgContainer.style.border = '1px solid #34D399';
  }
  setTimeout(() => {
    appMsgContainer.style.display = 'none';
  }, 4000);
}

// --------------------------------------------------------------------------
// FUNÇÕES AUXILIARES / FORMATADORES
// --------------------------------------------------------------------------
const formatCurrency = (value) => {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

const getTransactionVisuals = (tipo) => {
  switch (tipo) {
    case 'Entrada': return { icon: 'fa-arrow-trend-up', class: 'entrada' };
    case 'Despesa': return { icon: 'fa-arrow-trend-down', class: 'despesa' };
    case 'Despesa do cartão de crédito': return { icon: 'fa-credit-card', class: 'cartao' };
    default: return { icon: 'fa-vault', class: 'saldo' };
  }
};

// --------------------------------------------------------------------------
// SISTEMA DE ABAS (SPA)
// --------------------------------------------------------------------------
const switchTab = (tabId) => {
  tabDashboard.classList.remove('active');
  tabPlanilhas.classList.remove('active');
  if(tabRelatorios) tabRelatorios.classList.remove('active');
  
  navDashboard.classList.remove('active');
  navPlanilhas.classList.remove('active');
  if(navRelatorios) navRelatorios.classList.remove('active');

  if (tabId === 'dashboard') {
    tabDashboard.classList.add('active');
    navDashboard.classList.add('active');
    pageTitle.innerText = 'Inserir Informações';
    recalculateAll();
  } else if (tabId === 'planilhas') {
    tabPlanilhas.classList.add('active');
    navPlanilhas.classList.add('active');
    pageTitle.innerText = 'Minhas Informações';
    closeMonthPlan();
    recalculateAll();
  } else if (tabId === 'relatorios') {
    if(tabRelatorios) tabRelatorios.classList.add('active');
    if(navRelatorios) navRelatorios.classList.add('active');
    pageTitle.innerText = 'Meus Relatórios';
    window.renderRelatorios();
  }
};

// --------------------------------------------------------------------------
// NAVEGAÇÃO DOS MESES
// --------------------------------------------------------------------------
const openMonthPlan = (monthName) => {
  appState.selectedMonth = monthName;
  const gridContainer = document.getElementById('months-grid-container');
  const sheetDetails = document.getElementById('monthly-sheet-details');
  gridContainer.classList.add('hidden-view');
  sheetDetails.classList.remove('hidden-view');
  recalculateAll();
};

const closeMonthPlan = () => {
  const gridContainer = document.getElementById('months-grid-container');
  const sheetDetails = document.getElementById('monthly-sheet-details');
  sheetDetails.classList.add('hidden-view');
  gridContainer.classList.remove('hidden-view');
};

const updateMonthBadges = () => {
  const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  months.forEach(m => {
    const badge = document.getElementById(`status-${m}`);
    if (badge) {
      const hasTransactions = appState.transacoes.some(t => t.mes === m && t.tipo !== 'Saldo inicial' && t.tipo !== 'Saldo final');
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

const toggleDescriptionField = () => {
  const selectedType = selectInformacao.value;
  if (selectedType === 'Saldo inicial' || selectedType === 'Saldo final') {
    containerDescricao.classList.add('hidden');
    inputDescricao.disabled = true;
    inputDescricao.required = false;
    inputDescricao.value = '';
  } else {
    containerDescricao.classList.remove('hidden');
    inputDescricao.disabled = false;
    inputDescricao.required = true;
    inputDescricao.placeholder = selectedType === 'Entrada' 
      ? 'Ex: Salário Principal, Freelance...' 
      : 'Ex: Conta de Luz, Aluguel, Supermercado...';
  }
};

// --------------------------------------------------------------------------
// INTEGRAÇÃO GEMINI IA
// --------------------------------------------------------------------------
async function askGeminiCategory(descricao, valor) {
  try {
    const { data, error } = await supabase.functions.invoke('gemini', {
      body: { action: 'categorize', payload: { descricao, valor } }
    });
    if (error) throw error;
    return data.result.candidates[0].content.parts[0].text.trim();
  } catch (error) {
    console.error("Erro ao classificar com Gemini:", error);
    return "Outros";
  }
}

async function askGeminiInsight(jsonResumo) {
  try {
    const { data, error } = await supabase.functions.invoke('gemini', {
      body: { action: 'insight', payload: { jsonResumo } }
    });
    if (error) throw error;
    return data.result.candidates[0].content.parts[0].text.trim();
  } catch (error) {
    console.error("Erro ao gerar insight com Gemini:", error);
    return "Não foi possível gerar um insight no momento.";
  }
}

// --------------------------------------------------------------------------
// INTEGRAÇÃO SUPABASE - CRUD
// --------------------------------------------------------------------------
async function loadTransactionsFromSupabase() {
  if (!currentUser) return;
  const { data, error } = await supabase
    .from('transacoes')
    .select('*')
    .eq('user_id', currentUser.id)
    .order('data_criacao', { ascending: false });

  if (error) {
    console.error("Erro ao carregar do Supabase:", error);
    return;
  }

  appState.transacoes = data || [];
  
  // Reconstruir saldos
  Object.keys(appState.mensal).forEach(m => {
    appState.mensal[m].saldoInicial = 0;
    appState.mensal[m].saldoFinalCadastrado = 0;
  });
  
  appState.transacoes.forEach(t => {
    if (t.tipo === 'Saldo inicial') appState.mensal[t.mes].saldoInicial = t.valor;
    if (t.tipo === 'Saldo final') appState.mensal[t.mes].saldoFinalCadastrado = t.valor;
  });
  
  recalculateAll();
}

const handleFormSubmit = async (event) => {
  event.preventDefault();
  
  const mesValue = selectMes.value;
  const tipoValue = selectInformacao.value;
  let cleanValue = inputValor.value.replace(/[R$\s.]/g, '').replace(',', '.');
  const valorValue = parseFloat(cleanValue);
  let descValue = inputDescricao.value.trim();

  if (isNaN(valorValue) || valorValue <= 0) {
    showAppMessage('Por favor, insira um valor financeiro válido e maior que zero.', true);
    return;
  }

  const btnSubmit = form.querySelector('button[type="submit"]');
  const originalBtnText = btnSubmit.innerHTML;
  btnSubmit.disabled = true;
  btnSubmit.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processando IA...';

  try {
    let categoria = "Saldos";
    
    if (tipoValue === 'Saldo inicial') {
      descValue = 'Definição de Saldo Inicial';
    } else if (tipoValue === 'Saldo final') {
      descValue = 'Definição de Saldo Final';
    } else {
      if (!descValue) {
        showAppMessage('Por favor, informe uma descrição para esta movimentação.', true);
        return;
      }
      // Categorização via Gemini
      categoria = await askGeminiCategory(descValue, valorValue);
    }

    const novaTransacao = {
      user_id: currentUser.id,
      mes: mesValue,
      tipo: tipoValue,
      descricao: escapeHTML(descValue),
      valor: valorValue,
      categoria: categoria,
      data_criacao: new Date().toISOString()
    };

    const { data, error } = await supabase.from('transacoes').insert([novaTransacao]).select();
    if (error) throw error;

    // Atualiza estado local para não precisar de novo fetch
    if (data && data.length > 0) {
      appState.transacoes.unshift(data[0]);
      if (tipoValue === 'Saldo inicial') appState.mensal[mesValue].saldoInicial = valorValue;
      if (tipoValue === 'Saldo final') appState.mensal[mesValue].saldoFinalCadastrado = valorValue;
    }
    
    showAppMessage('Movimentação inserida com sucesso!');
    appState.selectedMonth = mesValue;
    recalculateAll();
    
    form.reset();
    toggleDescriptionField();
  } catch (err) {
    console.error("Erro ao salvar:", err);
    showAppMessage("Erro ao salvar transação: " + (err.message || err.error_description || "Desconhecido"), true);
  } finally {
    btnSubmit.disabled = false;
    btnSubmit.innerHTML = originalBtnText;
  }
};

const removeTransaction = async (id) => {
  if (!confirm('Deseja realmente excluir esta transação?')) return;
  
  const { error } = await supabase.from('transacoes').delete().eq('id', id);
  if (error) {
    showAppMessage("Erro ao deletar transação.", true);
    return;
  }
  
  const t = appState.transacoes.find(tx => String(tx.id) === String(id));
  if (t) {
    if (t.tipo === 'Saldo inicial') appState.mensal[t.mes].saldoInicial = 0;
    else if (t.tipo === 'Saldo final') appState.mensal[t.mes].saldoFinalCadastrado = 0;
  }
  
  appState.transacoes = appState.transacoes.filter(tx => String(tx.id) !== String(id));
  recalculateAll();
};

// --------------------------------------------------------------------------
// MOTOR DE CÁLCULO E ANÁLISE DE FECHAMENTO
// --------------------------------------------------------------------------
const recalculateAll = () => {
  const selectedMonth = appState.selectedMonth || 'Maio';
  const transacoesMes = appState.transacoes.filter(t => t.mes === selectedMonth);

  const totalEntradas = transacoesMes
    .filter(t => t.tipo === 'Entrada')
    .reduce((sum, t) => sum + t.valor, 0);

  const totalSaidas = transacoesMes
    .filter(t => t.tipo === 'Despesa' || t.tipo === 'Despesa do cartão de crédito')
    .reduce((sum, t) => sum + t.valor, 0);

  const mensalInfo = appState.mensal[selectedMonth] || { saldoInicial: 0, saldoFinalCadastrado: 0 };
  const saldoInicial = mensalInfo.saldoInicial;
  const saldoFinalCadastrado = mensalInfo.saldoFinalCadastrado;

  const saldoFinalCalculado = saldoInicial + totalEntradas - totalSaidas;

  overSaldoInicial.innerText = formatCurrency(saldoInicial);
  overEntradas.innerText = '+ ' + formatCurrency(totalEntradas);
  overSaidas.innerText = '- ' + formatCurrency(totalSaidas);

  const labelMesIds = [
    'sheet-selected-month-label', 'sheet-selected-month-entradas',
    'sheet-selected-month-saidas', 'sheet-selected-month-comparacao',
    'ia-divergencia-mes', 'ia-sucesso-mes'
  ];
  labelMesIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.innerText = selectedMonth;
  });

  sheetSaldoInicial.innerText = formatCurrency(saldoInicial);
  sheetTotalEntradas.innerText = formatCurrency(totalEntradas);
  sheetTotalSaidas.innerText = formatCurrency(totalSaidas);
  compCalculatedVal.innerText = formatCurrency(saldoFinalCalculado);
  const cardCalculado = document.getElementById('card-calculado');
  const iconCalculado = document.getElementById('icon-calculado');
  
  if (saldoFinalCalculado < 0) {
    compCalculatedVal.style.setProperty('color', '#D32F2F', 'important');
    if (cardCalculado) {
      cardCalculado.style.backgroundColor = 'rgba(211, 47, 47, 0.15)';
      cardCalculado.style.borderColor = '#D32F2F';
      const texts = cardCalculado.querySelectorAll('.card-title, .card-subtitle');
      texts.forEach(t => t.style.color = '#D32F2F');
    }
    if (iconCalculado) iconCalculado.style.color = '#D32F2F';
  } else {
    compCalculatedVal.style.setProperty('color', 'var(--color-green)', 'important');
    if (cardCalculado) {
      cardCalculado.style.backgroundColor = '';
      cardCalculado.style.borderColor = 'var(--color-green)';
      const texts = cardCalculado.querySelectorAll('.card-title, .card-subtitle');
      texts.forEach(t => t.style.color = '');
    }
    if (iconCalculado) iconCalculado.style.color = 'var(--color-green)';
  }
  compRegisteredVal.innerText = formatCurrency(saldoFinalCadastrado);

  const diferenca = Math.abs(saldoFinalCalculado - saldoFinalCadastrado);
  
  if (diferenca > 0.01) {
    iaDivergenciaVal.innerText = formatCurrency(diferenca);
    iaDivergenciaAlert.style.display = 'flex';
    iaSucessoBox.style.display = 'none';
    overAiTip.innerHTML = `⚠️ <span style="color: var(--color-red); font-weight:700;">Anomalia em ${selectedMonth}!</span> Há uma discrepância de <strong>${formatCurrency(diferenca)}</strong> no fechamento. Verifique em "Minhas Planilhas".`;
  } else {
    iaDivergenciaAlert.style.display = 'none';
    iaSucessoBox.style.display = 'flex';
    overAiTip.innerHTML = `✨ <span style="color: var(--color-green); font-weight:700;">Saldos integrados (${selectedMonth})!</span> Os saldos batem com perfeição de centavos. Ótima gestão!`;
  }

  renderRecentTransactions();
  renderSheetTransactions(selectedMonth, transacoesMes);
  updateMonthBadges();
};

window.renderRecentTransactions = () => {
  const filtroDropdown = document.getElementById('filtro-mes-extrato');
  const filtro = filtroDropdown ? filtroDropdown.value : 'Todos';
  recentTransactionsList.innerHTML = '';
  
  let tList = appState.transacoes;
  if (filtro !== 'Todos') tList = tList.filter(t => t.mes === filtro);
  
  tList.slice(0, 20).forEach(t => {
    const visual = getTransactionVisuals(t.tipo);
    const li = document.createElement('li');
    li.style.display = 'flex';
    li.style.justifyContent = 'space-between';
    li.style.alignItems = 'center';
    
    let amountClass = 'saldo-reg';
    let signal = '';
    if (t.tipo === 'Entrada') { amountClass = 'receita'; signal = '+ '; }
    else if (t.tipo === 'Despesa' || t.tipo === 'Despesa do cartão de crédito') { amountClass = 'despesa'; signal = '- '; }
    
    let dataFormatada = '';
    if (t.data_criacao) {
      const dataObj = new Date(t.data_criacao);
      const dia = String(dataObj.getDate()).padStart(2, '0');
      const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
      const ano = dataObj.getFullYear();
      dataFormatada = ` (${dia}/${mes}/${ano})`;
    }

    li.innerHTML = `
      <div class="trans-icon-info">
        <div class="trans-icon ${visual.class}">
          <i class="fa-solid ${visual.icon}"></i>
        </div>
        <div class="trans-details">
          <span class="trans-desc">${escapeHTML(t.descricao)}<small style="color: #64748b; font-size: 0.85em;">${dataFormatada}</small></span>
          <span class="trans-meta">${t.mes} • ${t.categoria || 'Geral'}</span>
        </div>
      </div>
      <div style="display: flex; align-items: center; gap: 15px;">
        <div class="trans-amount ${amountClass}">${signal}${formatCurrency(t.valor)}</div>
        <button class="btn-delete" data-id="${t.id}" style="background: none; border: none; color: #E53935; cursor: pointer; font-size: 1.1rem;"><i class="fa-solid fa-trash-can"></i></button>
      </div>
    `;
    recentTransactionsList.appendChild(li);
  });
  
  // Attach event listeners to delete buttons
  document.querySelectorAll('.btn-delete').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-id');
      removeTransaction(id);
    });
  });
};

const renderSheetTransactions = (selectedMonth, transacoesMes) => {
  sheetEntradasList.innerHTML = '';
  const entradas = transacoesMes.filter(t => t.tipo === 'Entrada');
  entradas.forEach(t => {
    const row = document.createElement('div');
    row.className = 'planilha-row';
    row.innerHTML = `<span class="row-desc">${t.descricao} <small>${t.categoria || ''}</small></span><span class="row-val positive">${formatCurrency(t.valor)}</span>`;
    sheetEntradasList.appendChild(row);
  });

  sheetSaidasList.innerHTML = '';
  const saidas = transacoesMes.filter(t => t.tipo === 'Despesa' || t.tipo === 'Despesa do cartão de crédito');
  saidas.forEach(t => {
    const row = document.createElement('div');
    row.className = 'planilha-row';
    row.innerHTML = `<span class="row-desc">${t.descricao} <small>${t.categoria || ''}</small></span><span class="row-val negative">${formatCurrency(t.valor)}</span>`;
    sheetSaidasList.appendChild(row);
  });
};

// --------------------------------------------------------------------------
// TELA "MEUS RELATÓRIOS" E CHART.JS
// --------------------------------------------------------------------------
let chartCategorias, chartSaldo, chartHistorico;

window.renderRelatorios = async () => {
    const nomesMeses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    
    const mesAtualNome = appState.selectedMonth || 'Maio';
    const mesAtualIndex = nomesMeses.indexOf(mesAtualNome) !== -1 ? nomesMeses.indexOf(mesAtualNome) : new Date().getMonth();

    const transacoesMes = appState.transacoes.filter(t => t.mes === mesAtualNome);

    const categoriasGastos = {};
    transacoesMes.filter(t => t.tipo === 'Despesa' || t.tipo === 'Despesa do cartão de crédito').forEach(t => {
        const cat = t.categoria || 'Geral';
        categoriasGastos[cat] = (categoriasGastos[cat] || 0) + parseFloat(t.valor);
    });

    let totalEntradas = 0;
    let totalSaidas = 0;
    transacoesMes.forEach(t => {
        const valor = parseFloat(t.valor);
        if (t.tipo === 'Entrada') totalEntradas += valor;
        if (t.tipo === 'Despesa' || t.tipo === 'Despesa do cartão de crédito') totalSaidas += valor;
    });

    const historico = {};
    const mesesParaHistorico = [];
    for (let i = 5; i >= 0; i--) { 
        const index = (mesAtualIndex - i + 12) % 12;
        const nomeMes = nomesMeses[index];
        mesesParaHistorico.push(nomeMes);
        historico[nomeMes] = { entradas: 0, saidas: 0 };
    }

    appState.transacoes.forEach(t => {
        if (historico[t.mes]) {
            const valor = parseFloat(t.valor);
            if (t.tipo === 'Entrada') historico[t.mes].entradas += valor;
            if (t.tipo === 'Despesa' || t.tipo === 'Despesa do cartão de crédito') historico[t.mes].saidas += valor;
        }
    });

    if (chartCategorias) chartCategorias.destroy();
    const catCanvas = document.getElementById('graficoCategorias');
    if (catCanvas) {
        chartCategorias = new Chart(catCanvas, {
            type: 'pie',
            data: {
                labels: Object.keys(categoriasGastos),
                datasets: [{
                    data: Object.values(categoriasGastos),
                    backgroundColor: ['#0B1B2B', '#1E3A5F', '#325C8F', '#4A80C2', '#6BA2E0', '#99C7F7'] 
                }]
            }
        });
    }

    if (chartSaldo) chartSaldo.destroy();
    const saldoCanvas = document.getElementById('graficoSaldo');
    if (saldoCanvas) {
        chartSaldo = new Chart(saldoCanvas, {
            type: 'bar',
            data: {
                labels: ['Resumo do Mês'],
                datasets: [
                    {
                        label: 'Entradas',
                        data: [totalEntradas],
                        backgroundColor: '#4CAF50'
                    },
                    {
                        label: 'Saídas',
                        data: [totalSaidas],
                        backgroundColor: '#FF5722'
                    }
                ]
            },
            options: {
                scales: { y: { beginAtZero: true } }
            }
        });
    }

    if (chartHistorico) chartHistorico.destroy();
    const histCanvas = document.getElementById('graficoHistorico');
    if (histCanvas) {
        chartHistorico = new Chart(histCanvas, {
            type: 'line',
            data: {
                labels: mesesParaHistorico,
                datasets: [
                    {
                        label: 'Entradas',
                        data: mesesParaHistorico.map(m => historico[m].entradas),
                        borderColor: '#4CAF50',
                        fill: false,
                        tension: 0.2
                    },
                    {
                        label: 'Saídas',
                        data: mesesParaHistorico.map(m => historico[m].saidas),
                        borderColor: '#FF5722',
                        fill: false,
                        tension: 0.2
                    }
                ]
            },
            options: {
                scales: { y: { beginAtZero: true } }
            }
        });
    }

    const categoriasKeys = Object.keys(categoriasGastos);
    let maiorCategoria = 'Nenhuma';
    if (categoriasKeys.length > 0) {
        maiorCategoria = categoriasKeys.reduce((a, b) => categoriasGastos[a] > categoriasGastos[b] ? a : b);
    }

    const mesAtualGastos = historico[mesesParaHistorico[5]].saidas;
    const mesPassadoGastos = historico[mesesParaHistorico[4]].saidas;
    
    let tendencia = "Estável";
    if (mesAtualGastos > mesPassadoGastos) tendencia = "Aumentando";
    if (mesAtualGastos < mesPassadoGastos) tendencia = "Diminuindo";

    const dadosParaIA = {
        maior_gasto_categoria: maiorCategoria,
        total_entradas: totalEntradas,
        total_saidas: totalSaidas,
        tendencia: tendencia
    };

    analisarDadosComIA(dadosParaIA);
};

async function analisarDadosComIA(dadosJSON) {
    const insightDiv = document.getElementById('insightIA');
    if (!insightDiv) return;
    
    insightDiv.innerHTML = '<p><i class="fa-solid fa-spinner fa-spin"></i> O Mentor SpendWise está analisando seus dados...</p>';

    try {
        const { data, error } = await supabase.functions.invoke('gemini', {
            body: { action: 'mentor', payload: { dadosJSON } }
        });

        if (error) throw error;
        if (data?.error) throw new Error(data.error);
        
        let textoIA = data.result.candidates[0].content.parts[0].text;
        textoIA = textoIA.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        
        insightDiv.innerHTML = `<p><strong><i class="fa-solid fa-brain" style="color: #10B981;"></i> Conselho do Mentor:</strong><br><br>${textoIA}</p>`;
        
    } catch (error) {
        console.error("Erro ao solicitar análise da IA:", error);
        insightDiv.innerHTML = `<p style="color: #FF5722;">❌ Falha na conexão com a IA.<br><br><strong>Detalhe Técnico:</strong> ${error.message}</p>
        <p style="font-size: 13px; margin-top: 10px;">(Por favor, rode o comando 'supabase functions deploy gemini' para habilitar a IA).</p>`;
    }
}

// --------------------------------------------------------------------------
// INICIALIZAÇÃO DA APLICAÇÃO
// --------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', async () => {
  currentUser = await checkAuth();
  if (!currentUser) return; 

  const btnLogout = document.getElementById('btn-logout');
  if (btnLogout) {
    btnLogout.addEventListener('click', async (e) => {
      e.preventDefault();
      await logout();
      window.location.href = 'index.html';
    });
  }

  const userProfileName = document.querySelector('.user-profile span strong');
  if (userProfileName) userProfileName.innerText = currentUser.email.split('@')[0];

  toggleDescriptionField();
  
  await loadTransactionsFromSupabase();

  // Atribuir Event Listeners que foram retirados do HTML
  document.querySelectorAll('.tab-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      switchTab(e.currentTarget.getAttribute('data-tab'));
    });
  });

  const filtroExtrato = document.getElementById('filtro-mes-extrato');
  if (filtroExtrato) {
    filtroExtrato.addEventListener('change', renderRecentTransactions);
  }

  if (form) {
    form.addEventListener('submit', handleFormSubmit);
  }

  if (selectInformacao) {
    selectInformacao.addEventListener('change', toggleDescriptionField);
  }

  document.querySelectorAll('.month-card').forEach(card => {
    card.addEventListener('click', (e) => {
      openMonthPlan(e.currentTarget.getAttribute('data-month'));
    });
  });

  const btnCloseMonth = document.getElementById('btn-close-month');
  if (btnCloseMonth) {
    btnCloseMonth.addEventListener('click', closeMonthPlan);
  }
  
  const inputValorForm = document.getElementById('valor');
  if (inputValorForm) {
    inputValorForm.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, '');
      if (!value) {
        e.target.value = '';
        return;
      }
      value = (parseInt(value, 10) / 100).toFixed(2) + '';
      value = value.replace('.', ',');
      value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
      e.target.value = 'R$ ' + value;
    });
  }

  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.4s ease';
  setTimeout(() => { document.body.style.opacity = '1'; }, 50);
});
