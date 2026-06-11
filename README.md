# 📚 Biblioteca - React

Bem-vindo ao repositório do **Segundo Trabalho de React**. Este projeto é uma aplicação web desenvolvida para o consumo de uma API, permitindo gerenciar o acervo de uma biblioteca de forma intuitiva, dinâmica e responsiva.

## 🎯 Objetivo do Projeto

Construir uma interface agradável utilizando **React** para consumir uma API. A aplicação engloba funcionalidades como cadastro, listagem, busca, edição e autenticação de usuários, aplicando os principais conceitos de componentização e hooks.

## ✨ Funcionalidades (Requisitos Atendidos)

- **Componentes Funcionais & Hooks:** Uso intensivo de `useState`, `useEffect` e `useContext`.
- **Rotas com React Router:** Navegação fluída entre páginas (`/`, `/login`, `/cadastrar`, `/buscar`, `/editar/:id`).
- **Autenticação Simples:** Context API (`AuthContext`) protegendo rotas privadas (`PrivateRoute`).
- **Requisições HTTP:** Uso da biblioteca `axios` para métodos `GET`, `POST`, `PUT` e `DELETE`.
- **Organização de Componentes:** Props sendo utilizadas para dinamizar a interface.
- **Estrutura Completa:** Possui mais de 2 componentes e 5 páginas (Home, Login, Cadastrar, Buscar, Editar).
- **Filtros e Validações:** Capacidade de buscar/filtrar livros e validar entradas no formulário.

## 🛠️ Tecnologias Utilizadas

- [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- [React Router DOM](https://reactrouter.com/) (Navegação)
- [Axios](https://axios-http.com/) (Requisições HTTP)
- [Bootstrap](https://getbootstrap.com/) (Estilização e Layout)
- Vanilla CSS + CSS Modules

## 📁 Estrutura de Pastas

A estrutura do projeto dentro do diretório `src/` está organizada da seguinte maneira:

```text
src/
├── components/          # Componentes reaproveitáveis da interface
│   ├── Header/          # Cabeçalho da aplicação
│   └── Navbar/          # Menu de navegação superior
├── contexts/            # Context API para gerenciamento de estados
│   └── AuthContext.jsx  # Contexto responsável pelo login/autenticação
├── pages/               # Páginas roteáveis da aplicação
│   ├── AdicionarLivro/  # Formulário de cadastro de livros
│   ├── BuscarLivro/     # Listagem e filtro de livros
│   ├── EditarLivro/     # Formulário de edição de livros
│   ├── Home/            # Página inicial após o login
│   └── Login/           # Tela de autenticação
├── routes/              # Configurações de roteamento
│   ├── AppRouter.jsx    # Mapeamento central das rotas
│   └── privateRoute.jsx # Wrapper para proteção de rotas privadas
├── service/             # Configurações de integração externa
│   └── api.js           # Instância e métodos do Axios
├── App.jsx              # Componente raiz e árvore de rotas
├── global.css           # Estilos globais
└── main.jsx             # Ponto de entrada do React
```

## 🚀 Como Rodar o Projeto

1. Clone este repositório:
   ```bash
   git clone https://github.com/LeonamNgr/Trabalho-2-de-React-Grupo-1.git
   ```
2. Acesse a pasta do projeto:
   ```bash
   cd Trabalho-2-de-React-Grupo-1
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

## 👥 Equipe de Desenvolvimento (Grupo 1 - Turma 34)

Este projeto foi desenvolvido colaborativamente por:

| Integrante | GitHub |
| :--- | :--- |
| **1. [Ana Paula Pimenta]** | [@anapimenta74](https://github.com/anapimenta74) |
| **2. [Diana Monteiro]** | [@DiaMont30](https://github.com/DiaMont30) |
| **3. [Laís Ferrari]** | [@laislaferrari](https://github.com/laislaferrari) |
| **4. [Leonam Machado]** | [@LeonamNgr](https://github.com/LeonamNgr) |
| **5. [Thiago Sinesio]** | [@thiago-sinesio](https://github.com/thiago-sinesio) |

---
*Desenvolvido como requisito de avaliação da disciplina de React no curso Serratec.*
