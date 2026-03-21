---
title: "Instalar e ativar o sudo no Debian 12 Bookworm"
description: "O comando 'sudo' no Debian (e em muitas outras distribuições Linux) é uma ferramenta que permite que usuários autorizados executem comandos como superusuário ou outro usuário com privilégios elevados."
pubDate: 2023-09-23
updatedDate: 2023-09-23
tags: ["Debian", "Linux"]
wpId: 937
draft: false
---

/\*! elementor - v3.16.0 - 20-09-2023 \*/<br /> .elementor-heading-title{padding:0;margin:0;line-height:1}.elementor-widget-heading .elementor-heading-title\[class\*=elementor-size-\]>a{color:inherit;font-size:inherit;line-height:inherit}.elementor-widget-heading .elementor-heading-title.elementor-size-small{font-size:15px}.elementor-widget-heading .elementor-heading-title.elementor-size-medium{font-size:19px}.elementor-widget-heading .elementor-heading-title.elementor-size-large{font-size:29px}.elementor-widget-heading .elementor-heading-title.elementor-size-xl{font-size:39px}.elementor-widget-heading .elementor-heading-title.elementor-size-xxl{font-size:59px}

## Instalar e ativar o sudo no debian 12

O comando "sudo" no Debian (e em muitas outras distribuições Linux) é uma ferramenta que permite que usuários autorizados executem comandos como superusuário ou outro usuário com privilégios elevados. "Sudo" é uma abreviação de "superuser do", que indica que você está temporariamente se tornando o superusuário (também conhecido como root) ou outro usuário com permissões especiais para executar tarefas administrativas no sistema. Isso é útil porque limita o risco de comandos acidentais ou maliciosos que podem prejudicar o sistema, já que exige a autenticação do usuário antes de permitir que essas ações sejam executadas. A razão pela qual o "sudo" não vem ativado por padrão no Debian e em muitas outras distribuições Linux é principalmente por motivos de segurança. Ativar o "sudo" significa permitir que usuários normais realizem ações com privilégios de superusuário, o que pode ser arriscado se não for devidamente configurado e gerenciado. Ao desativar o "sudo" por padrão, o Debian ajuda a garantir que os usuários não tenham acesso irrestrito aos comandos que podem potencialmente prejudicar o sistema, a menos que o administrador do sistema o configure explicitamente. A configuração do "sudo" no Debian é feita pelo administrador do sistema. Para habilitá-lo, o administrador precisa adicionar o usuário desejado ao grupo "sudoers" e configurar as permissões específicas que esse usuário terá ao executar comandos com "sudo". Isso oferece um maior controle sobre quem tem permissão para realizar tarefas administrativas e reduz os riscos associados a erros acidentais ou maliciosos. Em resumo, o "sudo" é uma ferramenta poderosa de controle de acesso que não é ativada por padrão no Debian e em outras distribuições Linux para garantir a segurança do sistema, exigindo que os administradores configurem e gerenciem cuidadosamente as permissões de uso. **Entrar como usuário root.** Primeiro, você precisa estar logado como usuário root. Se você não estiver logado como root, pode usar o comando `su` para fazer isso:

```bash
su -
```

## Atualizar o Sistema.** É uma boa prática manter seu sistema atualizado. Use os seguintes comandos para atualizar seus repositórios e pacotes:

```bash
apt-get update -y
apt-get upgrade -y
```

## Instalar o Sudo.** Agora, vamos instalar o "sudo" em seu sistema Debian. Use o seguinte comando:

```bash
apt-get install sudo -y
```

## Adicionar seu Usuário ao Grupo do Sudo.** Para permitir que seu usuário utilize o "sudo", você precisa adicioná-lo ao grupo "sudo". Substitua `[seu usuário]` pelo seu nome de usuário:

```bash
adduser [seu usuário] sudo
```

## Reiniciar o Sistema.** Agora que você adicionou seu usuário ao grupo "sudo", é necessário reiniciar o sistema para que as alterações tenham efeito:

```bash
reboot
```

Após reiniciar, o "sudo" estará instalado e configurado em seu sistema Debian 12. Você agora pode executar comandos com privilégios elevados usando o "sudo". **Neste post, forneci um guia passo a passo sobre como realizar a instalação e configuração do "sudo" no Debian 12 Bookworm.  Agora você tem um sistema mais seguro e controlado, com a capacidade de executar tarefas administrativas com segurança.** **Agradeço por ler esse artigo e espero vê-lo novamente em breve. Continue nos acompanhando para mais conteúdo relevante e inspirador. Até a próxima!
