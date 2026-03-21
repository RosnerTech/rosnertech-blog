---
title: "Instalação do n8n com Docker Compose (PostgreSQL + Redis)"
description: "O n8n é uma poderosa ferramenta de automação de workflows, amplamente utilizada para integração entre sistemas, APIs e serviços. Sua flexibilidade permite desde automações simples até pipelines comple"
pubDate: 2026-02-03
updatedDate: 2026-02-03
tags: ["Docker", "Debian 13 Trixie", "PostgreSQL", "Redis", "N8N", "Debian 13"]
wpId: 2152
draft: false
---

## Instalação do n8n com Docker Compose (PostgreSQL + Redis)

## Introdução  
  

O n8n é uma poderosa ferramenta de automação de workflows, amplamente utilizada para integração entre sistemas, APIs e serviços. Sua flexibilidade permite desde automações simples até pipelines complexos em ambientes corporativos.  
  

Neste artigo será apresentado um **guia completo para instalação do n8n utilizando Docker Compose**, com banco de dados PostgreSQL, Redis para fila de execução e persistência de dados no host, seguindo **boas práticas de organização, escalabilidade e manutenção**.  
  

A stack utiliza uma rede Docker externa e variáveis de ambiente centralizadas em um arquivo `.env`, facilitando a reutilização do mesmo `docker-compose.yml` em diferentes ambientes.

## Pré-requisitos  
  

Antes de iniciar, é necessário garantir:

1.  1.  1.  [Docker instalado](https://blog.rosnertech.com.br/arquivos/756)
            
        2.  Docker Compose v2 ou superior
            
        3.  Servidor Linux (VM ou bare metal)
            
        4.  Rede Docker externa previamente criada
            

Caso a rede ainda não exista, crie com:

```bash
docker network create radagast_net
```

## Clonando o repositório  
  

O projeto está disponível no GitHub:

👉 [https://github.com/RosnerTech/legolas-n8n/tree/main](https://github.com/RosnerTech/legolas-n8n/tree/main)

Após clonar o repositório, será necessário **renomear o arquivo de variáveis de ambiente**, conforme o padrão do Docker Compose.

```bash
cp example.env .env
```

⚠️ O Docker Compose não utiliza automaticamente arquivos chamados `example.env`.  
O arquivo precisa se chamar exatamente `.env` para que as variáveis sejam carregadas.

## Estrutura do projeto  
  

A estrutura básica do projeto é composta por:

1.  1.  1.  `docker-compose.yml` → definição dos serviços
            
        2.  `.env` → variáveis de ambiente sensíveis
            
        3.  Diretórios no host para persistência de dados:
            
            1.  1.  n8n
                2.  PostgreSQL
                3.  Redis

Essa organização facilita backup, manutenção e migração do ambiente.

## Uso do arquivo `.env` no Docker Compose  
  

O arquivo `.env` é responsável por armazenar **valores sensíveis e reutilizáveis**, como credenciais de banco de dados.

Exemplo de `.env`:

```bash
# Banco de dados PostgreSQL
POSTGRES_DB=n8n
POSTGRES_USER=n8n
POSTGRES_PASSWORD=changeme
```

O `docker-compose.yml` apenas **referencia essas variáveis**, utilizando o formato `${VARIAVEL}`.  
Dessa forma, o mesmo compose pode ser utilizado em diferentes ambientes sem alteração direta no arquivo.

## Explicação do `docker-compose.yml`

A stack do n8n é composta por **três serviços principais**, todos conectados à mesma rede Docker externa.

```bash

services:
  legolas-n8n:
    image: docker.n8n.io/n8nio/n8n:latest
    container_name: legolas-n8n
    restart: unless-stopped
    environment:
      TZ: America/Sao_Paulo
      GENERIC_TIMEZONE: America/Sao_Paulo
      DB_TYPE: postgresdb
      DB_POSTGRESDB_HOST: legolas-db-n8n
      DB_POSTGRESDB_PORT: 5432
      DB_POSTGRESDB_DATABASE: ${POSTGRES_DB}
      DB_POSTGRESDB_USER: ${POSTGRES_USER}
      DB_POSTGRESDB_PASSWORD: ${POSTGRES_PASSWORD}
      DB_POSTGRESDB_SCHEMA: public
      QUEUE_MODE: redis
      QUEUE_REDIS_HOST: legolas-redis-n8n
      QUEUE_REDIS_PORT: 6379
      N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS: "true"
      N8N_RUNNERS_ENABLED: "true"
      N8N_HOST: legolas.rosnertech.com.br
      N8N_PROTOCOL: https
      WEBHOOK_URL: https://legolas.rosnertech.com.br/
    ports:
      - "5678:5678"
    volumes:
      - /opt/docker/legolas-n8n/n8n-data:/home/node/.n8n
    depends_on:
      - legolas-db-n8n
      - legolas-redis-n8n
    networks:
      - radagast_net
  legolas-db-n8n:
    image: postgres:15-alpine
    container_name: legolas-db-n8n
    restart: unless-stopped
    environment:
      TZ: America/Sao_Paulo
      POSTGRES_DB: ${POSTGRES_DB}
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    volumes:
      - /opt/docker/legolas-n8n/postgres-data:/var/lib/postgresql/data
    networks:
      - radagast_net
  legolas-redis-n8n:
    image: redis:7-alpine
    container_name: legolas-redis-n8n
    restart: unless-stopped
    command: redis-server --appendonly yes
    volumes:
      - /opt/docker/legolas-n8n/redis-data:/data
    networks:
      - radagast_net
networks:
  radagast_net:
    external: true
```

## Serviço `legolas-n8n` – n8n  
  

Este é o container principal da stack, responsável por:

1.  1.  1.  Executar os workflows
            
        2.  Disponibilizar a interface Web
            
        3.  Gerenciar webhooks
            
        4.  Coordenar execuções via fila (Redis)
            

Principais configurações:

1.  1.  1.  Banco de dados PostgreSQL como backend
            
        2.  Redis configurado para modo fila (`QUEUE_MODE=redis`)
            
        3.  Host, protocolo e URL de webhook definidos para acesso externo
            
        4.  Persistência de dados no diretório do host:
            

```bash
/opt/docker/legolas-n8n/n8n-data
```

## Esse diretório armazena:

1.  1.  1.  credenciais
            
        2.  workflows
            
        3.  configurações internas do n8n
            

## Serviço `legolas-db-n8n` – PostgreSQL  
  

Este serviço é responsável por armazenar:

1.  1.  1.  Workflows
            
        2.  Execuções
            
        3.  Estados internos do n8n
            

Características:

1.  1.  1.  Baseado na imagem `postgres:15-alpine`
            
        2.  Credenciais definidas via `.env`
            
        3.  Persistência em diretório do host:
            

```bash
/opt/docker/legolas-n8n/postgres-data
```

A persistência garante que os dados não sejam perdidos em reinícios ou recriação dos containers.

## Serviço `legolas-redis-n8n` – Redis  
  

O Redis é utilizado como **fila de execução**, permitindo maior escalabilidade e controle das automações.

Configurações importantes:

1.  1.  1.  Modo append-only habilitado
            
        2.  Persistência de dados no host:
            

```bash
/opt/docker/legolas-n8n/redis-data
```

Esse modelo é indicado para ambientes com maior volume de execuções.

## Persistência de dados: pasta do host vs volumes Docker  
  

Persistência em pasta do host (bind mount)

Neste projeto, a persistência é feita diretamente em diretórios do host.

## Vantagens:

1.  1.  1.  Facilidade de backup
            
        2.  Acesso direto aos dados
            
        3.  Simplicidade para ambientes LAB e VPS
            

## Desvantagens:

1.  1.  1.  Maior dependência da estrutura do host
            
        2.  Menor portabilidade entre servidores
            

## Persistência usando volumes Docker  
  

Alternativamente, poderia ser utilizado:

```bash
volumes:
  - n8n_data:/home/node/.n8n
```

## Vantagens:

1.  1.  1.  Maior abstração
            
        2.  Melhor portabilidade
            
        3.  Gerenciamento nativo pelo Docker
            

## Desvantagens:

1.  1.  1.  Backup menos intuitivo
            
        2.  Dados menos visíveis no host
            

## Qual abordagem escolher?  
  

1.  1.  1.  **LAB / VPS / Estudos:** pasta do host
            
        2.  **Produção / Clusters / Portabilidade:** volumes Docker
            

Ambas são válidas, desde que aplicadas corretamente.

## Inicialização do ambiente  
  

Com os arquivos `docker-compose.yml` e `.env` configurados, execute:

```bash
docker compose up -d
```

Para validar os containers:

```bash
docker compose ps
```

Todos os serviços devem estar com status **Up**.

## Acesso à interface Web do n8n  
  

Após a inicialização, o n8n estará disponível no endereço configurado:

```bash
http://IP_DO_SERVIDOR:5678
```

No primeiro acesso, o n8n solicitará a criação do usuário administrador.

## ⚠️ Importante:

1.  1.  1.  essa abordagem é indicada **apenas para LAB
            
        2.  não é recomendada para produção
            
        3.  não utiliza HTTPS por padrão
            

## Considerações finais

A utilização do Docker Compose para executar o n8n permite:

1.  1.  1.  Padronização do ambiente
            
        2.  Escalabilidade com Redis
            
        3.  Persistência confiável de dados
            
        4.  Facilidade de manutenção e backup
            

Essa abordagem é indicada tanto para ambientes de estudo quanto para ambientes produtivos bem estruturados.
