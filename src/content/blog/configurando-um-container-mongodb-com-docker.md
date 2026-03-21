---
title: "Configurando um Container MongoDB com Docker"
description: "MongoDB é um banco de dados NoSQL amplamente utilizado por sua flexibilidade e escalabilidade. Diferente dos bancos de dados relacionais tradicionais, como MySQL, que armazenam dados em tabelas, o Mon"
pubDate: 2024-10-14
updatedDate: 2024-10-14
tags: ["Debian", "Linux", "Docker", "Docker-Compose", "MongoDB"]
wpId: 1633
draft: false
---

## Configurando um Container MongoDB com Docker

MongoDB é um banco de dados NoSQL amplamente utilizado por sua flexibilidade e escalabilidade. Diferente dos bancos de dados relacionais tradicionais, como MySQL, que armazenam dados em tabelas, o MongoDB utiliza um modelo orientado a documentos, similar ao formato JSON. Esses documentos são armazenados em estruturas chamadas de **coleções**, que funcionam de maneira similar às tabelas nos bancos de dados relacionais.

## O Que é um Banco de Dados NoSQL?

Bancos de dados NoSQL (Not Only SQL) são projetados para armazenar e consultar grandes volumes de dados de forma flexível. Diferente dos bancos de dados relacionais que utilizam tabelas e esquemas rígidos, bancos NoSQL, como o MongoDB, trabalham com documentos, grafos, colunas ou chaves-valor, permitindo maior adaptabilidade para diferentes tipos de dados e escalabilidade horizontal.

## Para Que Serve o MongoDB?

O MongoDB é projetado para lidar com grandes volumes de dados, oferecendo alta escalabilidade e desempenho. Ele é útil em diversos cenários, como:

## Aplicações web e móveis**: Ideal para armazenar dados não estruturados em aplicações que precisam evoluir rapidamente e que têm esquemas de dados variáveis.  
## Big data**: Permite a distribuição de dados em vários servidores e oferece ferramentas para consultas complexas e análises.  
## Internet das Coisas (IoT)**: Adequado para a ingestão e análise em tempo real de dados gerados por dispositivos IoT.  
## Catálogo de produtos e conteúdo**: Facilita a indexação e consulta de informações para exibição e pesquisa rápida de produtos ou conteúdos.  
## Análise de dados**: Suporta consultas avançadas e operações de agrupamento, filtragem e projeção em grandes conjuntos de dados.

## Vantagens do MongoDB

Flexibilidade de esquema**: Como banco de dados NoSQL, o MongoDB não requer um esquema fixo, permitindo armazenar dados de maneira flexível e evolutiva.  
## Alta escalabilidade**: Capacidade de distribuir dados horizontalmente em vários servidores, suportando cargas de trabalho intensivas.  
## Desempenho**: Rápido para a maioria das operações, com acesso otimizado e indexação eficiente.  
## Replicação**: Oferece replicação embutida para alta disponibilidade e recuperação em caso de falhas.  
## Comunidade e ecossistema**: Grande comunidade ativa e um ecossistema rico em ferramentas, documentação e integrações.

## Desvantagens do MongoDB

Suporte transacional limitado**: Mesmo com suporte a transações multi-documento, ainda há limitações que podem ser problemáticas para aplicações que exigem consistência rigorosa de dados.  
## Consumo de recursos**: O MongoDB pode ser mais exigente em termos de hardware e armazenamento, especialmente em arquiteturas distribuídas.  
## Complexidade de configuração**: Configurar dimensionamento horizontal, balanceamento e replicação pode ser desafiador e requer conhecimento especializado.  
## Lentidão em consultas complexas**: Algumas consultas podem ser lentas se o banco não estiver corretamente indexado.  
## Curva de aprendizado**: Para desenvolvedores acostumados com bancos de dados relacionais, a transição para o MongoDB pode exigir algum tempo e aprendizado.

## Pré-requisitos

Docker instalado em seu sistema. Caso não tenha, siga [o tutorial de instalação do Docker](https://blog.rosnertech.com.br/arquivos/756) antes de prosseguir.

## Baixando a Imagem do MongoDB

No Docker, você pode baixar imagens de aplicativos prontos para rodar em contêineres. No caso do MongoDB, existe uma imagem oficial disponível no Docker Hub. Vamos baixar essa imagem:

```bash
docker pull mongo
```

Esse comando baixa a última versão estável do MongoDB.

 **Executando o MongoDB com Docker Run

Agora que você baixou a imagem, vamos criar um contêiner para executar o MongoDB:

```bash
docker run -d -p 27017:27017 --name mongodb-container -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=senha123 mongo
```

## Explicação do comando:

`-d`: Executa o contêiner em segundo plano (modo "desanexado").  
`-p 27017:27017`: Mapeia a porta 27017 do contêiner para a mesma porta no sistema host, permitindo que você acesse o MongoDB localmente.  
`--name mongodb-container`: Nomeia o contêiner como `mongodb-container`.  
`-e MONGO_INITDB_ROOT_USERNAME=admin`: Define o nome de usuário root para o MongoDB.  
`-e MONGO_INITDB_ROOT_PASSWORD=senha123`: Define a senha para o usuário root.  
`mongo`: Indica a imagem do MongoDB baixada anteriormente.

## Verificando se o Contêiner está Rodando

Para garantir que o MongoDB está rodando corretamente, execute:

```bash
docker ps
```

Se tudo estiver correto, você verá o contêiner `mongodb-container` listado, junto com a porta `27017`.

## Utilizando Docker Compose para Configurar o MongoDB

Crie um arquivo chamado `docker-compose.yml` e adicione o seguinte conteúdo:

```bash
version: '3.8'
services:
  mongodb:
    image: mongo
    container_name: mongodb-compose
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: senha123
    volumes:
      - mongo_data:/data/db
volumes:
  mongo_data:
```

Em seguida, execute:

```bash
docker-compose up -d
```

Isso cria e inicia o contêiner com as configurações especificadas.

## Acessando o MongoDB

Com o MongoDB em execução, você pode acessá-lo com:

```bash
docker exec -it mongodb-container mongosh -u admin -p senha123
```

## Listando Bancos de Dados e Coleções

Listar Bancos de Dados**: No terminal do MongoDB, digite o seguinte comando para listar todos os bancos de dados:

```bash
show dbs
```

Isso mostrará todos os bancos de dados disponíveis no servidor MongoDB.  
##   
Selecionar e Listar Coleções em um Banco de Dados**: Para selecionar um banco de dados e listar suas coleções (equivalente às tabelas), use:

```bash
use nomeDoBancoDeDados
show collections
```

O comando `use nomeDoBancoDeDados` seleciona o banco de dados.  
O comando `show collections` exibe todas as coleções presentes nesse banco de dados.

## Conclusão:

Parabéns! Agora você sabe como instalar e configurar o MongoDB usando Docker, tanto com o comando `docker run` quanto com Docker Compose. Você também aprendeu a acessar e listar os bancos de dados e coleções no MongoDB.

## Agradeço por ler esse artigo e espero vê-lo novamente em breve. Continue nos acompanhando para mais conteúdo relevante e inspirador. Até a próxima!
