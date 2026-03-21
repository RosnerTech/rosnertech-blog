---
title: "Como publicar sua imagem Docker no Docker Hub"
description: "O Docker Hub é um repositório público de imagens Docker, que são como modelos para construir e executar contêineres. Funciona como um GitHub para imagens Docker, onde você pode encontrar e baixar imag"
pubDate: 2025-06-08
updatedDate: 2025-06-07
tags: ["Docker", "Docker Hub"]
wpId: 2064
draft: false
---

## Como publicar sua imagem Docker no Docker Hub

Se você está desenvolvendo imagens Docker personalizadas — como o GLPI, por exemplo — e deseja compartilhá-las com a comunidade ou usá-las em pipelines de CI/CD, o Docker Hub é a plataforma ideal. Neste tutorial, você vai aprender a publicar sua imagem `rosnertech/glpi:11.0.5-beta` no Docker Hub de forma clara, prática e estratégica.

###### **📌 Pré-requisitos

Antes de começar, você precisa:

Ter uma [conta no Docker Hub  
](https://hub.docker.com/)Ter o [Docker](https://blog.rosnertech.com.br/arquivos/756) instalado na sua máquina  
Ter construído uma imagem Docker localmente

⚠️ **Este tutorial usa o repositório `rosnertech/glpi:11.0.5-beta` apenas como exemplo.**  
Em todos os comandos, **substitua pelo seu próprio repositório e tags.

Faça login no Docker Hub via terminal

```bash
docker login -u<seu-usuario>
```

Digite sua senha do Docker Hub. O login salva suas credenciais localmente para poder fazer o push das imagens.

![](https://blog.rosnertech.com.br/wp-content/uploads/2025/06/docker-images_3.png)

Escolha um nome para sua imagem  
A imagem precisa estar nomeada no formato:

```bash
seu-usuario-dockerhub/nome-da-imagem:tag
```

Exemplo usado neste tutorial (exemplo fictício):  
`rosnertech/glpi:11.0.5-beta   `Você deve usar **o seu nome de usuário** do Docker Hub!

Verifique as imagens locais  
Antes de fazer o push, confira as imagens disponíveis no seu Docker:

```bash
docker images
```

Você verá algo assim:

```bash
REPOSITORY        TAG           IMAGE ID       CREATED          SIZE
glpi             latest        14a54322ff30   36 minutes ago    1.1GB
```

![](https://blog.rosnertech.com.br/wp-content/uploads/2025/06/docker-images_1.png)

Marque sua imagem (tag) com o nome correto  
Use `docker tag` para renomear sua imagem local e prepará-la para envio ao Docker Hub:

```bash
docker tag nome-local-da-imagem seu-usuario-dockerhub/nome-da-imagem:tag
```

Exemplo com base na imagem local `glpi`:

```bash
docker tag glpi rosnertech/glpi:11.0.5-beta
```

![](https://blog.rosnertech.com.br/wp-content/uploads/2025/06/docker-images_2.png)

Envie sua imagem para o Docker Hub  
Agora, basta usar o comando `docker push`:

```bash
docker push seu-usuario-dockerhub/nome-da-imagem:tag
```

No exemplo:

```bash
docker push rosnertech/glpi:11.0.5-beta
```

![](https://blog.rosnertech.com.br/wp-content/uploads/2025/06/docker-images_5.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2025/06/docker-images_6.png)

## (Opcional) Crie múltiplas tags**  
Você pode criar versões alternativas apontando para a mesma imagem:

```bash
docker tag rosnertech/glpi:11.0.5-beta rosnertech/glpi:latest
docker push rosnertech/glpi:latest
```

## Isso é útil para quem quer fornecer uma versão sempre atualizada usando a tag `latest`.

Visualize suas imagens no Docker Hub  
Acesse hub.docker.com e vá até seu repositório. Lá você verá todas as tags publicadas (como `11.0.5-beta`, `latest`, etc.), o tamanho da imagem e o comando `docker pull` correspondente.

![](https://blog.rosnertech.com.br/wp-content/uploads/2025/06/docker-images_7.png)

## Exemplo completo de comandos

```bash
docker images
docker tag glpi-custom:latest seu-usuario/seu-repo:11.0.5-beta
docker push seu-usuario/seu-repo:11.0.5-beta
docker tag seu-usuario/seu-repo:11.0.5-beta seu-usuario/seu-repo:latest
docker push seu-usuario/seu-repo:latest
```

🚀 **Conclusão  

Agora você já sabe como publicar suas imagens Docker no Docker Hub de forma organizada e profissional. Esse processo não só facilita o compartilhamento de suas aplicações, como também ajuda a manter versões claras e reutilizáveis, seja para projetos pessoais, clientes ou equipes.

## Lembre-se de sempre:

Usar **tags semânticas** para organizar suas versões (ex: `11.0.5-beta`, `latest`, `stable`);  
Publicar um **README claro e completo** no seu repositório Docker Hub para explicar como usar sua imagem;  
Utilizar **seu próprio repositório** em todos os comandos (nunca copie literalmente `rosnertech/glpi` — é apenas um exemplo neste tutorial).

Deixe sua opinião nos comentários! Se tiver dúvidas ou sugestões, ficarei feliz em ajudar. E, claro, compartilhe com seus amigos se achar que pode ser útil para eles. 

## Obrigado por acompanhar este guia! 🚀  
##   
 **Até a próxima!
