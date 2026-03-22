---
title: "Instalando o Docker no Debian 12 Bookworm"
description: "O Docker é uma plataforma de virtualização de contêineres que permite empacotar, distribuir e executar aplicativos e suas dependências de maneira isolada. Ele simplifica o desenvolvimento e a implanta"
pubDate: 2023-08-14
updatedDate: 2023-09-23
tags: ["Debian", "Docker", "Ubuntu"]
wpId: 756
draft: false
---

## Instalando o Docker no Debian 12 Bookworm

O Docker é uma plataforma de virtualização de contêineres que permite empacotar, distribuir e executar aplicativos e suas dependências de maneira isolada. Ele simplifica o desenvolvimento e a implantação, criando ambientes consistentes em diferentes sistemas, garantindo portabilidade e eficiência no uso de recursos. Cada contêiner é uma unidade leve e autossuficiente, permitindo que aplicativos sejam executados consistentemente em qualquer ambiente compatível com Docker.

O Docker Compose é uma ferramenta que simplifica o gerenciamento de aplicativos compostos por múltiplos contêineres Docker. Ele permite definir e executar configurações de vários contêineres em um único arquivo, automatizando o processo de criação e interconexão desses contêineres. Isso simplifica o desenvolvimento e teste de aplicativos complexos, tornando mais fácil a reprodução de ambientes consistentes.

## Atualizando o Sistema.

```bash
sudo apt update && sudo apt upgrade -y
```

## Instalando as Dependências.

Algumas dependências são necessárias para que a instalação ocorra sem problemas.

```bash
sudo apt install apt-transport-https ca-certificates curl software-properties-common
```

## Instalando o Docker no Debian 12 Bookworm.

Com os requisitos instalados, a próxima etapa é instalar o Docker. Instalaremos o Docker Community Edition ( Docker CE ), que é de código aberto e gratuito para download e uso.

Para fazer isso, adicionaremos a chave GPGK

```bash
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

## Agora iremos instalar o Docker.

```bash
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io -y
```

## Após a instalação, inicie e habilite o serviço do Docker:

```bash
sudo systemctl start docker
sudo systemctl enable docker
```

Depois que o comando for executado com êxito, considere adicionar o usuário conectado no momento ao grupo docker. Isso permite que você execute o docker sem invocar o sudo.

```bash
sudo usermod -aG docker $USER
newgrp docker
```

## Verificando a versão do Docker

```bash
docker --version
```

## Instalando Docker Compose.

O Docker Compose é uma ferramenta simples que fornece uma maneira de orquestrar vários contêineres para trabalharem juntos, o que torna a implantação usando um yaml arquivo.  
Depois de instalar o Docker, você pode prosseguir com a instalação do Docker Compose.

## _Estarei instalando a versão latest._

```bash
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

## Configure as permissões corretas para o arquivo baixado.

```bash
sudo chmod +x /usr/local/bin/docker-compose
```

## Verifique a instalação usando o comando a seguir.

```bash
docker-compose --version
```

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/08/docker-compose-01.png)

## Neste post, apresentei um guia passo a passo sobre como realizar a instalação do Docker e do Docker Compose no Debian 12 Bookworm. Com essas instruções, agora você possui o Docker instalado em seu servidor Debian.

Agradeço por ter lido este artigo e espero revê-lo em breve. Continue nos acompanhando para mais conteúdo relevante e inspirador. Até a próxima!
