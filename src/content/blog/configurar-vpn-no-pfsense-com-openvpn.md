---
title: "Configurar VPN no pfSense com OpenVPN"
description: "pfSense é um firewall e roteador de código aberto baseado no sistema operacional FreeBSD. Ele oferece uma variedade de recursos, incluindo roteamento, firewalling, NAT, VPN, entre outros."
pubDate: 2024-06-09
updatedDate: 2024-06-09
tags: ["PfSense", "OpenVPN"]
wpId: 1488
draft: false
---

/\*! elementor - v3.21.0 - 26-05-2024 \*/ .elementor-heading-title{padding:0;margin:0;line-height:1}.elementor-widget-heading .elementor-heading-title\[class\*=elementor-size-\]>a{color:inherit;font-size:inherit;line-height:inherit}.elementor-widget-heading .elementor-heading-title.elementor-size-small{font-size:15px}.elementor-widget-heading .elementor-heading-title.elementor-size-medium{font-size:19px}.elementor-widget-heading .elementor-heading-title.elementor-size-large{font-size:29px}.elementor-widget-heading .elementor-heading-title.elementor-size-xl{font-size:39px}.elementor-widget-heading .elementor-heading-title.elementor-size-xxl{font-size:59px}

## Tutorial Detalhado para Configurar VPN no pfSense com OpenVPN

## Introdução

O que é VPN?  
## VPN (Virtual Private Network) é uma tecnologia que cria uma conexão segura e criptografada sobre uma rede menos segura, como a internet. A VPN permite que você transmita dados de maneira privada e segura entre diferentes locais, garantindo a integridade e confidencialidade das informações.

## O que é pfSense?**  
pfSense é um firewall e roteador de código aberto baseado no sistema operacional FreeBSD. Ele oferece uma variedade de recursos, incluindo roteamento, firewall, NAT, VPN, entre outros. pfSense é amplamente utilizado para proteger redes e gerenciar conexões de internet em ambientes empresariais e residenciais.

## O que é OpenVPN?**  
OpenVPN é uma solução de software open-source para implementar redes privadas virtuais (VPN). Ele utiliza técnicas de criptografia customizáveis para garantir a segurança das comunicações através de redes não confiáveis, como a internet. OpenVPN é altamente configurável e suporta tanto conexões site-to-site quanto client-to-site. Configurando uma VPN no pfSense com OpenVPN.

## A** **configuração de uma VPN no pfSense utilizando OpenVPN envolve várias etapas. Abaixo está um guia detalhado para configurar e gerenciar uma VPN:

[**Instalação e Configuração Inicial do pfSense**](https://blog.rosnertech.com.br/arquivos/1335)

Instale o pfSense em uma máquina ou em um servidor dedicado. O processo de instalação é relativamente simples e envolve criar um disco de instalação a partir da imagem ISO do pfSense, configurar a BIOS para inicializar a partir do disco e seguir as instruções de instalação.

## Acessando o Assistente de Configuração do OpenVPN

Acesse a interface web do pfSense: Digite o endereço IP da interface LAN do pfSense no seu navegador (geralmente `http://192.168.1.1`).  
Faça login com suas credenciais administrativas.  
No menu principal, vá para `VPN` > `OpenVPN`.  
Clique em `Wizards` para iniciar o assistente de configuração do OpenVPN.

/\*! elementor - v3.21.0 - 26-05-2024 \*/ .elementor-widget-image{text-align:center}.elementor-widget-image a{display:inline-block}.elementor-widget-image a img\[src$=".svg"\]{width:48px}.elementor-widget-image img{vertical-align:middle;display:inline-block} ![](https://blog.rosnertech.com.br/wp-content/uploads/2024/06/vpn_01.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2024/06/vpn_01_1.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2024/06/vpn_01_2-1024x123.png)

## Selecionar o Tipo de Servidor de Autenticação  
##   
Na primeira etapa do assistente, selecione `Local User Access` para que a autenticação dos usuários seja feita localmente pelo próprio pfSense.  
Clique em `Next` para continuar.

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/06/vpn_03-1024x361.png)

## Criar a Autoridade Certificadora (CA) do Servidor OpenVPN

Descriptive name**: Insira um nome descritivo para a CA, por exemplo, `CA_VPN`.  
## Key length**: Mantenha o tamanho da chave em 2048 bits.  
## Lifetime**: Use o padrão (quase 10 anos) ou ajuste conforme sua necessidade.  
## Country Code, State or Province, City e Organization**: Preencha com as informações relevantes da sua organização. Exemplo**_:_

_Country Code: BR_**  
## _State or Province: São PauloCity: São Paulo_**  
## _Organization:RosnerTech_

Clique em `Add new CA` para criar a Autoridade Certificadora.

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/06/vpn_04.png)

## Criar o Certificado do Servidor OpenVPN**  
## Descriptive name:** Insira um nome para o certificado, por exemplo, Server\_CERT\_VPN.  
Muitos campos serão preenchidos automaticamente com as informações da CA. Verifique e ajuste se necessário.  
## Lifetime:** Certifique-se de que o valor é 398 dias para evitar problemas de compatibilidade com algumas plataformas.  
Clique em Create new Certificate para criar o certificado do servidor.

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/06/vpn_05.png)

## Informações do Servidor OpenVPN

Interface**: Selecione `WAN`.  
## Protocol**: Selecione `UDP` e `IPv4`.  
## Local Port**: Use a porta `1194`.  
## Description**: Insira uma descrição, por exemplo, `my_OpenVPN`.

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/06/vpn_06.png)

## Configurar a Criptografia  
  
****TLS Authentication**: Marque para habilitar a autenticação por TLS.  
## Automatically generate a TLS Key**: Marque esta opção.  
## DH Parameters Length**: Selecione `2048 bits`.  
## Data Encryption Negotiation**: Marque para permitir a negociação de algoritmos de criptografia.  
## Data Encryption Algorithms**: Selecione os algoritmos desejados.  
## Fallback Data Encryption Algorithm**: Selecione um algoritmo de fallback.  
## Auth Digest Algorithm**: Escolha o método de autenticação.  
## Hardware Crypto**: Deixe desmarcado para este tutorial.

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/06/vpn_07.png)

## Configurações do Túnel OpenVPN

Tunnel Network**: Insira `10.0.8.0/24`.  
## Redirect Gateway**: Marque esta opção se desejar que todo o tráfego dos clientes passe pelo servidor OpenVPN (Deixe desmarcado para este tutorial).  
## Local Network**: Insira a rede local que será acessada pelos clientes, por exemplo, `192.168.1.0/24`.  
## Concurrent Connections**: Defina o número de conexões simultâneas permitidas.  
## Allow Compression**: Deixe desmarcado para maior segurança.  
## Type-of-Service**: Deixe desmarcado.  
## Inter-Client Communication**: Marque se quiser permitir a comunicação entre clientes.  
## Duplicate Connections**: Marque se desejar permitir múltiplas conexões do mesmo usuário.  

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/06/vpn_08.png)

## Parâmetros do Cliente OpenVPN

Dynamic IP**: Marque para permitir que os clientes mantenham a conexão mesmo com mudanças de IP.  
## Topology**: Selecione `Subnet`.  
## DNS Default Domain & DNS Server 1-4**: Insira os servidores DNS que os clientes usarão.  
## NTP Server**: Insira um servidor NTP, se necessário.  
## NetBIOS & WINS**: Marque para permitir o uso desses protocolos.  
clique em Next.

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/06/vpn_09.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2024/06/vpn_10.png)

## Aplicar Regras de Firewall para o OpenVPN

O assistente aplicará automaticamente as regras de firewall necessárias. Se preferir, você pode configurá-las manualmente posteriormente.

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/06/vpn_11.png)

## Criar um Usuário para a VPN  
  
## Vá para `System` > `User Manager`.  
Clique em `+ Add` para adicionar um novo usuário.  
Preencha o `Username` (por exemplo, `maria`) e a `Password`.  
Marque a opção `Click to create a user certificate`.  
Dê um nome descritivo para o certificado (por exemplo, `maria cert`).  
Certifique-se de que o `Certificate authority` está correto.  
Clique em `Save`.

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/06/vpn_16.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2024/06/vpn_17.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2024/06/vpn_18.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2024/06/vpn_19.png)

## Exportar a Configuração do Cliente OpenVPN  
##   
Vá para `System` > `Package Manager`.  
Clique em `Available packages` e pesquise por `openvpn-client-export.   `Instale o pacote `openvpn-client-export`.  
Vá para `VPN` > `OpenVPN`.  
Clique na aba `Client Export`.

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/06/vpn_14.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2024/06/vpn_15.png)

## Selecione o servidor OpenVPN configurado e ajuste os parâmetros conforme necessário.  
****Remote Access Server**: Selecione `UDP` e porta `1194`.  
## Host Name Resolution**: Use `Interface IP Address`.  
## Verify Server CN**: Marque esta opção.  
## Block Outside DNS**: Marque para forçar os clientes a usar o DNS do servidor OpenVPN.  
## Bind Mode**: Mantenha como `Do not bind the local port`.  
Clique em `Save as default` se fizer alterações.  
Baixe o pacote de configuração apropriado para o sistema operacional do cliente.

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/06/vpn_20.jpg) ![](https://blog.rosnertech.com.br/wp-content/uploads/2024/06/vpn_21.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2024/06/vpn_22.png)

## Conectar o Cliente VPN  
  
## [**Instale o OpenVPN Client**](https://openvpn.net/community-downloads/) no dispositivo do usuário.  
## Importe a Configuração** baixada do pfSense.  
## Conecte-se ao Servidor VPN** utilizando as credenciais do usuário configurado no pfSense

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/06/vpn_23.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2024/06/vpn_24.png)

## Conclusão:**  
  
Seguindo esses passos, você terá uma VPN no pfSense utilizando o OpenVPN. Seus dados agora estarão seguros e criptografados ao trafegar pela internet.  
Agradeço por ler esse artigo e espero vê-lo novamente em breve. Continue nos acompanhando para mais conteúdo relevante e inspirador. Até a próxima!
