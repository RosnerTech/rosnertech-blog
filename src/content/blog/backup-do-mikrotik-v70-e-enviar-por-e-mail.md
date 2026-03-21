---
title: "Backup do MikroTik (v7.0) e Enviar por E-mail"
description: "Aprenda a criar um script no MikroTik para gerar backups automáticos da configuração e enviá-los por e-mail."
pubDate: 2025-01-29
updatedDate: 2025-01-29
tags: ["Debian", "Docker", "Linux", "Zabbix", "Docker-Compose", "Zabbix Proxy"]
wpId: 1820
draft: false
---

## Backup do MikroTik (v7.0) e Enviar por E-mail

Neste tutorial, você aprenderá a configurar um script no MikroTik para criar um backup da configuração do dispositivo e enviá-lo automaticamente por e-mail. Siga os passos abaixo:

## Acesse o MikroTik**  
Conecte-se ao seu MikroTik usando o WinBox, WebFig ou terminal SSH.

Navegue até o menu System > Scripts.  
Aqui, você criará um novo script para automatizar o backup.

![](https://blog.rosnertech.com.br/wp-content/uploads/2025/01/mikrotik_07.png)

## Crie o Script de Backup

No menu Scripts, clique em Add (+) para criar um novo script.  
No campo Name, dê um nome ao script, por exemplo, backup-email.  
Cole o seguinte código no campo Source:

```bash
/log warning "Iniciando script de backup"
/log info "Criando o arquivo de backup."
/export show-sensitive terse file=([/system identity get value-name=name] .".rsc")
/delay 3
/log info "Arquivo de backup criado."
/log info "Enviando o email com arquivo em anexo."
/tool e-mail send file=([/system identity get value-name=name] .".rsc") to="seu_email" body=("Nome= ".[/system identity get name]."nr Endereco= ".[/ip address get value-name=address number=0]."nr Versao=".[/system package get value-name=version routeros]) subject=([/system identity get name] . " - " .[/system clock get date])
/delay 5
/log info "Email com arquivo enviado."
/delay 3
/log warning "Finalizada a execucao do backup"
```

![](https://blog.rosnertech.com.br/wp-content/uploads/2025/01/mikrotik_01.png)

Clique em **Apply** e depois em **OK** para salvar o script.

## Configure o Envio de E-mail

Para que o MikroTik possa enviar e-mails, você precisa configurar um servidor SMTP:

Navegue até Tools > Email.  
Preencha os campos com as informações do servidor SMTP que você deseja usar:  
Server: Endereço do servidor SMTP (ex: smtp.gmail.com).  
Port: Porta do SMTP (ex: 587 para TLS).  
From: Seu endereço de e-mail.  
User: Seu usuário do e-mail.  
Password: Senha do e-mail.  
TLS: Marque esta opção se o servidor exigir criptografia TLS.

![](https://blog.rosnertech.com.br/wp-content/uploads/2025/01/mikrotik_02.png)

Clique em Apply e depois em OK.

## Teste o Script  
##   
Volte ao menu System > Scripts.

Selecione o script backup-email e clique em Run Script.  
Verifique os logs em Log > System para confirmar que o script foi executado com sucesso.  
Você verá mensagens como:  
"Iniciando script de backup"  
"Arquivo de backup criado."  
"Email com arquivo enviado."  
"Finalizada a execucao do backup."

![](https://blog.rosnertech.com.br/wp-content/uploads/2025/01/mikrotik_03.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2025/01/mikrotik_04.png)

## Verifique o E-mail

Acesse a caixa de entrada do e-mail configurado.  
Verifique se o e-mail com o arquivo de backup em anexo foi recebido.  
O arquivo terá o nome do MikroTik (ex: RouterOS.rsc).  
O corpo do e-mail conterá informações como o nome do dispositivo, endereço IP e versão do RouterOS.

![](https://blog.rosnertech.com.br/wp-content/uploads/2025/01/mikrotik_05.png)

## Automatize o Backup (Opcional)

Se desejar que o backup seja feito automaticamente em intervalos regulares:

Navegue até System > Scheduler.  
Clique em Add (+) para criar um novo agendamento.  
No campo Name, dê um nome, por exemplo, backup-diario.  
No campo Interval, defina a frequência (ex: 1d para diário).  
No campo On Event, insira o nome do script criado (backup-email).  
Clique em Apply e depois em OK.

![](https://blog.rosnertech.com.br/wp-content/uploads/2025/01/mikrotik_06.png)

## Conclusão:

Agora você sabe como criar um script para fazer backup do MikroTik e enviá-lo por e-mail. Esse processo é útil para manter cópias de segurança regulares da configuração do seu dispositivo.

## Agradeço por ler esse artigo e espero vê-lo novamente em breve. Continue nos acompanhando para mais conteúdo relevante e inspirador. Até a próxima!
