---
title: "Como criar um template Debian 13 Cloud-Init no Proxmox"
description: "Quer colocar seu Mikrotik para funcionar com acesso à internet e rede interna em poucos minutos? Neste post, você vai aprender de forma simples e prática a configurar o DHCP Client, criar sua LAN com "
pubDate: 2025-08-14
updatedDate: 2025-08-14
tags: ["Linux", "Proxmox", "Debian 13 Trixie", "Debian 13"]
wpId: 2099
draft: false
---

## 🐧 Criando um Template Debian 13 Cloud-Init no Proxmox

Se você já usa o Proxmox, sabe como é prático ter templates prontos para criar novas VMs em poucos segundos.  
Com a chegada do Debian 13 (Trixie), vamos atualizar nosso processo e criar um template moderno, já com Cloud-Init e QEMU Guest Agent configurados.

💡 Com esse template, você vai poder criar novas VMs Debian 13 rapidamente, com IP fixo ou DHCP, chave SSH e senha configuradas direto pelo Proxmox.

###### **📌 Pré-requisitos

Proxmox VE** instalado e configurado.  
Acesso à internet para [baixar](https://cdimage.debian.org/images/cloud/) Cloud Images.  
Conhecimento básico de linha de comando Linux.

###### **🖼️ O que são Cloud Images?

Cloud Images são imagens pré-configuradas de sistemas operacionais otimizadas para execução em ambientes de nuvem. Elas são leves, já incluem o **Cloud-Init** e são ideais para implantação rápida de VMs no Proxmox.

###### **⚙️ O que é Cloud-Init?

O **Cloud-Init** é um serviço que automatiza a configuração inicial de máquinas virtuais, permitindo definir:

## Usuários e senhas.**  
## Chaves SSH.**  
## Configurações de rede (IP estático/DHCP).**  
## Execução de scripts pós-inicialização.

Baixar uma Cloud Image**  
## Acesse o terminal do Proxmox (via SSH ou shell).  
## Acesse seu Proxmox via **SSH** e baixe a imagem `.qcow2` diretamente do repositório oficial:

```bash
wget https://cloud.debian.org/images/cloud/trixie/20250811-2201/debian-13-genericcloud-amd64-20250811-2201.qcow2
```

Essa imagem é em formato `.qcow2`, que o Proxmox consegue importar direto.

## Instale as ferramentas necessárias  
## Para editar a imagem e instalar pacotes nela (como o agente do Proxmox), instale o seguinte pacote:

```bash
apt update
apt install libguestfs-tools -y
```

Esse pacote fornece a ferramenta `virt-customize`.

## Instalar o QEMU Guest Agent na imagem  
## O **QEMU Guest Agent** permite que o Proxmox colete informações da VM e execute comandos internos, como desligar de forma segura

```bash
virt-customize --add debian-13-genericcloud-amd64-20250811-2201.qcow2 --install qemu-guest-agent
```

## Criar a VM base  
## Agora, crie uma VM no Proxmox com os recursos desejados (aqui vamos usar 2 GB de RAM e 2 vCPUs):

```bash
qm create 1002 --name debian-cloud-13 --memory 2048 --cores 2 --cpu cputype=host --net0 virtio,bridge=vmbr0
```

## Importar o disco para o storage  
## Vamos importar o disco `.qcow2` para o **local-lvm** no formato correto:

```bash
qm importdisk 1002 debian-13-genericcloud-amd64-20250811-2201.qcow2 local-lvm --format qcow2
```

## Configurar o hardware da VM  
## Agora vamos associar o disco, adicionar Cloud-Init e ajustar as opções de inicialização:

```bash
qm set 1002 --scsihw virtio-scsi-pci --scsi0 local-lvm:vm-1002-disk-0
qm set 1002 --ide2 local-lvm:cloudinit
qm set 1002 --boot c --bootdisk scsi0
qm set 1002 --serial0 socket --vga serial0
qm set 1002 --agent enabled=1
```

## Ajustar o tamanho do disco  
## Se você quer mais espaço padrão no template, aumente o disco antes de transformá-lo em template:

```bash
qm disk resize 1002 scsi0 +100G
```

## Converter para template  
## Por fim, transforme essa VM em um template pronto para uso:

```bash
qm template 1002
```

## Criando uma nova VM a partir do template via terminal  
## Agora que você tem seu **template Debian 13 Cloud-Init**, pode criar novas VMs rapidamente usando apenas o terminal.

## Clonando o template  
## O exemplo abaixo cria uma VM chamada `debian-vm-test` com ID **9100** a partir do template **1002**:

```bash
qm clone 1002 9100 --name debian-vm-test --full
```

## Configurando o usuário padrão  
## Defina o usuário que será criado na VM:

```bash
qm set 9100 --ciuser=meuusuario
```

## Caso queira definir a senha, use:

```bash
qm set 9100 --cipassword=MinhaSenhaForte
```

## Configuração de rede (DHCP ou IP fixo)**  
DHCP (IP automático)

```bash
qm set 9100 --ipconfig0 ip=dhcp
```

IP fixo

```bash
qm set 9100 --ipconfig0 ip=192.168.1.100/24,gw=192.168.1.1
```

## Iniciando a VM  
## Depois de configurar, basta iniciar a VM:

```bash
qm start 9100
```

🚀 **Gostou do conteúdo?  
## Você agora tem um template Debian com suporte a Cloud-Init no Proxmox, pronto para criar VMs de forma rápida, padronizada e automatizada. Isso é perfeito para homelabs, ambientes empresariais e DevOps.  
  
Deixe sua opinião nos comentários! Se tiver dúvidas ou sugestões, ficarei feliz em ajudar. E, claro, compartilhe com seus amigos se achar que pode ser útil para eles. 

## Obrigado por acompanhar este guia! 🚀  
##   
 **Até a próxima!
