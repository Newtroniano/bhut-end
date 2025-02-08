# Usa a imagem oficial do Node.js 16 como base
FROM node:16

# Defina o diretório de trabalho
WORKDIR /app

# Instala o dockerize
RUN apt-get update && apt-get install -y wget && \
    wget https://github.com/jwilder/dockerize/releases/download/v0.6.1/dockerize-linux-amd64-v0.6.1.tar.gz && \
    tar -xzvf dockerize-linux-amd64-v0.6.1.tar.gz && \
    mv dockerize /usr/local/bin/

# Copie o package.json e o package-lock.json para dentro do contêiner
COPY package.json package-lock.json /app/


# Instala as dependências
RUN npm install -g typescript


# Copie todos os arquivos do projeto para dentro do contêiner
COPY . /app

# Compile o código TypeScript para JavaScript
RUN npm run build  # Isso usa o comando 'tsc' para compilar o código

# Rode o servidor a partir da pasta 'dist'
CMD ["node", "dist/server.js"]