import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Link } from 'react-router-dom';

export default function Cadastro() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, senha);
      setMensagem('Cadastro realizado com sucesso!');
    } catch (error) {
      setMensagem(error.message);
    }
  };

  return (
    <div>
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Senha" onChange={(e) => setSenha(e.target.value)} required />
        <button type="submit">Cadastrar</button>
      </form>
      <p>{mensagem}</p>
      <Link to="/login">Já tem conta? Login</Link>
    </div>
  );
}
