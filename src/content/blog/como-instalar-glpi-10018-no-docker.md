---
title: "Como Instalar GLPI 10.0.18 no Docker"
description: "O GLPI Inventory é uma ferramenta de software usada para coletar e gerenciar informações detalhadas sobre ativos de TI em uma organização. Ele rastreia hardware, software, dispositivos de rede e outro"
pubDate: 2025-02-24
updatedDate: 2025-03-04
tags: ["Debian", "Docker", "Linux", "GLPI", "Mariadb", "Docker-Compose"]
wpId: 1846
draft: false
---

## Como Instalar GLPI 10.0.18 no Docker

Neste tutorial, você aprenderá a instalar e configurar o GLPI (versão 10.0.18) usando Docker e Docker Compose, seguindo as recomendações de segurança da Teclib. O GLPI é uma poderosa ferramenta de gerenciamento de ativos e help desk, e com contêineres, você pode implantá-lo de forma rápida, segura e consistente em qualquer ambiente.

## Configurações de Segurança

Nesta versão do GLPI, foram aplicadas as recomendações de segurança da Teclib para garantir que o acesso ao diretório `/var/www/html/glpi` seja restrito e seguro.

## Pré-requisitos  
## Antes de começar, certifique-se de que você tem o seguinte instalado:

## Docker Debian**: [Instalando o Docker no Debian](https://blog.rosnertech.com.br/arquivos/756)  
## Docker Ubuntu**: [Instalando o Docker no Ubuntu](https://blog.rosnertech.com.br/arquivos/400)

## Baixar o Projeto  
## Você pode usar a imagem Docker do GLPI 10.0.18 que disponibilizei no Docker Hub ou clonar o repositório GitHub para personalizar o ambiente.

## Usar a Imagem do Docker Hub  
  
****Imagem Docker Hub**: rosnertech/glpi:10.0.18  
Para puxar a imagem, execute:

```bash
docker pull rosnertech/glpi:10.0.18
```

## Clonar o Repositório GitHub  
##   
## Repositório GitHub**: GLPI Docker  
Para clonar o repositório, execute:

```bash
git clone https://github.com/seu-usuario/glpi-docker.git
cd glpi-docker
```

## Configurar o Ambiente  
  
## No diretório do projeto, crie um arquivo `docker-compose.yml` com o seguinte conteúdo:

```bash
version: '3.8'
services:
  db:
    image: mariadb:10.11
    container_name: glpi-db
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: ${DB_ROOT_PASSWORD}
      MYSQL_DATABASE: ${DB_NAME}
      MYSQL_USER: ${DB_USER}
      MYSQL_PASSWORD: ${DB_PASSWORD}
    volumes:
      - db-data:/var/lib/mysql
    networks:
      - glpi-network
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      interval: 10s
      timeout: 5s
      retries: 5
  glpi:
    image: rosnertech/glpi:10.0.18
    container_name: glpi-app
    restart: always
    environment:
      DB_HOST: db
      DB_NAME: ${DB_NAME}
      DB_USER: ${DB_USER}
      DB_PASSWORD: ${DB_PASSWORD}
    volumes:
      - glpi-data:/var/www/html/glpi
    ports:
      - "8080:80"
    depends_on:
      db:
        condition: service_healthy
    networks:
      - glpi-network
volumes:
  db-data:
  glpi-data:
networks:
  glpi-network:
    driver: bridge
```

## Arquivo `.env      `**Crie um arquivo `.env` no mesmo diretório para armazenar as variáveis de ambiente:

```bash
# Variáveis de ambiente para o banco de dados
DB_ROOT_PASSWORD=root_password
DB_NAME=glpi
DB_USER=glpi_user
DB_PASSWORD=glpi_password
```

## Iniciar os Contêineres

Execute o seguinte comando para iniciar os contêineres:

```bash
docker-compose up -d
```

## Isso irá:**  
  
Baixar as imagens necessárias (MariaDB e GLPI).  
Criar os volumes para persistência de dados.  
Configurar a rede `glpi-network` para comunicação entre os contêineres.  
Iniciar o banco de dados e o GLPI.

## Acessar o GLPI no Navegador

```bash
http://localhost:8080
```

## Siga as etapas de instalação:

Selecione o idioma e clique em **OK**.  
Na tela de verificação de requisitos, confirme que todos os itens estão marcados como **OK** e clique em **Continuar**.  
Na configuração do banco de dados, insira os seguintes valores:  
## Servidor do banco de dados**: `db   `**Usuário do banco de dados**: `glpi_user   `**Senha do banco de dados**: `glpi_password   `**Nome do banco de dados**: `glpi`

Clique em **Continuar** e conclua a instalação.

## Excluir o Arquivo `install.php      `**Após concluir a instalação via navegador, é importante excluir o arquivo `install.php` por motivos de segurança. Execute o seguinte comando:

```bash
docker exec glpi-app rm -f /var/www/html/glpi/install/install.php
```

Para confirmar que o arquivo foi excluído, você pode verificar o conteúdo do diretório `install`:

```bash
docker exec glpi-app ls -l /var/www/html/glpi/install
```

Se o arquivo `install.php` não aparecer na listagem, ele foi removido com sucesso.

## Primeiro Login

Após a instalação, você será redirecionado para a tela de login. Use um dos seguintes usuários padrão para acessar o sistema:

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/12/docker_glpi.png)

Por questões de segurança, recomenda-se que você altere as senhas padrão imediatamente após o primeiro acesso ao sistema. O uso de senhas padrão pode tornar seu ambiente vulnerável a acessos não autorizados.

Para maior proteção, escolha uma senha forte e única, combinando letras maiúsculas e minúsculas, números e caracteres especiais. Caso precise de ajuda para alterar a senha, consulte a documentação ou entre em contato com o suporte.

## Gerenciar o Ambiente  
## Comandos Úteis

## Ver logs do GLPI**:

```bash
docker-compose logs -f glpi-app
```

## Parar os contêineres**:

```bash
docker-compose down
```

## Reiniciar os contêineres**:

```bash
docker-compose restart
```

## Remover volumes e redes** (use com cuidado):

```bash
docker-compose down --volumes --remove-orphans
```

## Conclusão:

Agora você tem um ambiente completo do **GLPI 10.0.18** rodando em contêineres Docker, com configurações de segurança reforçadas seguindo as recomendações da Teclib. Esse setup é ideal para testes, desenvolvimento ou até mesmo produção, graças à facilidade de gerenciamento e escalabilidade que o Docker oferece.

## Links Úteis

Docker Hub**: [rosnertech/glpi:10.0.18](https://hub.docker.com/r/rosnertech/glpi)  
## Repositório GitHub**: [GLPI Docker](https://github.com/RosnerTech/glpi)  
## Teclib:** [GLPI](https://www.teclib-edition.com/software/)

Se tiver dúvidas ou precisar de ajuda, sinta-se à vontade para abrir uma issue no GitHub ou entrar em contato. Boa sorte com o GLPI! 🚀

## Agradeço por ler esse artigo e espero vê-lo novamente em breve. Continue nos acompanhando para mais conteúdo relevante e inspirador. Até a próxima!
