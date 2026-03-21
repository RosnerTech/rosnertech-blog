---
title: "Instalando o RouterOS CHR no Proxmox"
description: "O RouterOS é um sistema operacional baseado em Linux projetado pela MikroTik para fornecer funcionalidades avançadas de roteamento e rede. Ele suporta uma vasta gama de recursos, como firewall, VPN, b"
pubDate: 2024-12-23
updatedDate: 2024-12-23
tags: ["Debian", "Docker", "Linux", "Docker-Compose", "Kanboard"]
wpId: 1754
draft: false
---

## Instalando o RouterOS CHR no Proxmox

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/12/RouterOS.png)

## O que é RouterOS?  
## O RouterOS é um sistema operacional baseado em Linux projetado pela MikroTik para fornecer funcionalidades avançadas de roteamento e rede. Ele suporta uma vasta gama de recursos, como firewall, VPN, balanceamento de carga e muito mais. A versão CHR (Cloud Hosted Router) é especificamente otimizada para execução em ambientes virtualizados.  
  
## O que é Proxmox?  
## O Proxmox é uma plataforma de virtualização de código aberto que combina KVM (Kernel-based Virtual Machine) e LXC (Linux Containers). Ele é amplamente utilizado por empresas e entusiastas para gerenciar servidores virtualizados com facilidade.  
Neste tutorial, você aprenderá como instalar o RouterOS CHR na versão 7.16.2 no Proxmox.

## Passo 1: Baixando a Imagem do RouterOS CHR  
  
## Acesse o site oficial da MikroTik: [MikroTik Downloads.](https://mikrotik.com/download)  
Na seção "Cloud Hosted Router", selecione a opção "Raw disk image" correspondente à versão 7.16.2.  
Copie o link de download.

## Passo 2: Preparando o Ambiente no Proxmox  
  
## Acesse o console do Proxmox (Shell).  
Instale os pacotes necessários:

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/12/routeros_01_1.png)

```bash
apt-get install unzip
```

Baixe a imagem do RouterOS CHR:

```bash
wget https://download.mikrotik.com/routeros/7.16.2/chr-7.16.2.img.zip
```

Extraia a imagem:

```bash
unzip chr-7.16.2.img.zip
```

Aumente o tamanho do disco:

```bash
qemu-img resize chr-7.16.2.img +5G
```

Importe o disco para o Proxmox:  
Substitua `<VM_ID>` pelo ID que será atribuído à VM.

```bash
qm importdisk <VM_ID> chr-7.16.2.img local-lvm
```

## Passo 3: Criando a Máquina Virtual  
  
## No Proxmox, clique em Create VM (Criar VM).

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/12/routeros_01.png)

## Configure as seguintes opções:

Aba Geral:  
Node: Selecione o nó onde deseja criar a VM.

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/12/routeros_02.png)

## Aba OS:

Escolha "Do not use any media" e clique em Next.

## Aba System:

Deixe as configurações padrão e clique em Next.

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/12/routeros_03.png)

## Aba Disks:

Altere o SCSI Controller para VirtIO SCSI.

Defina o tamanho do disco para 1 GB ou mais, dependendo da necessidade.

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/12/routeros_04.png)

## Aba CPU:

Escolha 1 soquete e 2 núcleos, dependendo da necessidade.

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/12/routeros_05.png)

## Aba Memory:

Aloque pelo menos 256 MB para RouterOS versão 7.x.

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/12/routeros_06.png)

## Aba Network:

Escolha "VirtIO" para otimização de rede.

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/12/routeros_07.png)

## Aba Confirm:

Não marque "Start after created". Clique em Finish.

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/12/routeros_08.png)

## Após a importação, localize a VM na lista do Proxmox.

Configure o disco correto:

Clique em Hardware → Unused Disk 0.  
Altere o Bus/Device para VirtIO Block e clique em Add.  
Remova o disco temporário criado:  
Clique em SCSI 1 → Detach.  
Clique em Unused Disk 0 → Remove.

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/12/routeros_09.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2024/12/routeros_10.png)

## Ajuste a ordem de boot:

Vá para Options → Boot Order.  
Configure local-lvm (scsi0) como a primeira opção.

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/12/routeros_11.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2024/12/routeros_12.png)

## Passo 4: Iniciando a VM

Configure a VM para iniciar automaticamente no boot:  
Clique em Options → Start at boot → Marque como Yes.

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/12/routeros_16.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2024/12/routeros_17.png)

## Abra o console e observe a inicialização do RouterOS CHR.

Quando solicitado, faça login com:  
Usuário: admin  
Senha: (em branco)

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/12/routeros_13.png)

## Passo 5: Verificando Conectividade

Execute o comando para verificar o endereço IP:

```bash
ip address print
```

## Use o endereço IP exibido para acessar o RouterOS via WinBox.

No WinBox:

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/12/routeros_14.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2024/12/routeros_15.png)

## Conclusão:

Agora você tem o RouterOS CHR 7.16.2 em execução no Proxmox! Use esta configuração para gerenciar redes, autenticar clientes, criar VPNs ou qualquer outra funcionalidade avançada de roteamento que sua infraestrutura necessite.

## Dica: Sempre mantenha backups regulares do seu ambiente virtual para evitar perda de dados em caso de falhas.

Agradeço por ler esse artigo e espero vê-lo novamente em breve. Continue nos acompanhando para mais conteúdo relevante e inspirador. Até a próxima!
