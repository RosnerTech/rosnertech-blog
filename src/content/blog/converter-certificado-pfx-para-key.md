---
title: "Converter certificado .pfx para .key"
description: "SSL significa Secure Sockets Layer, um tipo de segurança digital que permite a comunicação criptografada entre um domínio de site e um navegador."
pubDate: 2023-02-14
updatedDate: 2023-08-13
tags: ["Debian", "Servidor Web", "Ubuntu", "OpenSSL", "Linux"]
wpId: 387
draft: false
---

## Converter certificado .pfx para .key

SSL significa Secure Sockets Layer, um tipo de segurança digital que permite a comunicação criptografada entre um domínio de site e um navegador. O HTTPS é uma extensão segura do HTTP. Os sites que configurarem um certificado SSL/TLS podem utilizar o protocolo HTTPS para estabelecer uma comunicação segura com o servidor.

Nesse tutorial irei demonstrar como converter o certificado.pfx para certificado.key ou certificado.pem. Irei demonstrar os comandos necessários para converter o nosso certificado.pfx (que contém a parte da chave privada, que será armazenado em nosso servidor Web, utilizaremos o Ngnix).

Utilizarei o Openssl para efetuar a conversão, podendo ser utilizado em Windows e Linux.

## Extraindo a Chave Privado do certificado.pfx.

Acessar o terminal e a pasta onde está localizado o certificado.pfx e executar o comando.

```bash
openssl pkcs12 -in certificado.pfx -nocerts -out certificado.key
```

Esse comando extrai a chave privada do certificado.pfx, será necessário inserir a senha que foi configurado no certificado.pfx utilizada para proteger o nosso par de chave do certificado.pfx.

## Extraindo o certificado CRT.

```bash
openssl pkcs12 -in certificado.pfx -clcerts -nokeys -out certificado.crt
```

Após esse comando já teremos nosso certificado.crt.

## Extraindo o certificado PEM.

Alguns sistemas utilizam apenas o formato PEM da chave privada, iremos converter a nossa chave privada para o formato PEM.

```bash
openssl rsa -in certificado.key -outform PEM -out certificado-pem.key
```

## Extraindo certificado CRT sem senha.

A senha é importante, mas sempre que reiniciarmos o servidor ele irá solicitar a senha do certificado, isso se torna um pouco complicado, caso essa tarefa seja automática. Caso necessite dessa configuração, iremos executar o comando abaixo:

```bash
openssl rsa -in certificado.key -out certificado.key.nopass
```

Agora já estamos com nosso certificado sem senha.

Nesse tutorial ensinei como converter certificado.pfx em outros formatos.
