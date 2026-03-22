---
title: "Como Extrair Chave Privada, Certificado CRT e PEM de um Certificado PFX"
description: "Um Certificado SSL (Secure Socket Layer) é um protocolo de segurança que estabelece uma conexão criptografada entre um servidor web e um navegador, garantindo a segurança da comunicação. Ele autentica"
pubDate: 2024-02-03
updatedDate: 2024-02-03
tags: ["OpenSSL", "Certificado SSL"]
wpId: 1285
draft: false
---

## Como Extrair Chave Privada, Certificado CRT e PEM de um Certificado PFX

Neste tutorial, vamos guiar você através do processo de extração da chave privada, do certificado CRT e PEM de um arquivo certificado.pfx. Além disso, mostraremos como exportar a chave privada para um arquivo key.pem sem senha. Utilizaremos a ferramenta OpenSSL para realizar essas operações.

## Instalação do OpenSSL

Certifique-se de ter o OpenSSL instalado em seu sistema. Se não tiver, você pode baixá-lo em [https://www.openssl.org/](https://www.openssl.org/).

## Extração da Chave Privada do Certificado.pfx

Abra o terminal e execute o seguinte comando:

```bash
openssl pkcs12 -in seu_certificado.pfx -nocerts -out chave_privada.key.pem -nodes
```

Este comando extrairá a chave privada do certificado.pfx e a salvará no arquivo `chave_privada.key.pem` sem senha.

## Extração do Certificado CRT

Agora, vamos extrair o certificado CRT do arquivo certificado.pfx:

```bash
openssl pkcs12 -in seu_certificado.pfx -clcerts -nokeys -out certificado.crt
```

Isso criará o arquivo `certificado.crt` contendo o certificado CRT.

## Extração do Certificado PEM

Para extrair o certificado PEM do certificado.pfx, execute:

```bash
openssl pkcs12 -in seu_certificado.pfx -clcerts -nokeys -out certificado.pem
```

O certificado PEM será salvo no arquivo `certificado.pem`.

## Extração do Certificado CRT sem Senha

Se desejar o certificado CRT sem senha, você pode usar o seguinte comando:

```bash
openssl rsa -in certificado.crt -out certificado_sem_senha.crt
```

Isso removerá a senha do certificado CRT, e a versão sem senha será salva em `certificado_sem_senha.crt`.

## Conclusão

Agora você completou a extração da chave privada, certificado CRT e PEM do certificado.pfx, além de exportar a chave privada sem senha para o arquivo key.pem. Certifique-se de armazenar esses arquivos de maneira segura, pois contêm informações sensíveis.

Agradeço por ler esse artigo e espero vê-lo novamente em breve. Continue nos acompanhando para mais conteúdo relevante e inspirador. Até a próxima!
