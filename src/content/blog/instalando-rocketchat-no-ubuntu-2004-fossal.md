---
title: "Instalando Rocket.chat no Ubuntu 20.04 (Fossal)"
description: "O Rocket.Chat é uma plataforma de comunicação para equipe de código aberto ( software open source) e com ele sua empresa pode substituir o e-mail por uma plataforma de comunicação em tempo real e cent"
pubDate: 2023-02-14
updatedDate: 2023-08-13
tags: ["Ubuntu", "Linux", "Rocket.Chat"]
wpId: 439
draft: false
---

/\*! elementor - v3.14.0 - 26-06-2023 \*/ .elementor-heading-title{padding:0;margin:0;line-height:1}.elementor-widget-heading .elementor-heading-title\[class\*=elementor-size-\]>a{color:inherit;font-size:inherit;line-height:inherit}.elementor-widget-heading .elementor-heading-title.elementor-size-small{font-size:15px}.elementor-widget-heading .elementor-heading-title.elementor-size-medium{font-size:19px}.elementor-widget-heading .elementor-heading-title.elementor-size-large{font-size:29px}.elementor-widget-heading .elementor-heading-title.elementor-size-xl{font-size:39px}.elementor-widget-heading .elementor-heading-title.elementor-size-xxl{font-size:59px}

## Instalando Rocket.chat no Ubuntu 20.04

O **Rocket.Chat** é uma plataforma de comunicação para equipe de código aberto ( software open source) e com ele sua empresa pode substituir o e-mail por uma plataforma de comunicação em tempo real e centralizada.

## Requisitos:**  
MongoDB – 5.0 ([Tutorial Instalação](https://rosnertech.com.br/instalando-mongodb-5-0-no-ubuntu-20-04/))  
Nodejs – 6.14.7 

## Instalando NodeJs

```bash
curl -fsSL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs
```

## Instalar Rocket.chat

instalar os pacotes e dependências necessárias.

```bash
sudo apt install -y curl build-essential graphicsmagick
```

## Baixar a versão mais recente do RocketChat.

```bash
curl -L https://releases.rocket.chat/latest/download -o /tmp/rocket.chat.tgz
tar -xzf /tmp/rocket.chat.tgz -C /tmp
```

## Será instalado no /opt, mas pode ser instalado em qualquer diretório.

```bash
cd /tmp/bundle/programs/server && sudo npm install
sudo mv /tmp/bundle /opt/Rocket.Chat
```

## Configurando o serviço do Rocket.chat

```bash
sudo useradd -M rocketchat && sudo usermod -L rocketchat
sudo chown -R rocketchat:rocketchat /opt/Rocket.Chat
```

## Criando o serviço do Rocket.chat

```bash
cat << EOF |sudo tee -a /etc/systemd/system/rocketchat.service
[Unit]
Description=The Rocket.Chat server
After=network.target remote-fs.target nss-lookup.target nginx.service mongod.service
[Service]
ExecStart=/usr/bin/node /opt/Rocket.Chat/main.js
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=rocketchat
User=rocketchat
Environment=MONGO_URL=mongodb://localhost:27017/rocketchat?replicaSet=rs01 MONGO_OPLOG_URL=mongodb://localhost:27017/local?replicaSet=rs01 ROOT_URL=http://localhost:3000/ PORT=3000
[Install]
WantedBy=multi-user.target
EOF
```

## Configurando o mecanismo de armazenamento, replicação para o MongoDB.

```bash
sudo sed -i "s/^#replication:/replication:n  replSetName: rs01/" /etc/mongod.conf
```

## Reinicie o MongoDB e inicie o conjunto de réplicas

```bash
sudo systemctl restart mongod
```

## Inicie o shell do MongoDB e inicie o conjunto de réplicas.

```bash
mongo
> rs.initiate()
```

## A saída do comando deve ficar assim.

```bash
{
    "info2" : "no configuration specified. Using a default configuration for the set",
    "me" : "127.0.0.1:27017",
    "ok" : 1,
    "operationTime" : Timestamp(1538772048, 1),
    "$clusterTime" : {
        "clusterTime" : Timestamp(1538772048, 1),
        "signature" : {
            "hash" : BinData(0,"AAAAAAAAAAAAAAAAAAAAAAAAAAA="),
            "keyId" : NumberLong(0)
        }
    }
}
rs01:SECONDARY>
```

## Iniciando o serviço do Rocket.chat

```bash
sudo systemctl enable rocketchat && sudo systemctl start rocketchat
```

## Verificando o status do serviço

```bash
systemctl status rocketchat
```

/\*! elementor - v3.14.0 - 26-06-2023 \*/ .elementor-widget-image{text-align:center}.elementor-widget-image a{display:inline-block}.elementor-widget-image a img\[src$=".svg"\]{width:48px}.elementor-widget-image img{vertical-align:middle;display:inline-block} ![](https://blog.rosnertech.com.br/wp-content/uploads/2023/02/service_rocket.png)

Agora acessaremos o navegador http://ipdoservidor:3000 e continuaremos com as configurações utilizando o assistente de configuração.

## Neste tutorial ensinei a instalação do Rocket.Chat no Ubuntu 20.04 – Fossal.
