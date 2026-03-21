---
title: "Instalando Grafana Debian 11"
description: "Grafana é uma aplicação web de análise de código aberto multiplataforma e visualização interativa da web."
pubDate: 2023-03-02
updatedDate: 2023-08-13
tags: ["Debian", "Linux", "Grafana"]
wpId: 522
draft: false
---

/\*! elementor - v3.14.0 - 26-06-2023 \*/ .elementor-heading-title{padding:0;margin:0;line-height:1}.elementor-widget-heading .elementor-heading-title\[class\*=elementor-size-\]>a{color:inherit;font-size:inherit;line-height:inherit}.elementor-widget-heading .elementor-heading-title.elementor-size-small{font-size:15px}.elementor-widget-heading .elementor-heading-title.elementor-size-medium{font-size:19px}.elementor-widget-heading .elementor-heading-title.elementor-size-large{font-size:29px}.elementor-widget-heading .elementor-heading-title.elementor-size-xl{font-size:39px}.elementor-widget-heading .elementor-heading-title.elementor-size-xxl{font-size:59px}

## Instalando Grafana no Debian 11

Grafana é uma aplicação web de análise de código aberto multiplataforma e visualização interativa da web. Ele fornece tabelas, gráficos e alertas para a Web quando conectado a fontes de dados suportadas.

Atualizar o sistema.

```bash
apt update
apt upgrade -y
```

Executar os comandos abaixo para baixar a key do repositório e adicionar o mesmo.

```bash
apt install gnupg2
wget -q -O - https://packages.grafana.com/gpg.key | apt-key add -
echo "deb https://packages.grafana.com/oss/deb stable main" | tee -a /etc/apt/sources.list.d/grafana.list
```

Executar os comandos abaixo para atualizar o repositório e instalar o Grafana.

```bash
apt update
apt install grafana
```

Caso necessite alterar a porta padrão _**3000**_, executar esse passo antes de iniciar o Grafana.

```bash
nano /etc/grafana/grafana.ini
```

Localizar _**http\_port**_ e definir a porta de sua escolha.

```bash
nano /etc/grafana/grafana.ini
```

/\*! elementor - v3.14.0 - 26-06-2023 \*/ .elementor-widget-image{text-align:center}.elementor-widget-image a{display:inline-block}.elementor-widget-image a img\[src$=".svg"\]{width:48px}.elementor-widget-image img{vertical-align:middle;display:inline-block} ![](https://blog.rosnertech.com.br/wp-content/uploads/2023/03/grafana_01.png)

Exemplo:

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/03/grafana_02.png)

Configurar o Grafana para iniciar junto com a inicialização do sistema operacional e inicializar o serviço do Grafana.

```bash
systemctl daemon-reload
systemctl enable grafana-server
systemctl start grafana-server
```

Acessar o navegador com o _**IP\_DO\_SEU\_SERVIDOR:3000**_, nesse tutorial não alterei a porta padrão. Usuário é _**admin**_ e senha **_admin_**.

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/03/grafana_03.png)

Após efetuar o primeiro login, será solicitado para alterar a senha, configurar a senha de sua escolha.

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/03/grafana_04.png)

Pronto! O Grafana foi instalado com sucesso!

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/03/grafana_05.png)

## Conclusão:

Com esse post você aprendeu a instalar o Grafana no Debian 11 Bullseye.
