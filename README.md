# 📚 Biblioteca - React

Bem-vindo ao repositório do **Segundo Trabalho de React**. Este projeto é uma aplicação web desenvolvida para o consumo de uma API, permitindo gerenciar o acervo de uma biblioteca de forma intuitiva, dinâmica e responsiva.

## 🎯 Objetivo do Projeto

Construir uma interface agradável utilizando **React** para consumir uma API. A aplicação engloba funcionalidades como cadastro, listagem, busca, edição e autenticação de usuários, aplicando os principais conceitos de componentização e hooks.

## ✨ Funcionalidades (Requisitos Atendidos)

- **Componentes Funcionais & Hooks:** Uso intensivo de `useState`, `useEffect` e `useContext`.
- **Rotas com React Router:** Navegação fluída entre páginas (`/`, `/login`, `/cadastrar`, `/buscar`, `/editar/:id`).
- **Autenticação Simples:** Context API (`AuthContext`) protegendo rotas privadas (`PrivateRoute`).
- **Acessibilidade Universal:** Suporte a Alto Contraste, aumento de fonte global e integração nativa com o **VLibras**.
- **Tema Dinâmico:** Context API (`ThemeContext`) controlando a alternância entre modo claro e escuro.
- **Requisições HTTP:** Uso da biblioteca `axios` para métodos `GET`, `POST`, `PUT` e `DELETE` usando Interceptors.
- **Organização de Componentes:** Props sendo utilizadas para dinamizar a interface.
- **Filtros e Validações:** Capacidade de buscar/filtrar livros e validar entradas no formulário com Hook Form.

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
├── assets/              # Arquivos estáticos (imagens, ícones, etc.)
├── components/          # Componentes reaproveitáveis da interface
│   ├── Acessibilidade/  # Componente do menu de alto contraste e acessibilidade
│   ├── CardLivro/       # Componente de card para exibição dos livros
│   ├── Footer/          # Rodapé da aplicação
│   ├── Input/           # Componente de campo de texto customizado
│   ├── Navbar/          # Menu de navegação superior
│   └── Select/          # Componente de seleção (dropdown)
├── contexts/            # Context API para gerenciamento de estados
│   ├── AuthContext.jsx  # Contexto responsável pelo login/autenticação
│   └── ThemeContext.jsx # Contexto responsável pela alternância de tema (claro/escuro)
├── pages/               # Páginas roteáveis da aplicação
│   ├── AdicionarAutor/  # Formulário de cadastro de autores
│   ├── AdicionarEditora/# Formulário de cadastro de editoras
│   ├── AdicionarLivro/  # Formulário de cadastro de livros
│   ├── BuscarLivro/     # Listagem e filtro de livros
│   ├── EditarLivro/     # Formulário de edição de livros
│   ├── Home/            # Página inicial
│   ├── Livros/          # Página geral para exibição do acervo de livros
│   ├── Login/           # Tela de autenticação
│   └── SobreNos/        # Página de informações sobre o projeto/equipe
├── routes/              # Configurações de roteamento
│   ├── AppRouter.jsx    # Mapeamento central das rotas
│   └── privateRoute.jsx # Wrapper para proteção de rotas privadas
├── service/             # Configurações de integração externa
│   └── api.js           # Instância e métodos de requisição (ex: Axios)
├── App.jsx              # Componente raiz e provedores principais
├── global.css           # Estilos globais
└── main.jsx             # Ponto de entrada do ReactReact
```

## 🚀 Como Rodar o Projeto

### Passo 1: Iniciando a API (Backend)

Antes de rodar a interface em React, é necessário garantir que a API esteja em execução.

1. Localize o arquivo `.jar` do backend fornecido pela equipe.
2. No seu terminal, execute o seguinte comando:
   ```bash
   java -jar nome-do-arquivo.jar
   ```

### Passo 2: Iniciando o Frontend (React)

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

| Integrante                 | GitHub                                               |
| :------------------------- | :--------------------------------------------------- |
| **1. [Ana Paula Pimenta]** | [@anapimenta74](https://github.com/anapimenta74)     |
| **2. [Diana Monteiro]**    | [@DiaMont30](https://github.com/DiaMont30)           |
| **3. [Laís Ferrari]**      | [@laislaferrari](https://github.com/laislaferrari)   |
| **4. [Leonam Machado]**    | [@LeonamNgr](https://github.com/LeonamNgr)           |
| **5. [Thiago Sinesio]**    | [@thiago-sinesio](https://github.com/thiago-sinesio) |

---

_Desenvolvido como requisito de avaliação da disciplina de React no curso Serratec._
