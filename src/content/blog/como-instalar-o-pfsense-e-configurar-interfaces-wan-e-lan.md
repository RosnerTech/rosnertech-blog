---
title: "Como Instalar o pfSense e Configurar Interfaces WAN e LAN"
description: "Um firewall é um dispositivo ou software que controla o tráfego de rede, decidindo se permitirá ou bloqueará o tráfego com base em um conjunto de regras de segurança."
pubDate: 2024-03-16
updatedDate: 2024-03-16
tags: ["PfSense", "Firewall"]
wpId: 1335
draft: false
---

## Como Instalar o pfSense e Configurar Interfaces WAN e LAN

## Introdução ao Firewall e ao pfSense:

Firewalls desempenham um papel fundamental na segurança da rede, atuando como uma barreira entre uma rede interna e a internet ou outras redes externas. Eles monitoram e controlam o tráfego de dados com base em um conjunto predefinido de regras de segurança. Essas regras determinam quais tipos de tráfego são permitidos, bloqueados ou filtrados com base em critérios como endereços IP, portas de comunicação, protocolos e outros atributos.

O pfSense é uma distribuição de firewall de código aberto baseada no FreeBSD, um sistema operacional conhecido por sua confiabilidade e desempenho. O pfSense oferece uma plataforma robusta e altamente personalizável para proteger redes de todos os tamanhos, desde pequenas empresas até grandes organizações. Ele é amplamente utilizado devido à sua flexibilidade, recursos avançados de segurança e uma ampla gama de funcionalidades, incluindo firewall de estado, VPN, balanceamento de carga, detecção de intrusões e muito mais.

Ao escolher o pfSense como solução de firewall, os usuários têm acesso a uma comunidade ativa de desenvolvedores e usuários que fornecem suporte, atualizações e extensões para expandir ainda mais as capacidades do sistema. Com sua interface intuitiva e poderosas ferramentas de gerenciamento, o pfSense oferece uma solução abrangente para proteger e controlar o tráfego de rede de forma eficaz e eficiente.

## Aceitar os Termos de Utilização

Após inicializar a ISO do pfSense, pressione "Enter" em "Accept" para aceitar os termos de utilização.

## Selecionar a Opção de Instalação

Escolha a opção "Install pfSense" para instalar o pfSense do zero.

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/03/pfsense_14.png)

## Escolher o Idioma do Teclado

Selecione o idioma do teclado padrão (normalmente US) e pressione "Enter".

## Configurar o Particionamento

Escolha a opção "Auto (ZFS)" para manter o particionamento padrão e pressione "Enter".

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/03/pfsense_15.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2024/03/pfsense_16.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2024/03/pfsense_17.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2024/03/pfsense_18.png)

Após a instalação, escolha a opção "No" quando perguntado se deseja abrir um shell para modificações manuais finais.

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/03/pfsense_19.png)

## Reiniciar o Sistema

Pressione "Enter" em "Reboot" e remova a mídia de instalação para reiniciar o sistema.

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/03/pfsense_20.png)

## Após a inicialização, selecione a opção para criar VLANs (se necessário) e escolha as interfaces WAN e LAN.

 **Configurar a Interface LAN

Digite "2" para configurar as interfaces IP e defina o endereço IPv4 da interface LAN.

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/03/pfsense_21.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2024/03/pfsense_22.png)

## Configurar o DHCP e o Protocolo WebConfigurator

Configure as opções de DHCP e escolha se deseja reverter para HTTP como o protocolo do WebConfigurator.

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/03/pfsense_23.png)

## Acessar o pfSense

Acesse o pfSense através da URL informada no shell, usando "admin" como usuário e "pfsense" como senha.

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/03/pfsene_login.png)

## Conclusão:

Espero que este tutorial tenha sido útil para orientá-lo na instalação e configuração do pfSense de maneira eficiente. A segurança da rede é uma parte essencial de qualquer ambiente de TI, e o pfSense oferece uma solução poderosa e flexível para atender a diversas necessidades de segurança.

Se surgirem dúvidas durante o processo de instalação ou se precisar de assistência adicional, não hesite em nos contatar.

Agradeço por dedicar seu tempo a ler este tutorial. Espero que tenha encontrado as informações aqui apresentadas úteis e esclarecedoras. Continue nos acompanhando para mais conteúdo relevante sobre segurança da informação, redes e tecnologia em geral.

Seja bem-vindo para retornar sempre que precisar de orientação ou informações adicionais. Estamos ansiosos para ajudá-lo em sua jornada de segurança cibernética e manter sua rede protegida.

## Até a próxima e muito sucesso em seus projetos de segurança da informação!
