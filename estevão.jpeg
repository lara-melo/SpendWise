document.addEventListener('DOMContentLoaded', () => {
  // Configuração do Intersection Observer para as aninmações Fade-In
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // Inicia a animação quando 15% do elemento estiver visível
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Para animar apenas uma vez
      }
    });
  }, observerOptions);

  // Seleciona todos os elementos com a classe .fade-in e os observa
  const fadeElements = document.querySelectorAll('.fade-in');
  fadeElements.forEach(el => observer.observe(el));

  // Lógica de Feedback de Carregamento (Transição de Página)
  // Configura a opacidade do body para 1 ao carregar
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.4s ease';
  setTimeout(() => { document.body.style.opacity = '1'; }, 50);

  // Intercepta qualquer clique de link do sistema
  document.querySelectorAll('a[href^="../"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = e.currentTarget.getAttribute('href');
      
      // Feedback visual (fade out)
      document.body.style.opacity = '0';
      
      // Aguarda 400ms para efetuar a troca mantendo a UX imersiva
      setTimeout(() => { window.location.href = target; }, 400);
    });
  });
});
