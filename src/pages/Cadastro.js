import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getFirebaseErrorMessage } from '../firebaseErrorMessages';


export default function Cadastro() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCadastro = async (e) => {
    e.preventDefault();
    try {
    await createUserWithEmailAndPassword(auth, email, password);
        navigate("/login");
    } catch (error) {
        const mensagem = getFirebaseErrorMessage(error.code);
        setError(mensagem);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleCadastro}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">Cadastro</h2>

        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 px-4 py-2 border rounded-md"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          className="w-full mb-4 px-4 py-2 border rounded-md"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-green-600 text-white w-full py-2 rounded-md hover:bg-green-700 transition"
        >
          Cadastrar
        </button>

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
