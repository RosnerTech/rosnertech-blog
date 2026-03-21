---
title: "Comandos básicos do Docker"
description: "O Docker é uma ferramenta poderosa que permite criar e gerenciar containers de software. Os containers são unidades de software empacotadas que contêm tudo o que é necessário para executar uma aplicaç"
pubDate: 2024-01-18
updatedDate: 2024-01-18
tags: ["Python"]
wpId: 1231
draft: false
---

/\*! elementor - v3.18.0 - 20-12-2023 \*/ .elementor-heading-title{padding:0;margin:0;line-height:1}.elementor-widget-heading .elementor-heading-title\[class\*=elementor-size-\]>a{color:inherit;font-size:inherit;line-height:inherit}.elementor-widget-heading .elementor-heading-title.elementor-size-small{font-size:15px}.elementor-widget-heading .elementor-heading-title.elementor-size-medium{font-size:19px}.elementor-widget-heading .elementor-heading-title.elementor-size-large{font-size:29px}.elementor-widget-heading .elementor-heading-title.elementor-size-xl{font-size:39px}.elementor-widget-heading .elementor-heading-title.elementor-size-xxl{font-size:59px}

## Comandos básicos do Docker

O Docker é uma ferramenta poderosa que permite criar e gerenciar containers de software. Os containers são unidades de software empacotadas que contêm tudo o que é necessário para executar uma aplicação, incluindo o sistema operacional, os arquivos de configuração e os aplicativos.  
Para começar a usar o Docker, você precisa instalá-lo no seu computador. Você pode encontrar instruções de instalação para o seu sistema operacional no site do Docker.

## [Instalando o Docker no Debian 12 Bookworm](https://blog.rosnertech.com.br/arquivos/756)**  
[**Instalando Docker e Docker Compose no Windows Server 2019**  
](https://blog.rosnertech.com.br/arquivos/1120)

## Após instalar o Docker, você pode começar a usar os seguintes comandos básicos:

`docker pull`** - Este comando baixa uma imagem do Docker Hub, um repositório de imagens de software. Por exemplo, para baixar a imagem do Ubuntu, você pode usar o seguinte comando:

```bash
docker pull ubuntu
```

## `docker run`** - Este comando inicia um container a partir de uma imagem. Por exemplo, para iniciar um container com a imagem do Ubuntu, você pode usar o seguinte comando:

```bash
docker run ubuntu
```

## `docker ps`** - Este comando lista todos os containers que estão em execução.

```bash
docker ps
```

## `docker stop`** - Este comando para um container que está em execução.

```bash
docker stop <id_do_container>
```

## `docker start`** - Este comando inicia um container que está parado.

```bash
docker start <id_do_container>
```

## `docker rm`** - Este comando remove um container.

```bash
docker rm <id_do_container>
```

## `docker images`** - Este comando lista todas as imagens que estão armazenadas no seu computador.

```bash
docker images
```

## Exemplos

Aqui estão alguns exemplos de como usar esses comandos:  
Para baixar a imagem do Apache Tomcat, você pode usar o seguinte comando:

```bash
docker pull tomcat
```

Para iniciar um container com a imagem do Apache Tomcat, você pode usar o seguinte comando:

```bash
docker run -d -p 8080:8080 tomcat
```

Este comando iniciará o container em segundo plano e mapeará a porta 8080 do container para a porta 8080 do seu computador.  
Para visualizar a lista de todos os containers que estão em execução, você pode usar o seguinte comando:

```bash
docker ps
```

segue uma lista com os principais comandos do docker e sua descrição:

```bash
docker attach  – Acessar dentro do container e trabalhar a partir dele.
docker build   – A partir de instruções de um arquivo Dockerfile eu possa criar uma imagem.
docker commit  – Cria uma imagem a partir de um container.
docker cp      – Copia arquivos ou diretórios do container para o host.
docker create  – Cria um novo container.
docker diff    – Exibe as alterações feitas no filesystem do container.
docker events  – Exibe os eventos do container em tempo real.
docker exec    – Executa uma instrução dentro do container que está rodando sem precisar atachar nele.
docker export  – Exporta um container para um arquivo .tar.
docker history – Exibe o histórico de comandos que foram executados dentro do container.
docker images  – Lista as imagens disponíveis no host.
docker import  – Importa uma imagem .tar para o host.
docker info    – Exibe as informações sobre o host.
docker inspect – Exibe r o json com todas as configurações do container.
docker kill    – Da Poweroff no container.
docker load    – Carrega a imagem de um arquivo .tar.
docker login   – Registra ou faz o login em um servidor de registry.
docker logout  – Faz o logout de um servidor de registry.
docker logs    – Exibe os logs de um container.
docker port    – Abre uma porta do host e do container.
docker network – Gerenciamento das redes do Docker.
docker node    – Gerenciamento dos nodes do Docker Swarm.
docker pause   – Pausa o container.
docker port    – Lista as portas mapeadas de um container.
docker ps      – Lista todos os containers.
docker pull    – Faz o pull de uma imagem a partir de um servidor de registry.
docker push    – Faz o push de uma imagem a partir de um servidor de registry.
docker rename  – Renomeia um container existente.
docker restart – Restarta um container que está rodando ou parado.
docker rm      – Remove um ou mais containeres.
docker rmi     – Remove uma ou mais imagens.
docker run     – Executa um comando em um novo container.
docker save    – Salva a imagem em um arquivo .tar.
docker search  – Procura por uma imagem no Docker Hub.
docker service – Gernciamento dos serviços do Docker.
docker start   – Inicia um container que esteja parado.
docker stats   – Exibe informações de uso de CPU, memória e rede.
docker stop    – Para um container que esteja rodando.
docker swarm   – Clusterização das aplicações em uma orquestração de várias containers, aplicações junto.
docker tag     – Coloca tag em uma imagem para o repositorio.
docker top     – Exibe os processos rodando em um container.
docker unpause – Inicia um container que está em pause.
docker update  – Atualiza a configuração de um ou mais containers.
docker version – Exibe as versões de API, Client e Server do host.
docker volume  – Gerenciamento dos volumes no Docker.
docker wait    – Aguarda o retorno da execução de um container para iniciar esse container.
```

## Dicas  
## Para obter ajuda sobre um comando específico, você pode usar o seguinte comando:

```py
docker help <comando>
```

## Espero que este tutorial tenha sido útil.

Agradeço por ler esse artigo e espero vê-lo novamente em breve. Continue nos acompanhando para mais conteúdo relevante e inspirador. Até a próxima!
