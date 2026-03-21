---
title: "Integrando o GitLab com o GitLab Runner"
description: "O GitLab é uma plataforma robusta para gerenciamento de repositórios Git, CI/CD (Integração Contínua e Entrega Contínua), monitoramento de projetos e muito mais, sendo amplamente utilizado por equipes"
pubDate: 2024-10-27
updatedDate: 2024-10-27
tags: ["Docker", "Linux", "GitLab", "Docker-Compose"]
wpId: 1658
draft: false
---

## Integrando o GitLab com o GitLab Runner

Nesta seção, você vai aprender a criar e configurar um container para o GitLab Runner e integrá-lo ao GitLab. Você pode usar tanto o `docker run` quanto o `docker-compose` para essa tarefa, e ambos os métodos serão abordados.

## Pré-requisitos

Docker e Docker Compose devem estar instalados no seu sistema. Se ainda não os instalou, você pode seguir o tutorial [Docker](https://blog.rosnertech.com.br/arquivos/756).  
O GitLab já deve estar em funcionamento, conforme configurado na [Parte 1](https://blog.rosnertech.com.br/arquivos/1638) deste guia.

## Utilizando o Docker Run  

Se você preferir não usar o Docker Compose, pode executar o GitLab diretamente com o comando `docker run`. Veja um exemplo:

```bash
docker run -d --name gitlab-runner --restart always 
  -v /var/run/docker.sock:/var/run/docker.sock 
  -v /var/docker/gitlab_runner/config:/etc/gitlab-runner 
  gitlab/gitlab-runner:latest
```

## Explicação dos comandos Run:  

-   `-d`: Executa o container em segundo plano.
-   `--name gitlab-runner`: Define o nome do container como "gitlab-runner".
-   `--restart always`: Garante que o container reinicie automaticamente após falhas.
-   `-v /var/run/docker.sock:/var/run/docker.sock`: Conecta o Docker do host ao container, permitindo que o GitLab Runner use o Docker do host para executar jobs.
-   `-v /srv/gitlab-runner/config:/etc/gitlab-runner`: Monta um volume para armazenar as configurações do GitLab Runner, garantindo persistência mesmo se o container for reiniciado.

## Criando o Docker Compose para o GitLab  
## Se preferir usar Docker Compose, você pode criar o seguinte arquivo `docker-compose.yml` para configurar o GitLab Runner:

```bash
services:
  gitlab-runner:
    image: gitlab/gitlab-runner:latest
    container_name: gitlab-runner
    restart: always
    volumes:
      - "/var/run/docker.sock:/var/run/docker.sock"
      - "/var/docker/gitlab_runner/config:/etc/gitlab-runner"
```

-   `image`: Define a imagem do GitLab Runner que será usada.
-   `container_name`: Define o nome do container como "gitlab-runner.  
    `` `**volumes**:` ``
    -   O primeiro volume monta o diretório de configuração do GitLab Runner.
    -   O segundo volume monta o `docker.sock` para permitir que o GitLab Runner interaja com o Docker.

## Executando o Docker Compose

Dentro do diretório onde está o arquivo `docker-compose.yml`, execute:

```bash
docker-compose up -d
```

## Gerando o Token no GitLab

Em seguida, você precisará gerar o **token** no GitLab para registrar o runner. Acesse o GitLab e siga os passos abaixo:

-   Acesse a **Admin Area**.
-   No menu lateral esquerdo, vá até **CI/CD** > **Runners**.
-   Clique no botão **New instance runner**.

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/10/gitrunner_01.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2024/10/gitrunner_02.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2024/10/gitrunner_03.png)

## Configurações do Runner:

-   Em **Tags**, marque a caixa **Run untagged jobs**.
-   Crie uma tag de sua preferência.
-   Clique no botão **Create runner**.

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/10/gitrunner_04.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2024/10/gitrunner_05.png)

## Anote o comando gerado e prossiga para registrar o runner.

Registrando o GitLab Runner

Com o container do GitLab Runner em execução, agora é hora de registrá-lo no GitLab. No terminal, execute o seguinte comando

```bash
docker exec -it gitlab-runner gitlab-runner register --name MyRunner --url "https://seu-gitlab.com.br" --token "seu-token" --executor docker --docker-image "docker:latest" --non-interactive
```

## Explicação do comando:

-   **docker exec -it gitlab-runner**: Executa o comando dentro do container do GitLab Runner.
-   **gitlab-runner register**: Inicia o processo de registro do runner no GitLab.
-   **\--name**: Define o nome que você deseja dar ao runner.
-   **\--url**: A URL do seu servidor GitLab.
-   **\--token**: O token gerado na etapa anterior.
-   **\--executor**: Define o executor como Docker.
-   **\--docker-image**: Especifica a imagem Docker que será usada para executar os jobs.

Após executar o comando, você verá a mensagem:

```bash
Runner registered successfully.
```

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/10/gitrunner_08.png)

## Verificando o Status do Runner

Agora, volte à interface do GitLab e acesse a página de **Runners**. Atualize a página, e o status do runner deve aparecer como **Online**, pronto para processar jobs.

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/10/gitrunner_09.png)

## Conclusão:  
  
****Parabéns!** Você integrou o GitLab com sucesso ao GitLab Runner utilizando Docker e Docker Compose. Agora, o ambiente está pronto para processar jobs de CI/CD. Na próxima parte do tutorial, vamos explorar como configurar pipelines no GitLab para automação de builds e deploys, otimizando ainda mais o seu fluxo de desenvolvimento.

## Agradeço por ler esse artigo e espero vê-lo novamente em breve. Continue nos acompanhando para mais conteúdo relevante e inspirador. Até a próxima!
