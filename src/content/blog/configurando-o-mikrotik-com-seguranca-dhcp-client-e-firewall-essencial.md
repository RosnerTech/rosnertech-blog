---
title: "Configurando o Mikrotik com Segurança: DHCP Client e Firewall Essencial"
description: "Quer colocar seu Mikrotik para funcionar com acesso à internet e rede interna em poucos minutos? Neste post, você vai aprender de forma simples e prática a configurar o DHCP Client, criar sua LAN com "
pubDate: 2025-04-28
updatedDate: 2025-04-28
tags: ["Mikrotik", "RouterOS", "Winbox"]
wpId: 2030
draft: false
---

## 🛠️ Guia Completo para Configurar seu Mikrotik (DHCP Client + LAN Bridge)

#### **🧐 O que é Mikrotik, RouterOS e Winbox?

Mikrotik** é uma empresa da Letônia que fabrica equipamentos de rede (roteadores, switches, access points) e desenvolve o **RouterOS**, um sistema operacional que transforma esses equipamentos em potentes servidores de rede.  
## RouterOS**: Sistema operacional de roteamento e gerenciamento de rede dos dispositivos Mikrotik.  
## Winbox**: Programa oficial para Windows que permite acessar e configurar dispositivos Mikrotik de forma gráfica e rápida.

📅 Antes de Começar

Conecte seu computador ao Mikrotik via cabo de rede.  
Baixe o [Winbox](https://mikrotik.com/download).  
Abra o Winbox e conecte ao Mikrotik pelo **MAC Address** ou **IP**.

##### 📊 Configuração Passo a Passo

1\. Acesse o Mikrotik  
  
No Winbox, clique em **Neighbors** para localizar o Mikrotik.  
Conecte usando o **MAC Address** listado.

## 2\. Configurar a Conexão de Internet (DHCP Client)  

Para que o Mikrotik pegue o IP automaticamente da operadora:  
Acesse **IP > DHCP Client**.  
Clique em **"+"** (adicionar).  
Selecione a interface conectada à operadora (normalmente `ether1`).  
Marque:  
## Add Default Route** = Yes  
## Use Peer DNS** = Yes  
## Use Peer NTP** = Yes  
Clique em **OK**.  
  
✅ Agora o Mikrotik recebe IP automaticamente da sua operadora!

## 3\. Criar uma Bridge para Agrupar as Portas LAN  
## 📖 O que é uma Bridge?

Uma **Bridge** é como um "switch virtual" dentro do Mikrotik, que permite unir várias interfaces em uma única rede local (LAN), facilitando a comunicação entre os dispositivos.

## Para abrir o terminal no Mikrotik, acesse o menu New Terminal no canto esquerdo do Winbox.**  
Agora, via terminal:

```bash
/interface bridge
add name=bridge-LAN comment="Bridge interfaces LAN"
```

## Adicionar Todas as Interfaces LAN na Bridge

Supondo que `ether2`, `ether3`, `ether4` e `ether5` sejam LANs:

```bash
/interface bridge port
add bridge=bridge-LAN interface=ether2
add bridge=bridge-LAN interface=ether3
add bridge=bridge-LAN interface=ether4
add bridge=bridge-LAN interface=ether5
```

⚠️ **Importante:** Não adicione a `ether1` (WAN) na bridge!

## 4\. Definir IP da Rede Interna

Atribuir um IP à Bridge para a LAN:

```bash
/ip address add address=192.168.37.1/24 interface=bridge-LAN network=192.168.37.0
```

## 5\. Configurar o Servidor DHCP para a LAN

Para distribuir IPs automáticos na rede:

```bash
/ip pool add name=dhcp-pool ranges=192.168.37.50-192.168.37.200
/ip dhcp-server add name=dhcp-bridge-LAN interface=bridge-LAN address-pool=dhcp-pool disabled=no
/ip dhcp-server network add address=192.168.37.0/24 gateway=192.168.37.1 dns-server=8.8.8.8,1.1.1.1
```

## 6\. Definir Servidores DNS

```bash
/ip dns
set allow-remote-requests=yes servers=8.8.8.8,8.8.4.4,1.1.1.1
```

## 7\. Criar Regras Básicas de Firewall  

O firewall é essencial para proteger o Mikrotik e a rede interna. Vamos entender cada regra:

## Rejeitar DNS externo**: Impede que sua rede seja usada como servidor DNS público na internet (portas 53 TCP/UDP).  
## Aceitar conexões estabelecidas e relacionadas**: Permite que respostas de conexões iniciadas por dispositivos internos sejam aceitas.  
## Descartar conexões inválidas**: Elimina pacotes corrompidos ou sessões que não seguem um fluxo lógico.  
## Aceitar ICMP (ping) limitado**: Permite ping para diagnóstico, mas limitado para evitar ataques de negação de serviço.  
## Detectar portas indevidas e PortScan**: Identifica tentativas de acessar portas administrativas ou escaneamento de portas e bloqueia automaticamente IPs suspeitos.  
## Bloquear tráfego não autorizado vindo da WAN**: Por fim, todo tráfego não autorizado é bloqueado.

Exemplo de configuração:

```bash
/ip firewall filter
add action=reject chain=input comment="Rejeita DNS externo (UDP)" dst-port=53 in-interface-list=WAN protocol=udp reject-with=icmp-port-unreachable
add action=reject chain=input comment="Rejeita DNS externo (TCP)" dst-port=53 in-interface-list=WAN protocol=tcp reject-with=icmp-port-unreachable
add action=accept chain=input comment="Aceita conexões estabelecidas e relacionadas" connection-state=established,related
add action=accept chain=forward comment="Encaminha conexões estabelecidas e relacionadas" connection-state=established,related
add action=drop chain=input comment="Descarta conexões inválidas" connection-state=invalid
add action=accept chain=input comment="Aceita ICMP (ping) limitado" protocol=icmp limit=1,5:packet
add action=add-src-to-address-list chain=input comment="Detecta portas indevidas" dst-port=3389,20-23,443 in-interface-list=WAN protocol=tcp address-list=PORTSCAN address-list-timeout=5d
add action=add-src-to-address-list chain=input comment="Detecta PortScan" in-interface-list=WAN protocol=tcp psd=21,3s,3,1 address-list=PORTSCAN address-list-timeout=1w
add action=drop chain=input comment="WAN - Bloqueio geral" in-interface-list=WAN
```

## 8\. Habilitar NAT para acesso à Internet

```bash
/ip firewall nat
add action=masquerade chain=srcnat comment="NAT padrão" out-interface-list=WAN
```

## Importância:

A regra NAT "Masquerade" é crucial porque, sem ela, os dispositivos internos não conseguiriam acessar a internet. Isso ocorre porque os dispositivos internos possuem endereços privados, que não são roteáveis na internet. A NAT assegura que esses endereços privados sejam "mascarados" pelo IP público do roteador/firewall.

## 9\. Melhorias e Ajustes Finais

Definir nome do dispositivo:

```bash
/system identity set name="RBLAB"
```

## Configurar NTP:

```bash
/ip cloud set ddns-enabled=yes ddns-update-interval=1m
```

## Configurar NTP:

```bash
/system clock set time-zone-name=America/Sao-Paulo
/system ntp client set enabled=yes
/system ntp client servers
add address=a.st1.ntp.br
add address=b.st1.ntp.br
```

## Desativar IPv6 (se não for usar):

```bash
/ipv6 settings set disable-ipv6=yes
```

## Desativar serviços desnecessários:

```bash
/ip service
set telnet disabled=yes
set ftp disabled=yes
set ssh disabled=yes
set www port=8080
set api disabled=yes
set api-ssl disabled=yes
```

🚀 **Gostou do conteúdo?  
  
## Deixe sua opinião nos comentários! Se tiver dúvidas ou sugestões, ficarei feliz em ajudar. E, claro, compartilhe com seus amigos se achar que pode ser útil para eles. Se quiser ver mais tutoriais sobre Mikrotik ou outros tópicos de tecnologia, é só falar! 😊

## Obrigado por acompanhar este guia! 🚀  
##   
 **Até a próxima!
