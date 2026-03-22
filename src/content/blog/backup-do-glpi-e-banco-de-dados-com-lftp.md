---
title: "Backup do GLPI e Banco de Dados com LFTP"
description: "O backup é essencial para proteger dados contra perdas acidentais, falhas de hardware e ataques cibernéticos. Ele garante a recuperação de informações críticas e a continuidade das operações. Sem back"
pubDate: 2023-10-29
updatedDate: 2023-10-29
tags: ["Debian", "GLPI", "Linux", "Mariadb"]
wpId: 1137
draft: false
---

## Backup do GLPI e Banco de Dados com LFTP.

Sentindo a necessidade de ampliar as medidas de segurança do meu sistema GLPI, decidi adicionar um local de backup adicional, complementando o já existente no servidor de arquivos. Para alcançar esse objetivo, desenvolvi um script em Bash que automatiza o processo de backup de arquivos e do banco de dados, com a finalidade de armazená-los de forma segura em um servidor FTP. O backup é essencial para proteger dados contra perdas acidentais, falhas de hardware e ataques cibernéticos. Ele garante a recuperação de informações críticas e a continuidade das operações. Sem backups, a perda de dados pode ser devastadora. Tenho a intenção de compartilhar este script, pois acredito que pode ser útil para outros administradores que buscam aprimorar seus procedimentos de backup no GLPI. **Preparando o Ambiente** Antes de começar, certifique-se de que você tem acesso ao servidor onde o GLPI está instalado e ao servidor FTP para onde deseja enviar os backups. Vamos começar!  **Configuração Inicial** Abra um terminal no servidor onde o GLPI está instalado e crie um novo arquivo de script. Você pode fazer isso com o comando:

```bash
nano backup_glpi.sh
```

Cole o script fornecido no arquivo `backup_glpi.sh`. Certifique-se de substituir as informações no início do script, como usuário, senha, caminhos e detalhes do servidor FTP, pelo seu próprio.

```bash

#!/bin/bash
#Autor - Rosner Pelaes Nascimento
#email: contato@rosnertech.com.br
#site: blog.rosnertech.com.br
# Configurações
data_hora=$(date +"%Y%m%d%H%M%S")
backup_dir="local_backup_local"
glpi_db_user="seu_usuario"
glpi_db_pass="sua_senha"
glpi_db_name="seu_BD"
glpi_dir="caminho_seu_glpi"
ftp_server="seu_servidor"  # Substitua pelo seu servidor FTP
ftp_user="seu_user"
ftp_pass="sua_senha"
remote_backup_dir="Backup"  # Substitua pelo caminho no servidor FTP
# Caminho do arquivo de backup do banco de dados
db_backup_file="$backup_dir/glpi_db_backup_$data_hora.sql"
# Caminho do arquivo de backup do diretório GLPI
glpi_backup_file="$backup_dir/glpi_files_backup_$data_hora.tar.gz"
# Realiza o backup do banco de dados
echo "Efetuando Backup do banco de Dados!"
mysqldump -u "$glpi_db_user" -p"$glpi_db_pass" "$glpi_db_name" > "$db_backup_file"
# Realiza o backup do diretório GLPI
echo "Efetuando Backup do diretório GLPI!"
tar -czvf "$glpi_backup_file" "$glpi_dir"
# Compartilha os arquivos
echo "Enviando backups para o servidor FTP..."
lftp -u "$ftp_user","$ftp_pass" -e "set ssl:verify-certificate no; cd $remote_backup_dir; put $db_backup_file; put $glpi_backup_file; bye" "$ftp_server"
#lftp -u "$ftp_user","$ftp_pass" -e "cd $remote_backup_dir; put $db_backup_file; put $glpi_backup_file; bye" "$ftp_server"
# Limpa os backups antigos, se necessário
# Para manter apenas os últimos 7 backups, por exemplo:
find "$backup_dir" -type f -mtime +7 -exec rm {} ;
```

## Vou explicar as partes do script em mais detalhes:

1.  **Configurações**: O início do script define várias configurações, como a data e hora atual, o diretório de backup local, as credenciais do banco de dados GLPI, o caminho para o diretório GLPI, as configurações do servidor FTP e o diretório remoto onde os backups serão armazenados.
2.  **Caminhos dos arquivos de backup**: O script define o caminho para os arquivos de backup do banco de dados e dos arquivos do diretório GLPI. A data e hora atual são incorporadas nos nomes dos arquivos para garantir que cada backup tenha um nome exclusivo.
3.  **Backup do banco de dados**: O script usa o comando `mysqldump` para fazer o backup do banco de dados GLPI. Ele utiliza as credenciais definidas nas configurações para autenticar no banco de dados e gera um arquivo SQL no diretório de backup.
4.  **Backup do diretório GLPI**: O script utiliza o comando `tar` para criar um arquivo compactado (tar.gz) que contém todos os arquivos do diretório GLPI. O diretório de origem é especificado nas configurações.
5.  **Transferência para o servidor FTP**: O script usa o utilitário `lftp` para fazer a transferência dos arquivos de backup para o servidor FTP. Ele utiliza as credenciais FTP definidas nas configurações e o caminho remoto especificado. O comando `set ssl:verify-certificate no` é usado para desabilitar a verificação de certificado SSL (tenha em mente que isso pode ser inseguro em ambientes de produção).
6.  **Limpeza de backups antigos (opcional)**: O script inclui um comando para remover backups antigos com base em sua idade. No exemplo atual, ele mantém apenas backups criados nos últimos 7 dias. Isso pode ser ajustado modificando o valor `+7` para o número de dias desejado.

## Salvando o Script** Salve o arquivo do script e saia do editor de texto (no caso do `nano`, pressione `Ctrl+X`, `Y`, e `Enter` para salvar as alterações). **Tornando o Script Executável** Antes de executar o script, você precisa torná-lo executável. Use o seguinte comando:

```bash
chmod +x backup
```

## Instalando o LFTP** Para transferir os backups via FTP, utilizamos o LFTP, que é um cliente FTP de linha de comando. Se o LFTP não estiver instalado em seu servidor, siga as instruções abaixo para instalá-lo: **Em sistemas baseados no Debian (como o Ubuntu):

```bash
sudo apt-get update
sudo apt-get install lftp
```

Em sistemas baseados no Red Hat (como o CentOS):

```bash
sudo yum install lftp
```

Agora o LFTP está instalado e pronto para ser usado. **Executando o Backup** Agora que o script está pronto e configurado, você pode executá-lo para fazer o backup. Use o seguinte comando:

```bash
./backup_glpi.sh
```

## O script executará as seguintes etapas:** Realizará o backup do banco de dados do GLPI. Efetuará o backup do diretório do GLPI. Enviará os backups para o servidor FTP configurado. Aguarde até que o processo seja concluído. **Configurando a Agenda de Backup** Para automatizar o backup, você pode configurar uma tarefa agendada (cron job) para executar o script de backup regularmente. Isso garantirá que seus backups sejam mantidos atualizados. Para configurar uma tarefa agendada para executar o script diariamente, execute o seguinte comando:

```bash
crontab -e
```

Adicione a seguinte linha ao final do arquivo para que o backup seja executado todos os dias às 2h da manhã (ajuste conforme sua preferência):

```bash
0 2 * * * /caminho/para/backup_glpi.sh
```

A partir de agora, seu backup será realizado de forma automatizada, seguindo o agendamento previamente configurado. Você tem a flexibilidade de personalizar essa programação de acordo com as suas necessidades. Com este tutorial, você configurou um sistema de backup para o GLPI e seu banco de dados, salvando em um servidor local e enviando para um servidor FTP. Além disso, você instalou o LFTP para facilitar a transferência de arquivos via FTP e agendou backups regulares. Seu sistema GLPI está agora mais seguro e confiável com um backup eficiente. **Agradeço por ler esse artigo e espero vê-lo novamente em breve. Continue nos acompanhando para mais conteúdo relevante e inspirador. Até a próxima!
