---
title: "Configurando um Container MariaDB com Docker"
description: "O MariaDB é um sistema de gerenciamento de banco de dados relacional de código aberto, derivado do MySQL."
pubDate: 2024-10-06
updatedDate: 2024-10-06
tags: ["Debian", "Linux", "MariaDB", "Docker", "Mariadb", "Docker-Compose"]
wpId: 1605
draft: false
---

## Configurando um Container MariaDB com Docker

## O que é MariaDB?

O **MariaDB** é um sistema de gerenciamento de banco de dados relacional de código aberto, derivado do MySQL. Ele é amplamente utilizado para armazenar e gerenciar dados de forma eficiente, e é compatível com a maioria dos sistemas operacionais, incluindo Linux, Windows e macOS.

## Requisitos  
## Antes de começar, você precisa ter o Docker instalado no seu sistema Debian. Para isso, consulte o tutorial de instalação disponível no [blog](https://blog.rosnertech.com.br/arquivos/756) ou, se preferir, acesse a documentação oficial do [Docker](https://docs.docker.com/desktop/install/linux/).  
##   
Criando um Container MariaDB com o Docker

Usando o Comando `docker run`  
Para criar um container MariaDB simples, siga estas instruções:  
Abra o terminal e digite o seguinte comando para criar e rodar o container MariaDB:

```bash
docker run --name meu-mariadb -e MYSQL_ROOT_PASSWORD=sua_senha_root -d mariadb:latest
```

`--name meu-mariadb`: Define o nome do container como "meu-mariadb".  
`-e MYSQL_ROOT_PASSWORD=sua_senha_root`: Define a senha do usuário root do MariaDB.  
`-d mariadb:latest`: Utiliza a imagem mais recente do MariaDB e executa o container em segundo plano.  
##   
Verifique se o container está rodando** com o comando:

```bash
docker ps
```

Agora, o seu container MariaDB está rodando. Vamos explorar uma forma mais prática e organizada de gerenciar a criação de containers usando o Docker Compose.

## Usando o Docker Compose

O Docker Compose permite que você defina e gerencie containers Docker utilizando um arquivo YAML. Ele facilita a configuração e automação de serviços.  
##   
Criando o Container MariaDB com Docker Compose  
  
## Crie um arquivo chamado**`docker-compose.yml`** no diretório de sua preferência e cole o seguinte conteúdo:

```bash
services:  
  db:
    image: mariadb:latest
    restart: always
    command: --default-authentication-plugin=mysql_native_password
    environment:
      MYSQL_ROOT_PASSWORD: sua_senha_root
      MYSQL_DATABASE: seu_banco_de_dados
      MYSQL_USER: seu_usuario
      MYSQL_PASSWORD: senha_do_seu_usuario
    volumes:
      - db:/var/lib/mysql
volumes:
  db:
```

## Vamos entender o que cada linha faz:

`services`: Define os serviços que serão gerenciados pelo Docker Compose. Neste caso, você tem apenas o serviço `db`.  
`db`: O nome do serviço do container MariaDB.  
`image: mariadb:latest`: Especifica a imagem do MariaDB que será usada (a mais recente disponível).  
`restart: always`: Garante que o container será reiniciado automaticamente em caso de falha ou reinicialização do sistema.  
`command: --default-authentication-plugin=mysql_native_password`: Configura o método de autenticação do MariaDB.  
`environment`: Define as variáveis de ambiente para configurar o MariaDB:  
`MYSQL_ROOT_PASSWORD`: Senha do usuário root.  
`MYSQL_DATABASE`: Nome do banco de dados que será criado automaticamente.  
`MYSQL_USER` e `MYSQL_PASSWORD`: Credenciais de um usuário adicional para o banco.  
`volumes`: Mapeia o volume para persistir os dados do banco fora do container.

No terminal, navegue até o diretório onde você salvou o `docker-compose.yml` e execute o comando:

```bash
sudo docker-compose up -d
```

Esse comando **cria e inicia** o container MariaDB em segundo plano. O `-d` faz com que ele rode como um serviço em background.

## Visualizando os Logs do Contêiner

Após iniciar o contêiner, é uma boa prática verificar os logs para garantir que tudo está funcionando corretamente. Para visualizar os logs do contêiner em tempo real, você pode usar o seguinte comando:

```bash
sudo docker-compose logs -f db
```

O `-f` mantém os logs sendo exibidos em tempo real, e o `db` refere-se ao nome do serviço que você definiu no `docker-compose.yml`.

## Conectando ao Container e Criando um Banco de Dados e uma Tabela

Com o container rodando, você pode se conectar ao MariaDB e criar um banco de dados e uma tabela.  
Acesse o terminal interativo do container com o comando:

```bash
docker exec -it meu-mariadb mysql -u root -p
```

`docker exec -it meu-mariadb`: Executa um comando interativo no container chamado "meu-mariadb".  
`mysql -u root -p`: Inicia o cliente MySQL com o usuário root. O sistema pedirá a senha que você configurou anteriormente (`sua_senha_root`).

## Criando um Banco de Dados e uma Tabela

Depois de acessar o cliente MySQL, siga os comandos abaixo:  
Criar um banco de dados:

```bash
CREATE DATABASE exemplo_db;
```

## Usar o banco de dados criado**:

```bash
USE exemplo_db;
```

## Criar uma tabela**:

```bash
CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50),
    email VARCHAR(50)
);
```

## Verificar se a tabela foi criada com sucesso**:

```bash
SHOW TABLES;
```

Agora, você tem um banco de dados e uma tabela prontos para uso no seu container MariaDB!

## Conclusão:

Este tutorial mostrou como você pode criar um container MariaDB utilizando tanto o comando `docker run` quanto o Docker Compose, além de como se conectar ao container e interagir com o banco de dados. Agora você está pronto para gerenciar e manipular bancos de dados MariaDB de forma prática e eficiente com Docker!

## Agradeço por ler esse artigo e espero vê-lo novamente em breve. Continue nos acompanhando para mais conteúdo relevante e inspirador. Até a próxima!
