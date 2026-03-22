---
title: "Monitorar o MySQL Usando Zabbix"
description: "Monitorar o MySQL usando o Zabbix é crucial para garantir o desempenho, a estabilidade e a disponibilidade do banco de dados. Isso permite identificar e resolver problemas rapidamente, otimizar o uso "
pubDate: 2024-01-23
updatedDate: 2024-01-23
tags: ["Zabbix", "Mysql"]
wpId: 1236
draft: false
---

## Monitorar o MySQL usando Zabbix

Monitorar o MySQL usando o Zabbix é crucial para garantir o desempenho, a estabilidade e a disponibilidade do banco de dados. Isso permite identificar e resolver problemas rapidamente, otimizar o uso de recursos e prevenir falhas, contribuindo para um ambiente de banco de dados mais eficiente e confiável.  
Neste tutorial, assumo que você já possui o ambiente Zabbix (Zabbix Server e Zabbix Agent) instalado.  
## Criando Usuário no Banco de Dados

Antes de tudo, é necessário criar um usuário no banco de dados MySQL que terá permissão para coletar métricas pelo Zabbix Agent. Execute os seguintes comandos no MySQL:

```bash
mysql> CREATE USER 'zbx_monitor'@'%' IDENTIFIED BY 'sua_senha_aqui';
mysql> GRANT REPLICATION CLIENT,PROCESS,SHOW DATABASES,SHOW VIEW ON *.* TO 'zbx_monitor'@'%';
mysql> FLUSH PRIVILEGES;
```

## Configurando o Arquivo .my.cnf

Crie um arquivo `.my.cnf` dentro da pasta `/var/lib/zabbix` com as seguintes configurações:

```bash
mkdir /var/lib/zabbix
nano /var/lib/zabbix/.my.cnf
```

```bash
[client]
user='zbx_monitor'
password='sua_senha_aqui'
```

## Configurando o Template no Zabbix Agent:

```bash
nano /etc/zabbix/zabbix_agent.d/template_db_mysql.conf
```

```bash
#template_db_mysql.conf created by Zabbix for "Template DB MySQL" and Zabbix 4.2
#For OS Linux: You need create .my.cnf in zabbix-agent home directory (/var/lib/zabbix by default) 
#For OS Windows: You need add PATH to mysql and mysqladmin and create my.cnf in %WINDIR%my.cnf,C:my.cnf,BASEDIRmy.cnf https://dev.mysql.com/doc/refman/5.7/en/option-files.html
#The file must have three strings:
#[client]
#user='zbx_monitor'
#password='<password>'
#
UserParameter=mysql.ping[*], mysqladmin -h"$1" -P"$2" ping
UserParameter=mysql.get_status_variables[*], mysql -h"$1" -P"$2" -sNX -e "show global status"
UserParameter=mysql.version[*], mysqladmin -s -h"$1" -P"$2" version
UserParameter=mysql.db.discovery[*], mysql -h"$1" -P"$2" -sN -e "show databases"
UserParameter=mysql.dbsize[*], mysql -h"$1" -P"$2" -sN -e "SELECT COALESCE(SUM(DATA_LENGTH + INDEX_LENGTH),0) FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA='$3'"
UserParameter=mysql.replication.discovery[*], mysql -h"$1" -P"$2" -sNX -e "show slave status"
UserParameter=mysql.slave_status[*], mysql -h"$1" -P"$2" -sNX -e "show slave status"
```

Reinicie o Serviço do Zabbix Agent:  
Execute o seguinte comando para garantir que o Zabbix Agent leia as novas configurações:  
  

```bash
systemctl restart zabbix-agent
```

## Adicionando Template para Monitoramento:**  
Acesse a interface do Zabbix Server e adicione o template "Template DB MySQL" ao host que deseja monitorar o Mysql. Isso permitirá que o servidor Zabbix comece a solicitar informações do MySQL.

## Verificando Dados Coletados:

Acesse o menu "Latest data" na interface do Zabbix Server para verificar que o Zabbix Agent está coletando informações do MySQL.

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/01/zabbix_mysql_05.png)

Com essas etapas concluídas, agora seu Zabbix Server está configurado para coletar métricas do MySQL. Espero que este tutorial tenha sido útil para entender como monitorar o MySQL usando o Zabbix.

## Agradeço por ler esse artigo e espero vê-lo novamente em breve. Continue nos acompanhando para mais conteúdo relevante e inspirador. Até a próxima!
