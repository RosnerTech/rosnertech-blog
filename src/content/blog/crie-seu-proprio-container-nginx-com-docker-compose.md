---
title: "Crie Seu Próprio Container NGINX com Docker Compose"
description: "Você já se perguntou como é possível simplificar e agilizar a implantação de aplicativos web? Bem, você está prestes a embarcar em uma jornada emocionante no mundo do Docker! Vamos guiá-lo para criar "
pubDate: 2024-01-25
updatedDate: 2024-01-31
tags: ["Docker", "Nginx", "Docker-Compose"]
wpId: 1246
draft: false
---

/\*! elementor - v3.19.0 - 29-01-2024 \*/ .elementor-heading-title{padding:0;margin:0;line-height:1}.elementor-widget-heading .elementor-heading-title\[class\*=elementor-size-\]>a{color:inherit;font-size:inherit;line-height:inherit}.elementor-widget-heading .elementor-heading-title.elementor-size-small{font-size:15px}.elementor-widget-heading .elementor-heading-title.elementor-size-medium{font-size:19px}.elementor-widget-heading .elementor-heading-title.elementor-size-large{font-size:29px}.elementor-widget-heading .elementor-heading-title.elementor-size-xl{font-size:39px}.elementor-widget-heading .elementor-heading-title.elementor-size-xxl{font-size:59px}

## Desbravando o Mundo do Docker: Crie Seu Próprio Container NGINX com Docker Compose

Você já se perguntou como é possível simplificar e agilizar a implantação de aplicativos web? Bem, você está prestes a embarcar em uma jornada emocionante no mundo do Docker! Vamos guiá-lo para criar seu próprio contêiner NGINX usando Docker Compose. Siga os passos abaixo e descubra o poder da virtualização de contêineres.

## Instale o Docker

Antes de começarmos, certifique-se de ter o Docker instalado em sua máquina. Se ainda não tiver, você pode encontrar instruções detalhadas de instalação no site oficial do Docker.

[Instalando o Docker no Debian 12 Bookworm](https://blog.rosnertech.com.br/arquivos/756)

## Crie um diretório para o seu projeto

No seu terminal, crie um novo diretório para o projeto do NGINX. Isso manterá tudo organizado e facilitará o gerenciamento dos arquivos.

```bash
mkdir nginx-docker
cd nginx-docker
```

## Crie um arquivo Dockerfile

Dentro do diretório do seu projeto, crie um arquivo chamado Dockerfile usando seu editor de texto favorito. Adicione o seguinte conteúdo:

```bash
nano Dockerfile
```

```bash
# Use a imagem oficial do NGINX como base
FROM nginx:latest
# Copie o arquivo de configuração personalizado
COPY  nginx.conf /etc/nginx/conf.d/default.conf
```

Este Dockerfile utiliza a imagem oficial do NGINX e adiciona um arquivo de configuração personalizado chamado nginx.conf.

## Crie um arquivo de configuração NGINX

Dentro do mesmo diretório, crie um arquivo chamado nginx.conf e adicione sua configuração personalizada. Por exemplo:

```bash
server {
    listen 80;
    server_name localhost;
    location / {
        root /usr/share/nginx/html;
        index index.html;
    }
}
```

## Criando imagem  
## Use o seguinte comando:

```bash
docker build -t lab_rosnertech/nginx:1.0 .
```

/\*! elementor - v3.19.0 - 29-01-2024 \*/ .elementor-widget-image{text-align:center}.elementor-widget-image a{display:inline-block}.elementor-widget-image a img\[src$=".svg"\]{width:48px}.elementor-widget-image img{vertical-align:middle;display:inline-block} ![](https://blog.rosnertech.com.br/wp-content/uploads/2024/01/docker_nginx_01.png)

Esse comando irá construir a imagem com o nome lab\_rosnertech/nginx:1.0

## Verificando a imagem criada

```bash
docker images
```

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/01/docker_nginx_02.png)

## Crie um arquivo docker-compose.yml

Agora, crie um arquivo chamado docker-compose.yml no mesmo diretório e adicione o seguinte conteúdo:

```bash
version: '3'
services:
  web:
    image: lab_rosnertech/nginx:1.0
    ports:
      - "8080:80"
```

Este arquivo do Docker Compose define um serviço chamado "web" que utilizará a imagem criada anteriormente e mapeará a porta 8080 do host para a porta 80 do contêiner NGINX.

## Construa e execute o contêiner

No terminal, dentro do diretório do seu projeto, execute os seguintes comandos:

```bash
docker-compose up -d
```

## Verificando o container

```bash
docker container ls 
```

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/01/docker_nginx_03.png)

Para verificar se o container está funcionando, abra um navegador e acesse o endereço http://localhost:8080. Você deve ver a página inicial do Nginx.

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/01/docker_nginx_04.png)

## Dicas

Para personalizar a configuração do Nginx, você pode editar o arquivo Dockerfile. Por exemplo, você pode adicionar instruções para instalar módulos adicionais ou alterar as configurações do servidor.  
Você também pode personalizar a configuração do Docker Compose editando o arquivo docker-compose.yml. Por exemplo, você pode adicionar mais containers ou alterar os parâmetros de execução.

## Conclusão

Neste post, você aprendeu a criar um container de Nginx com Docker e Docker Compose. Agora, você pode usar o Nginx para servir páginas web ou outros tipos de conteúdo.

Agradeço por ler esse artigo e espero vê-lo novamente em breve. Continue nos acompanhando para mais conteúdo relevante e inspirador. Até a próxima!
