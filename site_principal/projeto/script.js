document.addEventListener('DOMContentLoaded', () => {
  // Lista inicial de transações mockades
  const transactions = [
    { id: 1, desc: 'Mercado Mensal', amount: 850.00, type: 'despesa', date: 'Hoje' },
    { id: 2, desc: 'Salário SpendWise', amount: 4500.00, type: 'receita', date: 'Ontem' },
    { id: 3, desc: 'Assinatura Software', amount: 120.00, type: 'despesa', date: '18 Abr' }
  ];

  const listEl = document.getElementById('transactionList');
  const form = document.getElementById('transactionForm');

  // Renderiza a lista na tela
  function renderList() {
    listEl.innerHTML = '';
    transactions.forEach(t => {
      const li = document.createElement('li');
      const amountClass = t.type === 'despesa' ? 'trans-amount despesa' : 'trans-amount receita';
      const signal = t.type === 'despesa' ? '-' : '+';
      
      li.innerHTML = `
        <div>
          <span class="trans-desc">${t.desc}</span>
          <span class="trans-date">${t.date}</span>
        </div>
        <div class="${amountClass}">
          ${signal} R$ ${t.amount.toLocaleString('pt-BR', {minimumFractionDigits: 2})}
        </div>
      `;
      listEl.appendChild(li);
    });
  }

  renderList();

  // Escuta o submit do formulário
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const descInput = document.getElementById('desc');
    const valorInput = document.getElementById('valor');
    const tipoInput = document.getElementById('tipo');

    const newTransaction = {
      id: Date.now(),
      desc: descInput.value,
      amount: parseFloat(valorInput.value),
      type: tipoInput.value,
      date: 'Agora'
    };

    // Adiciona ao topo da lista
    transactions.unshift(newTransaction);
    
    // Atualiza a view
    renderList();

    // Limpa campos
    descInput.value = '';
    valorInput.value = '';
  });

  // Lógica de Feedback de Carregamento (Transição de Página)
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.4s ease';
  setTimeout(() => { document.body.style.opacity = '1'; }, 50);

  document.querySelectorAll('a[href^="../"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = e.currentTarget.getAttribute('href');
      document.body.style.opacity = '0';
      setTimeout(() => { window.location.href = target; }, 400);
    });
  });
});
