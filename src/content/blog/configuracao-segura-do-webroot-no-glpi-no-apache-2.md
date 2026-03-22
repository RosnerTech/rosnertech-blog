---
title: "Configuração Segura do Webroot no GLPI no Apache 2"
description: "Essa medida ajuda a garantir que arquivos não públicos não possam ser acessados, proporcionando uma camada adicional de segurança."
pubDate: 2023-12-22
updatedDate: 2023-12-22
tags: ["Apache", "GLPI"]
wpId: 1194
draft: false
---

## Configuração Segura do Webroot no GLPI no Apache 2

Neste tutorial, você aprenderá a configurar de maneira segura o diretório raiz do sistema GLPI (a partir da versão 10.0.7) utilizando a recomendação de segurança para a pasta pública. Essa medida ajuda a garantir que arquivos não públicos não possam ser acessados, proporcionando uma camada adicional de segurança.

## Passo 1: Criação do Arquivo de Configuração

Abra o terminal no seu servidor GLPI.

Crie um arquivo de configuração chamado glpi.conf na pasta /etc/apache2/conf-available utilizando o seguinte comando:

```bash
sudo nano /etc/apache2/conf-available/lab.conf
```

Adicione o seguinte conteúdo ao arquivo lab.conf:

```bash
<VirtualHost *:80>
    ServerName servidor.seudominio.com.br
    DocumentRoot /var/www/html/labglpi/public
    <Directory /var/www/html/labglpi/public>
        AllowOverride All
        RewriteEngine On
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteRule ^(.*)$ index.php [QSA,L]
    </Directory>
</VirtualHost>
```

Salve e feche o arquivo.

## Passo 2: Habilitação do Módulo Rewrite no Apache

Habilite o módulo rewrite no Apache com o seguinte comando:

```bash
sudo a2enmod rewrite
```

## Passo 3: Habilitação da Configuração Personalizada

Habilite a configuração personalizada que acabamos de criar com o seguinte comando:

```bash
sudo a2enconf lab.conf
```

## Passo 4: Reinicialização do Servidor Web

Reinicie o servidor web Apache para aplicar as novas configurações:

```bash
sudo service apache2 restart
```

Após seguir esses passos, o diretório raiz do sistema GLPI estará configurado de maneira segura, utilizando a pasta pública para evitar o acesso a arquivos não públicos. Certifique-se de realizar essas etapas com cuidado e verifique se o GLPI continua funcionando corretamente após a implementação das alterações.

## referências: [https://glpi-install.readthedocs.io/pt/latest/prerequisites.html](https://glpi-install.readthedocs.io/pt/latest/prerequisites.html)

Agradeço por ler esse artigo e espero vê-lo novamente em breve. Continue nos acompanhando para mais conteúdo relevante e inspirador. Até a próxima!
