---
title: "Como Adicionar um Novo Disco Rígido ao Proxmox via Interface Web"
description: "Neste tutorial, vamos guiá-lo pelo processo de adicionar um novo disco rígido ao Proxmox VE utilizando a interface web. Siga atentamente os passos abaixo para garantir um procedimento tranquilo e efic"
pubDate: 2024-05-11
updatedDate: 2024-05-14
tags: ["Proxmox"]
wpId: 1435
draft: false
---

## Como Adicionar um Novo Disco Rígido ao Proxmox via Interface Web

Neste tutorial, vamos guiá-lo pelo processo de adicionar um novo disco rígido ao Proxmox VE utilizando a interface web. Siga atentamente os passos abaixo para garantir um procedimento tranquilo e eficiente.

O Proxmox é uma plataforma de virtualização de código aberto baseada no kernel do Linux. Ele permite a criação e gestão de máquinas virtuais e contêineres em um ambiente integrado. Com uma interface web intuitiva, o Proxmox simplifica o gerenciamento de recursos de computação, armazenamento e rede. Além disso, oferece recursos avançados como migração a quente e clustering para alta disponibilidade. Sua flexibilidade e escalabilidade o tornam uma escolha popular para data centers e ambientes de virtualização.

## Acessar o Painel de Controle do Proxmox

Abra o navegador da web e insira o endereço IP do seu servidor Proxmox na barra de endereços.  
Faça login na interface web do Proxmox utilizando suas credenciais de administrador.

## Navegar até a guia de Armazenamento

No painel de controle do Proxmox, clique na aba "Datacenter" no canto superior esquerdo.  
Em seguida, selecione a opção "Disks" no menu lateral esquerdo.

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/05/proxmox_08.png)

## Inicializar o Novo Disco

No meu homelab, estou usando um SSD de 480GB identificado como /**dev/sdb** (você pode ajustar conforme seu ambiente). Vamos inicializá-lo. Para isso:

Localize o disco desejado na lista de dispositivos.  
Clique em "**Initialize Disk with GPT**" e aguarde a conclusão do processo.

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/05/proxmox_01.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2024/05/proxmox_02.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2024/05/proxmox_03.png)

## Adicionar um Diretório para o Novo Disco

Clique no botão "Directory" na barra de ferramentas.  
Selecione "Create: Directory" na lista suspensa para escolher o tipo de armazenamento.  
Selecione o Disco.  
Selecione o sistema de arquivos desejado, como ext4.  
Insira um nome descritivo para o novo disco no campo "Name".  
Clique em "Create" para confirmar e criar o diretório para o disco.

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/05/proxmox_10.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2024/05/proxmox_05.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2024/05/proxmox_06.png)

## Verificar o Novo Disco Rígido

Volte para a aba "Datacenter" e selecione "Node" no menu lateral esquerdo.  
Escolha o nó no qual você deseja verificar o disco rígido.  
Na guia "Disks", você deve visualizar o novo disco rígido listado.

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/05/proxmox_07.png)

## Conclusão:  
## Agora você adicionou com sucesso um novo disco rígido ao seu servidor Proxmox utilizando a interface web. Este disco está pronto para ser utilizado para armazenamento ou outras finalidades conforme sua necessidade.

## Agradeço por ler esse artigo e espero vê-lo novamente em breve. Continue nos acompanhando para mais conteúdo relevante e inspirador. Até a próxima!
