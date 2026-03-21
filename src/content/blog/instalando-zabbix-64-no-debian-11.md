---
title: "Instalando Zabbix 6.4 no Debian 11"
description: "Zabbix é o nome dado a um software de monitoramento de rede. Essa ferramenta mede diversos aspectos da infraestrutura de uma empresa."
pubDate: 2023-03-07
updatedDate: 2023-08-13
tags: ["Debian", "Linux", "Zabbix", "Apache"]
wpId: 546
draft: false
---

/\*! elementor - v3.14.0 - 26-06-2023 \*/ .elementor-heading-title{padding:0;margin:0;line-height:1}.elementor-widget-heading .elementor-heading-title\[class\*=elementor-size-\]>a{color:inherit;font-size:inherit;line-height:inherit}.elementor-widget-heading .elementor-heading-title.elementor-size-small{font-size:15px}.elementor-widget-heading .elementor-heading-title.elementor-size-medium{font-size:19px}.elementor-widget-heading .elementor-heading-title.elementor-size-large{font-size:29px}.elementor-widget-heading .elementor-heading-title.elementor-size-xl{font-size:39px}.elementor-widget-heading .elementor-heading-title.elementor-size-xxl{font-size:59px}

## Instalando Zabbix 6.4 no Debian 11

Zabbix é o nome dado a um software de monitoramento de rede. Essa ferramenta mede diversos aspectos da infraestrutura de uma empresa, tais como servidores, dispositivos de rede e outros tipos de máquinas. Esse software também cria relatórios em diversos formatos, tais como gráficos, listas e mapas, o que pode ser extremamente relevante para montar a estratégia da empresa e avaliar pontos importantes para o seu funcionamento.  
Requisitos:  
[**Servidor Web**](https://blog.rosnertech.com.br/arquivos/279)  
PHP  
[**MariaDB**](https://blog.rosnertech.com.br/arquivos/499)  
Atualizar o sistema e instalar o php.

```bash
apt update
apt upgrade -y
apt install php php-mysql php-mysqlnd php-ldap php-bcmath php-mbstring php-gd php-pdo php-xml libapache2-mod-php
```

Executar os comandos abaixo instalar o repositório do zabbix.

```bash
wget https://repo.zabbix.com/zabbix/6.4/debian/pool/main/z/zabbix-release/zabbix-release_6.4-1+debian11_all.deb
dpkg -i zabbix-release_6.4-1+debian11_all.deb
apt update 
```

Executar o comando abaixo para instalar o Zabbix server, frontend e agent.

```bash
apt install zabbix-server-mysql zabbix-frontend-php zabbix-apache-conf zabbix-sql-scripts zabbix-agent
```

Criar um banco de dados zabbix e um usuário zabbix no Mariadb.

```bash
mysql -uroot -p
create database zabbix character set utf8mb4 collate utf8mb4_bin;
create user zabbix@localhost identified by '87654321';
grant all privileges on zabbix.* to zabbix@localhost;
set global log_bin_trust_function_creators = 1;
quit;
```

Importar o esquema inicial e os dados, será solicitado a senha do passo anterior.

```bash
zcat /usr/share/zabbix-sql-scripts/mysql/server.sql.gz | mysql --default-character-set=utf8mb4 -uzabbix -p zabbix
```

Desativar a opção _**log\_bin\_trust\_function\_creators**_ após importar o esquema do banco de dados.

```bash
mysql -uroot -p
set global log_bin_trust_function_creators = 0;
quit; 
```

Editar o arquivo _**zabbix\_server.conf**_ para informar os dados de conexão do Mariadb (procurar por '_**#DBPassword=**_’ descomentar e inserir a senha).

```bash
nano /etc/zabbix/zabbix_server.conf
```

Ajustar o fuso horário correto (alterar de acordo a sua região _**php\_value\[date.timezone\] = America/Sao\_Paulo)**_.

```bash
nano /etc/php/7.4/apache2/php.ini
```

Alterar o max\_execution\_time e altere de 30 para 600 (_**max\_execution\_time =**_ _**600**_).

```bash
nano /etc/php/7.4/apache2/php.ini
```

Iniciar os serviços e configurar para iniciar junto com o boot.

```bash
systemctl restart zabbix-server zabbix-agent apache2
systemctl enable zabbix-server zabbix-agent apache2
```

Acessar em seu navegador o _**IP\_DO\_SERVIDOR/zabbix**_.

Selecionar o idioma e clicar em próximo passo.

/\*! elementor - v3.14.0 - 26-06-2023 \*/ .elementor-widget-image{text-align:center}.elementor-widget-image a{display:inline-block}.elementor-widget-image a img\[src$=".svg"\]{width:48px}.elementor-widget-image img{vertical-align:middle;display:inline-block} ![](https://blog.rosnertech.com.br/wp-content/uploads/2023/03/zabbix01.png)

Verificar se todos os pré-requisitos foram atendidos e clicar em próximo passo.

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/03/zabbix02.png)

Selecionar o tipo de banco de dados Mysql, informar usuário e senha e clicar em próximo passo.

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/03/zabbix03.png)

Configurar o nome para o servidor, selecionar o tema e clicar em próximo passo.

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/03/zabbix04.png)

Conferir o sumário da pré-instalação e se estiver correto, clicar em próximo passo.

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/03/zabbix05.png)

Pronto! O Zabbix 6.4 foi instalado com sucesso!

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/03/zabbix06.png)

Agora é só logar no zabbix e iniciar as configurações.  
_**usuário: Admin**_  
_**senha: zabbix**_

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/03/zabbix-10.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2023/03/zabbix07.png)

## Conclusão:  
## Com esse post você aprendeu a instalar o Zabbix 6.4 no Debian 11 Bullseye.
