---
title: "Esqueci a senha do usuário no GLPI. O que devo fazer agora?"
description: "Esqueci a senha do usuário no GLPI."
pubDate: 2023-10-22
updatedDate: 2023-10-22
tags: ["GLPI", "Linux"]
wpId: 1110
draft: false
---

## Esqueci a senha do usuário no GLPI. O que devo fazer agora?

Hoje, fui acessar meu ambiente no GLPI e não conseguia me lembrar da senha que tinha configurado para o usuário 'glpi'. Após verificar minhas configurações, não a encontrei. Portanto, foi necessário fazer a alteração através do banco de dados. A seguir, apresento o procedimento a ser seguido caso você tenha perdido ou esquecido sua senha.

## Passo 1: Acessando o Banco de Dados** Primeiro, acesse o servidor onde o banco de dados do GLPI está hospedado. Você precisará de um cliente de banco de dados, como o MySQL Workbench ou o phpMyAdmin, ou usar um cliente de linha de comando, como o MySQL Client, para se conectar ao banco de dados GLPI

## Passo 2: Verificando a Existência do Usuário glpi

Execute a seguinte consulta SQL para verificar se o usuário "glpi" existe no banco de dados GLPI. Substitua "sua\_base\_de\_dados" pelo nome real do banco de dados GLPI:

```bash
SELECT id, name, password FROM sua_base_de_dados.glpi_users WHERE id = 2 AND name = 'glpi';
```

Esta consulta selecionará o usuário com ID 2 e nome 'glpi'. Certifique-se de que o usuário 'glpi' tenha o ID 2 e que o nome 'glpi' esteja correto. Anote o ID do usuário 'glpi' se ele for encontrado.

## Passo 3: Redefinindo a Senha para "glpi"

Agora que você verificou a existência do usuário 'glpi', execute a seguinte comando SQL para redefinir a senha para "glpi". Substitua "sua\_base\_de\_dados" e o ID do usuário 'glpi' pelos valores reais:

```bash
UPDATE sua_base_de_dados.glpi_users SET password = '21232f297a57a5a743894a0e4a801fc3' WHERE ID = 2;
```

A senha '21232f297a57a5a743894a0e4a801fc3' é a representação em MD5 da senha 'glpi'. Isso definirá a senha de volta para "glpi".

## Passo 4: Acesso ao GLPI e Alteração da Senha**  

Agora que a senha foi redefinida, acesse o ambiente do GLPI usando o nome de usuário 'glpi' e a senha temporária 'glpi'.

Abra o navegador da web e vá para o endereço do GLPI.

Faça login com o nome de usuário 'glpi' e senha 'glpi'.

Após fazer o login, altere a senha para uma mais segura.

## Agradeço por ler esse artigo e espero vê-lo novamente em breve. Continue nos acompanhando para mais conteúdo relevante e inspirador. Até a próxima!
