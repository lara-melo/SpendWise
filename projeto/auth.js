// auth.js
import { supabase } from './supabaseClient.js';

let currentMode = 'login'; // 'login', 'register', 'recover'

document.addEventListener('DOMContentLoaded', async () => {
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    const btnSubmit = document.getElementById('btn-submit');
    const linkRegister = document.getElementById('link-register');
    const linkRecover = document.getElementById('link-recover');
    const title = document.querySelector('.login-container h2');
    const passwordGroup = document.getElementById('password').closest('.form-group');
    const msgContainer = document.getElementById('msg-container');

    function showMessage(msg, isError = false) {
      if (!msgContainer) {
        alert(msg);
        return;
      }
      msgContainer.style.display = 'block';
      msgContainer.innerText = msg;
      if (isError) {
        msgContainer.style.backgroundColor = '#FEE2E2';
        msgContainer.style.color = '#B91C1C';
        msgContainer.style.border = '1px solid #F87171';
      } else {
        msgContainer.style.backgroundColor = '#D1FAE5';
        msgContainer.style.color = '#047857';
        msgContainer.style.border = '1px solid #34D399';
      }
    }

    // Toggle Password
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    if (togglePassword && passwordInput) {
      togglePassword.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        togglePassword.classList.toggle('fa-eye-slash');
        togglePassword.classList.toggle('fa-eye');
      });
    }

    // Verifica se já está logado
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      window.location.href = 'app.html';
    }

    // Alterar para Modo Cadastro
    linkRegister.addEventListener('click', (e) => {
      e.preventDefault();
      if (msgContainer) msgContainer.style.display = 'none';
      if (currentMode === 'login') {
        currentMode = 'register';
        title.innerText = 'Criar Nova Conta';
        btnSubmit.innerText = 'Cadastrar';
        linkRegister.innerText = 'Já tenho uma conta (Login)';
        passwordGroup.style.display = 'block';
        linkRecover.style.display = 'none';
      } else {
        currentMode = 'login';
        title.innerText = 'Acesso ao Sistema';
        btnSubmit.innerText = 'Login';
        linkRegister.innerText = 'Cadastrar Novo Usuário';
        passwordGroup.style.display = 'block';
        linkRecover.style.display = 'block';
      }
    });

    // Alterar para Modo Recuperação
    linkRecover.addEventListener('click', (e) => {
      e.preventDefault();
      if (msgContainer) msgContainer.style.display = 'none';
      currentMode = 'recover';
      title.innerText = 'Recuperar Senha';
      btnSubmit.innerText = 'Enviar E-mail';
      passwordGroup.style.display = 'none';
      linkRegister.innerText = 'Voltar para Login';
      linkRecover.style.display = 'none';
    });

    // Submissão do Formulário
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      if (msgContainer) msgContainer.style.display = 'none';

      if (currentMode === 'register' && password.length < 8) {
        showMessage('Sua senha deve ter pelo menos 8 caracteres para sua segurança', true);
        return;
      }

      btnSubmit.disabled = true;
      btnSubmit.innerText = 'Aguarde...';

      try {
        if (currentMode === 'login') {
          const { data, error } = await supabase.auth.signInWithPassword({ email, password });
          if (error) throw error;
          window.location.href = 'app.html';
        } else if (currentMode === 'register') {
          const { data, error } = await supabase.auth.signUp({ email, password });
          if (error) throw error;
          showMessage('Cadastro realizado com sucesso! Verifique seu e-mail ou faça login.', false);
          setTimeout(() => linkRegister.click(), 2500);
        } else if (currentMode === 'recover') {
          const { data, error } = await supabase.auth.resetPasswordForEmail(email);
          if (error) throw error;
          showMessage('E-mail de recuperação enviado!', false);
          setTimeout(() => linkRegister.click(), 2500);
        }
      } catch (error) {
        let errorMsg = error.message;
        if (errorMsg.includes('Invalid login credentials')) {
          errorMsg = 'E-mail ou senha incorretos.';
        } else if (errorMsg.includes('already registered')) {
          errorMsg = 'Este e-mail já está cadastrado.';
        } else {
          errorMsg = 'Erro: ' + error.message;
        }
        showMessage(errorMsg, true);
      } finally {
        btnSubmit.disabled = false;
        if (currentMode === 'login') btnSubmit.innerText = 'Login';
        else if (currentMode === 'register') btnSubmit.innerText = 'Cadastrar';
        else if (currentMode === 'recover') btnSubmit.innerText = 'Enviar E-mail';
      }
    });
  }
});

// Função a ser importada no app.js para verificar autenticação
export async function checkAuth() {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error || !session) {
    window.location.href = 'index.html';
    return null;
  }
  return session.user;
}

// Opcional: Escutar mudanças de estado da autenticação
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_OUT') {
    if (window.location.pathname.endsWith('app.html')) {
      window.location.href = 'index.html';
    }
  }
});

export async function logout() {
  await supabase.auth.signOut();
}
