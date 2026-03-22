---
title: "Instalando Nginx no Debian 11"
description: "O Nginx é um servidor web gratuito e de código aberto usado para hospedar sites e aplicativos de todos os tamanhos. O software é conhecido por seu baixo impacto nos recursos de memória, alta escalabil"
pubDate: 2023-02-11
updatedDate: 2023-08-13
tags: ["Debian", "Servidor Web", "Linux", "Nginx"]
wpId: 239
draft: false
---

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
