---
title: "Instalando a IDE do Arduino no Ubuntu 22.04"
description: "O Arduino é uma plataforma de hardware e software de código aberto projetada para criar projetos eletrônicos interativos."
pubDate: 2024-09-08
updatedDate: 2024-09-08
tags: ["Ubuntu", "Linux", "Arduino"]
wpId: 1574
draft: false
---

/\*! elementor - v3.23.0 - 05-08-2024 \*/ .elementor-heading-title{padding:0;margin:0;line-height:1}.elementor-widget-heading .elementor-heading-title\[class\*=elementor-size-\]>a{color:inherit;font-size:inherit;line-height:inherit}.elementor-widget-heading .elementor-heading-title.elementor-size-small{font-size:15px}.elementor-widget-heading .elementor-heading-title.elementor-size-medium{font-size:19px}.elementor-widget-heading .elementor-heading-title.elementor-size-large{font-size:29px}.elementor-widget-heading .elementor-heading-title.elementor-size-xl{font-size:39px}.elementor-widget-heading .elementor-heading-title.elementor-size-xxl{font-size:59px}

## Instalando a IDE do Arduino no Ubuntu 22.04

Salve, Galerinha do TI! O que vamos criar hoje? Vou voltar a desenvolver alguns projetos em Arduino e aproveitar para escrever tutoriais. Como migrei meu homelab para Linux e estou usando o Ubuntu 22.04, vou mostrar como instalar a IDE do Arduino nessa distribuição, abordando os primeiros passos para quem deseja iniciar sua carreira como maker.

Para os usuários do Windows, o processo é bem direto, pois você pode instalar a IDE diretamente pela Microsoft Store. No entanto, para os usuários de Linux, o processo pode ser um pouco mais complicado devido a diferentes métodos de instalação e possíveis erros. Mas não se preocupe! Vou ensinar a maneira correta de instalar a IDE no meu homelab.

## Introdução ao Arduino  e IDE  

O que é Arduino?

O **Arduino** é uma plataforma de hardware e software de código aberto projetada para criar projetos eletrônicos interativos. Ele é composto por uma placa física de microcontrolador e um ambiente de desenvolvimento integrado (IDE), que permite escrever e carregar código diretamente na placa. A simplicidade e a acessibilidade do Arduino o tornam popular entre iniciantes, makers e desenvolvedores que desejam prototipar rapidamente projetos eletrônicos.  
Com o Arduino, você pode criar diversos projetos, desde automação residencial até dispositivos de medição e controle, robótica e muito mais. Ele é amplamente utilizado em áreas como educação, pesquisa e desenvolvimento de novos produtos.

O que é IDE?

A **IDE** (Integrated Development Environment, ou Ambiente de Desenvolvimento Integrado) é o software utilizado para programar o Arduino. No caso do **Arduino IDE**, ele permite que você escreva, edite e carregue códigos (chamados de "sketches") na placa Arduino. O **Arduino IDE** também facilita a conexão com diferentes placas Arduino e a interação com a vasta biblioteca de exemplos e funcionalidades.  
A interface da **IDE do Arduino** é simples e amigável, ideal para iniciantes e profissionais. Ela oferece ferramentas para verificar e compilar o código, além de um monitor serial para comunicação com a placa. A **IDE do Arduino 2**, versão mais recente, traz melhorias em desempenho e usabilidade, facilitando o desenvolvimento de projetos de forma mais eficiente.

Baixe o Arduino IDE 2

Acesse o [site oficial do Arduino](https://www.arduino.cc/en/software) e baixe a versão **AppImage** de 64 bits (X86-64) da **IDE do Arduino 2**.

/\*! elementor - v3.23.0 - 05-08-2024 \*/ .elementor-widget-image{text-align:center}.elementor-widget-image a{display:inline-block}.elementor-widget-image a img\[src$=".svg"\]{width:48px}.elementor-widget-image img{vertical-align:middle;display:inline-block} ![](https://blog.rosnertech.com.br/wp-content/uploads/2024/09/Arduino_01.png)

Permita a execução do arquivo

Após baixar o arquivo **AppImage**, você precisará torná-lo executável antes de poder rodá-lo. Siga os passos abaixo:  
Vá até a pasta onde o arquivo foi baixado (geralmente em **Downloads**).  
Clique com o botão direito no arquivo **AppImage**.  
Selecione **Propriedades**.  
Na aba **Permissões**, marque a caixa **Permitir execução de arquivo como programa**.

https://blog.rosnertech.com.br/wp-content/uploads/2024/09/Arduino\_01.webm

Agora, o arquivo **AppImage** está pronto para ser executado.

## Execute o arquivo AppImage

Agora que o arquivo tem permissão de execução, você pode simplesmente dar um **duplo clique** nele para iniciar a **IDE do Arduino 2**.

https://blog.rosnertech.com.br/wp-content/uploads/2024/09/Arduino\_02.webm

## Instale a biblioteca libfuse2 (se necessário)

Caso você tenha problemas ao tentar executar o arquivo **AppImage**, pode ser que o **FUSE** não esteja instalado corretamente no seu sistema. No **Ubuntu 22.04** e versões posteriores, siga os comandos abaixo para garantir que tudo funcione:

```bash
sudo add-apt-repository universe
```

## Instale o pacote libfuse2:

```bash
sudo apt install libfuse2
```

## Inicie a IDE do Arduino

Após ter garantido que o FUSE está instalado, clique novamente no arquivo **AppImage** para iniciar a **Arduino IDE 2**. Agora você pode começar a desenvolver seus projetos no Ubuntu!

## Conclusão:

Pronto! Seguindo esses passos, você terá a **IDE do Arduino 2** instalada e funcionando no **Ubuntu 22.04** de maneira simples e rápida.

## Agradeço por ler esse artigo e espero vê-lo novamente em breve. Continue nos acompanhando para mais conteúdo relevante e inspirador. Até a próxima!
