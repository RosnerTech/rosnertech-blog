---
title: "Configurar NTP Client no Mikrotik"
description: "O NTP, ou Network Time Protocol, é um protocolo usado para sincronizar os relógios de computadores em uma rede. Surpreendentemente, você pode aplicar o termo NTP tanto ao protocolo em si quanto aos ap"
pubDate: 2023-12-27
updatedDate: 2024-01-12
tags: ["Mikrotik"]
wpId: 1204
draft: false
---

## Configurar NTP Client no Mikrotik

  
## O que é o NTP?

O NTP, ou Network Time Protocol, é um protocolo usado para sincronizar os relógios de computadores em uma rede. Surpreendentemente, você pode aplicar o termo NTP tanto ao protocolo em si quanto aos aplicativos cliente-servidor que são executados em computadores.

## Por que usar o NTP?

Existem muitos cenários em que é importante ter um tempo preciso em todos os computadores da sua rede. Por exemplo, certos procedimentos distribuídos dependem de tempos de computador sincronizados com precisão de frações de segundo, caso contrário, sequências inadequadas podem ocorrer. Além disso, alguns mecanismos de segurança também dependem de uma temporização consistente dentro da rede.

## Configurando o Protocolo de Tempo de Rede (NTP) no seu roteador MikroTik:

Passo 1: Acessar o Winbox

Abra o Winbox e conecte-se ao seu roteador MikroTik.

Antes de prosseguir, altere a time zone. Vá para System > Clock. Em "Time Zone Name", selecione America/Sao\_Paulo.

Ajuste outras configurações, se necessário.

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/12/winbox_02.png)

## Passo 2: Navegar até a seção "System"

No painel lateral esquerdo, clique em "System".

## Passo 3: Configurar o SNTP

Em "System", clique em "SNTP Client".

## Passo 4: Adicionar Servidores SNTP

Clique em Enable para habilitar e digite o endereço do servidor NTP; pode ser o IP ou o nome, pois o Mikrotik converte automaticamente para IP após aplicar.

## Passo 5: Configurar Servidores NTP

 Na janela de configuração, adicione pelo menos dois servidores NTP confiáveis, por exemplo:  
## _\- Primary NTP Server: 200.160.7.186_**  
## _\- Secondary NTP Server: 200.20.186.76_

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/12/winbox_03.png)

Ajuste outras configurações, se necessário.

## Passo 6: Aplicar Configurações

Clique em "Apply" para aplicar as configurações de NTP.

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/12/winbox_04.png)

## Passo 7: Verificar Status do NTP

Volte para o painel principal do Winbox e clique em "Log".

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/12/winbox_05.png)

## Passo 8: Verificar Clock

Vá em System > Clock.

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/12/winbox_06.png)

## Agora você configurou com sucesso o NTP no seu roteador MikroTik! Certifique-se de verificar periodicamente o status da sincronização NTP para garantir que a hora do seu dispositivo permaneça precisa.

Agradeço por ler esse artigo e espero vê-lo novamente em breve. Continue nos acompanhando para mais conteúdo relevante e inspirador. Até a próxima!
