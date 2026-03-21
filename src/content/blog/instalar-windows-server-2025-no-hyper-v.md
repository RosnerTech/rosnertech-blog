---
title: "Instalar Windows Server 2025 no Hyper-V"
description: "O Windows Server 2025 chega com uma série de inovações voltadas para ambientes corporativos que necessitam de escalabilidade, segurança e integração com soluções modernas, como a IA e a nuvem."
pubDate: 2024-11-05
updatedDate: 2024-11-05
tags: ["Windows", "Server 2022", "Proxmox"]
wpId: 1691
draft: false
---

## Instalar Windows Server 2025 no Hyper-V

O Windows Server 2025 chega com uma série de inovações voltadas para ambientes corporativos que necessitam de escalabilidade, segurança e integração com soluções modernas, como a IA e a nuvem. Esta versão traz um **Active Directory de última geração**, com o novo esquema de versão 90, reforçando a segurança com a adoção de **TLS 1.3 para LDAP** e criptografia AES para alterações de senha. Além disso, métodos mais antigos, como o SAM-RPC, são desativados por padrão, aumentando a proteção das contas de usuário.

Com melhorias no **Hyper-V**, o Windows Server 2025 agora oferece maior suporte para cargas de trabalho intensivas em IA, otimizando a utilização de recursos, especialmente em sistemas NUMA. Isso permite que o Active Directory seja escalado eficientemente em ambientes de grandes empresas.

Outro destaque desta versão é a integração com o **Azure Arc**, facilitando o gerenciamento de servidores locais e em múltiplas nuvens. O recurso oferece flexibilidade para implantar e gerenciar serviços em diferentes ambientes, centralizando tudo na interface do Azure. Além disso, o Windows Server 2025 oferece suporte à **clonagem de blocos** no ReFS (Resilient File System), um grande avanço para o desempenho e eficiência no manuseio de grandes volumes de dados.

## Requisitos:

Baixe o ISO do Windows Server 2025** – Acesse o [Microsoft Evaluation Center](https://go.microsoft.com/fwlink/p/?LinkID=2268694&clcid=0x409&culture=en-us&country=US) para obter o arquivo ISO mais recente.  
## Habilite o Hyper-V** – Caso ainda não tenha feito isso, você precisa habilitar o Hyper-V no Windows:  
Abra o **Gerenciador de Servidores**, selecione **Adicionar Funções e Recursos** e escolha a função **Hyper-V**.

## Criar uma Nova Máquina Virtual

Abra o **Gerenciador do Hyper-V**.  
No menu superior, clique em **Ação** e escolha **Novo > Máquina Virtual**.  
No assistente de criação, defina o nome da máquina virtual e o local onde você quer armazenar os arquivos da VM.  
Na próxima tela, selecione a geração da VM. Para o Windows Server 2025, **escolha Geração 2**, que oferece suporte a UEFI e TPM.

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/11/hyperv-06.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2024/11/hyperv-07.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2024/11/hyperv-08.png)

## Configurar Memória e CPU

Na tela de memória, você vai precisar alocar pelo menos **8 GB de RAM**, embora mais seja recomendado para cargas mais pesadas.  
Configure o número de processadores. Se está em dúvida, comece com **2 núcleos de CPU**.

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/11/hyperv-09.png)

## Configurar a Rede

Selecione o adaptador de rede que sua máquina virtual usará. Se você já tiver um comutador virtual configurado no Hyper-V, selecione-o. Caso contrário, crie um novo comutador usando o **Gerenciador de Comutadores Virtuais**.

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/11/hyperv-10.png)

## Configurar o Armazenamento

Agora você precisa criar um **disco rígido virtual (VHDX)**. O tamanho mínimo recomendado é de **127GB.  
## Na próxima tela, escolha o arquivo **ISO do Windows Server 2025** que você baixou anteriormente como a mídia de instalação.

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/11/disco.png)

## Finalizar a Configuração da VM  

Revise as configurações na tela de resumo.  
Clique em **Concluir** para criar a máquina virtual.

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/11/hyperv-12.png)

## Iniciar a Instalação do Windows Server 2025

No **Gerenciador do Hyper-V**, inicie a VM recém-criada.  
A instalação do Windows Server 2025 será iniciada automaticamente. Siga as instruções de instalação:  
Selecione o idioma, layout do teclado e clique em **Next**.

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/11/win_01.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2024/11/win_02.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2024/11/win_03.png)

## Escolher a Edição e Continuar a Instalação  
  
## Escolha a versão **Windows Server 2025 Datacenter (Desktop Experience)** para ter acesso à interface gráfica.  
Aceite os termos de licença e prossiga com a instalação.

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/11/win_04.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2024/11/win_05.png)

## Instalação de Drivers (se necessário)

Se a instalação não detectar o disco virtual, você precisará carregar os drivers:  
Na tela de seleção do disco, clique em **Load Driver**.  
Navegue até o local dos drivers necessários, como drivers VirtIO para melhorar o desempenho do sistema.

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/11/win_06.png)

Escolha **Install**.

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/11/win_07.png)

## Finalizar a Instalação  
  
## A instalação começará a copiar os arquivos. Após isso, o sistema será reiniciado.  
Configure as opções iniciais, como a criação de uma conta de administrador e as preferências de sistema.

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/11/win_08.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2024/11/win_09.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2024/11/win_10.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2024/11/win_12.png)

## Conclusão:  
## Agora o seu Windows Server 2025 está pronto e instalado no Hyper-V. Você pode continuar a configurá-lo para suas necessidades, como instalar funções adicionais, por exemplo, **Active Directory**, **DNS** ou habilitar o **Hyper-V Replica** para alta disponibilidade.  
  
## Agradeço por ler esse artigo e espero vê-lo novamente em breve. Continue nos acompanhando para mais conteúdo relevante e inspirador. Até a próxima!
