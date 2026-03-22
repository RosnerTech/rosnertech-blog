---
title: "Alterar o fuso horário em um sistema Debian 12"
description: "O termo 'timezone' (ou 'fuso horário' em português) refere-se à divisão da Terra em diferentes regiões, cada uma com seu próprio ajuste de tempo em relação ao Tempo Universal Coordenado (UTC). Os fuso"
pubDate: 2023-11-19
updatedDate: 2023-11-19
tags: ["Debian 12 Bookworm", "Debian", "Linux"]
wpId: 1178
draft: false
---

## Alterando o fuso horário em um sistema Debian 12

O termo "timezone" (ou "fuso horário" em português) refere-se à divisão da Terra em diferentes regiões, cada uma com seu próprio ajuste de tempo em relação ao Tempo Universal Coordenado (UTC). Os fusos horários são usados para padronizar e coordenar o tempo em diferentes partes do mundo.

A Terra é dividida em 24 fusos horários principais, cada um representando uma hora completa. Cada fuso horário é geralmente centrado em um meridiano específico, como o Meridiano de Greenwich, e os fusos horários a leste e oeste desse meridiano têm horas diferentes.

O uso de fusos horários é essencial para sincronizar atividades em diferentes partes do mundo, garantindo que eventos ocorram simultaneamente em locais específicos. Cada fuso horário está geralmente associado a uma determinada região geográfica ou país.

A configuração correta do fuso horário em um sistema operacional é importante para garantir que as datas e horas sejam exibidas corretamente e que as operações de agendamento ocorram no momento esperado. Em sistemas Linux, como o Debian, o fuso horário pode ser configurado para corresponder à localização geográfica do usuário ou do sistema.

## 1\. Conectar-se ao Terminal

Abra o terminal no seu sistema Debian. Você pode fazer isso pressionando `Ctrl + Alt + T` ou procurando por "Terminal" no menu.

## 2\. Logar como Superusuário

Digite o seguinte comando e pressione Enter para se tornar superusuário:

```bash
sudo su
```

Digite a senha de administrador quando solicitado.

## 3\. Verificar o Fuso Horário Atual

Para verificar o fuso horário atual, use o seguinte comando:

```bash
date
```

## 4\. Selecionar o Fuso Horário Desejado

Digite o seguinte comando para abrir a configuração de fuso horário:

```bash
dpkg-reconfigure tzdata
```

Isso abrirá uma interface interativa. Use as setas para navegar, escolha a região geográfica e o fuso horário correspondente.

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/11/timezone_02.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2023/11/timezone_03.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2023/11/timezone_04.png)

## 5\. Confirmar a Alteração

Após selecionar o fuso horário desejado, o sistema exibirá uma mensagem confirmando a alteração. Pressione Enter para finalizar.

## 6\. Verificar a Mudança no Fuso Horário

Use novamente o comando `date` para confirmar que o fuso horário foi alterado com sucesso.

```bash
date
```

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/11/timezone_05.png)

## 7\. Sair do Modo Superusuário

Para sair do modo superusuário, digite:

```bash
exit
```

## 8\. Reiniciar o Sistema (opcional)

Às vezes, é necessário reiniciar o sistema para que as alterações tenham efeito total. Você pode fazer isso digitando:

```bash
sudo reboot
```

Agora seu sistema Debian deve refletir o novo fuso horário. Certifique-se de ajustar o fuso horário conforme necessário para atender às suas preferências ou requisitos locais.

## Agradeço por ler esse artigo e espero vê-lo novamente em breve. Continue nos acompanhando para mais conteúdo relevante e inspirador. Até a próxima!
