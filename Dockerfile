# Usa a imagem oficial do Node.js 16 como base
FROM node:16

# Defina o diretório de trabalho
WORKDIR /app

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