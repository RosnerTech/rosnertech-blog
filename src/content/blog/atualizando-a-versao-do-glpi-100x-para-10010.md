---
title: "Atualizando a versão do GLPI 10.0.X para 10.0.10"
description: "A versão 10.0.10 acaba de ser lançada no dia 25 de setembro de 2023! Esta atualização marca a 10ª edição da versão 10 e traz consigo uma série de melhorias importantes que merecem sua atenção."
pubDate: 2023-09-27
updatedDate: 2023-09-27
tags: ["Apache", "Debian", "Docker", "Linux", "GLPI"]
wpId: 1002
draft: false
---

/\*! elementor - v3.16.0 - 20-09-2023 \*/ .elementor-heading-title{padding:0;margin:0;line-height:1}.elementor-widget-heading .elementor-heading-title\[class\*=elementor-size-\]>a{color:inherit;font-size:inherit;line-height:inherit}.elementor-widget-heading .elementor-heading-title.elementor-size-small{font-size:15px}.elementor-widget-heading .elementor-heading-title.elementor-size-medium{font-size:19px}.elementor-widget-heading .elementor-heading-title.elementor-size-large{font-size:29px}.elementor-widget-heading .elementor-heading-title.elementor-size-xl{font-size:39px}.elementor-widget-heading .elementor-heading-title.elementor-size-xxl{font-size:59px}

## Atualizando a versão do GLPI 10.0.X para 10.0.10

A versão 10.0.10 acaba de ser lançada no dia 25 de setembro de 2023! Esta atualização marca a 10ª edição da versão 10 e traz consigo uma série de melhorias importantes que merecem sua atenção.Fazendo uma cópia dos arquivos do GLPI. Antes de iniciar qualquer processo, é fundamental criar uma cópia de segurança de todos os arquivos do seu sistema GLPI.  
Para fazer isso, você pode utilizar os comandos cp ou rsync.

cp -r /caminho/para/seu/glpi /caminho/para/o/diretorio\_de\_backup

Certifique-se de substituir /caminho/para/seu/glpi pelo caminho real para o diretório onde o GLPI está instalado

```bash
cp /var/www/html/glpi/ /var/glpi_bkp
```

## Removendo o GLPI antigo

Certifique-se de ter feito o backup corretamente  
rm /caminho/para/seu/glpi -rf

Certifique-se de substituir /caminho/para/seu/glpi pelo caminho real para o diretório onde o GLPI está instalado

```bash
rm /var/www/html/glpi -rf
```

## Efetuando Backup do banco de dados

Para o banco de dados MySQL/MariaDB, use o comando 'mysqldump'

```bash
mysqldump -u seu_usuario -p sua_base_de_dados > glpi_backup.sql
```

## Baixando e instalando o GLPI

Acesse o site oficial do GLPI para baixar a versão 10.0.10 ou, se preferir, utilize o seguinte comando para fazer o download diretamente para o seu servidor

```bash
cd /tmp
wget https://github.com/glpi-project/glpi/releases/download/10.0.10/glpi-10.0.10.tgz
```

## Descompactando e preparando

Após o download, descompacte o arquivo baixado.

```bash
tar -xvzf glpi-10.0.10.tgz
mv glpi /var/www/html/
```

## Recuperando os arquivos do GLPI antigo

É importante restaurar os arquivos, incluindo "files", "pics" e plugins, do seu backup anterior. Recomendamos também baixar as novas versões dos plugins, caso seja necessário. Use o seguinte comando para copiar os arquivos do diretório de backup para o seu diretório do GLPI

```bash
cp -r /caminho/para/o/diretorio_de_backup /caminho/para/seu/glpi
```

## Alterando as permissões para a pasta do GLPI

Garanta que as permissões para a pasta do GLPI estejam configuradas corretamente.

```bash
chmod 775 /var/www/html/* -Rf
chown www-data:www-data /var/www/html/* -Rf
```

## Configurando o GLPI

Agora, acesse o GLPI pelo seu navegador e siga as instruções nas telas de configuração para concluir o processo de atualização.

## Alterar o seu idioma e clicar em OK.

/\*! elementor - v3.16.0 - 20-09-2023 \*/ .elementor-widget-image{text-align:center}.elementor-widget-image a{display:inline-block}.elementor-widget-image a img\[src$=".svg"\]{width:48px}.elementor-widget-image img{vertical-align:middle;display:inline-block} ![](https://blog.rosnertech.com.br/wp-content/uploads/2023/09/glpi_01.png) **Aceitar os termos de licença e clicar em Continuar.** ![](https://blog.rosnertech.com.br/wp-content/uploads/2023/09/glpi_02.png)

Atenção nesse tela, pois queremos atualizar o ambiente.

## Clicar em Atualizar.

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/09/glpi_03.png)

## Nessa etapa verificamos que todas as extensões estão instaladas. Clicar em continuar. (Caso falte alguma extensão, instalar e depois reiniciar o apache).

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/09/glpi_04.png)

## Configurar as informações da conexão de banco de dados e clicar em continuar.

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/09/glpi_05.png)

## Selecionar o banco glpi ou o banco que está utilizando e clicar em continuar.

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/09/glpi_06.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2023/09/glpi_07.png)

## Verificar se foi selecionado o banco correto e continuar  

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/09/glpi_08.png)

## Faltando arquivo da chave de segurança  

É importante recuperar o arquivo de chave de segurança.

```bash
cp  /caminho/para/seu/glpi /caminho/para/o/diretorio_de_backup
```

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/09/glpi_09.png)

## Banco de dados atualizado com sucesso, clicar em continuar.

Desabilitar a opção Enviar estatística e clicar em Continuar (pois estou utilizando como tutorial).

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/09/glpi_10.png)

## Atualização finalizada, clicar em usar GLPI.

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/09/glpi_11.png) **Você atualizou o GLPI com sucesso. Se você personalizou os logotipos em seu ambiente, é necessário restaurar os arquivos correspondentes

Por motivo de segurança, remover o install.php.

```bash
rm /var/www/html/glpi/install/install.php
```

## Neste post, forneci um guia passo a passo sobre como realizar a atualização do GLPI para versão 10.0.10.

Agradeço por ler esse artigo e espero vê-lo novamente em breve. Continue nos acompanhando para mais conteúdo relevante e inspirador. Até a próxima!
