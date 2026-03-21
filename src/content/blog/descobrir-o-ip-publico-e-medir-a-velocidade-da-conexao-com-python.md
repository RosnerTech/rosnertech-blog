---
title: "Descobrir o IP Público e Medir a Velocidade da Conexão com Python."
description: "Python é uma linguagem de programação de alto nível e multiparadigma. É uma linguagem fácil de aprender e usar, e é amplamente utilizada para desenvolvimento de software, ciência de dados e aprendizad"
pubDate: 2024-01-17
updatedDate: 2024-01-17
tags: ["Python"]
wpId: 1220
draft: false
---

/\*! elementor - v3.18.0 - 20-12-2023 \*/ .elementor-heading-title{padding:0;margin:0;line-height:1}.elementor-widget-heading .elementor-heading-title\[class\*=elementor-size-\]>a{color:inherit;font-size:inherit;line-height:inherit}.elementor-widget-heading .elementor-heading-title.elementor-size-small{font-size:15px}.elementor-widget-heading .elementor-heading-title.elementor-size-medium{font-size:19px}.elementor-widget-heading .elementor-heading-title.elementor-size-large{font-size:29px}.elementor-widget-heading .elementor-heading-title.elementor-size-xl{font-size:39px}.elementor-widget-heading .elementor-heading-title.elementor-size-xxl{font-size:59px}

## Descobrir o IP Público e Medir a Velocidade da Conexão com Python, Notificando via Telegram.

## Python** é uma linguagem de programação de alto nível e multiparadigma. É uma linguagem fácil de aprender e usar, e é amplamente utilizada para desenvolvimento de software, ciência de dados e aprendizado de máquina.

## Download** é o processo de transferir um arquivo de um servidor para um computador local. O oposto de download é upload.

## Upload** é o processo de transferir um arquivo de um computador local para um servidor. O oposto de upload é download.

## IP público** é um endereço de rede que identifica um dispositivo conectado à internet. É um número exclusivo que é usado para rotear o tráfego entre dispositivos na internet.

## Objetivo

O objetivo deste tutorial é ensinar como obter o IP público do link e a velocidade do mesmo, utilizando a linguagem Python.

## Requisitos

Python 3.8 ou superior

Pacote `speedtest`

Pacote `requests`

Pacote `telebot`

## Instalação dos pacotes

Abra um terminal e execute os seguintes comandos para instalar os pacotes necessários:

```py
pip install speedtest
pip install requests
pip install telebot
```

## Configurando o bot do Telegram

Para enviar as informações para o Telegram, é necessário criar um bot e obter o seu token. Para isso, acesse o site BotFather: [https://t.me/BotFather](https://t.me/BotFather) e siga as instruções.

Após criar o bot, obtenha o seu token e salve-o em uma variável. Por exemplo:

```py
token = "77888074593:AAHSsFbLOanzNUi3SISBoLX2YoOm"
```

## Definindo o canal do Telegram

O canal do Telegram é o destino das mensagens enviadas pelo bot. Para definir o canal, salve o seu ID em uma variável. Por exemplo:

```py
canalid = -18825778870261
```

## Obtendo o IP público

A função `get_ip()` utiliza a API do ipify.org: [https://ipify.org/](https://ipify.org/) para obter o IP público do link.

```py
def get_ip():
    response = requests.get("https://api.ipify.org")
    return response.text
```

## Verificando a velocidade da internet

A função `verificar_velocidade_internet()` utiliza o pacote `speedtest` para verificar a velocidade da internet.

```py
def verificar_velocidade_internet():
    st = speedtest.Speedtest()
    download_speed = st.download() / 10**6
    upload_speed = st.upload() / 10**6
    return download_speed, upload_speed
```

## Enviando a mensagem

A função `send_message()` utiliza o pacote `telebot` para enviar uma mensagem para o Telegram.

```py
def send_message(chat_id, message):
    bot.send_message(chat_id, message)
```

## Executando o script

A função `main()` executa as funções anteriores e envia as informações para o Telegram.

```py
def main():
    download_speed, upload_speed = verificar_velocidade_internet()
    print(f'Velocidade de Download: {download_speed:.2f} Mbps')
    print(f'Velocidade de Upload: {upload_speed:.2f} Mbps')
    message = f"Download: {download_speed:.2f} MbpsnUpload: {upload_speed:.2f} Mbps"
    send_message(canalid, message)
if __name__ == '__main__':
    main()
```

## Script Completo

```py
import speedtest
import requests
import telebot
token = "77888074593:AAHSsFbLOanzNUi3SISBoLX2YoOm"
canalid = -18825778870261
def get_ip():
    response = requests.get("https://api.ipify.org")
    return response.text
def verificar_velocidade_internet():
    st = speedtest.Speedtest()
    download_speed = st.download() / 10**6
    upload_speed = st.upload() / 10**6
    return download_speed, upload_speed
def send_message(chat_id, message):
    bot.send_message(chat_id, message)
def main():
    download_speed, upload_speed = verificar_velocidade_internet()
    print(f'Velocidade de Download: {download_speed:.2f} Mbps')
    print(f'Velocidade de Upload: {upload_speed:.2f} Mbps')
    message = f"Download: {download_speed:.2f} MbpsnUpload: {upload_speed:.2f} Mbps"
    send_message(canalid, message)
if __name__ == '__main__':
    main()
```

## Exemplo de uso

Após configurar o bot e o canal, execute o script.  
O script irá verificar a velocidade da internet e enviar as informações para o canal do Telegram. Por exemplo:

```py
Velocidade de Download: 100.0 Mbps
Velocidade de Upload: 20.0 Mbps
```

## Personalizando o script

O script pode ser personalizado de acordo com as suas necessidades. Por exemplo, você pode alterar a frequência das verificações, a mensagem enviada para o Telegram ou o formato das informações.

## Espero que este tutorial tenha sido útil.

Agradeço por ler esse artigo e espero vê-lo novamente em breve. Continue nos acompanhando para mais conteúdo relevante e inspirador. Até a próxima!
