# Bhut Backend - API de Gerenciamento de Carros

Esta é uma aplicação backend desenvolvida em **Node.js** com **TypeScript** que gerencia carros, integra-se a uma API externa, utiliza **RabbitMQ** para mensageria e **MongoDB** para armazenamento de logs.

## Requisitos

- **Node.js** (v16 ou superior) (apenas para rodar localmente sem Docker)
- **Docker** (para rodar com containers)
- **Docker Compose** (para rodar com containers)
- **MongoDB** (opcional, se rodar localmente sem Docker)
- **RabbitMQ** (opcional, se rodar localmente sem Docker)

## Como Rodar a Aplicação

Você pode rodar a aplicação de duas maneiras:
1. **Usando Docker** (recomendado, não é necessário instalar dependências manualmente).
2. **Localmente**, instalando as dependências manualmente.

### 1. Usando Docker (Recomendado)

Não é necessário instalar dependências manualmente. Basta instalar o **Docker** e o **Docker Compose**.

#### Passo 1: Clone o Repositório

```bash
git clone https://github.com/Newtroniano/bhut-end.git
cd bhut-backend
```

#### Passo 2:defina as variáveis no arquivo  `.yml`

**Existe um arquivo `.env` pronto no projeto para uso. Você pode alterá-lo ou criar um novo.**  
**Caro, se quiser usar o `.env` do projeto, basta pular a etapa de configuração de variáveis.**  
**Se quiser manter os endereços do MongoDB e RABBITMQ URL  como locais, basta pular essa etapa.**


Se for usar Docker Compose, defina as variáveis de ambiente no arquivo docker-compose.yml apenas para os endereços do RABBITMQ_URL e MONGO_URI, pois, dentro do Docker, o endereço desses serviços será diferente. Por padrão, o Docker configura esses servidores com nomes específicos de serviço. As demais variáveis podem ser lidas diretamente do arquivo .env

```
environment:
  - RABBITMQ_URL=amqp://rabbitmq:5672 #---- seu servidor RABBITMQ ou mantenha setado o hostname padrão
  - MONGO_URI=mongodb://mongo:27017/bhut #---- seu servidor MONGO DB ou mantenha setado o hostname padrão
```

#### Passo 3: Suba os Containers

Use o Docker Compose para subir todos os serviços (**Node.js**, **MongoDB** e **RabbitMQ**):
No terminal na raiz do projeto digite o comando 
```bash
docker-compose up --build
```
Certifique-se de que o arquivo .env foi criado, o Docker está instalado e as variáveis estão definidas. Caso contrário, o comando resultará em erro. Exemplo .env:
```
PORT=3000
MONGO_URI=mongodb://localhost:27017
RABBITMQ_URL=amqp://localhost:5672
USUARIO=luis.fidelis
SENHA=0c314c07-97a3-46d9-978d-244c99ad1e33
WEBHOOK=https://webhook.site/227c778a-b6a7-454e-94f0-48acf5745574
BASEURL=http://api-test.bhut.com.br:3000/api/v1/
```

#### Passo 4: Acesse a Aplicação

- A aplicação estará rodando em: [http://localhost:3000](http://localhost:3000).
- O RabbitMQ Management estará disponível em: [http://localhost:15672](http://localhost:15672) (usuário: `guest`, senha: `guest`).
- O MongoDB estará disponível em: `mongodb://localhost:27017/bhut`.

### 2. Rodando Localmente (Sem Docker)

#### Passo 1: Clone o Repositório

```bash
git clone https://github.com/Newtroniano/bhut-end.git
cd bhut-backend
```

#### Passo 2: Instale as Dependências

```bash
npm install
```

#### Passo 3: Configure o Ambiente

**Existe um arquivo `.env` pronto no projeto para uso. Você pode alterá-lo ou criar um novo.**  
**Caro, se quiser usar o `.env` do projeto, basta pular a etapa de configuração de variáveis.**


Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```
PORT=3000
MONGO_URI=mongodb://localhost:27017
RABBITMQ_URL=amqp://localhost:5672
USUARIO=luis.fidelis
SENHA=0c314c07-97a3-46d9-978d-244c99ad1e33
WEBHOOK=https://webhook.site/227c778a-b6a7-454e-94f0-48acf5745574
BASEURL=http://api-test.bhut.com.br:3000/api/v1/
```

#### Passo 4: Inicie o MongoDB e o RabbitMQ

- **MongoDB**: Certifique-se de que o MongoDB está rodando localmente. Se não tiver instalado, siga as instruções [aqui](https://www.mongodb.com/docs/manual/installation/).
- **RabbitMQ**: Certifique-se de que o RabbitMQ está rodando localmente. Se não tiver instalado, siga as instruções [aqui](https://www.rabbitmq.com/download.html).

#### Passo 5: Compile e Rode a Aplicação

```bash
npm run build
npm start ou npx ts-node src/server.ts 
```

A aplicação estará rodando em: [http://localhost:3000](http://localhost:3000).

## Endpoints da API

### 1. **GET /api/car**
**Descrição**: Retorna a lista de carros da API externa.

**Exemplo de Requisição:**
```bash
curl -X GET http://localhost:3000/api/car
```

### 2. **POST /api/car**
**Descrição**: Cria um novo carro na API externa e envia os dados para a fila.

**Exemplo de Requisição:**
```bash
curl -X POST http://localhost:3000/api/car   -H "Content-Type: application/json"   -d '{
    "marca": "Fiat",
    "modelo": "Uno",
    "ano": 2020,
    "cor": "Vermelho"
  }'
```

### 3. **GET /api/logs**
**Descrição**: Retorna todos os logs salvos no MongoDB.

**Exemplo de Requisição:**
```bash
curl -X GET http://localhost:3000/api/logs
```

## Estrutura do Docker Compose

O arquivo `docker-compose.yml` define três serviços:

- **app**: Aplicação Node.js.
- **rabbitmq**: Serviço RabbitMQ para mensageria.
- **mongo**: Banco de dados MongoDB para armazenar logs.

## Como Funciona?

### **POST /api/car:**

1. Cria um carro na API externa.
2. Envia os dados do carro (ID e data de criação) para uma fila no RabbitMQ.
3. O **Consumer**:
   - Consome as mensagens da fila.
   - Envia um webhook avisando que um novo carro foi cadastrado.
   - Salva um log no MongoDB com os dados do carro.

### **GET /api/logs:**

- Retorna todos os logs salvos no MongoDB.

## Debugando a Aplicação

### **Com Docker**

- Certifique-se de que o `Dockerfile` está configurado para expor a porta de depuração (`9229`).
- Use o **VSCode** para anexar ao processo de depuração no container.

### **Localmente**

- Rode a aplicação em modo de desenvolvimento:

```bash
npm run dev
```

- Use o **VSCode** ou **Chrome DevTools** para depurar.

## Conclusão

Este projeto foi estruturado para facilitar o gerenciamento de carros com uma arquitetura moderna utilizando Node.js, TypeScript, Docker, RabbitMQ e MongoDB. Caso tenha dúvidas, consulte a documentação ou entre em contato!

Bom desenvolvimento!
