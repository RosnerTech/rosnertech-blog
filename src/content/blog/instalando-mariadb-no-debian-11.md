---
title: "Instalando MariaDB no Debian 11"
description: "O MySQL é um sistema gratuito de gerenciamento de banco de dados muito popular e também um componente importante da pilha LAMP."
pubDate: 2023-02-20
updatedDate: 2023-08-13
tags: ["Debian", "Linux", "MariaDB", "Mariadb"]
wpId: 499
draft: false
---

/\*! elementor - v3.14.0 - 26-06-2023 \*/ .elementor-heading-title{padding:0;margin:0;line-height:1}.elementor-widget-heading .elementor-heading-title\[class\*=elementor-size-\]>a{color:inherit;font-size:inherit;line-height:inherit}.elementor-widget-heading .elementor-heading-title.elementor-size-small{font-size:15px}.elementor-widget-heading .elementor-heading-title.elementor-size-medium{font-size:19px}.elementor-widget-heading .elementor-heading-title.elementor-size-large{font-size:29px}.elementor-widget-heading .elementor-heading-title.elementor-size-xl{font-size:39px}.elementor-widget-heading .elementor-heading-title.elementor-size-xxl{font-size:59px}

## Instalando MariaDB no Debian 11

O MySQL é um sistema gratuito de gerenciamento de banco de dados muito popular e também um componente importante da pilha LAMP. O MySQL foi substituído pelo MariaDB nos repositórios Debian, que é uma alternativa decente ao MySQL e praticamente executa todas as operações que o MySQL realiza. A versão mais recente dos pacotes MariaDB está disponível no repositório Debian 11 padrão. Assim, podemos instalá-lo diretamente usando o gerenciador de pacotes.  
Acesse o terminal e vire root utilizando o comando “su -” para evitarmos comando que não existam e atualizaremos o repositório.

```bash
apt update
apt upgrade
```

## Para instalar o MariaDB execute o comando abaixo:

```bash
apt install mariadb-server mariadb-client
```

## Configurando o MariaDB no Debian 11  
## Para configurar corretamente o MariaDB, será necessário executar um script de segurança. Onde após executar o comando abaixo, será necessário confirmar várias opções.

```bash
mysql_secure_installation
```

Para as duas primeiras opções, escolheremos ‘n’ e para as demais escolheremos ‘y’.

/\*! elementor - v3.14.0 - 26-06-2023 \*/ .elementor-widget-image{text-align:center}.elementor-widget-image a{display:inline-block}.elementor-widget-image a img\[src$=".svg"\]{width:48px}.elementor-widget-image img{vertical-align:middle;display:inline-block} ![](https://blog.rosnertech.com.br/wp-content/uploads/2023/02/mysql_02.png)

## Criando usuário com permissão de autenticação.**  
MariaDB utiliza usa o plugin unix\_socket, ele permite que o usuário use as credenciais do sistema operacional para se conectar no MariaDB via socket Unix, sendo recomendável definir um usuário com autenticação em senha, sendo assim, iremos criar um usuário.

## iniciar o MariaDB (já estamos com super usuário).

```bash
mariadb
```

## Criaremos um novo usuário no servidor MariaDB.

```bash
GRANT ALL ON *.* TO ‘tecnico’@’localhost’ WITH GRANT OPTION;
```

****Aplicaremos a nova alteração com o comando abaixo:

```bash
FLUSH PRIVILEGES;
exit
```

****Comandos para Gerenciar o serviço MariaDB no Debian 11.

## Iniciar o Serviço.

```bash
systemclt start mariadb
```

## Verificar status do serviço.  

```bash
systemclt status mariadb
```

## Parar o serviço.  

```bash
systemclt stop mariadb
```

## Reiniciar o serviço.  

```bash
systemclt restart mariadb
```

## Nesse post ensinei como instalar o MariaDB no Debian 11.
