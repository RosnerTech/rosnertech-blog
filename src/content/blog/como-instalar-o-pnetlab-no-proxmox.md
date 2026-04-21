---
title: "Como Instalar o PNetLab no Proxmox via Terminal"
description: "Aprenda a instalar e configurar o PNetLab no Proxmox utilizando apenas o terminal, importando o OVA oficial e configurando a VM passo a passo."
pubDate: 2026-04-21
updatedDate: 2026-04-21
tags: ["Proxmox", "PNetLab", "Linux", "Redes", "HomeLab"]
draft: false
---

## Como Instalar o PNetLab no Proxmox via Terminal

## Introdução

O **PNetLab** é uma plataforma de emulação de redes que permite criar laboratórios virtuais com dispositivos como Cisco, Mikrotik, Juniper e muitos outros. Integrado ao **Proxmox**, ele se torna uma solução poderosa para ambientes de homelab e estudos para certificações de redes.

Neste artigo, vamos instalar o PNetLab no Proxmox utilizando apenas o terminal, importando o OVA oficial e configurando a VM com os comandos `qm` do Proxmox.

## Pré-requisitos

Antes de começar, você precisará ter:

1. Proxmox VE instalado e funcionando
2. Acesso SSH ao servidor Proxmox (usuário `root`)
3. Storage com espaço suficiente (mínimo 50 GB recomendado)
4. Um computador com acesso à internet para baixar o OVA

## Passo 1 — Acessando o Proxmox via SSH

Conecte-se ao seu servidor Proxmox via SSH:

```bash
ssh root@IP_DO_PROXMOX
```

![Terminal com acesso SSH ao Proxmox](/img/pnetlab/01-ssh-proxmox.png)

## Passo 2 — Baixando o OVA do PNetLab

O OVA do PNetLab está disponível na página oficial. Acesse pelo navegador do seu computador:

[https://pnetlab.com/pages/download](https://pnetlab.com/pages/download)

> **Atenção:** os links de download ficam na parte inferior da página, role até o final para encontrá-los.

![Página oficial de download do PNetLab](/img/pnetlab/02-site-download-pnetlab.png)

O download é feito via **Google Drive**. Ao clicar no link, você será redirecionado para a página do Drive. Clique em **Fazer download** para salvar o arquivo no seu computador.

![Página do Google Drive com o arquivo OVA do PNetLab](/img/pnetlab/03-google-drive-download.png)

O arquivo pode variar entre 2 e 4 GB dependendo da versão. Aguarde o download ser concluído.

## Passo 3 — Enviando o OVA para o Proxmox

Com o arquivo baixado no seu computador, envie-o para o Proxmox via `scp`. No terminal do seu computador (ou PowerShell no Windows), execute:

```bash
scp /caminho/para/PNETLab-*.ova root@IP_DO_PROXMOX:/tmp/
```

Exemplo no Windows:

```powershell
scp C:\Users\SeuUsuario\Downloads\PNETLab-*.ova root@192.168.1.10:/tmp/
```

![Transferência do OVA para o Proxmox via SCP](/img/pnetlab/04-scp-upload.png)

## Passo 4 — Extraindo o arquivo OVA no Proxmox

No terminal do Proxmox, acesse o diretório `/tmp` e extraia o OVA (que é um arquivo tar):

```bash
cd /tmp
tar xvf PNETLab-*.ova
```

Liste os arquivos extraídos para confirmar:

```bash
ls -lh
```

Você verá um arquivo `.ovf` junto com um disco `.vmdk`.

![Listagem dos arquivos extraídos do OVA](/img/pnetlab/05-arquivos-extraidos.png)

## Passo 5 — Criando a VM no Proxmox

Vamos criar a VM com o comando `qm create`. Defina um ID único para a VM (neste exemplo usaremos `1200`):

```bash
qm create 1200 \
  --name pnetlab \
  --memory 8192 \
  --cores 4 \
  --cpu host \
  --net0 virtio,bridge=vmbr0 \
  --ostype l26 \
  --scsihw virtio-scsi-pci \
  --boot order=scsi0
```

> **Dica:** Ajuste `--memory` e `--cores` conforme os recursos disponíveis no seu servidor. O PNetLab recomenda no mínimo 4 GB de RAM e 2 núcleos.

![Comando qm create executado no terminal do Proxmox](/img/pnetlab/06-qm-create.png)

## Passo 6 — Importando o disco VMDK

Com a VM criada, importe o disco `.vmdk` para o storage do Proxmox. Substitua `local-lvm` pelo nome do seu storage:

```bash
qm importdisk 1200 PNETLab-disk1.vmdk local-lvm
```

O processo pode levar alguns minutos dependendo do tamanho do disco e da velocidade do storage.

![Processo de importação do disco VMDK no Proxmox](/img/pnetlab/07-importdisk.png)

## Passo 7 — Anexando o disco à VM

Após a importação, o disco ficará disponível como `unused0`. Anexe-o à VM:

```bash
qm set 1200 --scsi0 local-lvm:vm-1200-disk-0
```

Verifique a configuração da VM:

```bash
qm config 1200
```

![Configuração da VM exibida pelo comando qm config](/img/pnetlab/08-qm-config.png)

## Passo 8 — Habilitando o KVM e ajustes finais

O PNetLab necessita de virtualização aninhada (nested virtualization) para emular os dispositivos de rede. Verifique se o KVM está ativo:

```bash
qm set 1200 --kvm 1
```

Adicione também o disco de CD-ROM (necessário para o boot):

```bash
qm set 1200 --ide2 local:cloudinit
```

Defina o tamanho do disco se necessário:

```bash
qm resize 1200 scsi0 +20G
```

![Ajustes finais da VM via terminal](/img/pnetlab/09-ajustes-vm.png)

## Passo 9 — Iniciando a VM

Com tudo configurado, inicie a VM:

```bash
qm start 1200
```

Verifique se a VM está rodando:

```bash
qm status 1200
```

A saída deve ser `status: running`.

![Status da VM PNetLab mostrando running](/img/pnetlab/10-vm-running.png)

## Passo 10 — Descobrindo o IP da VM

Para acessar o PNetLab, você precisa do IP atribuído à VM. Verifique no terminal do Proxmox:

```bash
qm guest cmd 200 network-get-interfaces
```

Ou acesse o console da VM via Proxmox e verifique com:

```bash
ip addr show
```

![Terminal da VM PNetLab mostrando o IP atribuído](/img/pnetlab/11-ip-vm.png)

## Passo 11 — Acessando o PNetLab pelo navegador

Abra o navegador e acesse o IP da VM na porta padrão:

```
http://IP_DA_VM
```

Na tela de login, utilize as credenciais padrão:

- **Usuário:** `admin`
- **Senha:** `pnet`

![Tela de login do PNetLab no navegador](/img/pnetlab/12-login-pnetlab.png)

## Passo 12 — Configuração inicial do PNetLab

No primeiro acesso, o PNetLab vai solicitar a alteração da senha padrão e algumas configurações básicas:

1. Altere a senha do usuário `admin`
2. Configure o nome do laboratório
3. Registre sua conta em [pnetlab.com](https://pnetlab.com) para acessar a loja de imagens

![Tela de configuração inicial do PNetLab](/img/pnetlab/13-configuracao-inicial.png)

## Passo 13 — Dashboard do PNetLab

Após o login e configuração inicial, você terá acesso ao dashboard principal do PNetLab, onde poderá criar laboratórios, adicionar dispositivos e gerenciar suas topologias.

![Dashboard principal do PNetLab com laboratórios](/img/pnetlab/14-dashboard-pnetlab.png)

## Considerações finais

Com o PNetLab instalado no Proxmox, você tem em mãos uma plataforma robusta para:

1. Estudar para certificações como CCNA, CCNP, JNCIA e outras
2. Criar topologias de redes complexas com dispositivos reais emulados
3. Testar configurações antes de aplicar em produção
4. Integrar com outros serviços do seu homelab

O próximo passo é adicionar as imagens dos dispositivos (Cisco IOL, Mikrotik, etc.) na loja do PNetLab para começar a criar seus laboratórios.

Agradeço por ler esse artigo e espero vê-lo novamente em breve. Continue nos acompanhando para mais conteúdo relevante e inspirador. Até a próxima!
