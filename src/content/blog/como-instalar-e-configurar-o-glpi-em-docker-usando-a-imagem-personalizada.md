---
title: "Como Instalar e Configurar o GLPI em Docker Usando a Imagem Personalizada"
description: "O GLPI Inventory é uma ferramenta de software usada para coletar e gerenciar informações detalhadas sobre ativos de TI em uma organização. Ele rastreia hardware, software, dispositivos de rede e outro"
pubDate: 2024-12-31
updatedDate: 2024-12-31
tags: ["Debian", "Docker", "Linux", "GLPI", "Mariadb", "Docker-Compose"]
wpId: 1787
draft: false
---

## Como Instalar e Configurar o GLPI em Docker Usando a Imagem Personalizada

Sempre utilizei o GLPI em máquinas virtuais (VMs), mas agora decidi migrar para o Docker para facilitar o processo de instalação e testes. Como a TecLib não possui uma imagem oficial do GLPI, resolvi criar a minha própria imagem para agilizar o processo.  
Neste tutorial, focamos exclusivamente na utilização do GLPI via Docker. Presumo que você já tenha conhecimento básico de instalação e configuração do GLPI. Caso ainda não tenha experiência com Docker.  
Aqui, você aprenderá como configurar o GLPI **(versão 10.0.17**) utilizando a imagem Docker personalizada que criei, simplificando o gerenciamento no seu homelab!

## Passo 1: Configuração do `docker-compose.yml`

1.  Crie um arquivo chamado `docker-compose.yml` em um diretório de sua preferência.
2.  Copie e cole o conteúdo abaixo no arquivo:

```bash
services:  
  db:
    image: mariadb:latest
    container_name: glpi-db
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: root_password
      MYSQL_DATABASE: glpi
      MYSQL_USER: glpi_user
      MYSQL_PASSWORD: glpi_password
    volumes:
      - db-data:/var/lib/mysql
    ports:
      - "3306:3306"
  glpi:
    image: rosnertech1/glpi:10.0.17
    container_name: glpi-app
    restart: always
    environment:
      DB_HOST: db
      DB_NAME: glpi
      DB_USER: glpi_user
      DB_PASSWORD: glpi_password
    volumes:
      - glpi-data:/var/www/html/glpi
    ports:
      - "80:80"
    depends_on:
      - db
volumes:
  db-data:
  glpi-data:
```

## Passo 2: Subindo os Contêineres

1.  No terminal, navegue até o diretório onde você salvou o arquivo `docker-compose.yml`.
2.  Execute o comando para iniciar os contêineres:
3.  Aguarde enquanto o Docker baixa as imagens e inicia os serviços.

```bash
docker-compose up -d
```

## Passo 3: Acessando o GLPI

1.  No navegador, acesse o seguinte endereço:
    
    `**http://ip-do-servidor:8080/**   `
    
    Substitua `ip-do-servidor` pelo endereço IP da máquina onde o Docker está rodando.
    
2.  Você será levado à tela de configuração inicial do GLPI.
    

## Passo 4: Configuração do Banco de Dados

Na tela de configuração do banco de dados, insira as seguintes informações:

-   **Endereço do Servidor SQL:** `db`
-   **Usuário SQL:** `glpi_user`
-   **Senha SQL:** `glpi_password`

Clique em **Próximo**.

Na próxima tela, selecione o banco de dados chamado `glpi` e clique em **Próximo** para finalizar a configuração.

## Passo 5: Primeiro Login

Após a instalação, você será redirecionado para a tela de login. Use um dos seguintes usuários padrão para acessar o sistema:

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/12/docker_glpi.png)

## Passo 6: Persistência de Dados

Os dados do banco de dados e do GLPI são persistidos nos volumes Docker:

-   **Banco de Dados:** Salvo em `db-data`.
-   **GLPI (plugins, imagens, etc.):** Salvo em `glpi-data`.

Para restaurar o GLPI após um reinício ou para testes, os dados persistem automaticamente.

## Conclusão:

Com isso, você terá o GLPI pronto para uso em seu homelab! 🚀 Se precisar de mais ajustes ou orientações, é só perguntar.

## Agradeço por ler esse artigo e espero vê-lo novamente em breve. Continue nos acompanhando para mais conteúdo relevante e inspirador. Até a próxima!
