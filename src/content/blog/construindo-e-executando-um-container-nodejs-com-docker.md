---
title: "Construindo e Executando um Container Node.js com Docker"
description: "Node.js é um ambiente de execução JavaScript que permite executar código JavaScript no lado do servidor."
pubDate: 2024-01-29
updatedDate: 2024-01-30
tags: ["Docker", "Nodejs", "Docker-Compose"]
wpId: 1258
draft: false
---

/\*! elementor - v3.19.0 - 29-01-2024 \*/ .elementor-heading-title{padding:0;margin:0;line-height:1}.elementor-widget-heading .elementor-heading-title\[class\*=elementor-size-\]>a{color:inherit;font-size:inherit;line-height:inherit}.elementor-widget-heading .elementor-heading-title.elementor-size-small{font-size:15px}.elementor-widget-heading .elementor-heading-title.elementor-size-medium{font-size:19px}.elementor-widget-heading .elementor-heading-title.elementor-size-large{font-size:29px}.elementor-widget-heading .elementor-heading-title.elementor-size-xl{font-size:39px}.elementor-widget-heading .elementor-heading-title.elementor-size-xxl{font-size:59px}

## Construindo e Executando um Container Node.js com Docker

Neste tutorial, você aprenderá como criar um contêiner Docker para uma aplicação Node.js simples.

## Instale o Docker

Antes de começarmos, certifique-se de ter o Docker instalado em sua máquina. Se ainda não tiver, você pode encontrar instruções detalhadas de instalação no site oficial do Docker.

[Instalando o Docker no Debian 12 Bookworm](https://blog.rosnertech.com.br/arquivos/756)

## Crie um diretório para o seu projeto

No seu terminal, crie um novo diretório para o projeto do Node.js. Isso manterá tudo organizado e facilitará o gerenciamento dos arquivos.

```bash
mkdir node-docker
cd node-docker
```

## Código JavaScript com Página HTML

crie o arquivo `app.js` e insira o seguinte código:

```bash
nano app.js
```

```bash
const http = require('http');
const hostname = '0.0.0.0';
const port = 3000;
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end(`
    <html>
      <head>
        <title>Lab RosnerTech</title>
      </head>
      <body>
        <h1>Lab RosnerTech - Infraestrutura | DevOps </h1>
        <p>Bem-vindo à minha aplicação Node.js com uma página HTML!</p>
      </body>
    </html>
  `);
});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

Este código inclui uma resposta HTML básica que será servida quando você acessar o servidor.

## Dockerfile

crie o arquivo `Dockerfile` e insira o seguinte código:

```bash
nano Dockerfile
```

```bash
FROM node
WORKDIR /appjs
COPY app.js .
EXPOSE 3000
CMD ["node", "app.js"]
```

Este Dockerfile define a construção de uma imagem Node.js, copia o arquivo `app.js` para o diretório de trabalho, instala as dependências com `npm install`, expõe a porta 3000 e define o comando padrão para iniciar a aplicação.

## Construindo a Imagem

Abra o terminal na pasta do projeto e execute o seguinte comando para construir a imagem

```bash
docker build -t lab_rosnertech/node:1.0 .
```

/\*! elementor - v3.19.0 - 29-01-2024 \*/ .elementor-widget-image{text-align:center}.elementor-widget-image a{display:inline-block}.elementor-widget-image a img\[src$=".svg"\]{width:48px}.elementor-widget-image img{vertical-align:middle;display:inline-block} ![](https://blog.rosnertech.com.br/wp-content/uploads/2024/01/node_01.png)

Esse comando irá construir a imagem com o nome lab\_rosnertech/node:1.0

## Verificando a imagem criada

```bash
docker images
```

## Executando o Contêiner

Depois que a imagem for construída, execute o seguinte comando para iniciar o container:

```bash
docker run -p 3000:3000 nome-da-sua-imagem
```

Isso mapeará a porta 3000 do container para a porta 3000 do seu host.

## Verificando o container

```bash
docker container ls 
```

Abra um navegador web e vá para http://localhost:3000. Você deve ver a mensagem "Lab RosnerTech - Infraestrutura | DevOps", junto com a página HTML.

## Conclusão

Você construiu e executou com sucesso um container Docker para a aplicação Node.js com uma página HTML.

Agradeço por ler esse artigo e espero vê-lo novamente em breve. Continue nos acompanhando para mais conteúdo relevante e inspirador. Até a próxima!
