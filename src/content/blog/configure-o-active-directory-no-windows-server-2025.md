---
title: "Configure o Active Directory no Windows Server 2025"
description: "O Active Directory (AD) é uma tecnologia fundamental em redes corporativas, usada para gerenciar e organizar os recursos de TI, como usuários, computadores e outros dispositivos. Ele é a espinha dorsa"
pubDate: 2024-11-21
updatedDate: 2024-11-21
tags: ["Windows", "Server 2025", "Proxmox"]
wpId: 1726
draft: false
---

## Configure o Active Directory no Windows Server 2025

O **Active Directory (AD)** é uma tecnologia fundamental em redes corporativas, usada para gerenciar e organizar os recursos de TI, como usuários, computadores e outros dispositivos. Ele é a espinha dorsal para autenticação e autorização dentro de um ambiente Windows, permitindo que os administradores controlem os acessos aos recursos e políticas de segurança.

Neste tutorial, você aprenderá como configurar o Active Directory no **Windows Server 2025**, criando um **Controlador de Domínio** para gerenciar a rede de sua organização. Além disso, explicaremos os conceitos importantes como **domínio**, **floresta** e a importância de utilizar um **IP fixo** para servidores.

## O que é Active Directory?

O **Active Directory** (AD) é um serviço da Microsoft para gestão de redes. Ele organiza e controla os objetos na rede, incluindo usuários, computadores, dispositivos, permissões de acesso e políticas de segurança. Sua principal finalidade é centralizar a administração e facilitar a autenticação, autorização e administração de recursos em um ambiente Windows.

## Vantagens do Active Directory:

-   **Gerenciamento Centralizado:** Administra todos os recursos de uma rede de maneira centralizada.
    
-   **Autenticação e Autorização:** Facilita o controle de quem tem acesso aos recursos e serviços na rede.
    
-   **Escalabilidade:** Suporta redes de qualquer tamanho, desde pequenos escritórios até grandes corporações.
    
-   **Segurança:** Permite a configuração de políticas de segurança de forma centralizada.
    

## O que é um Domínio?

O **domínio** é uma coleção de objetos (como computadores, usuários e impressoras) que compartilham um banco de dados centralizado no Active Directory. Um **Controlador de Domínio** é o servidor que contém as informações de autenticação para todos os objetos dentro de um domínio.

O domínio será **rosnertech.lab**, e ele será utilizado para gerenciar todos os dispositivos e usuários da sua rede.

## Por que utilizar IP Fixo no Servidor?

Por ser um servidor de **Controlador de Domínio**, é essencial que ele tenha um **IP fixo**. Isso se deve ao fato de que:

-   **DNS:** O controlador de domínio usa o DNS para autenticar e localizar outros servidores e dispositivos na rede.
    
-   **Estabilidade:** Um IP fixo garante que o endereço do servidor não mude, evitando problemas com a conectividade de dispositivos e clientes.
    

Você pode configurar o IP fixo através das **Configurações de Rede** no **Painel de Controle** ou via **Configurações de Rede** no **Server Manager**.

## Configuração do IP Fixo

Antes de iniciar a instalação do Active Directory, você precisa configurar um IP fixo para o servidor. Abra o **Server Manager** e vá até **Local Server**. Em seguida, clique em **Ethernet** (ou o adaptador de rede correspondente) e configure o IP estático.

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/11/AD_01.png)

## Abrir o Server Manager e Adicionar Roles  
  
## Abra o **Server Manager** no Windows Server 2025.  
No painel à esquerda, clique em **Add Roles and Features**.

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/11/AD_02.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2024/11/AD_03.png)

Clique em **Next** para prosseguir.

Selecione **Role-based or feature-based installation** e clique em **Next**.

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/11/AD_04.png)

Selecione o servidor que você deseja configurar e clique em **Next**.

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/11/AD_05.png)

## Selecionar a Função Active Directory Domain Services (AD DS)  
  
## Na tela **Select server roles**, marque a opção **Active Directory Domain Services**.  
O assistente exibirá uma janela pop-up pedindo para adicionar recursos necessários. Clique em **Add Features**.

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/11/AD_07.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2024/11/AD_06.png)

Clique em **Next**.

## Confirmar e Instalar a Função  
  
## Na tela **Select features**, clique em **Next** sem fazer nenhuma alteração.  
Na tela **Active Directory Domain Services**, clique em **Next**.

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/11/AD_08.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2024/11/AD_09.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2024/11/AD_10.png)

Na tela **Confirm installation selections**, clique em **Install**.

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/11/AD_10_1.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2024/11/AD_11.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2024/11/AD_12.png)

## Promover o Servidor a Controlador de Domínio

Após a instalação do AD DS, você precisará promover o servidor para **Controlador de Domínio**:  
No Server Manager, clique na notificação que aparece no canto superior direito e selecione **Promote this server to a domain controller**.

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/11/AD_13.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2024/11/AD_14.png)

## Criar uma Nova Floresta e Definir o Domínio  
  
## Selecione a opção **Add a new forest**.  
Digite o nome do **domínio** (neste caso, **rosnertech.lab**) e clique em **Next**.

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/11/AD_15.png)

## Configurações de DNS e Catálogo Global  
  
## Deixe marcada a opção **Domain Name System (DNS) Server** e **Global Catalog**.  
Digite uma senha para o **Directory Services Restore Mode (DSRM)**. Essa senha é usada para recuperação em modo de diretório.

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/11/AD_16.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2024/11/AD_17.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2024/11/AD_18.png)

Clique em **Next**.

## Configuração de Caminho de Banco de Dados

Deixe os caminhos padrão para os arquivos de banco de dados, log e SYSVOL. Clique em **Next**.

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/11/AD_19.png)

## Verificar as Configurações e Instalar  
  
## Revise todas as configurações e clique em **Next**.  
Clique em **Install** para iniciar o processo de promoção do servidor.

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/11/AD_20.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2024/11/AD_21.png)

## Reinicialização

Após a conclusão da instalação, o servidor será reiniciado automaticamente.

## Conclusão:  

Após a reinicialização, o seu servidor estará promovido a um **Controlador de Domínio** e você poderá gerenciar os usuários, computadores e outras funcionalidades através do **Active Directory**. Lembre-se de que o **IP fixo** é essencial para garantir que o servidor esteja sempre acessível de forma estável.

Agora, você pode começar a configurar os usuários e computadores no domínio **rosnertech.lab** e aplicar políticas de segurança e acesso conforme necessário.

## Agradeço por ler esse artigo e espero vê-lo novamente em breve. Continue nos acompanhando para mais conteúdo relevante e inspirador. Até a próxima!
