---
title: "Instalando Apache no Debian 11"
description: "O servidor web Apache HTTP é um dos servidores web amplamente utilizados, especialmente em distribuições Linux, que é uma plataforma cruzada gratuita usada por um grande número de sites na Internet."
pubDate: 2023-02-11
updatedDate: 2023-08-13
tags: ["Apache", "Debian", "Servidor Web", "Linux"]
wpId: 279
draft: false
---

/\*! elementor - v3.14.0 - 26-06-2023 \*/ .elementor-heading-title{padding:0;margin:0;line-height:1}.elementor-widget-heading .elementor-heading-title\[class\*=elementor-size-\]>a{color:inherit;font-size:inherit;line-height:inherit}.elementor-widget-heading .elementor-heading-title.elementor-size-small{font-size:15px}.elementor-widget-heading .elementor-heading-title.elementor-size-medium{font-size:19px}.elementor-widget-heading .elementor-heading-title.elementor-size-large{font-size:29px}.elementor-widget-heading .elementor-heading-title.elementor-size-xl{font-size:39px}.elementor-widget-heading .elementor-heading-title.elementor-size-xxl{font-size:59px}

## Instalando Apache no Debian 11

O servidor web Apache HTTP é um dos servidores web amplamente utilizados, especialmente em distribuições Linux, que é uma plataforma cruzada gratuita usada por um grande número de sites na Internet. O servidor web Apache usa HTTP para processar a solicitação e entreter informações da web. O Apache tem muitos recursos úteis e sua funcionalidade pode ser aprimorada com módulos extras. Ele também permite que os programadores publiquem seus trabalhos na internet.

## Instalando o Apache no Debian 11.

A versão mais recente dos pacotes Apache está disponível no repositório Debian 11 padrão. Assim, podemos instalá-lo diretamente usando o gerenciador de pacotes.

Acesse  o terminal e vire root utilizando o comando “su -”  para evitarmos comando que não existam e atualizaremos o repositório.

```bash
su -
apt update
apt upgrade
```

## Instalando o Apache no Debian 11.

```bash
apt install apache2 apache2-utils -y
```

## Instalando o mod\_rewrite do Apache2.

Esse modo é muito utilizado no Apache, utiliza um módulo de mecanismo baseado em regras de reescrita (wordpress utiliza esse módulo).

```bash
a2enmod rewrite
```

## Para ativar o nova configuração, será necessário reiniciar o apache2.

```bash
systemctl restart apache2
```

## Verificando a Versão do Apache.

```bash
 apache2 -v
```

/\*! elementor - v3.14.0 - 26-06-2023 \*/ .elementor-widget-image{text-align:center}.elementor-widget-image a{display:inline-block}.elementor-widget-image a img\[src$=".svg"\]{width:48px}.elementor-widget-image img{vertical-align:middle;display:inline-block} ![](https://blog.rosnertech.com.br/wp-content/uploads/2023/02/apache1.png)

## Após a instalação do apache podemos acessar o mesmo pelo IP do servidor ou localhost.

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/02/apache2.png)

## Após a instalação bem-sucedida, o serviço Apache pode ser gerenciado usando os comandos “systemctl”, execute o comando abaixo mencionado para verificar o status do servidor:

```bash
systemctl status apache2
```

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/02/apache3.png)

## Comandos para Gerenciar o serviço Apache no Debian 11.

Iniciar o Serviço.

```bash
systemctl start apache2
```

## Verificar o status do Serviço.

```bash
systemctl status apache2
```

## Reiniciar o Serviço.

```bash
systemctl restart apache2
```

## Parar o Serviço.

```bash
systemctl stop apache2
```

## Nesse post ensinei como instalar o Apache2 no Debian 11.
