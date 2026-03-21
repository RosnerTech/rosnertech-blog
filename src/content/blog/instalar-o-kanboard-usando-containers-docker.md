---
title: "Instalar o Kanboard Usando Containers Docker"
description: "O Kanboard é uma ferramenta leve e eficiente de gerenciamento de projetos. Você pode usá-lo para organizar tarefas e fluxos de trabalho com metodologias como Kanban. Ele oferece funcionalidades prátic"
pubDate: 2024-11-18
updatedDate: 2024-11-18
tags: ["Debian", "Docker", "Linux", "Docker-Compose", "Kanboard"]
wpId: 1719
draft: false
---

## Instalar o Kanboard Usando Containers Docker

O **Kanboard** é uma ferramenta leve e eficiente de gerenciamento de projetos. Você pode usá-lo para organizar tarefas e fluxos de trabalho com metodologias como **Kanban**. Ele oferece funcionalidades práticas, como **arrastar e soltar tarefas**, **atribuição de prazos** e **análise de progresso**, tudo acessível através de uma interface amigável no navegador.

Por padrão, o Kanboard utiliza o **SQLite** como banco de dados, o que é perfeito para você testar ou usar a ferramenta de maneira não-produtiva. Essa configuração simplifica a instalação, já que você não precisa configurar um banco de dados externo. Porém, se estiver configurando para um ambiente de produção, o recomendado é utilizar um banco de dados mais robusto, como o MariaDB.

Neste tutorial, você aprenderá a instalar e configurar o Kanboard utilizando **Docker**, explorando duas opções: **docker run** e **docker-compose**. Você também verá como configurar o acesso via navegador e como organizar estrategicamente os diretórios para armazenar imagens e dados.

## Por que usar o SQLite?

Se você pretende testar o Kanboard ou utilizá-lo em um ambiente pequeno e sem muitos usuários simultâneos, o SQLite é ideal. Ele tem vantagens como:

-   **Simplicidade:** Você não precisa de configurações adicionais.
-   **Leveza:** É ideal para pequenas equipes ou uso pessoal.
-   **Armazenamento local:** Todos os dados ficam no mesmo servidor onde o aplicativo está hospedado.

Se você precisa de um ambiente mais escalável ou com alto volume de dados, o SQLite não será suficiente. Nesses casos, é melhor usar um banco de dados como o MariaDB.

## Como Instalar o Kanboard com Docker  
  
## O que você precisa antes de começar

## Docker** e **Docker Compose** instalados.  
Caso precise, confira nosso [tutorial de instalação do Docker no Ubuntu 22.04.](https://blog.rosnertech.com.br/arquivos/1474)  
  
Um diretório local para armazenar os dados do Kanboard.  
Neste tutorial, você usará `/var/docker/kanboard_data`

## Instalando com `docker run      `**Criar o diretório para dados  
Antes de mais nada, crie o diretório para armazenar os dados persistentes do Kanboard:

```bash
sudo mkdir -p /var/docker/kanboard_data
sudo chown -R $USER:$USER /var/docker/kanboard_data
```

## Executar o container  
  
## Agora, execute o Kanboard utilizando o comando abaixo:

```bash
docker run -d 
  --name kanboard 
  --restart always 
  -p 8080:80 
  -v /var/docker/kanboard_data:/var/www/app/data 
  kanboard/kanboard
```

## Aqui está o que cada parâmetro faz:

-   `--name kanboard`: Define o nome do container.
-   `--restart always`: Garante que o container reinicie automaticamente em caso de falhas ou reinicialização do servidor.
-   `-p 8080:80`: Mapeia a porta 8080 do seu servidor para a porta 80 do container.
-   `-v /var/docker/kanboard_data:/var/www/app/data`: Monta o diretório local para armazenar os dados do Kanboard.

## Instalando com docker-compose  
  
## Criar o arquivo `docker-compose.yml   `No diretório `/var/docker/kanboard`, crie o arquivo `docker-compose.yml` com o seguinte conteúdo:

```bash
services:
  kanboard:
    image: kanboard/kanboard
    container_name: kanboard
    restart: always
    ports:
      - "8080:80"
    volumes:
      - /var/docker/kanboard_data:/var/www/app/data
```

## Subir o container

Agora, inicie o Kanboard com o comando:

```bash
docker-compose up -d
```

## Como acessar o Kanboard

Depois de iniciar o container, abra o navegador e acesse o endereço:

```bash
http://<SEU_IP>:8080
```

Substitua `<SEU_IP>` pelo IP do servidor ou utilize `localhost` se estiver testando no mesmo computador.

Ao acessar pela primeira vez, use as credenciais padrão:

-   **Usuário:** `admin`
-   **Senha:** `admin`

Para garantir a segurança do seu ambiente, **lembre-se de alterar a senha do administrador** logo após o primeiro login.

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/11/kanboard_login.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2024/11/kanboard_principal.png)

## Organizando imagens e arquivos

Se você pretende anexar imagens ou arquivos às tarefas, o Kanboard os armazenará no diretório configurado para persistência, que neste caso é `/var/docker/kanboard_data`. Certifique-se de que o servidor possui espaço em disco suficiente para atender à demanda.

## Conclusão:

Agora você já sabe como instalar e configurar o Kanboard utilizando o SQLite, ideal para ambientes de teste ou uso pessoal. Se, no futuro, decidir usar o Kanboard em produção, considere a migração para um banco de dados como o MariaDB para obter maior escalabilidade.

Se precisar de ajuda adicional, como configurar [SSL](https://blog.rosnertech.com.br/arquivos/1427) ou [proxy reverso](https://blog.rosnertech.com.br/arquivos/1329), é só pedir!

## Agradeço por ler esse artigo e espero vê-lo novamente em breve. Continue nos acompanhando para mais conteúdo relevante e inspirador. Até a próxima!
