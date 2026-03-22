---
title: "Instalar Windows Server 2022 no Proxmox"
description: "O Windows Server 2022 apresenta segurança multicamada avançada, recursos híbridos com o Azure e uma plataforma de aplicativo flexível."
pubDate: 2023-03-21
updatedDate: 2023-09-23
tags: ["Windows", "Server 2022", "Proxmox"]
wpId: 576
draft: false
---

## Instalar Windows Server 2022 no Proxmox

O Windows Server 2022 apresenta segurança multicamada avançada, recursos híbridos com o Azure e uma plataforma de aplicativo flexível. Como parte dessa versão, estamos apresentando recursos de núcleo seguro para ajudar a proteger hardware, firmware e recursos do sistema operacional do Windows Server contra ameaças de segurança avançadas. O servidor de núcleo seguro se baseia em tecnologias como Windows Defender System Guard e Segurança baseada em Virtualização para minimizar riscos de vulnerabilidades de firmware e malware avançado. A nova versão também fornece conectividade protegida que introduz inúmeros recursos novos, como conexões HTTPS criptografadas mais rápidas e mais seguras, criptografia SMB AES 256 líder do setor e muito mais.

## Requisitos:

-   Uma imagem do Windows Server 2022 – [Baixar](https://www.microsoft.com/en-us/evalcenter/evaluate-windows-server-2022)

## Criando a VM do Windows Server 2022.**  
Clique em Criar VM no canto superior direito do Servidor Proxmox, onde surgirá o assistente de criação da máquina virtual.

****Nó****: Nome do seu Servidor Proxmox  
****ID VM****: Gerado automaticamente.  
****Nome****: Digite o nome da máquina virtual.

## Configurando Sistema Operacional.

## Armazenamento****: Nome do seu armazenamento  
****Imagem ISO****: Nome da sua imagem.  
****Tipo****: Microsoft Windows  
****Versão****: 11/2022

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/03/win-02.png)

## Configuração do Sistema Operacional.**  
Geralmente utilizo o padrão, mas nessa instalação irei ativar o TPM.

****Bios****: OVMF (UEFI)  
****Controlador SCSI****: Alterar para VirtlO SCSI  
****Versão****: v2.0

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/03/win-03.png)

## Configurando Hard Disk**  
Geralmente utilizo o padrão.

****Tamanho****: 100 GB  
****Barramento****: Alterar para VirtlO Block

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/03/win-04.png)

## Configurando a CPU.**  
Socket: 2  
Núcleos: 2

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/03/win-05.png)

## Configurando a Memória:**  
Memória (MiB): 4096

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/03/win-06.png)

## Configurando a Rede**  
Utilizarei a rede padrão.

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/03/win-07.png)

## Tela de confirmação que mostrará o snap de configuração do que acabei de configurar. Clicar em Concluir.

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/03/win-08.png)

## Configurando os Drivers VirtlO na VM do Windows Server 2022.** 

Para que a instalação do Windows Server 2022 ocorra sem nenhum problema, anexar o driver que iremos baixar. – [Download](https://fedorapeople.org/groups/virt/virtio-win/direct-downloads/archive-virtio/virtio-win-0.1.215-2/virtio-win-0.1.215.iso)

Efetuar o Download da mesma maneira que efetua o download da ISO.

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/03/win-10.png)

Escolha a VM e clicar em Hardware -> Adicionar -> Drive de CD/DVD.

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/03/WIN-11.png)

Anexar a iso que efetuamos o download anteriormente.

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/03/win-12.png)

## Iniciando a Instalação do Windows Server 2022.**  
Após finalizar as configurações no Proxmox, iremos prosseguir com a instalação do Sistema Operacional.  
Alterar o Timezone e Teclado

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/03/win-13.png)

Clicar em Install Now.

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/03/win-14.png)

O Windows Server está disponível em 2 Versões: Standard e o Datacenter.  
CLI – Sem Interface Gráfica e GUI – Com Interface Gráfica.  
Nessa instalação utilizarei a versão Standard GUI e clicar em Next.

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/03/win-15.png)

## Aceitar os Termos da Licença e clicar em Next.

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/03/win-16.png)

## Escolher a instalação personalizada.

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/03/win-17.png)

## Configurando o Disco Rígido Virtual.

Foi criado um disco com 100 GB no Proxmox, no entanto, não está disponível no assistente de instalação do Windows, pois não possui driver para detectar o disco rígido virtual. Iremos carregar o driver.

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/03/win-18.png)

Escolher Windows Server 2022 conforme imagem.

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/03/win-19.png)

Após alguns segundos, deverá aparecer o disco rígido adicionado automaticamente (pode demorar um pouco). Selecionar o disco que criamos e clicar em Next para iniciar a instalação.

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/03/win-20.png)

A instalação levará um tempo para terminar.

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/03/win-21.png)

Após algumas reinicializações, a instalação será concluída e será solicitado para definir a senha de Administrador, definir a senha e clicar em Concluir.

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/03/win-22.png)

Após configurar a senha, o Windows Server 2022 está pronto para receber as configurações necessárias. Para logar no Windows utilizar as teclas de atalho do Proxmox.

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/03/win-23.png)

Configurar um _IP Dinâmico_ e habilitar o RDP na VM para acessar de fora do Proxmox.

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/03/win-24.png)

Pronto! Windows Server 2022 instalado com sucesso.

## Conclusão:  
## Com esse post você aprendeu a instalar o Windows Server 2022 e adicionar o driver VirtlO no Proxmox.
