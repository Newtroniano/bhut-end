# Usa a imagem oficial do Node.js 16 como base
FROM node:16

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependências (package.json e package-lock.json)
COPY package*.json ./

# Instala as dependências
RUN npm install -g typescript

# Copia o restante do código para o container
COPY . .

# Compila o código TypeScript
RUN npm run build

# Expõe a porta 3000 (a porta que sua aplicação Node.js usa)
EXPOSE 3000
EXPOSE 9229

# Comando para rodar a aplicação
CMD ["node", "--inspect=0.0.0.0:9229", "dist/server.js"]