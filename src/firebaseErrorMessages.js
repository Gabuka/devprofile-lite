// Objeto que mapeia os códigos de erro do Firebase para mensagens amigáveis em português
const firebaseErrorMessages = {
  'auth/invalid-email': 'E-mail inválido.',
  'auth/user-disabled': 'Esta conta foi desativada.',
  'auth/user-not-found': 'Usuário não encontrado.',
  'auth/wrong-password': 'Senha incorreta.',
  'auth/email-already-in-use': 'Este e-mail já está em uso.',
  'auth/weak-password': 'A senha deve ter pelo menos 6 caracteres.',
  'auth/missing-password': 'A senha é obrigatória.',
  'auth/internal-error': 'Erro interno. Tente novamente.',
  'auth/missing-email': 'O e-mail é obrigatório.',
};

// Função que recebe um código de erro do Firebase e retorna a mensagem correspondente
// Se o código não estiver mapeado, retorna uma mensagem genérica de erro
export const getFirebaseErrorMessage = (code) => {
  return firebaseErrorMessages[code] || 'Ocorreu um erro. Tente novamente.';
};
