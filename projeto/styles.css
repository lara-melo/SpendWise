/* 
  ==========================================================================
  SPENDWISE - MY MONEY CONTROL
  Premium CSS Design System & UI Components (Light Corporate Theme)
  ==========================================================================
*/

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

:root {
  /* Cores Principais - Identidade SpendWise */
  --color-bg: #F8F9FA;              /* Fundo claro corporativo */
  --color-card-bg: #FFFFFF;         /* Fundo dos cards/paineis */
  
  --color-navy-deep: #0B1B2B;       /* Azul Marinho Profundo para cabeçalhos e textos principais */
  --color-navy-medium: #152A3F;     /* Azul Marinho Médio para subelementos */
  --color-navy-light: #203B54;      /* Azul Marinho Claro para sidebar/bordas */
  
  --color-green: #2CA04A;           /* Verde Vibrante para botões de ação e destaques positivos */
  --color-green-hover: #22803a;     /* Tom mais escuro para hover */
  --color-green-soft: rgba(44, 160, 74, 0.08); /* Fundo verde translúcido */
  
  --color-red: #D9534F;             /* Vermelho Fintech para despesas/alertas */
  --color-red-hover: #C9302C;
  --color-red-soft: rgba(217, 83, 79, 0.08);   /* Fundo vermelho translúcido */
  
  --color-text-primary: #0B1B2B;    /* Texto principal */
  --color-text-muted: #5A6A85;      /* Texto secundário/suave */
  --color-border: #E2E8F0;          /* Borda padrão */
  --color-border-hover: #CBD5E1;    /* Borda ativa */
  
  /* Tipografia */
  --font-main: 'Inter', sans-serif;
  
  /* Sombra & Efeitos */
  --shadow-sm: 0 2px 4px rgba(11, 27, 43, 0.03);
  --shadow-md: 0 4px 12px rgba(11, 27, 43, 0.05);
  --shadow-lg: 0 10px 30px rgba(11, 27, 43, 0.08);
  --transition-smooth: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  --border-radius: 12px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--font-main);
  background-color: var(--color-bg);
  color: var(--color-text-primary);
  height: 100vh;
  overflow: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* 
  ==========================================================================
  LAYOUT PRINCIPAL (SPA)
  ==========================================================================
*/
.app-container {
  display: flex;
  height: 100vh;
  width: 100%;
}

/* Sidebar Navegação (Aparência Corporativa de Alto Nível) */
.sidebar {
  width: 280px;
  background-color: var(--color-navy-deep);
  color: #FFFFFF;
  display: flex;
  flex-direction: column;
  border-right: 1px solid rgba(255, 255, 255, 0.05);
  flex-shrink: 0;
  position: relative;
  z-index: 100;
}

.sidebar .logo {
  padding: 2.5rem 1.8rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.sidebar .logo h2 {
  font-size: 1.6rem;
  font-weight: 800;
  letter-spacing: 0.5px;
  color: #FFFFFF;
}

.sidebar .logo span {
  color: var(--color-green);
}

.sidebar nav {
  flex: 1;
  padding: 2rem 1rem;
}

.sidebar nav ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.sidebar nav li a {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0.9rem 1.2rem;
  color: #A0AEC0;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  border-radius: 8px;
  transition: var(--transition-smooth);
}

.sidebar nav li a i {
  font-size: 1.1rem;
  transition: var(--transition-smooth);
}

/* Estados da Navegação */
.sidebar nav li:hover a {
  color: #FFFFFF;
  background-color: rgba(255, 255, 255, 0.03);
}

.sidebar nav li.active a {
  color: #FFFFFF;
  background-color: rgba(44, 160, 74, 0.15);
  font-weight: 600;
  border-left: 4px solid var(--color-green);
  padding-left: calc(1.2rem - 4px);
}

.sidebar nav li.active a i {
  color: var(--color-green);
}

/* Parte Inferior da Sidebar */
.sidebar-bottom {
  padding: 1.8rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.btn-secondary {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-align: center;
  color: var(--color-green);
  border: 1px solid var(--color-green);
  background-color: transparent;
  padding: 12px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  transition: var(--transition-smooth);
  cursor: pointer;
}

.btn-secondary:hover {
  background-color: rgba(44, 160, 74, 0.08);
  transform: translateY(-2px);
}

/* 
  ==========================================================================
  CONTEÚDO PRINCIPAL & TOPBAR
  ==========================================================================
*/
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  background-color: var(--color-bg);
  padding: 2.5rem 3.5rem;
}

.top-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 1.5rem;
}

.top-nav h1 {
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--color-navy-deep);
  letter-spacing: -0.5px;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-profile span {
  font-size: 0.95rem;
  color: var(--color-text-muted);
}

.user-profile span strong {
  color: var(--color-text-primary);
}

.avatar {
  background-color: var(--color-navy-deep);
  color: #FFFFFF;
  border-radius: 50%;
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1rem;
  border: 2px solid var(--color-green);
  box-shadow: var(--shadow-sm);
}

/* 
  ==========================================================================
  CARDS DE ESTATÍSTICA (OVERVIEW)
  ==========================================================================
*/
.overview {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.stat-card {
  background-color: var(--color-card-bg);
  padding: 1.8rem 1.5rem;
  border-radius: var(--border-radius);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
  transition: var(--transition-smooth);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background-color: var(--color-border);
  transition: var(--transition-smooth);
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.stat-card.card-saldo-inicial::before { background-color: var(--color-navy-deep); }
.stat-card.card-entradas::before { background-color: var(--color-green); }
.stat-card.card-saidas::before { background-color: var(--color-red); }
.stat-card.card-ia::before { background-color: #5C6BC0; }

.stat-card h3 {
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: var(--color-text-muted);
  margin-bottom: 0.8rem;
  display: flex;
  align-items: center;
  gap: 8px;
}

.stat-card h3 i {
  font-size: 1rem;
}

.stat-card .value {
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--color-navy-deep);
  line-height: 1.2;
}

.stat-card .value.positive {
  color: var(--color-green);
}

.stat-card .value.negative {
  color: var(--color-red);
}

/* Card Dica IA Especial */
.stat-card.highlight-card {
  background: linear-gradient(135deg, rgba(92, 107, 192, 0.05) 0%, rgba(255, 255, 255, 1) 100%);
  border: 1px solid rgba(92, 107, 192, 0.2);
}

.stat-card.highlight-card h3 {
  color: #5C6BC0;
}

.ai-text {
  font-size: 0.9rem;
  font-weight: 500;
  line-height: 1.45;
  color: var(--color-navy-medium);
}

/* 
  ==========================================================================
  ABAS DE CONTEÚDO (SPA PANELS)
  ==========================================================================
*/
.tab-content {
  display: none;
  animation: tabFadeIn 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.tab-content.active {
  display: block;
}

@keyframes tabFadeIn {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Grid do Dashboard */
.dashboard-grid {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 2rem;
}

.panel {
  background-color: var(--color-card-bg);
  border-radius: var(--border-radius);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
  padding: 2.2rem;
  transition: var(--transition-smooth);
}

.panel:hover {
  box-shadow: var(--shadow-md);
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.8rem;
  padding-bottom: 0.8rem;
  border-bottom: 2px solid var(--color-bg);
}

.panel-header h3 {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--color-navy-deep);
  display: flex;
  align-items: center;
  gap: 10px;
}

.panel-header h3 i {
  color: var(--color-green);
}

/* 
  ==========================================================================
  TELA 1: PÁGINA INICIAL - COMPONENTES
  ==========================================================================
*/

/* Extrato Recente */
.transaction-list {
  list-style: none;
  display: flex;
  flex-direction: column;
}

.transaction-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.1rem 0.5rem;
  border-bottom: 1px solid #F1F5F9;
  transition: var(--transition-smooth);
}

.transaction-list li:last-child {
  border-bottom: none;
}

.transaction-list li:hover {
  background-color: #F8FAFC;
  transform: translateX(4px);
  border-radius: 6px;
}

.trans-icon-info {
  display: flex;
  align-items: center;
  gap: 14px;
}

.trans-icon {
  width: 42px;
  height: 42px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
}

.trans-icon.despesa {
  background-color: var(--color-red-soft);
  color: var(--color-red);
}

.trans-icon.cartao {
  background-color: #FFF3CD;
  color: #856404;
}

.trans-icon.entrada {
  background-color: var(--color-green-soft);
  color: var(--color-green);
}

.trans-icon.saldo {
  background-color: rgba(11, 27, 43, 0.06);
  color: var(--color-navy-deep);
}

.trans-details {
  display: flex;
  flex-direction: column;
}

.trans-desc {
  font-weight: 600;
  color: var(--color-navy-deep);
  font-size: 0.95rem;
}

.trans-meta {
  font-size: 0.8rem;
  color: var(--color-text-muted);
  margin-top: 2px;
}

.trans-amount {
  font-weight: 700;
  font-size: 1.05rem;
  white-space: nowrap;
}

.trans-amount.despesa { color: var(--color-red); }
.trans-amount.receita { color: var(--color-green); }
.trans-amount.saldo-reg { color: var(--color-navy-deep); }

/* Formulário de Cadastro Moderno */
form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  position: relative;
}

/* Animação Suave para a exibição condicional do campo de descrição */
#container-descricao {
  transition: opacity 0.3s cubic-bezier(0.25, 0.8, 0.25, 1),
              transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1),
              max-height 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  overflow: hidden;
  max-height: 100px;
  opacity: 1;
  transform: scaleY(1);
  transform-origin: top;
}

#container-descricao.hidden {
  max-height: 0;
  opacity: 0;
  transform: scaleY(0);
  margin-bottom: 0;
  padding: 0;
  pointer-events: none;
}

label {
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--color-navy-deep);
}

input, select {
  width: 100%;
  padding: 12px 14px;
  border-radius: 8px;
  border: 1px solid var(--color-border);
  background-color: #FFFFFF;
  color: var(--color-text-primary);
  font-family: inherit;
  font-size: 0.95rem;
  font-weight: 500;
  transition: var(--transition-smooth);
}

input::placeholder {
  color: #A0AEC0;
}

input:focus, select:focus {
  outline: none;
  border-color: var(--color-green);
  box-shadow: 0 0 0 3px rgba(44, 160, 74, 0.15);
}

input:disabled, select:disabled {
  background-color: #EDF2F7;
  color: #A0AEC0;
  cursor: not-allowed;
  border-color: var(--color-border);
}

.btn-primary {
  background-color: var(--color-green);
  color: #FFFFFF;
  border: none;
  padding: 14px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 0.98rem;
  cursor: pointer;
  transition: var(--transition-smooth);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: 0 4px 10px rgba(44, 160, 74, 0.2);
}

.btn-primary:hover {
  background-color: var(--color-green-hover);
  transform: translateY(-2px);
  box-shadow: 0 6px 14px rgba(44, 160, 74, 0.3);
}

.btn-primary:active {
  transform: translateY(0);
}

/* 
  ==========================================================================
  TELA 2: MINHAS PLANILHAS (VISÃO DE RELATÓRIO)
  ==========================================================================
*/
.planilha-container {
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
}

.planilha-section {
  background-color: var(--color-card-bg);
  border-radius: var(--border-radius);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
  padding: 1.8rem 2.2rem;
  transition: var(--transition-smooth);
}

.planilha-section:hover {
  box-shadow: var(--shadow-md);
}

/* Cabeçalho da Planilha */
.planilha-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.2rem;
  padding-bottom: 0.8rem;
  border-bottom: 2px solid var(--color-navy-deep);
}

.planilha-header h4 {
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--color-navy-deep);
  display: flex;
  align-items: center;
  gap: 8px;
}

.planilha-header h4 i {
  color: var(--color-navy-deep);
}

.planilha-header .header-col-label {
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

/* Estrutura de Linhas (Spreadsheet Style) */
.planilha-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.9rem 0.5rem;
  border-bottom: 1px dashed var(--color-border);
  font-size: 0.95rem;
  transition: var(--transition-smooth);
}

.planilha-row:last-of-type {
  border-bottom: none;
}

.planilha-row:hover {
  background-color: #F8FAFC;
}

.planilha-row .row-desc {
  font-weight: 600;
  color: var(--color-navy-deep);
}

.planilha-row .row-desc small {
  font-weight: 500;
  color: var(--color-text-muted);
  background-color: #EDF2F7;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.75rem;
  margin-left: 8px;
}

.planilha-row .row-val {
  font-weight: 700;
}

.planilha-row .row-val.positive {
  color: var(--color-green);
}

.planilha-row .row-val.negative {
  color: var(--color-red);
}

/* Linha de Totalização */
.planilha-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1.2rem;
  margin-top: 0.8rem;
  border-top: 2px solid var(--color-navy-deep);
  font-weight: 800;
  font-size: 1.08rem;
}

.planilha-total .total-label {
  color: var(--color-navy-deep);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.planilha-total .total-val.positive {
  color: var(--color-green);
}

.planilha-total .total-val.negative {
  color: var(--color-red);
}

/* Área de Comparação Crítica */
.comparacao-panel {
  border: 1px solid var(--color-border);
}

.comparacao-header {
  text-align: center;
  font-size: 1.3rem;
  font-weight: 800;
  color: var(--color-navy-deep);
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.comparacao-header i {
  color: #5C6BC0;
}

.comparacao-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 1.5rem;
}

.comparacao-card {
  padding: 1.8rem;
  border-radius: var(--border-radius);
  text-align: center;
  transition: var(--transition-smooth);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}

.comparacao-card.calculado {
  background-color: var(--color-green-soft);
  border: 2px solid rgba(44, 160, 74, 0.4);
}

.comparacao-card.cadastrado {
  background-color: rgba(11, 27, 43, 0.04);
  border: 2px solid rgba(11, 27, 43, 0.2);
}

.comparacao-card .card-icon {
  font-size: 1.8rem;
  margin-bottom: 0.8rem;
}

.comparacao-card.calculado .card-icon { color: var(--color-green); }
.comparacao-card.cadastrado .card-icon { color: var(--color-navy-deep); }

.comparacao-card .card-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--color-text-muted);
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.comparacao-card .card-val {
  font-size: 2.2rem;
  font-weight: 900;
  color: var(--color-navy-deep);
  line-height: 1.1;
  margin-bottom: 6px;
}

.comparacao-card .card-subtitle {
  font-size: 0.8rem;
  color: var(--color-text-muted);
}

/* Alerta de Divergência Inteligente (IA Alert) */
.alerta-divergencia-box {
  grid-column: 1 / -1;
  background-color: var(--color-red-soft);
  border: 1px solid rgba(217, 83, 79, 0.3);
  border-left: 5px solid var(--color-red);
  padding: 1.25rem 1.8rem;
  border-radius: var(--border-radius);
  display: none; /* Controlado via JS */
  align-items: flex-start;
  gap: 15px;
  animation: alertBounceIn 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
}

@keyframes alertBounceIn {
  0% { opacity: 0; transform: scale(0.95); }
  50% { opacity: 0.5; transform: scale(1.02); }
  100% { opacity: 1; transform: scale(1); }
}

.alerta-divergencia-box i {
  font-size: 1.4rem;
  color: var(--color-red);
  margin-top: 2px;
  animation: pulseWarning 1.5s infinite;
}

@keyframes pulseWarning {
  0% { transform: scale(1); }
  50% { transform: scale(1.15); text-shadow: 0 0 10px rgba(217, 83, 79, 0.3); }
  100% { transform: scale(1); }
}

.alerta-divergencia-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.alerta-divergencia-titulo {
  font-size: 1rem;
  font-weight: 700;
  color: #9C27B0; /* Destaque Púrpura IA */
  display: flex;
  align-items: center;
  gap: 8px;
}

.alerta-divergencia-titulo span {
  background-color: rgba(156, 39, 176, 0.1);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
}

.alerta-divergencia-desc {
  font-size: 0.9rem;
  line-height: 1.45;
  color: var(--color-navy-medium);
  font-weight: 500;
}

.alerta-divergencia-desc span {
  font-weight: 700;
  color: var(--color-red);
}

/* Mensagem de Sem Divergência */
.sucesso-fechamento-box {
  grid-column: 1 / -1;
  background-color: var(--color-green-soft);
  border: 1px solid rgba(44, 160, 74, 0.3);
  border-left: 5px solid var(--color-green);
  padding: 1.25rem 1.8rem;
  border-radius: var(--border-radius);
  display: flex;
  align-items: center;
  gap: 15px;
}

.sucesso-fechamento-box i {
  font-size: 1.3rem;
  color: var(--color-green);
}

.sucesso-fechamento-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--color-navy-deep);
}

/* 
  ==========================================================================
  SPRIINT 03 - REESTRUTURAÇÃO DOS MESES & NAVEGAÇÃO INTERATIVA
  ==========================================================================
*/

/* Seletor de Meses - Grid Moderno */
.months-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
  width: 100%;
}

.month-card {
  background-color: var(--color-card-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  padding: 2.2rem 1.5rem;
  text-align: center;
  cursor: pointer;
  box-shadow: var(--shadow-sm);
  transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1),
              border-color 0.3s cubic-bezier(0.25, 0.8, 0.25, 1),
              box-shadow 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  position: relative;
  overflow: hidden;
}

.month-card::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background-color: transparent;
  transition: var(--transition-smooth);
}

.month-card i {
  font-size: 2.2rem;
  color: var(--color-navy-deep);
  transition: var(--transition-smooth);
}

.month-card span.month-name {
  font-size: 1.15rem;
  font-weight: 750;
  color: var(--color-navy-deep);
}

.month-card span.month-status {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--color-text-muted);
  background-color: var(--color-bg);
  padding: 4px 10px;
  border-radius: 20px;
  border: 1px solid var(--color-border);
  transition: var(--transition-smooth);
}

/* Hover Efeito Verde Vibrante e Elevação */
.month-card:hover {
  transform: translateY(-6px);
  border-color: var(--color-green);
  box-shadow: 0 12px 24px rgba(44, 160, 74, 0.12);
}

.month-card:hover i {
  color: var(--color-green);
  transform: scale(1.1);
}

.month-card:hover span.month-status {
  background-color: var(--color-green-soft);
  color: var(--color-green);
  border-color: rgba(44, 160, 74, 0.2);
}

.month-card:hover::after {
  background-color: var(--color-green);
}

.month-card:active {
  transform: translateY(-2px);
}

/* Botão de Retorno para os Meses */
.btn-back-months {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background-color: var(--color-card-bg);
  color: var(--color-navy-deep);
  border: 1px solid var(--color-border);
  padding: 10px 18px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  transition: var(--transition-smooth);
  box-shadow: var(--shadow-sm);
  margin-bottom: 1.5rem;
}

.btn-back-months:hover {
  background-color: var(--color-navy-deep);
  color: #FFFFFF;
  border-color: var(--color-navy-deep);
  transform: translateX(-4px);
  box-shadow: var(--shadow-md);
}

.btn-back-months i {
  font-size: 0.95rem;
}

/* Transições de Fade Suave entre Grid e Planilha */
.fade-transition {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.3s cubic-bezier(0.25, 0.8, 0.25, 1),
              transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.fade-transition.hidden-view {
  opacity: 0;
  transform: translateY(15px);
  display: none !important;
}

/* 
  ==========================================================================
  MEDIA QUERIES (RESPONSIVIDADE PREMIUM)
  ==========================================================================
*/
@media (max-width: 1024px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .app-container {
    flex-direction: column;
  }
  
  .sidebar {
    width: 100%;
    height: auto;
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }
  
  .sidebar .logo {
    padding: 1.5rem 1.8rem;
  }
  
  .sidebar nav {
    padding: 1rem;
  }
  
  .sidebar nav ul {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .main-content {
    padding: 2rem 1.5rem;
  }
}

@media (max-width: 600px) {
  .comparacao-grid {
    grid-template-columns: 1fr;
  }
  
  .sidebar nav ul {
    flex-direction: column;
    width: 100%;
  }
  
  .sidebar nav li a {
    justify-content: center;
  }
}
