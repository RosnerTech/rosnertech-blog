---
title: "Utilizando Certbot para Gerar Certificados SSL com Let's Encrypt"
description: "A Let’s Encrypt é uma autoridade certificadora (AC) gratuita, automatizada e aberta que opera em prol do benefício público. É um serviço provido pela Internet Security Research Group (ISRG)."
pubDate: 2024-05-05
updatedDate: 2024-05-14
tags: ["Linux", "SSL", "Nginx", "Let's Encrypt"]
wpId: 1427
draft: false
---

/\*! elementor - v3.21.0 - 08-05-2024 \*/ .elementor-heading-title{padding:0;margin:0;line-height:1}.elementor-widget-heading .elementor-heading-title\[class\*=elementor-size-\]>a{color:inherit;font-size:inherit;line-height:inherit}.elementor-widget-heading .elementor-heading-title.elementor-size-small{font-size:15px}.elementor-widget-heading .elementor-heading-title.elementor-size-medium{font-size:19px}.elementor-widget-heading .elementor-heading-title.elementor-size-large{font-size:29px}.elementor-widget-heading .elementor-heading-title.elementor-size-xl{font-size:39px}.elementor-widget-heading .elementor-heading-title.elementor-size-xxl{font-size:59px}

## Utilizando Certbot para Gerar Certificados SSL Com Let's Encrypt

A Let’s Encrypt é uma autoridade certificadora (AC) gratuita, automatizada e aberta que opera em prol do benefício público. É um serviço provido pela [Internet Security Research Group (ISRG)](https://www.abetterinternet.org/).

Neste tutorial, você aprenderá como usar o Certbot para criar certificados Let's Encrypt. Vamos configurar seus aplicativos para serem executados por trás de um proxy reverso e proteger a comunicação com HTTPS usando Docker, NGINX e Let's Encrypt. Let's Encrypt é uma autoridade de certificação SSL que oferece certificados gratuitos por meio de uma API automatizada.

## Pré-requisitos  
## Antes de começar, você precisará:  
Um nome de domínio registrado. Para este tutorial, usaremos homelab.rosnertech.com.br. Certifique-se de configurar esse domínio no Cloudflare.  
Docker e docker-compose configurados em sua máquina.

## Configurando DNS na Cloudflare

Antes de obtermos o certificado SSL, precisamos garantir que nosso servidor responda a solicitações em vários subdomínios. Isso é geralmente feito configurando um registro DNS curinga. Aqui está um exemplo de como fazer isso:

/\*! elementor - v3.21.0 - 08-05-2024 \*/ .elementor-widget-image{text-align:center}.elementor-widget-image a{display:inline-block}.elementor-widget-image a img\[src$=".svg"\]{width:48px}.elementor-widget-image img{vertical-align:middle;display:inline-block} ![](https://blog.rosnertech.com.br/wp-content/uploads/2024/05/cloudflare_01.png)

## Executando o Certbot via Docker

Vamos começar com o arquivo de configuração docker-compose.yml abaixo, que define os contêineres para o Certbot:

```bash
version: '3'
services:
  certbot:
    container_name: certbot
    image: certbot/certbot
    restart: unless-stopped
    volumes:
      - ./data/certbot/conf:/etc/letsencrypt
      - ./data/certbot/www:/var/www/certbot
```

Execute o comando `docker-compose up -d` para iniciar o Certbot.

Depois que o contêiner Certbot for iniciado, entre nele usando `docker exec -it certbot sh`. Em seguida, execute o comando que solicita o desafio do Let's Encrypt:

```bash
certbot certonly --manual --preferred-challenges=dns -d homelab.rosnertech.com.br
```

Preencha as informações solicitadas. Quando solicitado, vá ao seu provedor de DNS e crie um registro DNS TXT com o nome `_acme-challenge.homelab.rosnertech.com.br` e o valor fornecido pelo Certbot.

Depois de configurar o registro DNS, volte ao terminal e pressione Enter. O processo continuará e você obterá o resultado.

Agora que os certificados curinga Let's Encrypt foram criados, vamos configurar o NGINX com os novos certificados.

## Adicionando o NGINX ao docker-compose

Adicione o serviço NGINX ao docker-compose.yml:

```bash
version: '3'
services:
  nginx:
    container_name: nginx
    image: nginx:1.21.3-alpine
    restart: unless-stopped
    volumes:
      - ./nginx/conf.d/:/etc/nginx/conf.d/
      - /etc/letsencrypt:/etc/letsencrypt
      - /var/www/certbot:/var/www/certbot
    ports:
      - "80:80"
      - "443:443"
```

Salve este arquivo junto com `nginx/app.conf`.

## Configurando o NGINX

Aqui está um exemplo de configuração do NGINX para usar os certificados SSL:

```bash
server {
    listen 80;
    server_name homelab.rosnertech.com.br;
    location / {
        return 301 https://$host$request_uri;
    }    
}
server {
    listen 443 ssl;
    server_name homelab.rosnertech.com.br;
    resolver 127.0.0.11 valid=5s;
    ssl_certificate /etc/letsencrypt/live/homelab.rosnertech.com.br/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/homelab.rosnertech.com.br/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
    location / {
        proxy_pass http://example.homelab.rosnertech.com.br; # para fins de demonstração
    }
}
```

## Renovação Automática de Certificados

Para garantir que seus certificados sejam renovados automaticamente, configure o seguinte no docker-compose.yml:

```bash
entrypoint: "/bin/sh -c 'trap exit TERM; while :; do certbot renew; sleep 12h & wait $${!}; done;'"
```

Isso verificará se seu certificado pode ser renovado a cada 12 horas.

Além disso, na seção do NGINX, certifique-se de que o NGINX recarregue sua configuração (e certificados) a cada seis horas em segundo plano:

```bash
command: "/bin/sh -c 'while :; do sleep 6h & wait $${!}; nginx -s reload; done & nginx -g "daemon off;"'"
```

Agora, seus certificados iniciais foram obtidos e seus contêineres estão prontos para serem lançados. Basta executar `docker-compose up` e aproveitar seu site ou aplicativo protegido por HTTPS.

## Docker-compose completo.

```bash
version: '3'
services:
  nginx:
    container_name: nginx
    image: nginx:1.21.3-alpine
    restart: unless-stopped
    volumes:
      - ./nginx/conf.d/:/etc/nginx/conf.d/
      - /etc/letsencrypt:/etc/letsencrypt
      - /var/www/certbot:/var/www/certbot
    ports:
      - "80:80"
      - "443:443"
    command: /bin/sh -c "while :; do sleep 6h & wait $${!}; nginx -s reload; done & nginx -g 'daemon off;'"
  certbot:
    container_name: certbot
    image: certbot/certbot
    restart: unless-stopped
    volumes:
      - ./data/certbot/conf:/etc/letsencrypt
      - ./data/certbot/www:/var/www/certbot
    entrypoint: "/bin/sh -c 'trap exit TERM; while :; do certbot renew; sleep 12h & wait $${!}; done;'"
```

## Referências

Aqui estão alguns outros artigos que podem ser úteis para configurar essa solução:

[Nginx e Vamos Criptografar com Docker em menos de 5 minutos  
](https://www.treinaweb.com.br/blog/gerando-certificados-ssl-gratuitos-com-certbot#google_vignette)[Como Criar Certificados Curinga Vamos Criptografar com Certbot](https://www.myworkdrive.com/pt/blog/free-ssl-certificate-with-lets-encrypt/)

## Conclusão:  
## Agora, seus certificados iniciais foram obtidos e seus contêineres estão prontos para serem lançados. Basta executar `docker-compose up` e aproveitar seu site ou aplicativo protegido por HTTPS.

## Agradeço por ler esse artigo e espero vê-lo novamente em breve. Continue nos acompanhando para mais conteúdo relevante e inspirador. Até a próxima!
