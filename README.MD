# Student Performance - Sistema Web de Predição de Performance Estudantil

## 📋 Sobre o Projeto

Sistema completo para análise e predição de performance estudantil utilizando Machine Learning. O projeto é composto por:

- **Backend**: API Django REST Framework com modelo de ML integrado
- **Frontend**: Interface React para visualização e gerenciamento de dados

## 🚀 Como Rodar o Projeto Backend Localmente

### Pré-requisitos

- Python 3.8 ou superior
- pip (gerenciador de pacotes Python)
- Git

### 🔧 Passo a Passo para Configuração

#### 1. Clone o repositório

```bash
git clone https://github.com/ClarkAshida/Student-Performance-ML.git
cd Student-Performance-ML
```

#### 2. Configure o ambiente virtual

```bash
# Crie um ambiente virtual
python -m venv venv

# Ative o ambiente virtual
# No macOS/Linux:
source venv/bin/activate
# No Windows:
venv\Scripts\activate
```

#### 3. Instale as dependências

```bash
cd student-performance-backend
pip install -r requirements.txt
```

#### 4. Configure o banco de dados

```bash
# Crie as migrations
python manage.py makemigrations performance

# Aplique as migrations
python manage.py migrate
```

#### 5. Crie um superusuário (opcional)

```bash
python manage.py createsuperuser
```

#### 6. Inicie o servidor

```bash
python manage.py runserver 8001
```

O servidor estará disponível em: `http://127.0.0.1:8001/`

## 🎨 Como Rodar o Projeto Frontend Localmente

### Pré-requisitos

- Node.js 18 ou superior
- npm ou yarn

### 🔧 Passo a Passo para Configuração

#### 1. Navegue para o diretório do frontend

```bash
cd student-performance-frontend/performance
```

#### 2. Instale as dependências

```bash
npm install
# ou
yarn install
```

#### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto frontend:

```env
# API URLs
VITE_API_BASE_URL_LOCAL=http://127.0.0.1:8001/api/
VITE_API_BASE_URL_PROD=https://student-performance-backend-bhaxaefmckdtduh0.brazilsouth-01.azurewebsites.net/api/
```

#### 4. Inicie o servidor de desenvolvimento

```bash
npm run dev
# ou
yarn dev
```

O frontend estará disponível em: `http://localhost:5173/` (ou outra porta se esta estiver em uso)

### 🎯 Funcionalidades do Frontend

- **Dashboard Principal**: Visão geral das turmas e estatísticas
- **Gerenciamento de Turmas**: Criar, visualizar e deletar turmas
- **Gerenciamento de Estudantes**: Cadastrar e acompanhar estudantes
- **Predições ML**: Visualizar predições automáticas de performance
- **Interface Responsiva**: Design moderno com Tailwind CSS e shadcn/ui

### 🎨 Tecnologias do Frontend

- **React 19**: Biblioteca para interface
- **TypeScript**: Tipagem estática
- **Vite**: Build tool e dev server
- **Tailwind CSS**: Framework de estilos
- **shadcn/ui**: Componentes reutilizáveis
- **Lucide React**: Ícones
- **React Router**: Roteamento
- **Axios**: Cliente HTTP

### 📁 Estrutura do Projeto Frontend

```
student-performance-frontend/performance/
├── src/
│   ├── components/           # Componentes reutilizáveis
│   │   ├── ui/              # Componentes shadcn/ui
│   │   └── navbar/          # Componente de navegação
│   ├── pages/               # Páginas da aplicação
│   │   ├── Home.tsx         # Dashboard principal
│   │   ├── Classroom.tsx    # Detalhes da turma
│   │   ├── Student.tsx      # Detalhes do estudante
│   │   ├── RegisterStudent.tsx # Cadastro de estudante
│   │   └── UpdateStudent.tsx   # Edição de estudante
│   ├── services/            # Serviços de API
│   │   ├── classRoomApi.ts  # API de turmas
│   │   └── studentApi.ts    # API de estudantes
│   ├── context/             # Context API
│   │   └── ApiContext.tsx   # Contexto da API
│   ├── types/               # Tipos TypeScript
│   │   ├── classRooms.ts    # Tipos de turmas
│   │   └── students.ts      # Tipos de estudantes
│   └── lib/                 # Utilitários
│       └── utils.ts         # Funções auxiliares
├── .env                     # Variáveis de ambiente
├── tailwind.config.ts       # Configuração Tailwind
├── components.json          # Configuração shadcn/ui
└── package.json             # Dependências e scripts
```

### 📡 Endpoints da API

| Método | Endpoint                     | Descrição                                         |
| ------ | ---------------------------- | ------------------------------------------------- |
| GET    | `/api/alunos/`               | Lista todos os estudantes                         |
| POST   | `/api/alunos/`               | Cadastra novo estudante (com predição automática) |
| GET    | `/api/alunos/{id}/`          | Detalhes de um estudante específico               |
| GET    | `/api/turmas/`               | Lista todas as turmas com estatísticas            |
| POST   | `/api/turmas/`               | Cadastra nova turma                               |
| GET    | `/api/turmas/{id}/alunos/`   | Lista estudantes de uma turma                     |
| GET    | `/api/turmas/{id}/detalhes/` | Estatísticas detalhadas da turma                  |

### 🔐 Django Admin

Acesse o painel administrativo em: `http://127.0.0.1:8000/admin/`

**Funcionalidades:**

- Gerenciamento de estudantes
- Gerenciamento de turmas
- Visualização de dados cadastrados

### 🤖 Funcionalidades de Machine Learning

O sistema automaticamente:

- Prediz a performance do estudante quando cadastrado
- Utiliza algoritmos de ML treinados com dados históricos
- Salva o resultado da predição (Pass/Fail) no banco de dados

### 🛠️ Tecnologias Utilizadas

- **Django 4.2.11**: Framework web
- **Django REST Framework**: API REST
- **SQLite**: Banco de dados (desenvolvimento)
- **PostgreSQL**: Banco de dados (produção)
- **Scikit-learn**: Machine Learning
- **NumPy**: Computação científica

### 📁 Estrutura do Projeto Backend

```
student-performance-backend/
├── manage.py                 # Script de gerenciamento Django
├── requirements.txt          # Dependências do projeto
├── db.sqlite3               # Banco de dados SQLite
├── setup/                   # Configurações do Django
│   ├── settings.py          # Configurações principais
│   ├── urls.py              # URLs principais
│   └── deployment.py        # Configurações de produção
└── performance/             # App principal
    ├── models.py            # Modelos do banco de dados
    ├── views.py             # Views da API
    ├── serializers.py       # Serializers do DRF
    ├── urls.py              # URLs da API
    ├── admin.py             # Configuração do Django Admin
    ├── prediction_service.py # Serviço de predição ML
    └── model/               # Modelo treinado
        └── model.pkl        # Arquivo do modelo
```

### 🚨 Solução de Problemas Comuns

#### Backend

**Erro: "no such table: performance_student"**

```bash
python manage.py makemigrations performance
python manage.py migrate
```

**Erro: "Django não instalado"**

```bash
# Certifique-se que o ambiente virtual está ativado
source venv/bin/activate  # macOS/Linux
pip install -r requirements.txt
```

**Erro: "Port already in use"**

```bash
# Use uma porta diferente
python manage.py runserver 8001
```

#### Frontend

**Erro: "classRooms.map is not a function"**

- Verifique se o arquivo `.env` foi criado com as URLs corretas da API
- Certifique-se que o backend está rodando na porta correta (8001)
- Verifique se há dados no banco de dados

**Erro: "CORS policy"**

- Certifique-se que o backend está configurado para aceitar requisições do frontend
- Verifique as configurações de CORS no `settings.py` do Django

**Erro: "Module not found"**

```bash
# Instale as dependências
npm install
# ou
yarn install
```

### 📄 Licença

Este projeto está licenciado sob a licença MIT.
