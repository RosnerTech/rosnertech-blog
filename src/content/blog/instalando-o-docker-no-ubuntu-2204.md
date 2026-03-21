---
title: "Instalando o Docker no Ubuntu 22.04"
description: "O Docker é uma plataforma de conteinerização extremamente popular que permite que os desenvolvedores criem e implantem aplicativos dentro de contêineres."
pubDate: 2023-02-14
updatedDate: 2023-08-13
tags: ["Ubuntu", "Docker"]
wpId: 400
draft: false
---

/\*! elementor - v3.14.0 - 26-06-2023 \*/ .elementor-heading-title{padding:0;margin:0;line-height:1}.elementor-widget-heading .elementor-heading-title\[class\*=elementor-size-\]>a{color:inherit;font-size:inherit;line-height:inherit}.elementor-widget-heading .elementor-heading-title.elementor-size-small{font-size:15px}.elementor-widget-heading .elementor-heading-title.elementor-size-medium{font-size:19px}.elementor-widget-heading .elementor-heading-title.elementor-size-large{font-size:29px}.elementor-widget-heading .elementor-heading-title.elementor-size-xl{font-size:39px}.elementor-widget-heading .elementor-heading-title.elementor-size-xxl{font-size:59px}

## Instalando o Docker no Ubuntu 22.04

O Docker é uma plataforma de conteinerização extremamente popular que permite que os desenvolvedores criem e implantem aplicativos dentro de contêineres. Os contêineres são ambientes isolados que empacotam um aplicativo inteiro junto com suas dependências, bibliotecas, arquivos de configuração e tudo o que é necessário para executá-lo independentemente do ambiente de computação.

## Atualizando o Sistema.

```bash
sudo apt update && apt upgrade
```

## Instalando as Dependências.

Algumas dependências são necessárias para que a instalação ocorra sem problemas.

```bash
sudo apt install apt-transport-https curl gnupg-agent ca-certificates software-properties-common -y
```

## Instalando o Docker no Ubuntu 22.04.

Com os requisitos instalados, a próxima etapa é instalar o Docker. Instalaremos o Docker Community Edition ( Docker CE ), que é de código aberto e gratuito para download e uso.

Para fazer isso, adicionaremos a chave GPGK

```bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
```

Como o Ubuntu 22.04 ainda não foi lançado oficialmente, adicione o repositório para o Ubuntu 20.04 Stable.

```bash
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"
```

Com a chave GPG e o repositório adicionados, execute o comando a seguir para instalar o Docker e os pacotes associados.

```bash
sudo apt install docker-ce docker-ce-cli containerd.io -y
```

Isso instala o Docker e todos os pacotes, bibliotecas e dependências adicionais exigidos pelo Docker e pacotes associados.

Depois que o comando for executado com êxito, considere adicionar o usuário conectado no momento ao grupo docker. Isso permite que você execute o docker sem invocar o sudo

```bash
sudo usermod -aG docker $USER
newgrp docker
```

Verificando a versão do Docker

```bash
docker --version
```

/\*! elementor - v3.14.0 - 26-06-2023 \*/ .elementor-widget-image{text-align:center}.elementor-widget-image a{display:inline-block}.elementor-widget-image a img\[src$=".svg"\]{width:48px}.elementor-widget-image img{vertical-align:middle;display:inline-block} ![](https://blog.rosnertech.com.br/wp-content/uploads/2023/02/docker-02.png)

## Instalando Docker Compose.

O Docker Compose é uma ferramenta simples que fornece uma maneira de orquestrar vários contêineres para trabalharem juntos, o que torna a implantação usando um yaml arquivo.  
Depois de instalar o Docker, você pode prosseguir com a instalação do Docker Compose.

```bash
sudo curl -L https://github.com/docker/compose/releases/download/v2.5.0/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
```

## Configure as permissões corretas para o arquivo baixado.

```bash
sudo chmod +x /usr/local/bin/docker-compose
```

Verifique a instalação usando o comando a seguir.

```bash
docker-compose --version
```

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/02/docker-03.png)

Agora o Docker Compose foi instalado com sucesso e você pode começar a executar contêineres.

Nesse post ensinei como instalar o Docker no Ubuntu 22.04.
