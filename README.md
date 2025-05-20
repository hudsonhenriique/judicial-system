# ⚖️ Sistema de Cadastro de Processos Judiciais

Este projeto tem como objetivo implementar um sistema completo de cadastro, edição e visualização de **processos judiciais** e seus **andamentos**, utilizando tecnologias modernas no frontend e backend. O foco está em aprender e aplicar conceitos de desenvolvimento fullstack com integração via API REST, banco de dados relacional e Docker.

---

## 🚀 Tecnologias Utilizadas

- **React + Vite** → Framework moderno para criação de interfaces  
- **TailwindCSS** → Estilização moderna e responsiva  
- **Node.js + Express** → Backend leve e escalável  
- **PostgreSQL** → Banco de dados relacional robusto  
- **Docker + Docker Compose** → Containerização e orquestração  
- **React Toastify** → Notificações de sucesso e erro  
- **dotenv** → Gerenciamento de variáveis de ambiente  

---

## 📦 Como Executar o Projeto com Docker

1. **Clone o repositório**:
git clone https://github.com/seu-usuario/judicial-system.git

2. **Acesse a pasta do projeto**:
cd judicial-system

3. **Suba os containers com Docker Compose**:
docker compose up --build

4. **Acesse no navegador:**

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend (API): [http://localhost:3001](http://localhost:3001)

🗂️ O banco de dados será automaticamente populado com dados de exemplo usando os arquivos `create_tables.sql` e `seeder.sql` presentes na raiz do projeto.

---

## 🖼️ Prints do Sistema

### Página Inicial
![Página Inicial](images/pagina-incial.PNG)

### Formulário de Cadastro de Processo
![Formulário de Cadastro de Processo](images/formulario-cadastro.PNG)

### Formulário de Cadastro de Andamento
![Formulário de Cadastro de Andamento](images/formulario-andamentos.PNG)

---

## 🛠️ Funcionalidades Implementadas

- ✅ Cadastro de novos processos judiciais
- ✅ Edição de processos existentes
- ✅ Cadastro de andamentos por processo
- ✅ Edição e exclusão de andamentos
- ✅ Exibição de mensagens de sucesso (via Toast)
- ✅ Responsividade e usabilidade

---

## 📈 Melhorias Futuras

- [ ] Autenticação de usuários (login)
- [ ] Paginação e busca de processos
- [ ] Upload de documentos do processo

---

## 📁 Estrutura do Projeto

```
judicial-system/
├── backend/
│ ├── src/
│ ├── .env
│ ├── Dockerfile
├── frontend/
│ ├── src/
│ ├── .env
│ ├── Dockerfile
├── create_tables.sql
├── seeder.sql
├── docker-compose.yml

```
---

## 🤝 Contribuindo

Contribuições são bem-vindas!
1. Faça um fork do projeto
2. Crie uma branch: `git checkout -b minha-feature`
3. Commit suas alterações: `git commit -m 'feat: minha nova feature'`
4. Push para o repositório remoto: `git push origin minha-feature`
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
