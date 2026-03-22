---
title: "Instalar Unifi Controller no Linux"
description: "O Unifi Controller é uma aplicação de software desenvolvida pela Ubiquiti Networks que serve para gerenciar e controlar redes sem fio, especialmente as que utilizam dispositivos de rede Unifi."
pubDate: 2023-11-01
updatedDate: 2023-11-01
tags: ["Debian", "Linux", "Unifi"]
wpId: 1145
draft: false
---

## Instalando Unifi Controller no Linux

Recentemente, tive a necessidade de instalar a controladora Unifi no Debian, um processo que pode parecer um pouco complicado e assustador para aqueles que estão menos familiarizados com o mundo do Linux. No entanto, vou te guiar passo a passo usando um script que encontrei, que facilitará muito a instalação. **Fonte:** **[https://glennr.nl/](https://glennr.nl/)** O Unifi Controller é uma aplicação de software desenvolvida pela Ubiquiti Networks que serve para gerenciar e controlar redes sem fio, especialmente as que utilizam dispositivos de rede Unifi. Ele fornece uma interface centralizada para configurar, monitorar e otimizar a rede. O Unifi Controller permite a gestão de pontos de acesso Wi-Fi, switches, roteadores e dispositivos de segurança em uma única plataforma. Além disso, ele oferece recursos avançados, como análise de tráfego, estatísticas de uso da rede e opções de personalização. É uma ferramenta poderosa para administradores de rede que desejam simplificar a operação e a manutenção de redes complexas. Primeiro, é importante observar que este script funciona com o Linux Debian e suas variantes, incluindo as seguintes distribuições: - Ubuntu Precise Pangolin (12.04) - Ubuntu Trusty Tahr (14.04) - Ubuntu Xenial Xerus (16.04) - Ubuntu Bionic Beaver (18.04) - Ubuntu Cosmic Cuttlefish (18.10) - Ubuntu Disco Dingo (19.04) - Ubuntu Eoan Ermine (19.10) - Ubuntu Focal Fossa (20.04) - Ubuntu Groovy Gorilla (20.10) - Ubuntu Hirsute Hippo (21.04) - Ubuntu Impish Indri (21.10) - Ubuntu Jammy Jellyfish (22.04) - Ubuntu Kinetic Kudu (22.10) - Ubuntu Lunar Lobster (23.04) - Ubuntu Mantic Minotaur (23.10) - Debian Jessie (8) - Debian Stretch (9) - Debian Buster (10) - Debian Bullseye (11) - Debian Bookworm (12) - Debian Trixie (13) - Debian Forky (14) - Linux Mint 13 (Maya) - Linux Mint 17 (Qiana, Rebecca, Rafaela, Rosa) - Linux Mint 18 (Sarah, Serena, Sonya, Sylvia) - Linux Mint 19 (Tara, Tessa, Tina, Tricia) - Linux Mint 20 (Ulyana, Ulyssa, Uma, Una) - Linux Mint 21 (Vanessa, Vera, Victoria) - Linux Mint 4 (Debbie) - Linux Mint 5 (Elsie) - MX Linux 18 (Continuum) - Progress-Linux (Engywuck) - Parrot OS - Elementary OS - Deepin Linux Agora, siga as etapas abaixo: 1. Acesse a sua distribuição Linux e digite o seguinte comando para atualizar as dependências do sistema operacional:

```bash
sudo apt update
```

Isso garantirá que seu sistema esteja atualizado. 2. Após atualizar as dependências, digite o seguinte comando para instalar o certificado digital que verifica a autenticidade das conexões HTTP e o pacote \`wget\`, responsável por downloads automáticos:

```bash
 sudo apt install ca-certificates wget -y
```

3\. Agora, você precisará baixar o arquivo de script. Neste tutorial, vamos utilizar a versão 7.5.X. Use o comando a seguir para fazer o download:

```bash
sudo wget https://get.glennr.nl/unifi/install/unifi-7.5.187.sh
```

4\. É importante torná-lo executável antes de prosseguir. Para fazer isso, execute o seguinte comando:

```bash
sudo chmod +x unifi-7.5.187.sh
```

5\. Após baixar o script, é hora de executá-lo. Use o comando abaixo:

```bash
sudo ./unifi-7.5.187.sh
```

6\. O script realizará várias verificações, como a versão do Linux, os privilégios de super usuário e as dependências pré-instaladas. Se tudo estiver em ordem, o script iniciará e fornecerá informações na tela. Aguarde o processo ser concluído. Se for solicitada interação, pressione 'Y' para aceitar. 
