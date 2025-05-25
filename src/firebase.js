// Importa funções específicas da SDK do Firebase para inicialização, autenticação e Firestore
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Objeto de configuração do Firebase contendo as credenciais do seu projeto
const firebaseConfig = {
  apiKey: "AIzaSyDjY4cIOQhmIANSkIhzE3Pojcny2L-CmZ8",               // Chave da API (autenticação)
  authDomain: "devprofile-lite.firebaseapp.com",                  // Domínio para autenticação
  projectId: "devprofile-lite",                                   // ID do projeto no Firebase
  storageBucket: "devprofile-lite.firebasestorage.app",          // (opcional) Bucket de armazenamento
  messagingSenderId: "1054711507295",                             // ID do remetente de mensagens
  appId: "1:1054711507295:web:709096ae73d75cf60b6eea"             // ID do app para identificar na plataforma
};

// Inicializa a aplicação Firebase com as configurações acima
const app = initializeApp(firebaseConfig);

// Exporta os serviços de autenticação e banco de dados (Firestore) já conectados ao app
export const auth = getAuth(app);     // Serviço de autenticação
export const db = getFirestore(app);  // Instância do Firestore (banco de dados NoSQL do Firebase)
