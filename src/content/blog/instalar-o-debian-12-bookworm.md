---
title: "Instalar o Debian 12 Bookworm"
description: "A nova versão do Debian vem com uma quantidade significativamente maior de software em comparação ao seu antecessor, o Bullseye. Esta distribuição inclui mais de 11.089 novos pacotes."
pubDate: 2023-09-17
updatedDate: 2023-09-23
tags: ["Debian", "Debian 12 Bookworm"]
wpId: 889
draft: false
---

/\*! elementor - v3.16.0 - 20-09-2023 \*/ .elementor-heading-title{padding:0;margin:0;line-height:1}.elementor-widget-heading .elementor-heading-title\[class\*=elementor-size-\]>a{color:inherit;font-size:inherit;line-height:inherit}.elementor-widget-heading .elementor-heading-title.elementor-size-small{font-size:15px}.elementor-widget-heading .elementor-heading-title.elementor-size-medium{font-size:19px}.elementor-widget-heading .elementor-heading-title.elementor-size-large{font-size:29px}.elementor-widget-heading .elementor-heading-title.elementor-size-xl{font-size:39px}.elementor-widget-heading .elementor-heading-title.elementor-size-xxl{font-size:59px}

## Instalar o Debian 12 Bookworm

O Debian 12 traz uma grande expansão de software em comparação com o Bullseye, seu antecessor. Com mais de 11.089 novos pacotes, o número total de pacotes disponíveis agora ultrapassa 64.419. A maioria do software na distribuição foi atualizada, com cerca de 67% dos pacotes, ou seja, mais de 43.254 pacotes, oferecendo versões mais recentes.

Além disso, aproximadamente 10% dos pacotes presentes no Bullseye, o que equivale a mais de 6.296 pacotes, foram removidos da distribuição por várias razões. Isso significa que esses pacotes não receberão mais atualizações e serão considerados "obsoletos" nas interfaces de gerenciamento de pacotes. Mais informações sobre esses pacotes podem ser encontradas na Seção 4.8, "Pacotes Obsoletos".

Outra razão para escolher a versão netinst é realizar uma instalação limpa, instalando apenas os pacotes essenciais e evitando instalações desnecessárias. Uma novidade importante no Debian 12 é a adição da seção "non-free-firmware" ao repositório. A maioria dos pacotes de firmware não livre foi movida da seção "non-free" para essa nova seção, preparando o terreno para o lançamento do Debian 12. Essa mudança permite a criação de imagens de instalação oficiais que contêm apenas pacotes das seções "main" e "non-free-firmware", excluindo "contrib" e "non-free". Essa alteração é especialmente útil, uma vez que muitos usuários não estavam cientes da existência da versão "non-free" nas edições anteriores do Debian, o que causava dificuldades ao tentar instalar drivers, como os de placas de rede.

## [https://wiki.debian.org/SourcesList](https://wiki.debian.org/SourcesList)  

Primeiramente, você precisará baixar a imagem ISO do Debian 12. Recomendo usar a ISO netinst, pois ela instala os pacotes mais recentes pela internet durante a instalação. Certifique-se de estar conectado à internet durante todo o processo.

O repositório do Debian 12 traz uma novidade interessante, que é a inclusão do "non-free-firmware". A maior parte dos pacotes de firmware não livre foi transferida da seção "non-free" para a nova seção "non-free-firmware" como parte dos preparativos para o lançamento do Debian 12. Essa separação permite a criação de imagens de instalação oficiais que contenham pacotes da seção "main" e "non-free-firmware", excluindo a "contrib" e "non-free". Essa mudança é muito bem-vinda, já que muitos usuários não estavam cientes da existência da versão "non-free" nas edições anteriores do Debian e enfrentavam dificuldades ao precisar, por exemplo, instalar drivers para placas de rede.

## Aqui estão algumas explicações adicionais sobre as diferentes seções do repositório do Debian:

-   **main:** Esta seção contém pacotes que estão em conformidade com as Diretrizes de Software Livre do Debian (DFSG) e não dependem de software externo para funcionar. Esses pacotes são considerados parte integrante da distribuição Debian.
-   **contrib:** Nesta seção, você encontra software compatível com as DFSG, mas que pode depender de pacotes localizados na seção "main" (possivelmente empacotados para o Debian em "non-free").
-   **non-free:**  Aqui estão os pacotes de software que não estão em conformidade com as DFSG, incluindo drivers proprietários, como o próprio nome sugere. Esses pacotes não são gratuitos no sentido de não serem de código aberto.
-   **non-free-firmware:** Esta nova seção contém pacotes de firmware não livres que são incluídos nas imagens oficiais do instalador do Debian. Normalmente, os binários de firmware são ativados por padrão quando o sistema determina que são necessários, mas sempre que possível, são oferecidas maneiras aos usuários para desativá-los durante a inicialização do sistema.

## Download da imagem ISO.  
## Baixe a imagem ISO do Debian 12 aqui: **[Debian 12 Bookworm (amd64)](https://chat.openai.com/c/link-da-imagem-iso)

Preparando o pendrive de boot

Use uma ferramenta de sua preferência para criar um pendrive de boot com a imagem ISO. Recomendo o Balena Etcher, mas você pode usar o Rufus, UNetbootin ou outro de sua escolha.

## Iniciando a instalação

Insira o pendrive de boot e inicie o computador a partir dele. Assim que o sistema começar a carregar, escolha a opção "Graphical Install."

/\*! elementor - v3.16.0 - 20-09-2023 \*/ .elementor-widget-image{text-align:center}.elementor-widget-image a{display:inline-block}.elementor-widget-image a img\[src$=".svg"\]{width:48px}.elementor-widget-image img{vertical-align:middle;display:inline-block} ![](https://blog.rosnertech.com.br/wp-content/uploads/2023/09/DEB-01.png)

## Configurando a instalação

Selecione o idioma: "Portuguese (Brazil) – Português do Brasil."  
Escolha a localização: "Brasil."  
Selecione o layout do teclado: "Português Brasileiro."

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/09/DEB-02.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2023/09/DEB-03.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2023/09/DEB-04.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2023/09/DEB-06.png)

## Configuração manual da rede (se necessário)

Informe o endereço IP e o prefixo da rede.  
Defina o gateway.  
Informe os servidores DNS (separados por espaço, até três).  
Volte para a tela de "Nome de Máquina."

## Configurando informações pessoais

Informe o nome da máquina.  
Defina a senha de root (administrador).  
Informe seu nome completo.  
Defina um nome de usuário.  
Configure a senha deste usuário.  
Selecione seu estado para escolher o fuso horário.

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/09/DEB-07.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2023/09/DEB-09.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2023/09/DEB-10.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2023/09/DEB-11.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2023/09/DEB-12.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2023/09/DEB-13.png)

## Particionamento

Se você não tem necessidades específicas de particionamento, selecione a opção "Assistido – usar o disco inteiro." Isso é suficiente na maioria dos casos. Certifique-se de que está ciente das implicações das outras opções antes de escolher uma delas.

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/09/DEB-14.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2023/09/DEB-15.png)

## Finalizando o particionamento.  
## Selecione o disco no qual você deseja instalar o Debian.  
Escolha "Todos os arquivos em uma partição (para iniciantes)" para simplificar a instalação.  
Confirme a escrita das mudanças no disco

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/09/DEB-16.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2023/09/DEB-17.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2023/09/DEB-18.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2023/09/DEB-20.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2023/09/DEB-21.png)

## Configurando os repositórios.  
## Escolha o espelho de repositório mais adequado para você, por exemplo, "deb.debian.org."  
Deixe em branco a configuração do proxy, a menos que você use um.

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/09/DEB-22.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2023/09/DEB-23.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2023/09/DEB-24.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2023/09/DEB-25.png)

## O sistema fornece anonimamente estatísticas aos desenvolvedores.

Neste é um ambiente de teste, escolheremos a opção **"Não"**.

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/09/DEB-26.png)

## Escolhendo os pacotes a serem instalados.  
## Neste ponto, é crucial escolher os pacotes desejados. Queremos uma instalação limpa.

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/09/DEB-28.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2023/09/DEB-29.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2023/09/DEB-30.png)

## Configurando o GRUB.  
## Escolha "Sim" para instalar o GRUB, que é necessário para o boot do sistema.  
Selecione o disco onde o GRUB será configurado (geralmente /dev/sda).  
Aguarde a finalização da instalação do GRUB.

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/09/DEB-31-1.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2023/09/DEB-32.png)

## Concluindo a instalação.  
## Escolha "Continuar para reiniciar."  
Quando o sistema reiniciar, você verá o GRUB. Se necessário, você pode escolher um kernel anterior ou realizar outras ações.  
Finalmente, você chegará à tela de login, onde pode fazer login como usuário root diretamente.

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/09/DEB-33.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2023/09/DEB-34.png)

Agora você tem um servidor Debian 12 instalado e pronto para uso. Se desejar, você pode fazer SSH para o endereço IP do seu servidor para continuar a configuração ou adicionar.  
Ou logar no servidor com usuário que você criou anteriormente.

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/09/DEB-35.png)

Se você não sabe o endereço IP do seu servidor, conecte-se usando seu nome de usuário e execute o seguinte comando: `ip a`. Isso fornecerá as informações de rede necessárias para continuar a configuração.

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/09/DEB-36.png)

Perfeito, no seu laboratório, o endereço IP do servidor é 192.168.55.83/24. Com isso, você pode facilmente conectar-se via SSH, já que o SSH foi instalado nos passos anteriores. Agora, você pode prosseguir com as configurações adicionais necessárias.

Para verificar se o seu Debian inicializou sem nenhum erro, utilize o seguinte comando:

```batch
systemctl --failed
```

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/09/DEB-37.png)

## Neste post, forneci um guia passo a passo sobre como realizar uma instalação do Debian 12 Bookworm. Com essas instruções, você agora tem um Servidor limpo do Debian.

Agradeço por ler esse artigo e espero vê-lo novamente em breve. Continue nos acompanhando para mais conteúdo relevante e inspirador. Até a próxima!
