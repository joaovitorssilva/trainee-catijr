# Spotify Clone App

Projeto em desenvolvimento

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

| Ferramenta | Versão | Motivo |
|---|---|---|
| **Node.js** | 20+ | Runtime do frontend |
| **pnpm** | — | Gerenciador de pacotes do frontend |
| **Java** | 25 | Runtime do backend (Spring Boot) |
| **Docker** | — | Para rodar o banco PostgreSQL |

> O Maven **não** precisa ser instalado globalmente — o projeto usa o **Maven Wrapper** (`mvnw`), que baixa a versão correta automaticamente.

## Getting Started

1. Clone esse repositório:
```bash
  git clone https://github.com/joaovitorssilva/trainee-catijr
```

2. Inicie o banco de dados postgresql e o backend em spring boot:
```bash
  docker-compose up -d && ./mvnw spring-boot:run  
```

3. Inicie o frontend:
```bash
  pnpm dev
```

## Contribuindo
1. Crie um fork do repositório
2. Crie uma branch de funcionalidade (`git checkout -b feature/nova-funcionalidade`)
3. Comite suas alterações (`git commit -m 'Adicionar nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

