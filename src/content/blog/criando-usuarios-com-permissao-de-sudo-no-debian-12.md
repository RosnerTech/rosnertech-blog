---
title: "Criando Usuários com Permissão de Sudo no Debian 12"
description: "Criar novos usuários no Debian 12 e conceder-lhes permissões de sudo. Também abordaremos como criar grupos e adicionar usuários a esses grupos, além de algumas das melhores práticas de gerenciamento d"
pubDate: 2024-07-17
updatedDate: 2024-07-17
tags: ["Linux", "Debian 12 Bookworm", "Debian"]
wpId: 1550
draft: false
---

/\*! elementor - v3.23.0 - 15-07-2024 \*/ .elementor-heading-title{padding:0;margin:0;line-height:1}.elementor-widget-heading .elementor-heading-title\[class\*=elementor-size-\]>a{color:inherit;font-size:inherit;line-height:inherit}.elementor-widget-heading .elementor-heading-title.elementor-size-small{font-size:15px}.elementor-widget-heading .elementor-heading-title.elementor-size-medium{font-size:19px}.elementor-widget-heading .elementor-heading-title.elementor-size-large{font-size:29px}.elementor-widget-heading .elementor-heading-title.elementor-size-xl{font-size:39px}.elementor-widget-heading .elementor-heading-title.elementor-size-xxl{font-size:59px}

## Criando Usuários com Permissão de Sudo no Debian 12

## Introdução  
## Neste tutorial, você aprenderá a criar novos usuários no Debian 12 e conceder-lhes permissões de sudo. Também abordaremos como criar grupos e adicionar usuários a esses grupos, além de algumas das melhores práticas de gerenciamento de usuários no Linux.

## Conecte-se ao Seu Servidor  
## Primeiro, faça login no seu servidor Debian 12 como root ou com um usuário que tenha privilégios de sudo.  
  
## Crie um Novo Usuário  
## Para criar um novo usuário, use o comando `adduser` seguido do nome de usuário desejado. Por exemplo, para criar um usuário chamado `rosnertech`, execute:

```bash
sudo adduser rosnertech
```

Você será solicitado a definir uma senha e a fornecer algumas informações adicionais, como o nome completo. Estas informações adicionais são opcionais e podem ser deixadas em branco pressionando `Enter`.

## Adicione o Novo Usuário ao Grupo Sudo  
## Para conceder permissões de sudo ao novo usuário, você precisa adicioná-lo ao grupo `sudo`. No Debian, os usuários no grupo `sudo` têm permissão para usar o comando `sudo`. Para fazer isso, execute:

```bash
sudo usermod -aG sudo rosnertech
```

## Verifique se o Novo Usuário Tem Permissões de Sudo  
## Para verificar se o novo usuário tem permissões de sudo, faça login como o novo usuário:

```bash
su - rosnertech
```

Então, tente executar um comando com sudo, como `sudo ls /root`:

```bash
sudo ls /root
```

Se o novo usuário tiver permissões de sudo corretamente configuradas, você deverá ser solicitado a inserir a senha do novo usuário para executar o comando.

## Criando Grupos e Adicionando Usuários a Grupos  
## Para criar um novo grupo, use o comando `addgroup` seguido do nome do grupo. Por exemplo, para criar um grupo chamado `infraestrutura`, execute:

```bash
sudo addgroup infraestrutura
```

## Adicionar um Usuário a um Grupo  
## Para adicionar um usuário a um grupo, use o comando `usermod -aG` seguido do nome do grupo e do nome do usuário. Por exemplo, para adicionar o usuário `rosnertech` ao grupo `infraestrutura`, execute:

```bash
sudo usermod -aG infraestrutura rosnertech
```

## Verificar a Afiliação a Grupos  
## Para verificar a quais grupos um usuário pertence, use o comando `groups` seguido do nome do usuário. Por exemplo, para verificar os grupos do usuário `rosnertech`, execute:

```bash
groups infraestrutura
```

## Melhores Práticas de Gerenciamento de Usuários no Linux

Mantenha Senhas Seguras**: Use senhas fortes que incluam uma combinação de letras maiúsculas, minúsculas, números e caracteres especiais. Evite usar senhas fáceis de adivinhar.  
## Uso de Chaves SSH**: Para maior segurança, especialmente em servidores, configure a autenticação SSH com chaves públicas e privadas. Isso é mais seguro do que usar senhas simples.  
## Privilégios Mínimos**: Conceda aos usuários apenas as permissões necessárias para realizar suas tarefas. Evite dar privilégios de sudo a usuários que não precisam deles.  
## Manutenção Regular**: Revise regularmente os usuários e grupos no seu sistema. Remova contas de usuários que não são mais necessárias e verifique as permissões de sudo para garantir que estão atualizadas.  
## Monitoramento e Auditoria**: Utilize ferramentas de monitoramento e auditoria para acompanhar as atividades dos usuários no sistema. Isso ajuda a detectar e responder a atividades suspeitas rapidamente.  
## Treinamento e Conscientização**: Eduque os usuários sobre as melhores práticas de segurança, incluindo a importância de usar senhas seguras, reconhecer tentativas de phishing e entender os riscos de executar comandos como sudo sem a devida cautela.

## Conclusão:  
  
## Criar usuários com permissões de sudo e gerenciar grupos no Debian 12 é um processo simples, mas que deve ser realizado com atenção às melhores práticas de segurança. Ao seguir este tutorial e aplicar as recomendações de segurança, você garantirá que seu sistema Linux seja mais seguro e eficiente.

## Agradeço por ler esse artigo e espero vê-lo novamente em breve. Continue nos acompanhando para mais conteúdo relevante e inspirador. Até a próxima!
