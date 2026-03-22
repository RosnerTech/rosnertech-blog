---
title: "Instalar Nginx e PHP 8.2 no Debian 12"
description: "O Nginx é um servidor web de código aberto conhecido por sua alta performance e escalabilidade. Ele é amplamente utilizado como proxy reverso e balanceador de carga, oferecendo um processamento eficie"
pubDate: 2023-07-02
updatedDate: 2023-09-23
tags: ["Debian", "Servidor Web", "Nginx", "Linux"]
wpId: 648
draft: false
---

## Instalar Nginx e PHP 8.2 no Debian 12

O Nginx é um servidor web de código aberto conhecido por sua alta performance e escalabilidade. Ele é amplamente utilizado como proxy reverso e balanceador de carga, oferecendo um processamento eficiente de requisições HTTP e HTTPS. O Nginx é apreciado por sua configuração flexível e modularidade, permitindo o suporte a recursos avançados, como cache, compressão e autenticação. Sua arquitetura assíncrona garante um consumo eficiente de recursos e alta tolerância a falhas. Com essas características, o Nginx é uma escolha popular para impulsionar a entrega de conteúdo na web.

## Instalando o Nginx no Debian 12.

Atualização do sistema.

```bash
sudo apt update
sudo apt upgrade
```

## Instalação do Nginx.

```bash
sudo apt install nginx
```

## Inicializar e habilitar o serviço Nginx.

```bash
sudo systemctl start nginx
sudo systemctl enable nginx
```

## Verificar se o Nginx está em execução.

```bash
sudo systemctl status nginx
```

## Agora que o Nginx está instalado, vamos prosseguir para as boas práticas para remover a assinatura.

Abra o arquivo de configuração padrão do Nginx usando um editor de texto, como o nano:

```bash
sudo nano /etc/nginx/nginx.conf
```

 **Dentro do arquivo, encontre a seção `http` e adicione as seguintes linhas:

```bash
server_tokens off;
```

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/07/nginx-05.png)

## Salve e feche o arquivo.

Reinicie o Nginx para que as alterações entrem em vigor.

```bash
sudo systemctl restart nginx
```

## Com isso, a assinatura do Nginx será removida das respostas do servidor.

Acesse agora em seu navegador http://IP-SERVIDOR/

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/07/nginx-02.png)

## Comandos para Gerenciar o serviço Nginx no Debian 12.

Iniciar o Serviço.

```bash
systemctl start nginx
```

## Verificar o status do Serviço.

```bash
systemctl status nginx
```

## Reiniciar o Serviço.

```bash
systemctl restart nginx
```

## Instalação do PHP 8.2.

Adicione o repositório do PHP.

```bash
sudo apt install apt-transport-https lsb-release ca-certificates
wget -O /etc/apt/trusted.gpg.d/php.gpg https://packages.sury.org/php/apt.gpg
echo "deb https://packages.sury.org/php/ $(lsb_release -sc) main" | sudo tee /etc/apt/sources.list.d/php.list
```

## Atualize a lista de pacotes e instale o PHP 8.2 e os módulos necessários:

```bash
sudo apt update
sudo apt install php8.2 php8.2-fpm php8.2-mysql
```

## Verificar a versão instalada do PHP.

```bash
php -v
```

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/07/nginx-04.png)

## Neste post, forneci um guia passo a passo sobre como realizar uma instalação do Nginx e PHP 8.2 no Debian 12 Bookworm. Com essas instruções, você agora tem um servidor web instalado.

Agradeço por ler esse artigo e espero vê-lo novamente em breve. Continue nos acompanhando para mais conteúdo relevante e inspirador. Até a próxima!
