// Importa hooks e funções necessárias do React, Firebase e React Router
import { useState } from "react";
import { auth } from "../firebase"; // Instância de autenticação do Firebase
import { signInWithEmailAndPassword } from "firebase/auth"; // Função para login com email e senha
import { useNavigate } from "react-router-dom"; // Hook para redirecionar o usuário
import { getFirebaseErrorMessage } from '../firebaseErrorMessages'; // Função personalizada para traduzir mensagens de erro

export default function Login() {
  // Estados para capturar email, senha e erros
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate(); // Hook de navegação entre páginas

  // Função executada ao submeter o formulário
  const handleLogin = async (e) => {
    e.preventDefault(); // Impede que a página recarregue
    try {
      // Tenta fazer login com email e senha usando o Firebase
      await signInWithEmailAndPassword(auth, email, password);
      // Redireciona para a rota "/perfil" após login bem-sucedido
      navigate("/perfil");
    } catch (error) {
      // Em caso de erro, pega a mensagem traduzida e exibe
      const mensagem = getFirebaseErrorMessage(error.code);
      setError(mensagem);
    }
  };

  return (
    // Container principal centralizado com fundo cinza claro
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* Formulário de login com estilização Tailwind */}
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>

        {/* Exibe mensagem de erro, se existir */}
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

        {/* Botão de login */}
        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded-md hover:bg-blue-700 transition"
        >
          Entrar
        </button>

        {/* Link para página de cadastro, caso o usuário não tenha conta */}
        <p className="mt-4 text-sm text-center">
          Não tem conta?{" "}
          <a href="/cadastro" className="text-blue-600 hover:underline">
            Cadastre-se
          </a>
        </p>
      </form>
    </div>
  );
}
