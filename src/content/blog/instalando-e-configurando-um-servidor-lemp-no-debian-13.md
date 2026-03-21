---
title: "Instalando e Configurando um Servidor LEMP no Debian 13"
description: "Você já viu que o LAMP utiliza o Apache como servidor web. O LEMP, por outro lado, substitui o Apache pelo Nginx, que é um servidor web mais leve, rápido e eficiente no uso de recursos."
pubDate: 2025-08-29
updatedDate: 2025-08-29
tags: ["Linux", "Nginx", "Debian 13 Trixie", "Debian 13", "LEMP"]
wpId: 2117
draft: false
---

## Instalando e Configurando um Servidor LEMP no Debian 13

Você já viu que o **LAMP** utiliza o Apache como servidor web.  
O **LEMP**, por outro lado, substitui o Apache pelo **Nginx**, que é um servidor web mais leve, rápido e eficiente no uso de recursos.

A sigla significa:  
## L**: Linux (sistema operacional)  
## E**: Engine-X (Nginx)  
## M**: MariaDB/MySQL (banco de dados)  
## P**: PHP-FPM (processador PHP)

Neste guia, você vai instalar e configurar cada componente passo a passo.

## Atualizar o sistema

Sempre comece garantindo que todos os pacotes estão atualizados:

```bash
sudo apt update && sudo apt upgrade -y
```

## Instalando o Nginx

O **Nginx** será o servidor web. Para instalar:

```bash
sudo apt install nginx -y
```

Depois, habilite e inicie o serviço:

```bash
sudo systemctl enable nginx
sudo systemctl start nginx
```

Agora, abra o navegador e digite o **IP do servidor**.  
Se a instalação deu certo, você verá a página padrão do Nginx (`Welcome to nginx!`).

## Instalando o MariaDB

O banco de dados será o **MariaDB**. Instale com:

```bash
sudo apt install mariadb-server -y
```

Habilite e inicie o serviço:

```bash
sudo systemctl enable mariadb
sudo systemctl start mariadb
```

## Configuração de segurança  
  
## Execute o script:

```bash
sudo mariadb-secure-installation
```

Siga estas respostas:  
## Enter current password for root** → pressione **Enter** (nenhuma senha definida).  
## Switch to unix\_socket authentication** → digite **Y**.  
## Change the root password?** → digite **N**.  
## Remove anonymous users?** → digite **Y**.  
## Disallow root login remotely?** → digite **Y**.  
## Remove test database?** → digite **Y**.  
## Reload privilege tables now?** → digite **Y**.

Seu MariaDB agora está seguro.

## Instalando o PHP-FPM  
  
## Como o Nginx não processa PHP sozinho, você precisa do **PHP-FPM**. Instale com:

```bash
sudo apt install php8.4-fpm php8.4-mysql -y
```

O **php8.4-fpm** é o interpretador PHP que será usado pelo Nginx.  
O **php8.4-mysql** permite que o PHP se conecte ao MariaDB.

Verifique se o serviço está ativo:

```bash
systemctl status php8.4-fpm
```

Se aparecer `active (running)`, está funcionando.

## Configurando o Nginx para rodar PHP  
  
## Agora você precisa dizer ao **Nginx** que ele deve usar o **PHP-FPM** quando encontrar arquivos `.php`.  
Abra o arquivo de configuração padrão do Nginx:

```bash
sudo nano /etc/nginx/sites-available/default
```

Localize o bloco `server { ... }`. Ele vem com várias linhas comentadas (#).  
Você deve **editar o bloco** para ficar assim:

```bash
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    # Aqui fica a pasta onde estarão os arquivos do seu site
    root /var/www/html;
    # Ordem de carregamento: primeiro tenta index.php
    index index.php index.html index.htm;
    server_name _;
    location / {
        try_files $uri $uri/ =404;
    }
    # Este bloco diz ao Nginx como tratar arquivos PHP
    location ~ .php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/run/php/php8.4-fpm.sock;
    }
    # Bloqueia acesso a arquivos .ht (não usados pelo Nginx, mas comuns no Apache)
    location ~ /.ht {
        deny all;
    }
}
```

📌 **O que você alterou aqui?  
## `root /var/www/html;` → definiu a pasta raiz do site.  
`index index.php ...` → colocou `index.php` como prioridade.  
O bloco `location ~ .php$` → configurou o PHP-FPM para processar arquivos `.php`.  
Salve e feche o arquivo (**Ctrl+O, Enter, Ctrl+X**).  
Teste a configuração:

```bash
sudo nginx -t
```

Se aparecer `syntax is ok` e `test is successful`, recarregue o Nginx:

```bash
sudo systemctl reload nginx
```

## Criando uma Página de Teste do PHP

Agora você vai criar uma página para confirmar que o PHP está funcionando com o Nginx.  
Crie o arquivo de teste:

```bash
sudo nano /var/www/html/info.php
```

Adicione o seguinte código:

```bash
<?php
phpinfo();
?>
```

Salve e feche o arquivo.  
No navegador, acesse:

```bash
http://IP_DO_SERVIDOR/info.php
```

Você verá uma página com informações do PHP 8.4.

⚠️ **Muito importante:** Depois do teste, remova o arquivo porque ele expõe detalhes internos do seu servidor:

```bash
http://IP_DO_SERVIDOR/info.php
```

![](https://blog.rosnertech.com.br/wp-content/uploads/2025/08/LEMP.png)

###### **📌 Quando escolher LAMP

Se você está **começando agora** com servidores web.  
Se precisa de **facilidade** na configuração de sistemas (WordPress, Moodle, Joomla, Prestashop etc).  
Se quer usar `.htaccess` para configurações rápidas em subpastas.  
Bom para **sites institucionais, blogs, sistemas internos**.

###### **📌 Quando escolher LEMP

Se você busca **alta performance** e **baixo consumo de memória**.  
Se vai hospedar **sites grandes**, com muito tráfego simultâneo.  
Se pretende rodar **APIs modernas** ou **aplicações em microserviços**.  
Ideal para **aplicações em nuvem** e ambientes escaláveis (Docker, Kubernetes, etc).

###### **✅ Resumo prático:

LAMP** → mais fácil, tradicional, indicado para começar.  
## LEMP** → mais eficiente, indicado para projetos maiores ou quando a performance é prioridade.

###### **🔹 Conclusão

Agora você tem um **servidor LEMP completo**:  
O **Nginx** está servindo páginas web.  
O **PHP-FPM** está processando os scripts PHP.  
O **MariaDB** está rodando e seguro.

Com esse ambiente, você pode instalar e rodar aplicações modernas como **WordPress, Nextcloud, Moodle e Prestashop** de forma otimizada. 🚀
