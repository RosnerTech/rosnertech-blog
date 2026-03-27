---
title: "Instalando a Evolution API v2 com Docker Compose"
description: "Aprenda a instalar a Evolution API v2 com Docker Compose, utilizando PostgreSQL, Redis e volumes nomeados, seguindo o padrão da série VPS Production Blueprint."
pubDate: 2026-03-27
updatedDate: 2026-03-27
tags: ["Docker", "Evolution API", "WhatsApp", "N8N"]
draft: false
---

## Instalando a Evolution API v2 com Docker Compose

## Introdução

A **Evolution API** é uma solução open source que permite integrar aplicações com o **WhatsApp** por meio de uma API REST. Com ela, você pode enviar e receber mensagens, gerenciar instâncias de conexão e integrar com ferramentas de automação como o **n8n**.

Neste artigo, você vai aprender a instalar a Evolution API v2 utilizando **Docker Compose**, com banco de dados **PostgreSQL**, cache **Redis** e **volumes nomeados**, seguindo o padrão da série **VPS Production Blueprint**.

## Pré-requisitos

Antes de começar, você precisará ter:

1. [Docker instalado](https://blog.rosnertech.com.br/arquivos/756)
2. Docker Compose v2 ou superior
3. A rede Docker `rt-network` criada

Caso a rede ainda não exista, crie-a com:

```bash
docker network create rt-network
```

## Estrutura do projeto

A stack é composta por três serviços:

1. `rt-evolution` — a Evolution API v2
2. `rt-db-evolution` — banco de dados PostgreSQL
3. `rt-redis-evolution` — cache Redis

Crie um diretório para o projeto e, dentro dele, os arquivos `docker-compose.yml` e `.env`:

```bash
mkdir -p ~/vps/evolution-api
cd ~/vps/evolution-api
```

## O arquivo `.env`

O arquivo `.env` armazena as credenciais e variáveis sensíveis da stack. Crie-o com o seguinte conteúdo:

```bash
# PostgreSQL
POSTGRES_DB=evolution
POSTGRES_USER=evolution
POSTGRES_PASSWORD=troque_por_uma_senha_forte

# Evolution API
EVOLUTION_API_KEY=troque_por_uma_chave_segura
SERVER_URL=https://evolution.seudominio.com.br
```

⚠️ **Importante**: nunca suba o arquivo `.env` para repositórios públicos. Adicione-o ao `.gitignore`.

## O `docker-compose.yml`

```yaml
services:
  rt-evolution:
    image: atendai/evolution-api:latest
    container_name: rt-evolution
    restart: unless-stopped
    environment:
      TZ: America/Sao_Paulo
      SERVER_URL: ${SERVER_URL}
      AUTHENTICATION_API_KEY: ${EVOLUTION_API_KEY}
      DATABASE_ENABLED: "true"
      DATABASE_PROVIDER: postgresql
      DATABASE_CONNECTION_URI: postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@rt-db-evolution:5432/${POSTGRES_DB}?schema=public
      CACHE_REDIS_ENABLED: "true"
      CACHE_REDIS_URI: redis://rt-redis-evolution:6379/6
      CACHE_REDIS_PREFIX_KEY: evolution
      CACHE_REDIS_SAVE_INSTANCES: "false"
      LANGUAGE: pt-BR
    volumes:
      - rt-vol-evolution-instances:/evolution/instances
    depends_on:
      - rt-db-evolution
      - rt-redis-evolution
    ports:
      - "8080:8080"
    networks:
      - rt-network

  rt-db-evolution:
    image: postgres:15-alpine
    container_name: rt-db-evolution
    restart: unless-stopped
    environment:
      TZ: America/Sao_Paulo
      POSTGRES_DB: ${POSTGRES_DB}
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    volumes:
      - rt-vol-evolution-postgres:/var/lib/postgresql/data
    networks:
      - rt-network

  rt-redis-evolution:
    image: redis:7-alpine
    container_name: rt-redis-evolution
    restart: unless-stopped
    command: redis-server --appendonly yes
    volumes:
      - rt-vol-evolution-redis:/data
    networks:
      - rt-network

volumes:
  rt-vol-evolution-instances:
  rt-vol-evolution-postgres:
  rt-vol-evolution-redis:

networks:
  rt-network:
    external: true
```

## Entendendo o compose

### Serviço `rt-evolution` — Evolution API

- **image**: imagem oficial da Evolution API v2
- **SERVER_URL**: URL pública onde a API estará acessível (via Nginx Proxy Manager)
- **AUTHENTICATION_API_KEY**: chave global de autenticação da API
- **DATABASE_CONNECTION_URI**: string de conexão com o PostgreSQL no formato padrão
- **CACHE_REDIS_URI**: conexão com o Redis usando o banco de índice 6
- **volumes**: persiste as instâncias WhatsApp conectadas em volume nomeado
- **ports**: expõe a porta 8080 para testes iniciais — após configurar o proxy reverso, esta entrada pode ser removida
- **depends_on**: garante que o banco e o Redis subam antes da API

### Serviço `rt-db-evolution` — PostgreSQL

Responsável por armazenar todos os dados da Evolution API: instâncias, mensagens, contatos e configurações. Utiliza a imagem `postgres:15-alpine` para menor consumo de recursos.

### Serviço `rt-redis-evolution` — Redis

Utilizado como camada de cache da API. O modo `appendonly yes` garante persistência dos dados mesmo após reinicializações.

### Volumes nomeados

Todos os dados são persistidos em volumes gerenciados pelo Docker:

| Volume | Conteúdo |
|---|---|
| `rt-vol-evolution-instances` | Instâncias WhatsApp conectadas |
| `rt-vol-evolution-postgres` | Dados do banco PostgreSQL |
| `rt-vol-evolution-redis` | Cache Redis |

Você pode inspecionar os volumes com:

```bash
docker volume ls | grep evolution
docker volume inspect rt-vol-evolution-instances
```

## Inicializando a stack

Com os arquivos `docker-compose.yml` e `.env` prontos, execute:

```bash
docker compose up -d
```

Para verificar se os containers estão rodando:

```bash
docker compose ps
```

Todos os serviços devem estar com status **running**. Para acompanhar os logs da Evolution API:

```bash
docker compose logs -f rt-evolution
```

## Acessando a Evolution API

Após a inicialização, a API estará disponível em:

```
http://<IP_DO_SERVIDOR>:8080
```

A Evolution API v2 disponibiliza uma interface visual para gerenciar instâncias, acessível em:

```
http://<IP_DO_SERVIDOR>:8080/manager
```

E a documentação interativa (Swagger) em:

```
http://<IP_DO_SERVIDOR>:8080/docs
```

Para autenticar as requisições, utilize o cabeçalho:

```
apikey: <valor definido em EVOLUTION_API_KEY>
```

## Considerações finais

Com esta configuração, você tem a Evolution API v2 rodando com:

1. Persistência confiável via volumes nomeados
2. Banco de dados PostgreSQL dedicado
3. Cache Redis para melhor performance
4. Integração com a rede `rt-network`, pronta para ser exposta via Nginx Proxy Manager

O próximo passo da série é configurar o **Nginx Proxy Manager** para expor a Evolution API com HTTPS, e depois integrar com o **n8n** para automação de mensagens WhatsApp.

Agradeço por ler esse artigo e espero vê-lo novamente em breve. Continue nos acompanhando para mais conteúdo relevante e inspirador. Até a próxima!
