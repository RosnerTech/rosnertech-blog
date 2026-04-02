---
title: "Protegendo seu repositório Git com pre-commit"
description: "Aprenda a instalar e configurar o pre-commit para bloquear automaticamente commits com chaves privadas, erros de YAML, conflitos de merge e muito mais."
pubDate: 2026-04-02
updatedDate: 2026-04-02
tags: ["Git", "DevOps", "Segurança", "Linux", "Windows"]
draft: false
---

## Protegendo seu repositório Git com pre-commit

## Introdução

Já aconteceu de alguém do time commitar uma chave privada, um arquivo `.env` com senha em texto puro, ou um YAML com erro de sintaxe que quebrou o pipeline? O **pre-commit** resolve isso antes mesmo que o commit aconteça.

O `pre-commit` é uma ferramenta que intercepta o comando `git commit` e executa uma série de verificações automáticas no código. Se alguma verificação falhar, o commit é **bloqueado** até que o problema seja corrigido.

Neste artigo, você vai aprender a instalar e configurar o pre-commit no seu repositório, cobrindo tanto **Linux (Debian/Ubuntu)** quanto **Windows**.

## Pré-requisitos

Antes de começar, você precisará ter:

1. Git instalado e um repositório iniciado
2. Python 3.x instalado

Para verificar se o Python está disponível:

```bash
python --version
```

ou

```bash
python3 --version
```

## Instalando o pre-commit

### Linux (Debian/Ubuntu)

```bash
pip install pre-commit
```

Caso o `pip` não esteja disponível, instale-o primeiro:

```bash
sudo apt update && sudo apt install python3-pip -y
pip install pre-commit
```

### Windows

No **PowerShell** ou **CMD**, com Python já instalado:

```powershell
pip install pre-commit
```

Caso o Python não esteja instalado, você pode baixá-lo em [python.org](https://www.python.org/downloads/) ou instalar via `winget`:

```powershell
winget install Python.Python.3
```

Após a instalação, verifique:

```bash
pre-commit --version
```

![Saída do comando pre-commit --version no terminal](/img/pre-commit/01-pre-commit-version.png)

## Criando o arquivo de configuração

Na raiz do repositório, crie o arquivo `.pre-commit-config.yaml`:

```yaml
repos:
  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v5.0.0
    hooks:
      - id: trailing-whitespace
      - id: end-of-file-fixer
      - id: check-yaml
      - id: check-json
      - id: check-merge-conflict
      - id: detect-private-key
      - id: no-commit-to-branch
        args: [--branch, main]
```

### O que cada hook faz

| Hook | Descrição |
|---|---|
| `trailing-whitespace` | Remove espaços em branco no final das linhas |
| `end-of-file-fixer` | Garante que os arquivos terminem com uma linha em branco |
| `check-yaml` | Valida a sintaxe de arquivos `.yaml` e `.yml` |
| `check-json` | Valida a sintaxe de arquivos `.json` |
| `check-merge-conflict` | Bloqueia commits com marcadores de conflito (`<<<<<<<`) |
| `detect-private-key` | Bloqueia commits que contenham chaves privadas |
| `no-commit-to-branch` | Impede commits diretos na branch `main` |

💡 **Dica:** o campo `rev` define a versão dos hooks. Você pode consultar as versões disponíveis em [github.com/pre-commit/pre-commit-hooks/releases](https://github.com/pre-commit/pre-commit-hooks/releases).

## Ativando os hooks no repositório

Com o arquivo `.pre-commit-config.yaml` criado, execute dentro da pasta do repositório:

```bash
pre-commit install
```

Você deve ver a mensagem:

```
pre-commit installed at .git/hooks/pre-commit
```

![Saída do comando pre-commit install no terminal](/img/pre-commit/02-pre-commit-install.png)

A partir desse momento, toda vez que você executar `git commit`, os hooks serão disparados automaticamente.

⚠️ **Importante:** o `pre-commit install` precisa ser executado **uma vez por máquina** em cada repositório clonado. Se outro desenvolvedor clonar o repositório, ele também precisará rodar esse comando.

## Testando os hooks

Para rodar os hooks em todos os arquivos do repositório de uma vez (sem precisar fazer um commit), execute:

```bash
pre-commit run --all-files
```

Os hooks serão executados e você verá o resultado de cada verificação: `Passed`, `Failed` ou `Fixed`.

![Saída do comando pre-commit run --all-files](/img/pre-commit/03-pre-commit-run-all.png)

💡 **Dica:** use `pre-commit run --all-files` sempre que adicionar novos hooks ao arquivo de configuração, para garantir que todo o repositório esteja em conformidade.

## Testando o bloqueio de chave privada

Vamos simular o cenário mais crítico: tentar commitar um arquivo com uma chave privada.

```bash
echo "-----BEGIN RSA PRIVATE KEY-----" > chave-teste.txt
git add chave-teste.txt
git commit -m "teste: tentando commitar chave privada"
```

O hook `detect-private-key` vai **bloquear o commit** imediatamente:

![Hook detect-private-key bloqueando commit com chave privada](/img/pre-commit/04-detect-private-key.png)

Para desfazer o teste:

```bash
rm chave-teste.txt
git restore --staged chave-teste.txt 2>/dev/null; true
```

⚠️ **Importante:** se o seu repositório contém arquivos de documentação ou tutoriais que mencionam strings de chaves privadas como exemplo, o hook vai bloquear esses arquivos também. Para evitar falsos positivos, você pode excluir pastas específicas do hook:

```yaml
- id: detect-private-key
  exclude: ^src/content/blog/
```

Isso garante que a proteção continua ativa para o código, mas não bloqueia arquivos de documentação.

## Como funciona por baixo dos panos

Quando você executa `pre-commit install`, a ferramenta cria um arquivo executável em `.git/hooks/pre-commit`. Esse arquivo é chamado automaticamente pelo Git antes de finalizar qualquer commit.

Se algum hook **falhar**, o commit é abortado e você verá a descrição do problema no terminal. Corrija o problema, faça o `git add` novamente e tente o commit de novo.

Se um hook **corrigir automaticamente** um arquivo (como remover espaços em branco), você precisa fazer o `git add` do arquivo corrigido antes de repetir o commit.

## Considerações finais

Com o pre-commit configurado no seu repositório, você tem uma camada de segurança que:

1. Impede o vazamento de chaves privadas e credenciais
2. Mantém a consistência dos arquivos YAML e JSON
3. Bloqueia commits acidentais em branches protegidas
4. Garante um padrão mínimo de qualidade no código

O `.pre-commit-config.yaml` é versionado junto com o projeto, o que significa que toda a equipe compartilha as mesmas regras automaticamente.

Agradeço por ler esse artigo e espero vê-lo novamente em breve. Continue nos acompanhando para mais conteúdo relevante e inspirador. Até a próxima!
