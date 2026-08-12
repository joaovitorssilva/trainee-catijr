<div align="center">
  
# Spotify Clone 
 
**Projeto feito como desafio técnico trainee da [CATI Jr.](https://catijr.com.br/)**
 
[![Java](https://img.shields.io/badge/Java-25-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](#)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)](#)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](#)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](#)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](#)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](#)
 
</div>

---
 
## Sobre o Projeto
 
Esse projeto é uma versão minimalista do Spotify  construída com um backend em **Spring Boot** e um frontend em **React + TypeScript**.
 
**🔗 Deploy online:** [cati-spotify-frontend.onrender.com](https://cati-spotify-frontend.onrender.com/)
 
> Hospedado no plano gratuito do [Render](https://render.com/) — o primeiro carregamento pode levar de 30 a 50s se o app estiver inativo.

---

https://github.com/user-attachments/assets/be84dd66-4b03-4106-acd1-c08853ea5d6c

---

## Pré-requisitos
 
Antes de começar, certifique-se de ter instalado:
 
| Ferramenta | Versão | Motivo |
|---|---|---|
| **Node.js** | 20+ | Runtime do frontend |
| **pnpm** | — | Gerenciador de pacotes do frontend |
| **Java** | 25 | Runtime do backend (Spring Boot) |
| **Docker** | — | Para rodar o banco PostgreSQL |
 
>  **Observação:** o Maven **não** precisa ser instalado globalmente — o projeto usa o **Maven Wrapper** (`mvnw`), que baixa a versão correta automaticamente.
 
---

##  Para rodar localmente:
 
### 1. Clone o repositório
 
```bash
git clone https://github.com/joaovitorssilva/trainee-catijr
cd trainee-catijr
```
 
### 2. Inicie o banco de dados PostgreSQL
 
```bash
cd backend && docker compose up -d
```
 
### 3. Inicie o backend (Spring Boot)
 
```bash
cd backend && ./mvnw spring-boot:run
```
 
### 4. Inicie o frontend
 
Em outro terminal:
 
```bash
cd frontend && pnpm install && pnpm dev
```
 
Seu app deverá estar rodando localmente — abra a URL exibida no terminal do frontend no navegador. 

---

## Contribuindo
1. Crie um fork do repositório
2. Crie uma branch de funcionalidade (`git checkout -b feature/nova-funcionalidade`)
3. Comite suas alterações (`git commit -m 'Adicionar nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

---
