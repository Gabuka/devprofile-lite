// Importa hooks e funções necessárias do React, Firebase e React Router
import { useState } from "react";
import { auth } from "../firebase"; // Instância de autenticação do Firebase
import { createUserWithEmailAndPassword } from "firebase/auth"; // Função para criar usuário
import { useNavigate } from "react-router-dom"; // Hook para redirecionamento de rotas
import { getFirebaseErrorMessage } from '../firebaseErrorMessages'; // Função que traduz mensagens de erro

export default function Cadastro() {
  // Define os estados para email, senha e mensagens de erro
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate(); // Hook para redirecionamento de página

  // Função executada ao submeter o formulário de cadastro
  const handleCadastro = async (e) => {
    e.preventDefault(); // Impede o recarregamento da página
    try {
      // Cria novo usuário com email e senha no Firebase Auth
      await createUserWithEmailAndPassword(auth, email, password);
      // Redireciona para a página de login após cadastro bem-sucedido
      navigate("/login");
    } catch (error) {
      // Se houver erro, exibe mensagem traduzida
      const mensagem = getFirebaseErrorMessage(error.code);
      setError(mensagem);
    }
  };

  return (
    // Container principal com centralização e fundo claro
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* Formulário de cadastro */}
      <form
        onSubmit={handleCadastro}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">Cadastro</h2>

        {/* Mensagem de erro, se houver */}
        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

        {/* Campo de email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 px-4 py-2 border rounded-md"
          onChange={(e) => setEmail(e.target.value)} // Atualiza estado do email
        />

        {/* Campo de senha */}
        <input
          type="password"
          placeholder="Senha"
          className="w-full mb-4 px-4 py-2 border rounded-md"
          onChange={(e) => setPassword(e.target.value)} // Atualiza estado da senha
        />

        {/* Botão de envio */}
        <button
          type="submit"
          className="bg-green-600 text-white w-full py-2 rounded-md hover:bg-green-700 transition"
        >
          Cadastrar
        </button>

        {/* Link para página de login caso já tenha conta */}
        <p className="mt-4 text-sm text-center">
          Já tem uma conta?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Entrar
          </a>
        </p>
      </form>
    </div>
  );
}
