---
title: "Instalando GLPI 10.0.6 no Debian 11"
description: "GLPI é uma solução web Open-source completa para gestão de ativos e helpdesk."
pubDate: 2023-02-20
updatedDate: 2023-08-13
tags: ["Apache", "Debian", "Docker", "Linux", "Servidor Web"]
wpId: 478
draft: false
---

## Instalando GLPI 10.0.6 no Debian 11

GLPI é uma solução web Open-source completa para gestão de ativos e helpdesk. O mesmo gerência todos os seus problemas de inventário de ativos/hardwares e software e suporte ao usuário(helpdesk). É uma excelente ferramenta para gestão de TI. Este software open source é escrito em PHP e distribuído sob licença GPL.

## Requisitos:**  
Servidor Web utilizaremos o [_**Apache**_](https://blog.rosnertech.com.br/arquivos/279)  
SGBD utilizaremos o _**[Mariadb](https://blog.rosnertech.com.br/arquivos/499)**_ 10.2  
PHP 7 ou  superior (Utilizarei o 7.4).

## Extensões Necessárias do PHP.**  
Curl, fileinfo, gd, json, mbstring, mysqli, session, zlib, simplexml, xml, intl

Extensões Opcionais.  
cli, domxml, ldap e etc…

## Instalando Apache2 e Extensões Obrigatórias.

```bash
apt-get install apache2 php7.4 php7.4 php7.4 php7.4-curl php7.4 php7.4-gd php7.4 php7.4-cli php7.4 php7.4-mbstring php7.4 php7.4-mysql php7.4 php7.4-xml php7.4-intl php7.4-zip php7.4-bz2 -y
```

****Instalando Extensões Opcionais.

```bash
apt-get install php7.4-cli php-cas php7.4-imap php7.4-ldap php7.4-xmlrpc php7.4-soap php7.4-snmp php-apcu -y
systemctl restart apache2
```

****Baixando e instalando o GLPI.

```bash
cd /tmp
wget https://github.com/glpi-project/glpi/releases/download/10.0.6/glpi-10.0.6.tgz
tar -xvzf glpi-10.0.6.tgz
mv glpi /var/www/html/
```

## Alterando as permissões para a pasta do GLPI.

```bash
chmod 775 /var/www/html/* -Rf
chown www-data. /var/www/html/* -Rf
```

## Criando o Banco de Dados.

Iremos criar um banco de dados _glpi_ e um usuário _glpi_ no Mariadb. (utilizar as configurações de acordo com sua necessidade).

```bash
mariadb
create database glpi;
create user 'glpi'@'localhost' identified by 'glpi';
grant all on glpi.* to glpi identified by 'glpi';
flush privileges;
exit;
```

## Clicar em instalar.  

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/02/GLPI-3.png)

## Nessa etapa verificamos que todas as extensões estão instaladas. Clicar em continuar. (Caso falte alguma extensão, instalar e depois reiniciar o apache).

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/02/GLPI-4.png)

## Configurar as informações da conexão de banco de dados e clicar em continuar.

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/02/GLPI-5.png)

## Selecionar o banco glpi que foi criado anteriormente e clicar em continuar.

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/02/GLPI-6.png)

## GLPI irá iniciar as configurações do banco de dados.

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/02/GLPI-7.png)

## Banco de dados configurado com sucesso, clicar em continuar.

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/02/GLPI-8.png)

## Desabilitar a opção Enviar estatística e clicar em Continuar (pois estou utilizando como tutorial).

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/02/GLPI-9.png)

## clicar em continuar.  

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/02/GLPI-10-1.png)

## Instalação finalizada, clicar em usar GLPI.

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/02/GLPI-11.png)

## Usuários padrões (alterar a senha de todos os usuários).

Administrador: glpi/glpi**  
## Técnico: tech/tech**  
## Normal: normal/normal**  
## Postonly: post-only/postonly

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/02/GLPI-12.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2023/02/GLPI-13.png)

## Por motivo de segurança, remover o install.php.

```bash
rm /var/www/html/glpi/install/install.php
```

## Conclusão:  
## Com esse post você aprendeu a instalar o GLPI 10.0.6 no Debian 11 Bullseye.
