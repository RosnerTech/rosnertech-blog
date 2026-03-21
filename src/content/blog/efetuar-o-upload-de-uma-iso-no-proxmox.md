---
title: "Efetuar o Upload de uma ISO no Proxmox"
description: "Um arquivo ISO é uma imagem de disco de CD, DVD ou BD que contém todo o conteúdo de um disco óptico em um único arquivo, seguindo o padrão ISO 9660. Em outras palavras, uma ISO é uma 'imagem' exata de"
pubDate: 2024-08-25
updatedDate: 2024-08-25
tags: ["Proxmox", "OPNSense"]
wpId: 1556
draft: false
---

/\*! elementor - v3.23.0 - 05-08-2024 \*/ .elementor-heading-title{padding:0;margin:0;line-height:1}.elementor-widget-heading .elementor-heading-title\[class\*=elementor-size-\]>a{color:inherit;font-size:inherit;line-height:inherit}.elementor-widget-heading .elementor-heading-title.elementor-size-small{font-size:15px}.elementor-widget-heading .elementor-heading-title.elementor-size-medium{font-size:19px}.elementor-widget-heading .elementor-heading-title.elementor-size-large{font-size:29px}.elementor-widget-heading .elementor-heading-title.elementor-size-xl{font-size:39px}.elementor-widget-heading .elementor-heading-title.elementor-size-xxl{font-size:59px}

## Como Efetuar o Upload de uma ISO no Proxmox

## Introdução

Neste tutorial, você aprenderá como realizar o upload de uma imagem ISO no Proxmox VE para criar uma nova máquina virtual (VM). Vamos usar a ISO do OPNsense como exemplo, mas o procedimento é o mesmo para qualquer ISO.

## O que é um Arquivo ISO?  
## Um arquivo ISO é uma imagem de disco de CD, DVD ou BD que contém todo o conteúdo de um disco óptico em um único arquivo, seguindo o padrão ISO 9660. Em outras palavras, uma ISO é uma "imagem" exata de um disco óptico, como um CD ou DVD. Este tipo de arquivo é amplamente utilizado para distribuir sistemas operacionais, como Linux, BSD, e outros sistemas baseados em Live CD.  
  
A sigla ISO refere-se à Organização Internacional de Padronização (International Organization for Standardization), e o padrão ISO 9660 define o formato de arquivos de CDs.  
Os arquivos ISO são úteis para realizar uma formatação limpa de um sistema operacional, garantindo que o sistema seja instalado "do zero", sem erros ou arquivos residuais. Além disso, são uma alternativa para o instalador automático de sistemas operacionais

## Efetuando o Upload da ISO do OPNsense

Baixar a ISO do OPNsense:

Para baixar a ISO de instalação do OPNsense, consulte o site oficial [OPNsense Download](https://opnsense.org) e selecione a versão desejada. Escolha o arquivo .ISO adequado para sua instalação. Se precisar de mais assistência, entre em contato com o suporte técnico para obter o [link de download](https://opnsense.org/download/) direto.

/\*! elementor - v3.23.0 - 05-08-2024 \*/ .elementor-widget-image{text-align:center}.elementor-widget-image a{display:inline-block}.elementor-widget-image a img\[src$=".svg"\]{width:48px}.elementor-widget-image img{vertical-align:middle;display:inline-block} ![](https://blog.rosnertech.com.br/wp-content/uploads/2024/08/download_opnsense.png)

## Acessar o Proxmox VE:

Acesse a interface web do Proxmox VE através do seu navegador. Insira suas credenciais de login para acessar o painel de controle.

## Selecionar o Armazenamento Local:

No painel de navegação do Proxmox VE, localize e clique no armazenamento local onde deseja fazer o upload da ISO. Geralmente, o armazenamento local é listado como "local" ou pode ter um nome personalizado que você configurou.

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/08/opnsense-01.png)

## Navegar até a Opção 'ISO Imagens':  
## Após selecionar o armazenamento local, clique na aba **ISO Imagens** para visualizar o conteúdo atual desse armazenamento.

## Iniciar o Upload da ISO:  
## Com a aba **ISO Imagens** aberta, clique no botão **Upload**. Isso abrirá uma nova janela onde você poderá escolher o arquivo ISO que deseja fazer o upload.

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/08/opnsense-02.png)

## Selecionar o Tipo de Conteúdo e Arquivo:  
## Na janela de upload, certifique-se de que a opção **ISO Image** está selecionada. Isso é importante, pois estamos subindo uma imagem ISO para criar uma nova VM.

## Escolher o Arquivo ISO:  
## Clique no botão **Select File...** e navegue até o local onde a ISO do OPNsense foi baixada em seu computador. Selecione o arquivo e clique em **Open**.

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/08/opnsense-03.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2024/08/opnsense_06-1024x65.png)

## Fazer o Upload da ISO:  
## Após selecionar o arquivo, clique em **Upload** para iniciar o processo de upload da ISO para o armazenamento local do Proxmox VE.

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/08/opnsense-04.png)

## Verificar a Conclusão do Upload:  
## Quando o upload estiver concluído, você verá o arquivo ISO listado no conteúdo do armazenamento local. Certifique-se de que o arquivo foi carregado corretamente.

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/08/opnsense-05.png)

## Próximos Passos  
## Agora que a ISO do OPNsense está carregada no Proxmox VE, você pode iniciar o processo de criação de sua VM utilizando esta ISO. Basta seguir as etapas de criação de VM no Proxmox, selecionando a ISO do OPNsense como a mídia de instalação.  
Com esses passos, você está pronto para subir sua primeira VM no Proxmox VE utilizando uma imagem ISO. Boa sorte na configuração da sua nova máquina virtual!

## Conclusão:

Efetuar o upload de uma ISO no Proxmox VE é um processo simples e direto, mas é importante seguir cada passo cuidadosamente para garantir que a imagem seja carregada corretamente e esteja pronta para ser utilizada na criação de novas VMs. Ao seguir este tutorial, você assegura que o ambiente de virtualização esteja configurado corretamente, permitindo uma instalação limpa e eficiente do sistema operacional desejado. Assim, você estará melhor preparado para gerenciar seus recursos no Proxmox de forma eficiente e segura.

## Agradeço por ler esse artigo e espero vê-lo novamente em breve. Continue nos acompanhando para mais conteúdo relevante e inspirador. Até a próxima!
