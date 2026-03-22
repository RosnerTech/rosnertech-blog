---
title: "Como criar e gerenciar usuários no Linux"
description: "Aprenda a criar, modificar e remover usuários no Linux com os comandos essenciais do dia a dia."
pubDate: 2026-03-22
tags: ["Linux", "Debian", "Ubuntu"]
draft: false
---

## Introdução

Se você administra servidores Linux, saber gerenciar usuários é uma das habilidades mais importantes do dia a dia. Neste tutorial você vai aprender a criar, modificar, bloquear e remover usuários no Debian e Ubuntu de forma prática e direta.

## Pré-requisitos

Antes de começar, você vai precisar de:

- Um servidor com Debian 13 ou Ubuntu 22.04
- Acesso ao terminal com privilégios sudo

## Criando um usuário

Para criar um novo usuário no sistema, utilize o comando `useradd`:

```bash
sudo useradd -m -s /bin/bash nomedousuario
```

Os parâmetros utilizados são:

- `-m` — cria a pasta home do usuário automaticamente em `/home/nomedousuario`
- `-s /bin/bash` — define o bash como shell padrão do usuário

Após criar o usuário, defina uma senha para ele:

```bash
sudo passwd nomedousuario
```

Você será solicitado a digitar e confirmar a nova senha.

## Adicionando o usuário ao grupo sudo

Se você precisar que o usuário tenha permissões administrativas, adicione-o ao grupo sudo:

```bash
sudo usermod -aG sudo nomedousuario
```

Para verificar se o usuário foi adicionado corretamente, utilize:

```bash
groups nomedousuario
```

A saída deve mostrar `sudo` entre os grupos listados.

## Listando os usuários do sistema

Para visualizar todos os usuários que possuem um shell configurado no sistema, utilize:

```bash
cat /etc/passwd | grep /bin/bash
```

Você também pode utilizar o comando `getent` para listar todos os usuários:

```bash
getent passwd
```

## Modificando um usuário existente

### Alterando o shell padrão

Se você precisar alterar o shell de um usuário, utilize:

```bash
sudo usermod -s /bin/zsh nomedousuario
```

### Alterando o nome do usuário

Para renomear um usuário, utilize:

```bash
sudo usermod -l novonome nomedousuario
```

### Alterando a pasta home

Se você precisar alterar a pasta home do usuário:

```bash
sudo usermod -d /novo/caminho -m nomedousuario
```

O parâmetro `-m` move o conteúdo da pasta home antiga para a nova.

## Bloqueando e desbloqueando um usuário

Se você precisar bloquear temporariamente o acesso de um usuário sem removê-lo:

```bash
# bloquear o usuário
sudo passwd -l nomedousuario

# desbloquear o usuário
sudo passwd -u nomedousuario
```

Para verificar se o usuário está bloqueado:

```bash
sudo passwd -S nomedousuario
```

Se a saída mostrar `L` após o nome do usuário, significa que ele está bloqueado.

## Removendo um usuário

Quando você precisar remover um usuário do sistema, utilize:

```bash
# remove apenas o usuário
sudo userdel nomedousuario

# remove o usuário e a pasta home
sudo userdel -r nomedousuario
```

Atenção: ao utilizar `-r`, todos os arquivos da pasta home do usuário serão removidos permanentemente.

## Conclusão

Com esses comandos você consegue gerenciar usuários no Linux de forma eficiente e segura. Se você tiver alguma dúvida ou sugestão, deixe nos comentários abaixo!
