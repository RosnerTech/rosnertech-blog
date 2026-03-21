---
title: "Como Configurar um Cluster Proxmox entre Dois Hosts"
description: "Um cluster é um grupo de servidores que trabalham juntos para formar uma única unidade, permitindo gerenciar recursos de forma centralizada. No seu caso, você vai agrupar dois servidores Proxmox (pve1"
pubDate: 2025-01-17
updatedDate: 2025-01-17
tags: ["Debian", "Proxmox", "Cluster"]
wpId: 1795
draft: false
---

## Como Configurar um Cluster Proxmox entre Dois Hosts

Neste tutorial, você aprenderá como configurar um **cluster** entre dois servidores Proxmox. Importante: este não é um cluster de **alta disponibilidade**. O objetivo aqui é apenas agrupar dois servidores para facilitar a gestão das máquinas virtuais (VMs).

## O que é um Cluster?  
## Um **cluster** é um grupo de servidores que trabalham juntos para formar uma única unidade, permitindo gerenciar recursos de forma centralizada. No seu caso, você vai agrupar dois servidores Proxmox (pve1 e pve2) em um cluster, o que permitirá gerenciar ambos a partir de uma interface unificada.

Contudo, este **não é um cluster de alta disponibilidade (HA)**. Em um cluster HA, se um servidor falhar, outro assume automaticamente as VMs. Já neste tipo de cluster que você vai configurar, caso um dos servidores falhe, não haverá uma recuperação automática, e as VMs precisam ser gerenciadas manualmente.

## Pré-requisitos

-   Dois servidores Proxmox instalados e configurados.
-   Rede configurada corretamente entre os hosts.

## Passo 1: Acessando o Proxmox  
## Primeiro, acesse os dois servidores Proxmox através do navegador, digitando o IP de cada um no seu navegador para acessar a interface web de administração.

## Passo 2: Criando o Cluster no Primeiro Host (pve1)

Agora que você tem acesso ao Proxmox do primeiro servidor (pve1), vamos iniciar a criação do cluster:

1.  **Acesse o Proxmox** do pve1.
    
2.  No menu à esquerda, clique em **Datacenter**.
    
3.  Na parte superior, clique em **Cluster**.
    
4.  -   **Nome do Cluster**: Escolha um nome único para o seu cluster. Esse nome será utilizado para identificá-lo.
    -   **Rede para o Cluster**: Selecione a rede que você configurou previamente. Esta será a rede usada para a comunicação entre os nós do cluster.
        
        Clique no botão **Create Cluster**.
        
5.  Após preencher os dados, clique em **Create** para criar o cluster.
    

![](https://blog.rosnertech.com.br/wp-content/uploads/2025/01/cluster_01.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2025/01/cluster_02.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2025/01/cluster_03.png)

## Passo 3: Obtendo o Código de Conexão do Cluster

Com o cluster criado no pve1, você agora precisa obter o código de conexão para adicionar o segundo servidor ao cluster:

1.  Ainda no pve1, clique em **Join Information**.
    
2.  Copie o código gerado para o cluster. Esse código será necessário para adicionar o pve2 ao cluster.
    

![](https://blog.rosnertech.com.br/wp-content/uploads/2025/01/cluster_04.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2025/01/cluster_05.png)

## Passo 4: Adicionando o Segundo Host (pve2) ao Cluster

Agora, você vai configurar o pve2 para que ele se conecte ao cluster recém-criado:

1.  Acesse o pve2 via navegador.
    
2.  No menu à esquerda, clique em **Datacenter**.
    
3.  Clique em **Cluster**.
    
4.  Clique no botão **Join Cluster**.
    
    -   **Código de Conexão**: Insira o código que você copiou do pve1.
    -   **Cluster Network**: Selecione a mesma rede que foi configurada no pve1. Isso garantirá que ambos os servidores compartilhem a mesma rede e possam se comunicar corretamente.
5.  Insira a senha do usuário **root** para autenticar a operação e clique em **Join**.
    

![](https://blog.rosnertech.com.br/wp-content/uploads/2025/01/cluster_06.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2025/01/cluster_07.png)

## Passo 5: Verificando o Sucesso da Conexão

Após clicar em **Join**, o pve2 tentará se conectar ao pve1 e integrar-se ao cluster. Se tudo correr bem, você verá uma mensagem de sucesso, similar a esta:

```bash
Establishing API connection with host 'SEU_IP'
Login succeeded.
check cluster join API version
Request addition of this node
Join request OK, finishing setup locally
stopping pve-cluster service
```

![](https://blog.rosnertech.com.br/wp-content/uploads/2025/01/cluster_09.png)

## Conclusão:

Parabéns! Agora você tem um **cluster básico** configurado com dois hosts Proxmox. Como mencionei, **este não é um cluster de alta disponibilidade**. Isso significa que se um dos servidores falhar, você precisará realizar a recuperação manualmente. Nos próximos artigos, abordaremos como configurar o armazenamento compartilhado para as VMs e explorar outras funcionalidades do Proxmox.

## Agradeço por ler esse artigo e espero vê-lo novamente em breve. Continue nos acompanhando para mais conteúdo relevante e inspirador. Até a próxima!
