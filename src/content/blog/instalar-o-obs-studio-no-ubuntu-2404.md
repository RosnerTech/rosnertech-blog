---
title: "Instalar o OBS Studio no Ubuntu 24.04"
description: "O OBS Studio (Open Broadcaster Software Studio) é uma aplicação gratuita e de código aberto para captura de vídeo e transmissão ao vivo."
pubDate: 2024-06-19
updatedDate: 2024-06-19
tags: ["Ubuntu", "Linux", "OBS Studio"]
wpId: 1526
draft: false
---

/\*! elementor - v3.22.0 - 17-06-2024 \*/ .elementor-heading-title{padding:0;margin:0;line-height:1}.elementor-widget-heading .elementor-heading-title\[class\*=elementor-size-\]>a{color:inherit;font-size:inherit;line-height:inherit}.elementor-widget-heading .elementor-heading-title.elementor-size-small{font-size:15px}.elementor-widget-heading .elementor-heading-title.elementor-size-medium{font-size:19px}.elementor-widget-heading .elementor-heading-title.elementor-size-large{font-size:29px}.elementor-widget-heading .elementor-heading-title.elementor-size-xl{font-size:39px}.elementor-widget-heading .elementor-heading-title.elementor-size-xxl{font-size:59px}

## Instalar o OBS Studio no Ubuntu 24.04

## Introdução ao OBS Studio

O OBS Studio (Open Broadcaster Software Studio) é uma aplicação gratuita e de código aberto para captura de vídeo e transmissão ao vivo. Ele é amplamente utilizado por streamers, criadores de conteúdo e profissionais para gravar vídeos, transmitir ao vivo e criar produções multimídia.

## Adicionar o PPA do OBS Studio

Abra o terminal pressionando `Ctrl + Alt + T`.  
Para garantir que o sistema está atualizado, execute o seguinte comando:

```bash
sudo apt update
sudo apt upgrade
```

Agora, adicione o PPA do OBS Studio com o seguinte comando:

```bash
sudo add-apt-repository ppa:obsproject/obs-studio
```

Pressione `Enter` quando for solicitado para confirmar a adição do PPA.

## Instalar o OBS Studio  
## Após adicionar o PPA, atualize novamente a lista de pacotes:

```bash
sudo apt update
```

Agora, instale o OBS Studio com o comando:

```bash
sudo apt install obs-studio
```

Pressione `Y` e depois `Enter` quando for solicitado para confirmar a instalação.  
  
## Executar o OBS Studio  
## Com o OBS Studio instalado, você pode iniciá-lo a partir do terminal digitando:

```bash
obs-studio
```

Alternativamente, você pode procurar por "OBS Studio" no menu de aplicativos do Ubuntu e iniciar a partir daí.

## Configurar e Usar o OBS Studio  
  
## Ao abrir o OBS Studio pela primeira vez, ele pode oferecer a opção de executar um Assistente de Configuração. Siga as instruções para configurar suas preferências de áudio, vídeo e outras configurações básicas.

## Atualizações e Remoção

Para atualizar o OBS Studio no futuro, basta executar os comandos:

```bash
sudo apt update
sudo apt upgrade
```

Se desejar remover o OBS Studio, você pode desinstalá-lo usando:

```bash
sudo apt remove obs-studio
sudo add-apt-repository --remove ppa:obsproject/obs-studio
```

## Conclusão:  

Agora você aprendeu como instalar o OBS Studio no Ubuntu 24.04. O OBS Studio oferece uma poderosa plataforma para captura de vídeo e transmissão ao vivo, ideal para uma variedade de necessidades de gravação e streaming. Explore suas funcionalidades e comece a criar conteúdo de forma eficiente e profissional com esta ferramenta versátil.

Espero que este guia seja útil para você começar com o OBS Studio no seu sistema Ubuntu 24.04!

## Agradeço por ler esse artigo e espero vê-lo novamente em breve. Continue nos acompanhando para mais conteúdo relevante e inspirador. Até a próxima!
