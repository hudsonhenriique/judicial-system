# Define a versão da imagem base do Node.js
FROM node:22

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de configuração do projeto para o container
COPY package*.json ./
COPY .env ./
COPY src ./src

# Comando para instalar as dependências do projeto
RUN npm install

# Determina a porta que o container irá expor
EXPOSE 3001

# Comando para iniciar o servidor
CMD ["npm", "run", "dev"]
