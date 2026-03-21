---
title: "Instalando e Configurando o Screenfetch no Debian 12 Bookworm"
description: "O 'screenfetch' é uma ferramenta de linha de comando que exibe informações concisas sobre o sistema operacional e o hardware do computador de forma visualmente agradável. Ele fornece um resumo das esp"
pubDate: 2023-08-18
updatedDate: 2023-09-23
tags: ["Debian", "Linux"]
wpId: 775
draft: false
---

/\*! elementor - v3.16.0 - 20-09-2023 \*/ .elementor-heading-title{padding:0;margin:0;line-height:1}.elementor-widget-heading .elementor-heading-title\[class\*=elementor-size-\]>a{color:inherit;font-size:inherit;line-height:inherit}.elementor-widget-heading .elementor-heading-title.elementor-size-small{font-size:15px}.elementor-widget-heading .elementor-heading-title.elementor-size-medium{font-size:19px}.elementor-widget-heading .elementor-heading-title.elementor-size-large{font-size:29px}.elementor-widget-heading .elementor-heading-title.elementor-size-xl{font-size:39px}.elementor-widget-heading .elementor-heading-title.elementor-size-xxl{font-size:59px}

## Instalando e configurando o Screenfetch no Debian 12 Bookworm

O Screenfetch é uma ferramenta de linha de comando que exibe informações concisas sobre o sistema operacional e o hardware do computador de forma visualmente agradável. Ele fornece um resumo das especificações do sistema, como distribuição Linux, versão do kernel, CPU, RAM e outras informações relevantes.

## Atualizando o Sistema.

```bash
sudo apt update && sudo apt upgrade -y
```

## Instalando Screenfetch.

Digite o seguinte comando no terminal e pressione `Enter` para instalar o "screenfetch" usando o gerenciador de pacotes APT:

```bash
sudo apt install screenfetch
```

## Testando o Screenfetch.  
## Agora que o "screenfetch" está instalado, você pode testá-lo. Digite o seguinte comando e pressione `Enter`:

```bash
screenfetch
```

## Configurando o Screenfetch para Iniciar Automaticamente.**  
  
_**'Essa configuração deverá ser efetuado** no seu diretório **home**'._

Abra o arquivo `.bashrc` no seu editor de texto favorito. Você pode usar o "nano" assim:

```bash
nano /home/rosnertech/.bashrc
```

## Role até o final do arquivo e adicione a seguinte linha:

/\*! elementor - v3.16.0 - 20-09-2023 \*/ .elementor-widget-image{text-align:center}.elementor-widget-image a{display:inline-block}.elementor-widget-image a img\[src$=".svg"\]{width:48px}.elementor-widget-image img{vertical-align:middle;display:inline-block} ![](https://blog.rosnertech.com.br/wp-content/uploads/2023/08/Captura-de-tela-2023-08-30-113035.png)

```bash
if [ -f /usr/bin/screenfetch ]; then screenfetch; fi
```

Salve as alterações pressionando `Ctrl + O`, pressione `Enter` para confirmar e, em seguida, pressione `Ctrl + X` para sair do editor "nano".

## Testando a Inicialização Automática.

Feche e reabra o terminal. Ao abrir o terminal novamente, você verá automaticamente as informações do "screenfetch" sendo exibidas.

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/08/Captura-de-tela-2023-09-04-121517.png)

## Neste tutorial, apresento um guia passo a passo sobre como realizar a instalação e configuração do "screenfetch" no Debian 12 Bookworm.

Agradeço por ter lido este artigo e espero revê-lo em breve. Continue nos acompanhando para mais conteúdo relevante e inspirador. Até a próxima!
