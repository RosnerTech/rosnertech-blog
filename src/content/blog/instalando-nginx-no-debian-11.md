---
title: "Instalando Nginx no Debian 11"
description: "O Nginx é um servidor web gratuito e de código aberto usado para hospedar sites e aplicativos de todos os tamanhos. O software é conhecido por seu baixo impacto nos recursos de memória, alta escalabil"
pubDate: 2023-02-11
updatedDate: 2023-08-13
tags: ["Debian", "Servidor Web", "Linux", "Nginx"]
wpId: 239
draft: false
---

/\*! elementor - v3.14.0 - 26-06-2023 \*/ .elementor-heading-title{padding:0;margin:0;line-height:1}.elementor-widget-heading .elementor-heading-title\[class\*=elementor-size-\]>a{color:inherit;font-size:inherit;line-height:inherit}.elementor-widget-heading .elementor-heading-title.elementor-size-small{font-size:15px}.elementor-widget-heading .elementor-heading-title.elementor-size-medium{font-size:19px}.elementor-widget-heading .elementor-heading-title.elementor-size-large{font-size:29px}.elementor-widget-heading .elementor-heading-title.elementor-size-xl{font-size:39px}.elementor-widget-heading .elementor-heading-title.elementor-size-xxl{font-size:59px}

## Instalando o Nginx no Debian 11

O Nginx é um servidor web gratuito e de código aberto usado para hospedar sites e aplicativos de todos os tamanhos. O software é conhecido por seu baixo impacto nos recursos de memória, alta escalabilidade e sua arquitetura modular orientada a eventos que pode oferecer desempenho seguro e previsível. Mais do que apenas um servidor web, o Nginx também funciona como balanceador de carga, cache HTTP e proxy reverso.

## Instalando o Nginx no Debian 11.

O Nginx está disponível nos repositórios de software padrão do Debian, tornando possível instalá-lo a partir de ferramentas convencionais de gerenciamento de pacotes.

Acesse o terminal e vire root utilizando o comando “su -” para evitarmos comando que não existam e atualizaremos o repositório.

```bash
su -
apt update
apt upgrade
apt install nginx -y
```

Verificando o status do Nginx

```bash
systemctl status nginx
```

/\*! elementor - v3.14.0 - 26-06-2023 \*/ .elementor-widget-image{text-align:center}.elementor-widget-image a{display:inline-block}.elementor-widget-image a img\[src$=".svg"\]{width:48px}.elementor-widget-image img{vertical-align:middle;display:inline-block} ![](https://blog.rosnertech.com.br/wp-content/uploads/2023/02/nginx-01.png)

A saída informa que o serviço foi iniciado com sucesso.

Verificando a versão do Nginx

```bash
nginx -v
```

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/02/nginx-02.png)

Após a instalação do Nginx podemos acessar o mesmo pelo IP do servidor ou localhost.

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/02/nginx-03.png)

Comandos para Gerenciar o serviço Nginx no Debian 11.

Iniciar o Serviço.

```bash
systemctl start nginx
```

 

Verificar o status do Serviço.

```bash
systemctl status nginx
```

Reiniciar o Serviço.

```bash
systemctl restart nginx
```

Nesse post ensinei como instalar o Nginx no Debian 11.
