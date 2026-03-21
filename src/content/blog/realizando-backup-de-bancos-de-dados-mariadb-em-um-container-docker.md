---
title: "Realizando Backup de Bancos de Dados MariaDB em um Container Docker"
description: "Backup é uma cópia de segurança dos dados armazenados em um sistema, criada para garantir a recuperação em caso de falhas, perda de dados ou ataques."
pubDate: 2024-10-08
updatedDate: 2024-10-08
tags: ["Debian", "Linux", "MariaDB", "Docker", "Mariadb", "Docker-Compose"]
wpId: 1623
draft: false
---

## Realizando Backup de Bancos de Dados MariaDB em um Container Docker

Neste tutorial, você vai aprender a realizar backups do MariaDB que está rodando em um container Docker, utilizando o **cron** no Linux para automatizar o processo e garantir a segurança dos seus dados. Vamos utilizar como base o tutorial anterior do meu blog, que mostra como configurar o MariaDB em um container Docker. Se você ainda não seguiu esse tutorial, acesse aqui o [tutorial anterior.](https://blog.rosnertech.com.br/arquivos/1605)

## Por que Fazer Backup do Banco de Dados?

O backup do banco de dados é essencial para:  
Proteger contra **perda de dados** devido a falhas no sistema ou hardware.  
Recuperar informações após **erros humanos**.  
Garantir um ponto de restauração em caso de **ataques cibernéticos**.  
Realizar **migrações e atualizações** com segurança.

## Boas Práticas para Backup de Banco de Dados  
  
****Automatize o processo**: Configure backups automáticos para evitar esquecimentos.  
## Armazene em múltiplos locais**: Nunca mantenha seus backups apenas no servidor onde o banco de dados está. Use armazenamento em nuvem ou dispositivos externos.  
## Verifique e valide os backups**: Certifique-se de que os backups estão íntegros e prontos para serem restaurados.  
## Estabeleça uma rotina**: Realize backups regulares (diários ou semanais) e mantenha um histórico.

## Fazendo Backup do MariaDB no Container Docker

Utilizando o MariaDB configurado no container Docker do tutorial anterior, siga os passos abaixo:

## Crie o diretório de backup**:

```bash
sudo mkdir -p /var/backup
```

## Execute o comando para realizar o backup**:

```bash
docker exec -it meu-mariadb /usr/bin/mysqldump -u root -p'sua_senha_root' seu_banco_de_dados > /var/backup/backup_seu_banco_de_dados_$(date +%F).sql
```

## Verifique se o backup foi criado** corretamente:

```bash
ls -lh /var/backup/
```

## Automatizando o Backup com Cron  
  
****Edite o crontab** para agendar o backup:

```bash
sudo crontab -e
```

## Adicione a seguinte linha**:

```bash
0 2 * * * docker exec -it meu-mariadb /usr/bin/mysqldump -u root -p'sua_senha_root' seu_banco_de_dados > /var/backup/backup_seu_banco_de_dados_$(date +%F).sql
```

Agora, seu backup será executado diariamente às 2:00 da manhã.  
  
## Armazenando o Backup em Outro Local

É importante **não manter seus backups apenas no servidor local**. Você pode transferi-los para outro servidor ou para a nuvem:

```bash
rsync -avz /var/backup/ usuario@servidor_remoto:/caminho/para/backup_remoto/
```

Adicione esse comando ao cron para garantir que a transferência ocorra após a criação do backup.

## Conclusão:

Com base no tutorial anterior, você aprendeu a realizar e automatizar backups do seu banco de dados MariaDB em um container Docker. Assim, você protege seus dados e garante que eles estejam seguros, tanto localmente quanto em locais externos!

## Agradeço por ler esse artigo e espero vê-lo novamente em breve. Continue nos acompanhando para mais conteúdo relevante e inspirador. Até a próxima!
