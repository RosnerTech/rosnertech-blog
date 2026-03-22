---
title: "Instalando o Speedtest CLI no pfSense"
description: "O Speedtest CLI traz a tecnologia confiável e a rede global de servidores por trás do Speedtest para a linha de comando. Construído para desenvolvedores de software, administradores de sistemas e entu"
pubDate: 2024-04-17
updatedDate: 2024-04-17
tags: ["PfSense"]
wpId: 1372
draft: false
---

## Instalando o Speedtest CLI no pfSense: Teste a Velocidade da sua Conexão diretamente do Terminal

A Speedtest CLI traz a tecnologia confiável e a rede global de servidores por trás do Speedtest para a linha de comando. Construído para desenvolvedores de software, administradores de sistemas e entusiastas de computadores, o Speedtest CLI é o primeiro aplicativo oficial do Speedtest nativo Linux apoiado pelo Ookla Site aplicação: https://www.speedtest.net/apps/cli

## Para instalar o Speedtest CLI no seu pfSense, siga estas etapas:

Primeiro, abra o shell do pfSense ou acesse-o via SSH, usando o Putty ou outra ferramenta de sua preferência.

Verifique se o Python está instalado executando o seguinte comando:

```bash
pkg version | grep python
```

Se o Python não estiver instalado, você precisará instalá-lo. Caso contrário, prossiga para o próximo passo.

Agora, vamos baixar o Speedtest CLI. Execute os seguintes comandos:

```bash
cd /tmp/
fetch https://github.com/sivel/speedtest-cli/archive/master.zip
unzip master.zip
cd speedtest-cli-master/
chmod 755 speedtest_cli.py
mv speedtest_cli.py /usr/bin
```

Agora que o Speedtest CLI está instalado, você pode testá-lo usando o seguinte comando, substituindo `IP_INTERFACE` pelo endereço IP da interface que você deseja usar:

```bash
/usr/bin/speedtest-cli --source IP_INTERFACE
```

## Conclusão:

 Agora você instalou com sucesso o Speedtest CLI no seu pfSense e pode usá-lo para testar a velocidade da sua conexão.

## Agradeço por ler esse artigo e espero vê-lo novamente em breve. Continue nos acompanhando para mais conteúdo relevante e inspirador. Até a próxima!
