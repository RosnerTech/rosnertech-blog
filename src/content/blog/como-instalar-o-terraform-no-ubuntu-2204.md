---
title: "Como Instalar o Terraform no Ubuntu 22.04"
description: "Terraform é uma ferramenta de infraestrutura como código (IaC) de código aberto desenvolvida pela HashiCorp."
pubDate: 2024-05-25
updatedDate: 2024-10-06
tags: ["Ubuntu", "Terraform"]
wpId: 1474
draft: false
---

## Como Instalar o Terraform no Ubuntu 22.04

Terraform é uma ferramenta de infraestrutura como código (IaC) de código aberto desenvolvida pela HashiCorp. Ele permite que você defina e provisione recursos de infraestrutura de forma declarativa usando uma linguagem simples e legível por humanos. Com o Terraform, você pode gerenciar várias plataformas de nuvem, como Amazon Web Services (AWS), Microsoft Azure, Google Cloud Platform (GCP) e muitas outras, bem como infraestrutura local.

Siga os passos abaixo para instalar o Terraform no seu servidor Ubuntu 22.04:

## Atualizar o servidor

Primeiro, você precisa atualizar a lista de pacotes do seu servidor Ubuntu. Abra o terminal e execute o seguinte comando:

```bash
sudo apt update
```

## Instalar dependências

Em seguida, instale as dependências necessárias para adicionar o repositório da HashiCorp:

```bash
sudo apt install software-properties-common gnupg2 curl
```

## Importar a chave GPG

Para garantir que os pacotes sejam provenientes da HashiCorp, importe a chave GPG com o comando abaixo:

```bash
curl -fsSL https://apt.releases.hashicorp.com/gpg | sudo apt-key add -
```

## Adicionar o repositório do Terraform

Adicione o repositório do Terraform ao seu arquivo de repositório do APT:

```bash
sudo apt-add-repository "deb [arch=amd64] https://apt.releases.hashicorp.com $(lsb_release -cs) main"
```

## Instalar o Terraform

Agora, você está pronto para instalar o Terraform. Execute o seguinte comando:

```bash
sudo apt install terraform
```

## Verificar a instalação

Após a instalação, verifique se o Terraform foi instalado corretamente executando:

```bash
terraform -version
```

Você deve ver a versão do Terraform instalada no seu sistema.

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/05/terraform-01.png)

## Conclusão:  
## Seguindo esses passos, você terá o Terraform instalado no seu Ubuntu 22.04 e estará pronto para começar a gerenciar sua infraestrutura de forma eficiente e declarativa.

## Agradeço por ler esse artigo e espero vê-lo novamente em breve. Continue nos acompanhando para mais conteúdo relevante e inspirador. Até a próxima!
