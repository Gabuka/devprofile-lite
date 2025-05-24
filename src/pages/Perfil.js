import { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function Perfil() {
  const [perfil, setPerfil] = useState(null);
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const docRef = doc(db, 'userProfiles', user.uid);
      getDoc(docRef).then((snapshot) => {
        if (snapshot.exists()) {
          setPerfil(snapshot.data());
        } else {
          setMensagem('Perfil ainda não configurado.');
        }
      });
    }
  }, []);

  const logout = () => {
    signOut(auth);
    navigate('/login');
  };

  return (
    <div>
      <h2>Meu Perfil</h2>
      {perfil ? (
        <>
          <p><strong>Nome:</strong> {perfil.nomeCompleto}</p>
          <p><strong>Bio:</strong> {perfil.bioCurta}</p>
          <p><strong>Portfólio:</strong> <a href={perfil.linkPortfolio} target="_blank\">{perfil.linkPortfolio}</a></p>
        </>
      ) : (
        <p>{mensagem}</p>
      )}
      <button onClick={logout}>Sair</button>
    </div>
  );
}
