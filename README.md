# 💻 DevProfile Lite

DevProfile Lite é um protótipo simples de autenticação e visualização de perfil feito com **React.js** e **Firebase**. O objetivo é permitir que usuários se cadastrem, façam login e visualizem informações básicas do seu perfil armazenadas no **Cloud Firestore**.

---

## 🚀 Tecnologias Utilizadas

- **React.js** – Biblioteca JavaScript para criação de interfaces.
- **React Router DOM** – Gerenciamento de rotas na aplicação.
- **Firebase Authentication** – Sistema de autenticação de usuários com email e senha.
- **Firebase Firestore** – Banco de dados NoSQL para armazenamento dos perfis.
- **Tailwind CSS** – Framework de CSS utilitário para estilização responsiva e moderna.

---

## 🛠️ Como configurar e rodar localmente

### 1. Clone o repositório

```bash
git clone https://github.com/Gabuka/devprofile-lite
cd devprofile-lite
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o Firebase

Acesse: https://console.firebase.google.com

- Crie um novo projeto.

- Habilite Authentication > Email/Senha.

- Ative o Firestore Database.

- No menu lateral, vá em Configurações do Projeto > Suas credenciais Web.


### 4. Crie um arquivo .env na raiz do projeto

Preencha com suas credenciais Firebase:

```bash
VITE_FIREBASE_API_KEY=SUA_CHAVE_API
VITE_FIREBASE_AUTH_DOMAIN=SEU_PROJETO.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=SEU_PROJETO
VITE_FIREBASE_STORAGE_BUCKET=SEU_PROJETO.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=NUMERO
VITE_FIREBASE_APP_ID=SEU_APP_ID
```
### 5. Configure dados no Firestore

No console do Firestore, crie manualmente:

- Coleção: userProfiles

- Documento: <UID do usuário autenticado>

- Campos:

```bash
{
  "nomeCompleto": "Seu nome",
  "bioCurta": "Uma breve descrição",
  "linkPortfolio": "https://seuportfolio.com"
}
```
Nota: O UID pode ser obtido após o login no Firebase Authentication.

### 6. Execute o projeto

```bash
npm start
```

Acesse em: http://localhost:3000

## 📂 Estrutura do Projeto

```bash
src/
├── components/
│   ├── Navbar.jsx
│   ├── ProtectedRoute.jsx
├── pages/
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Profile.jsx
├── services/
│   ├── firebaseConfig.js
├── App.jsx
└── main.jsx
```

## 📌 Funcionalidades

- ✅ Cadastro com email e senha

- ✅ Login e logout

- ✅ Visualização de perfil com dados do Firestore

- ✅ Rotas protegidas para usuários autenticados

- ✅ Interface responsiva com Tailwind CSS