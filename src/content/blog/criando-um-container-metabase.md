---
title: "Criando um Container Metabase"
description: "O Metabase é uma plataforma open-source de Business Intelligence (BI) que permite que você crie painéis de controle interativos e relatórios,"
pubDate: 2024-10-31
updatedDate: 2024-10-31
tags: ["Docker", "Linux", "Metabase", "Docker-Compose"]
wpId: 1674
draft: false
---

## Como Criar um Container Metabase Usando Docker

O Metabase é uma ferramenta de BI (Business Intelligence) open-source que facilita a criação de dashboards e consultas a partir de seus dados, permitindo que você visualize e compartilhe informações de forma prática e acessível. Ele pode ser integrado a diversos bancos de dados, como PostgreSQL, MySQL, e outros, oferecendo uma interface intuitiva para usuários técnicos e não-técnicos.

## Requisitos:

Docker instalado no seu sistema. Se você ainda não instalou, siga o [tutorial de instalação do Docker](https://blog.rosnertech.com.br/arquivos/756) que preparamos anteriormente.  
Docker Compose (opcional para facilitar o gerenciamento dos containers).

## Agora vamos ao tutorial para rodar o Metabase em containers Docker.

Criando o Container do Banco de Dados Postgres

O Metabase precisa de um banco de dados para armazenar suas informações. Aqui vamos usar o **PostgreSQL** como banco de dados. Para rodá-lo, use o comando abaixo:

```bash
docker run -d --name rosnertech_postgres 
  -e POSTGRES_USER=metabase 
  -e POSTGRES_PASSWORD=metabase_password 
  -e POSTGRES_DB=metabase 
  -v /var/docker/postgres-data:/var/lib/postgresql/data 
  postgres:13
```

## Explicação dos parâmetros:

-   **POSTGRES\_USER**: Nome do usuário do banco de dados.
-   **POSTGRES\_PASSWORD**: Senha do usuário.
-   **POSTGRES\_DB**: Nome do banco de dados.
-   **\-v**: Define o volume de persistência dos dados.

## Criando o Container do Metabase

Agora, crie o container do Metabase e faça a conexão com o banco de dados que configuramos no passo anterior.

```bash
docker run -d --name rosnertech_metabase 
  -e MB_DB_TYPE=postgres 
  -e MB_DB_DBNAME=metabase 
  -e MB_DB_PORT=5432 
  -e MB_DB_USER=metabase 
  -e MB_DB_PASS=metabase_password 
  -p 3000:3000 
  -v /var/docker/metabase-data:/metabase-data 
  metabase/metabase
```

## Explicação dos parâmetros:

-   **MB\_DB\_TYPE**: Tipo de banco de dados, que neste caso é `postgres`.
-   **MB\_DB\_DBNAME**: Nome do banco de dados.
-   **MB\_DB\_PORT**: Porta do banco de dados.
-   **MB\_DB\_USER**: Usuário do banco de dados.
-   **MB\_DB\_PASS**: Senha do banco de dados.
-   **MB\_DB\_HOST**: Nome do host do banco de dados, que é o nome do container `rosnertech_postgres`.
-   **\-v**: Volume para persistir os dados do Metabase.

## Usando Docker Compose para Configurar o Metabase

Se você preferir utilizar o Docker Compose para gerenciar os containers, siga os passos abaixo.  
Crie um arquivo `docker-compose.yml` no diretório desejado com o seguinte conteúdo:

```bash
services:
  postgres:
    image: postgres:13
    container_name: rosnertech_postgres
    restart: always
    environment:
      POSTGRES_USER: metabase
      POSTGRES_PASSWORD: metabase_password
      POSTGRES_DB: metabase
    volumes:
      - /var/docker/postgres-data:/var/lib/postgresql/data
  metabase:
    image: metabase/metabase
    container_name: rosnertech_metabase
    restart: always
    environment:
      MB_DB_TYPE: postgres
      MB_DB_DBNAME: metabase
      MB_DB_PORT: 5432
      MB_DB_USER: metabase
      MB_DB_PASS: metabase_password
      MB_DB_HOST: rosnertech_postgres
    ports:
      - "3000:3000"
    volumes:
      - /var/docker/metabase-data:/metabase-data
```

## Explicação do arquivo `docker-compose.yml`:

-   **services**: Define os serviços que você vai rodar, neste caso o Metabase.
-   **image**: A imagem oficial do Metabase no Docker Hub.
-   **restart**: Garante que o container reinicie automaticamente se houver falhas.
-   **container\_name**: Nome do container, neste caso `rosnertech_metabase`.
-   **environment**: As variáveis de ambiente necessárias para o Metabase conectar-se a um banco de dados Postgres.
    -   **MB\_DB\_TYPE**: Define o tipo de banco de dados, aqui usamos Postgres.
    -   **MB\_DB\_DBNAME**: Nome do banco de dados.
    -   **MB\_DB\_PORT**: Porta que o banco de dados usará (5432 é a porta padrão do Postgres).
    -   **MB\_DB\_USER**: Usuário do banco de dados Postgres.
    -   **MB\_DB\_PASS**: Senha do banco de dados.
    -   **POSTGRES\_USER**: Nome do usuário do banco de dados.
    -   **POSTGRES\_PASSWORD**: Senha do usuário.
    -   **POSTGRES\_DB**: Nome do banco de dados.
-   **ports**: Mapeia a porta **3000** do container para a mesma porta no host, permitindo que você acesse o Metabase via `http://localhost:3000`.
-   **volumes**: Define um volume para persistir os dados do Metabase. O diretório `/var/docker/metabase-data` será utilizado para armazenar os dados localmente.

## Executando o Docker Compose

Com o arquivo `docker-compose.yml` configurado, você pode iniciar o container do Metabase. Para isso, execute o seguinte comando no terminal:

```bash
docker-compose up -d
```

Este comando vai criar e iniciar o container do Metabase em **background** (modo **detached**), permitindo que ele continue rodando sem ocupar o terminal.  
  
## Verificando o Status do Container

Para verificar se o container foi iniciado corretamente, você pode rodar o seguinte comando:

```bash
docker ps
```

Esse comando vai listar todos os containers em execução. Verifique se o container `rosnertech_metabase` está na lista.

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/10/metabase.png)

## Acessando o Metabase

Depois que o container estiver rodando, você poderá acessar a interface web do Metabase. No seu navegador, acesse:

## http://localhost:3000

Agora, vamos configurar o Metabase para começar a criar dashboards e consultar os dados!

## Clique em "Let's Get Started"  
## Na primeira tela, você será recebido por um botão para iniciar a configuração. Clique em **"Let's Get Started"**.

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/10/metabase_02.png)

## Selecione o Idioma  
## Escolha o idioma de sua preferência e clique em **Próximo**.

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/10/metabase_03.png)

## Preencha seus dados de acesso  
## Informe seu nome, e-mail e senha. Esses serão os dados que você usará para acessar o Metabase.

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/10/metabase_04.png)

## Adicionar um banco de dados  
## Neste momento, você pode adicionar o banco de dados que irá usar para alimentar o Metabase. No nosso caso, vamos configurar isso mais tarde, então você pode pular essa etapa se preferir.

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/10/metabase_06.png)

## Configurações adicionais  
## Com todas as configurações prontas, você verá a opção de receber novidades do Metabase. Como estamos configurando um ambiente de teste, sinta-se à vontade para não selecionar essa opção e clique em **Leve-me para o Metabase**.

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/10/metabasei_07.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2024/10/metabase_08.png)

## Ambiente Pronto!  
## Agora, seu ambiente do Metabase está pronto para uso. Você pode começar a explorar as funcionalidades e integrar com seu banco de dados.

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/10/metabase_09.png)

## Conclusão:

Parabéns! Você configurou o Metabase com sucesso utilizando Docker e Docker Compose. Agora, você tem um ambiente BI funcional que pode ser integrado a seus bancos de dados e usado para criar dashboards interativos e consultas poderosas. Na próxima parte do tutorial, exploraremos as funcionalidades de consulta e visualização de dados no Metabase

## Agradeço por ler esse artigo e espero vê-lo novamente em breve. Continue nos acompanhando para mais conteúdo relevante e inspirador. Até a próxima!
