---
title: "Instalando o NetBox no Docker"
description: "O NetBox é uma poderosa ferramenta open source desenvolvida originalmente pela DigitalOcean para documentação e gerenciamento de infraestrutura de rede. Ele é muito utilizado por times de TI, DevOps e"
pubDate: 2025-10-03
updatedDate: 2025-10-03
tags: ["Docker", "Debian 13 Trixie", "NetBox", "Debian 13"]
wpId: 2125
draft: false
---

## Como Instalar o NetBox no Docker

O **NetBox** é uma poderosa ferramenta open source desenvolvida originalmente pela DigitalOcean para **documentação e gerenciamento de infraestrutura de rede**. Ele é muito utilizado por times de TI, DevOps e redes para manter controle de IPAM (IP Address Management), gerenciamento de racks, dispositivos, conexões e até integrações com automação de rede.

Neste guia, vamos instalar o **NetBox utilizando Docker**, de forma prática e rápida. Assim, você consegue colocar o sistema no ar em minutos, sem precisar lidar diretamente com dependências e configurações manuais.

## Requisitos

Antes de começar, você precisa garantir que alguns pré-requisitos estão atendidos:  
## Docker e Docker Compose** instalados  
👉 Se você ainda não tem, confira o tutorial que já publiquei no blog: [Instalando o Docker no Debian 12 Bookworm](https://blog.rosnertech.com.br/arquivos/756)

## Git instalado**  
O Git será usado para clonar o repositório oficial do NetBox Docker.  
Para instalar o Git, use os comandos abaixo (dependendo da sua distro):

```bash
# Debian/Ubuntu
sudo apt update && sudo apt install git -y
# CentOS/RHEL
sudo yum install git -y
# Fedora
sudo dnf install git -y
```

## Sistema operacional compatível

Linux ou macOS são recomendados.  
Também é possível rodar no **Docker Desktop (Windows com backend Linux)** ou via **WSL2**, mas não será abordado neste guia.

## Primeira configuração

O primeiro passo é clonar o repositório oficial do **NetBox Docker** no GitHub.  
Crie um diretório para armazenar o projeto:

```bash
mkdir -p ~/projects && cd ~/projects
```

## Clone o repositório oficial:

```bash
git clone -b release https://github.com/netbox-community/netbox-docker.git
```

Acesse o diretório do projeto:

```bash
cd netbox-docker
```

## Ajustando a configuração

Por padrão, o NetBox usa a porta **8000**. Para definir isso corretamente, vamos criar um arquivo de override:

```bash
cp docker-compose.override.yml.example docker-compose.override.yml
```

Se a porta **8000** já estiver em uso na sua máquina, edite o arquivo `docker-compose.override.yml` e altere para outra porta de sua preferência (exemplo: 8080).

## Subindo o NetBox no Docker

Agora vamos baixar as imagens necessárias e iniciar os containers:  
Puxe as imagens:

```bash
docker compose pull
```

![](https://blog.rosnertech.com.br/wp-content/uploads/2025/10/netbox_01.png)

Suba os containers:

```bash
docker compose up -d
```

![](https://blog.rosnertech.com.br/wp-content/uploads/2025/10/nextbox_02.png)

Durante esse processo, o NetBox vai configurar o banco de dados e inicializar. Pode levar alguns minutos na primeira execução.

## Criando o usuário administrador

Para acessar o painel, você precisa criar um **usuário administrador**.  
No terminal, execute:

```bash
docker compose exec netbox /opt/netbox/netbox/manage.py createsuperuser
```

Depois é só informar:

## Nome de usuário**  
## E-mail**  
## Senha

![](https://blog.rosnertech.com.br/wp-content/uploads/2025/10/netbox_03-1.png)

## Quando tudo estiver pronto, acesse:

👉 [http://localhost:8000](http://localhost:8000)

![](https://blog.rosnertech.com.br/wp-content/uploads/2025/10/netbox_04.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2025/10/netbox_05-scaled.png)

## Parando e iniciando novamente

Para parar os containers

```bash
docker compose stop
```

Para iniciar novamente:

```bash
docker compose start
```

Para parar e remover todos os recursos (⚠️ isso apaga seus dados):

```bash
docker compose down -v
```

###### **🎯 Conclusão

Com esses passos você já tem o **NetBox rodando via Docker** de forma simples e rápida. Ele estará pronto para ser explorado e integrado à sua infraestrutura, servindo como base para um gerenciamento de rede centralizado e eficiente.

👉 Nos próximos artigos, podemos explorar como **personalizar o NetBox**, adicionar **plugins** e até integrá-lo com **automação de rede (Ansible, Nornir, etc.)**.
