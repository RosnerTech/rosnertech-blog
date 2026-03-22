---
title: "Instalando o Zabbix 7.0 Beta no Debian 12"
description: "O Zabbix é uma poderosa solução de monitoramento de código aberto, reconhecida por sua escalabilidade, flexibilidade e recursos abrangentes. Esta ferramenta de nível empresarial permite monitorar uma "
pubDate: 2024-04-21
updatedDate: 2024-04-21
tags: ["Debian", "Linux", "Zabbix", "Debian 12 Bookworm", "Apache"]
wpId: 1378
draft: false
---

## Instalando o Zabbix 7.0 Beta no Debian 12

## Introdução ao Zabbix 7.0 Beta (Pré-lançamento)

O Zabbix é uma poderosa solução de monitoramento de código aberto, reconhecida por sua escalabilidade, flexibilidade e recursos abrangentes. Esta ferramenta de nível empresarial permite monitorar uma ampla variedade de parâmetros de rede, servidores e serviços, fornecendo insights valiosos sobre o desempenho e a saúde do seu ambiente de TI.

Com um mecanismo flexível de notificação, o Zabbix possibilita configurar alertas personalizados para uma variedade de eventos, desde problemas de conectividade até falhas de serviço, permitindo uma resposta rápida e eficaz. Além disso, os alertas podem ser entregues por e-mail, SMS e até mesmo integrados com plataformas como Telegram, garantindo que a equipe de operações esteja sempre informada e pronta para agir.

A versão 7.0 do Zabbix, atualmente em fase pré-lançamento, traz uma série de novos recursos e aprimoramentos. Embora ainda não seja a versão LTS (Long Term Support) planejada para o segundo trimestre de 2024 (Abr/Mai/Jun), esta versão oferece uma oportunidade emocionante para explorar e experimentar os últimos desenvolvimentos antes do lançamento **[oficial](https://www.zabbix.com/br/rn/rn7.0.0beta2).

Ao seguir este tutorial, você terá a chance de se familiarizar com as novas funcionalidades do Zabbix 7.0 e estar preparado para aproveitar ao máximo os recursos avançados de monitoramento, relatórios e visualização de dados armazenados que o Zabbix tem a oferecer.

## Instalando o Apache

O Apache é um servidor web popular e será usado para hospedar o frontend do Zabbix. Execute o seguinte comando para instalá-lo:

```bash
sudo apt install apache2 apache2-utils -y
```

Ative o módulo rewrite, que será necessário para o funcionamento adequado do Zabbix:

```bash
sudo a2enmod rewrite
```

## Instalando o PHP 8.2

O PHP é uma linguagem de script amplamente utilizada e necessária para executar o frontend do Zabbix.  
Instale o PHP 8.2 e suas extensões necessárias com o seguinte comando:

```bash
sudo apt -y install --no-install-recommends 
php php-{fpm,cli,mysql,pear,gd,gmp,bcmath,mbstring,curl,xml,zip,json,pgsql}
```

Abra o arquivo de configuração do PHP para ajustar o limite de tempo de execução e o tamanho máximo de upload:

```bash
sudo vim /etc/php/8.2/fpm/php.ini
```

Encontre as linhas `max_execution_time` e `upload_max_filesize` e ajuste-as para:

```bash
max_execution_time = 600
upload_max_filesize = 100M
```

## Instalando o MariaDB

O MariaDB é um sistema de gerenciamento de banco de dados relacional. Instale-o com o seguinte comando:

```bash
sudo apt install mariadb-server -y
```

Acesse o MariaDB e crie o banco de dados e o usuário necessários para o Zabbix:

```bash
sudo mysql -uroot -p
```

```bash
create database zabbix character set utf8mb4 collate utf8mb4_bin;
create user zabbix@localhost identified by '87654321';
grant all privileges on zabbix.* to zabbix@localhost;
set global log_bin_trust_function_creators = 1;
quit;
```

Desative a opção `log_bin_trust_function_creators` no MariaDB:

```bash
sudo mysql -uroot -p
```

```bash
set global log_bin_trust_function_creators = 0;
quit;
```

Importe o esquema inicial e os dados:

```bash
sudo zcat /usr/share/doc/zabbix-sql-scripts/mysql/server.sql.gz | sudo mysql -uzabbix -p zabbix
```

Edite o arquivo de configuração do Zabbix Server para informar os dados de conexão do MariaDB:

```bash
sudo vim /etc/zabbix/zabbix_server.conf
```

Descomente e insira a senha onde encontrar `#DBPassword=` e configure a senha que criou anteriormente.

## Ajustes adicionais

Configure o fuso horário e o tamanho máximo de upload no PHP no arquivo de configuração do Apache:

```bash
sudo vim /etc/zabbix/apache.conf
```

Adicione as seguintes linhas:

```bash
php_value[date.timezone] = America/Sao_Paulo
php_value[upload_max_filesize] = 100M
```

## Instalando o Zabbix 7.0 Beta (Pré-lançamento)

Adicione o repositório oficial do Zabbix 7.0 pré-lançamento:

```bash
wget https://repo.zabbix.com/zabbix/6.5/debian/pool/main/z/zabbix-release/zabbix-release_6.5-1+debian12_all.deb
sudo dpkg -i zabbix-release_6.5-1+debian12_all.deb
sudo apt update
```

Instale o Zabbix Server, Frontend e Agent:

```bash
sudo apt install zabbix-server-mysql zabbix-frontend-php zabbix-apache-conf zabbix-sql-scripts zabbix-agent -y
```

## Habilitando e reiniciando o Zabbix

Habilite o Zabbix para iniciar com o sistema:

```bash
sudo systemctl restart zabbix-server zabbix-agent apache2
```

Reinicie os serviços do Zabbix e do Apache:

```bash
sudo systemctl restart zabbix-server zabbix-agent apache2
```

## Acesso ao Zabbix

Abra um navegador da web e acesse:

Selecionar o idioma e clicar em próximo passo.

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/04/zabbix7_02.png)

Verificar se todos os pré-requisitos foram atendidos e clicar em próximo passo.

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/04/zabbix7_03.png)

Selecionar o tipo de banco de dados Mysql, informar usuário e senha e clicar em próximo passo.

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/04/zabbix7_04.png)

Configurar o nome para o servidor, selecionar o tema e clicar em próximo passo.

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/04/zabbix7_05.png)

Conferir o sumário da pré-instalação e se estiver correto, clicar em próximo passo.

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/04/zabbix7_06.png)

Pronto! O Zabbix 6.4 foi instalado com sucesso!

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/04/zabbix7_07.png)

Agora é só logar no zabbix e iniciar as configurações.  
_**usuário: Admin**_  
_**senha: zabbix**_

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/04/zabbix7_08.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2024/04/zabbix7_09.png)

## Conclusão:  
## Agora você tem o Zabbix 7.0 Beta (Pré-lançamento) instalado e pronto para uso em seu servidor Debian 12. Esta é uma versão pré-lançamento, portanto, esteja ciente de possíveis problemas e atualizações futuras.

## Agradeço por ler esse artigo e espero vê-lo novamente em breve. Continue nos acompanhando para mais conteúdo relevante e inspirador. Até a próxima!
