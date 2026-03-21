---
title: "Instalando e Configurando o GitLab no Docker"
description: "O GitLab é uma plataforma robusta para gerenciamento de repositórios Git, CI/CD (Integração Contínua e Entrega Contínua), monitoramento de projetos e muito mais, sendo amplamente utilizado por equipes"
pubDate: 2024-10-16
updatedDate: 2024-10-16
tags: ["Docker", "Linux", "GitLab", "Docker-Compose"]
wpId: 1638
draft: false
---

## Instalando e Configurando o GitLab no Docker

O **GitLab** é uma plataforma robusta para gerenciamento de repositórios Git, CI/CD (Integração Contínua e Entrega Contínua), monitoramento de projetos e muito mais, sendo amplamente utilizado por equipes de desenvolvimento para colaborar de forma eficiente.

Para facilitar a implantação, você pode utilizar o **Docker**. Certifique-se de que o Docker esteja instalado no seu ambiente. Caso ainda não tenha, siga o [\[tutorial de instalação do Docker\]](https://blog.rosnertech.com.br/arquivos/756).

## Por que usar o Docker para instalar o GitLab?

Utilizar o Docker simplifica a instalação e o gerenciamento do GitLab, pois todas as dependências e configurações necessárias ficam dentro de um contêiner. Isso torna a aplicação mais portátil e fácil de gerenciar, além de facilitar a migração e o backup de dados.

## Utilizando o Docker Run  

Se você preferir não usar o Docker Compose, pode executar o GitLab diretamente com o comando `docker run`. Veja um exemplo:

```bash
docker run --detach 
  --hostname gitlab.example.com 
  --publish 80:80 --publish 443:443 --publish 2222:22 
  --name gitlab 
  --restart always 
  --volume /var/docker/gitlab/config:/etc/gitlab 
  --volume /var/docker/gitlab/logs:/var/log/gitlab 
  --volume /var/docker/gitlab/data:/var/opt/gitlab 
  gitlab/gitlab-ce:17.3.5-ce.0
```

## Explicação dos comandos Run:

-   `--detach`: Executa o contêiner em segundo plano.
-   `--hostname`: Define o hostname do GitLab. Altere para o domínio desejado ou utilize o IP da máquina se não quiser configurar um domínio.
-   `--publish`: Mapeia as portas do host para o contêiner. As portas são:
    -   `80`: Para acesso HTTP.
    -   `443`: Para acesso HTTPS (caso você queira configurar um certificado SSL).
    -   `2222`: Porta SSH para clonar repositórios.
-   `--volume`: Mapeia volumes para persistir dados de configuração, logs e dados do GitLab.
-   `gitlab/gitlab-ce:16.6.1-ce.0`: Utiliza a imagem oficial do GitLab Community Edition.

## Criando o Docker Compose para o GitLab

Outra maneira prática de configurar o GitLab é usando o **Docker Compose**, que permite gerenciar contêineres de forma simplificada. Crie um arquivo chamado `docker-compose.yml` no diretório onde deseja configurar o GitLab e copie o conteúdo abaixo:

```bash
services:
  gitlab:
    container_name: gitlab
    image: "gitlab/gitlab-ce:17.3.5-ce.0"
    hostname: "gitlab.example.com"
    environment:
      TZ: America/Sao_Paulo
      GITLAB_OMNIBUS_CONFIG: |
        external_url "https://gitlab.example.com"
    restart: always
    ports:
      - "8080:80"
      - "443:443"
      - "2222:22"
    volumes:
      - "/var/docker/gitlab/config:/etc/gitlab"
      - "/var/docker/gitlab/logs:/var/log/gitlab"
      - "/var/docker/gitlab/data:/var/opt/gitlab"
    shm_size: "256m"
```

## Explicações detalhadas:

-   **`container_name`**: Define o nome do contêiner como "gitlab".
-   **`image`**: Especifica a imagem do GitLab que será usada. Estamos utilizando a versão `gitlab-ce:16.6.1-ce.0`.
-   **`hostname`**: Define o hostname para acesso ao GitLab. Se você preferir não usar um domínio, pode utilizar o IP da máquina.
-   **`environment`**: Configura variáveis de ambiente:
    -   `TZ`: Define o fuso horário (America/Sao\_Paulo).
    -   `GITLAB_OMNIBUS_CONFIG`: Configuração avançada para definir a URL externa do GitLab. Se preferir usar um IP, substitua `"https://gitlab.example.com"` por `"http://[seu-ip]"`.
-   **`ports`**: Especifica as portas expostas pelo contêiner:
    -   `"8080:80"`: Porta HTTP para acesso web.
    -   `"443:443"`: Porta HTTPS (caso você queira configurar SSL).
    -   `"2222:22"`: Porta SSH, importante para clonar e gerenciar repositórios via SSH.
-   **`volumes`**: Mapeia volumes do host para o contêiner para persistir dados:
    -   `/var/docker/gitlab/config`: Para arquivos de configuração.
    -   `/var/docker/gitlab/logs`: Para logs do GitLab.
    -   `/var/docker/gitlab/data`: Para dados do GitLab.
-   **`shm_size`**: Define o tamanho da memória compartilhada, importante para performance.

## Executando o Docker Compose

Dentro do diretório onde está o arquivo `docker-compose.yml`, execute:

```bash
docker-compose up -d
```

Esse comando iniciará o contêiner em segundo plano. Se tudo estiver configurado corretamente, o GitLab será iniciado e estará disponível no endereço que você configurou.

## Acessando o GitLab

Depois que o contêiner estiver em execução, acesse o GitLab pelo navegador usando a URL ou o IP configurado. Se não tiver configurado um domínio, use o IP da máquina seguido da porta (por exemplo, `http://[seu-ip]:8080`).

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/10/gitlab_01.png)

Por padrão, o GitLab gera uma senha temporária para o usuário "root", que está localizada no arquivo `/etc/gitlab/initial_root_password` dentro do contêiner. Para visualizá-la, use:

```bash
docker exec -it gitlab grep "Password:" /etc/gitlab/initial_root_password
```

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/10/gitlab_02.png)

Use essa senha para o primeiro login.

## Configurando o Usuário "root" e Desativando o Registro Público

Após o primeiro login, é importante realizar algumas configurações de segurança:

## Alterando a Senha e o E-mail do Usuário "root":

1.  Clique na foto de perfil do usuário no menu lateral esquerdo.
2.  Selecione “Edit profile”.
3.  Na aba “Profile”, altere o e-mail de `admin@example.com` para o seu e clique em “Update profile settings”.
4.  Digite a senha temporária para confirmar a alteração.
5.  Clique na aba “Password” no menu lateral esquerdo.
6.  Em “Current password”, insira a senha temporária.
7.  Em “New password”, defina uma nova senha e repita em “Password confirmation”.
8.  Clique em “Save password”. Você será deslogado e precisará logar novamente com a nova senha.

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/10/gitlab_03-1.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2024/10/gitlab_09.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2024/10/gitlab_04.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2024/10/gitlab_05.png)

## Desativando o Registro Público:

1.  Ao acessar novamente, uma mensagem será exibida alertando sobre o risco de permitir novos registros públicos.
2.  Clique no botão “Deactivate”.
3.  Desmarque a opção “Sign-up enabled” e clique em “Save changes”.

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/10/gitlab_06.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2024/10/gitlab_07.png)

Essas etapas garantem que o seu GitLab estará mais seguro, limitando o acesso apenas aos usuários que você adicionar manualmente.

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/10/gitlab_08-1.png)

## Conclusão:

Parabéns! Você configurou o GitLab com sucesso utilizando Docker e Docker Compose. Na próxima parte do tutorial, vamos abordar a configuração do **GitLab Runner**, permitindo que você configure pipelines CI/CD para automação de builds e deploys.

## Agradeço por ler esse artigo e espero vê-lo novamente em breve. Continue nos acompanhando para mais conteúdo relevante e inspirador. Até a próxima!
