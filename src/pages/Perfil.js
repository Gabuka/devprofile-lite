import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Perfil() {
  const [perfil, setPerfil] = useState(null);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const user = auth.currentUser;

  useEffect(() => {
    async function fetchPerfil() {
      if (user) {
        try {
          const docRef = doc(db, "userProfiles", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setPerfil(docSnap.data());
          } else {
            setErro("Perfil ainda não configurado.");
          }
        } catch (error) {
          setErro("Erro ao buscar perfil: " + error.message);
        }
      }
    }

    fetchPerfil();
  }, [user]);

  const handleLogout = () => {
    auth.signOut();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Meu Perfil</h1>
          <button
            onClick={handleLogout}
            className="text-sm text-red-600 hover:underline"
          >
            Sair
          </button>
        </div>

        {erro && <p className="text-red-600">{erro}</p>}

        {perfil ? (
          <div>
            <p className="mb-2">
              <strong>Nome:</strong> {perfil.nomeCompleto}
            </p>
            <p className="mb-2">
              <strong>Bio:</strong> {perfil.bioCurta}
            </p>
            <p>
              <strong>Portfólio:</strong>{" "}
              <a
                href={perfil.linkPortfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                {perfil.linkPortfolio}
              </a>
            </p>
          </div>
        ) : (
          <p className="text-gray-600">Carregando informações...</p>
        )}
      </div>
    </div>
  );
}
