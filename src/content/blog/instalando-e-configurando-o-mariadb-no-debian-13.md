---
title: "Instalando e Configurando o MariaDB no Debian 13"
description: "O MariaDB é um dos bancos de dados mais usados no mundo, conhecido pela sua performance e compatibilidade com MySQL."
pubDate: 2025-08-22
updatedDate: 2025-08-22
tags: ["Linux", "MariaDB", "Debian 13 Trixie", "Mariadb", "Debian 13"]
wpId: 2105
draft: false
---

## Instalando e Configurando o MariaDB no Debian 13 (com explicação do root)

O **MariaDB** é um dos bancos de dados mais usados no mundo, conhecido pela sua performance e compatibilidade com MySQL.  
No **Debian 13 (Trixie)**, a instalação do MariaDB passou por mudanças importantes: o utilitário `mysql_secure_installation` já não é incluído por padrão, e a autenticação do usuário root é feita de forma diferente.

Neste tutorial, você vai aprender a instalar o MariaDB 11.8.3, entender como funciona a autenticação do root e aplicar boas práticas de segurança criando usuários específicos para suas aplicações.

###### **Instalar o MariaDB no Debian 13

Atualize o sistema e instale o MariaDB:

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install mariadb-server mariadb-client -y
```

Verifique a versão instalada:

```bash
mariadb --version
```

###### **Iniciar e habilitar o serviço

```bash
sudo systemctl enable mariadb
sudo systemctl start mariadb
```

Verifique o status:

```bash
sudo systemctl status mariadb
```

###### **Acessando o MariaDB como root

Diferente de versões antigas, no Debian 13 o MariaDB usa o **plugin `unix_socket`** para autenticar o usuário root.  
Isso significa que:  
O **root do Linux** pode acessar o MariaDB sem senha.  
O comando abaixo conecta direto:

```bash
sudo mariadb
```

## _Já o comando com senha não vai funcionar, a menos que você configure:_

```bash
mysql -u root -p
```

###### **🔍 Explicação importante:

Root do Linux** → superusuário do sistema.  
## Root do MariaDB** → superusuário do banco de dados.  
No Debian, eles são **vinculados pelo `unix_socket`**, ou seja, só quem tem acesso root ao servidor consegue acessar o banco como root.

###### **Conferindo o método de autenticação

Dentro do console MariaDB:

```bash
SELECT user, host, plugin FROM mysql.user WHERE user='root';
```

Se aparecer `unix_socket`, significa que o root só acessa pelo sistema, sem senha.  
Se preferir usar senha, execute:

```bash
ALTER USER 'root'@'localhost' IDENTIFIED VIA mysql_native_password USING PASSWORD('SenhaForteAqui!');
FLUSH PRIVILEGES;
```

###### **Criando banco de dados e usuários

Sempre crie **usuários específicos para aplicações**, nunca use o root no dia a dia.  
No console MariaDB:

```bash
CREATE DATABASE exemplo_db;
CREATE USER 'exemplo_user'@'localhost' IDENTIFIED BY 'SenhaForteAqui!';
GRANT ALL ON exemplo_db.* TO 'exemplo_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

###### **🔒 Boas práticas de segurança

Mantenha o **root com `unix_socket`** em produção (mais seguro).  
Crie usuários com **permissões limitadas**.  
Nunca dê acesso remoto ao root.  
Use **senhas fortes** para usuários de aplicação.  
Mantenha o sistema e o MariaDB sempre atualizados.

###### **Agora você sabe:

Instalar o MariaDB no Debian 13.  
A diferença entre root do Linux e root do MariaDB.  
Como funciona a autenticação via `unix_socket`.  
Como criar bancos e usuários de forma segura.

Deixe sua opinião nos comentários! Se tiver dúvidas ou sugestões, ficarei feliz em ajudar. E, claro, compartilhe com seus amigos se achar que pode ser útil para eles. 

## Obrigado por acompanhar este guia! 🚀  
##   
 **Até a próxima!
