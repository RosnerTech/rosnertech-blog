---
title: "Instalando e Usando o Portainer para Gerenciar seus Containers Docker"
description: "O Portainer é uma ferramenta poderosa que facilita o gerenciamento de seus containers Docker"
pubDate: 2024-03-31
updatedDate: 2024-03-31
tags: ["Docker", "Linux", "Debian 12 Bookworm", "Portainer"]
wpId: 1357
draft: false
---

/\*! elementor - v3.20.0 - 26-03-2024 \*/ .elementor-heading-title{padding:0;margin:0;line-height:1}.elementor-widget-heading .elementor-heading-title\[class\*=elementor-size-\]>a{color:inherit;font-size:inherit;line-height:inherit}.elementor-widget-heading .elementor-heading-title.elementor-size-small{font-size:15px}.elementor-widget-heading .elementor-heading-title.elementor-size-medium{font-size:19px}.elementor-widget-heading .elementor-heading-title.elementor-size-large{font-size:29px}.elementor-widget-heading .elementor-heading-title.elementor-size-xl{font-size:39px}.elementor-widget-heading .elementor-heading-title.elementor-size-xxl{font-size:59px}

## Instalando e Usando o Portainer para Gerenciar seus Containers Docker

O Portainer é uma ferramenta poderosa que facilita o gerenciamento de seus containers Docker. Com uma interface gráfica intuitiva, você pode realizar diversas tarefas sem precisar digitar comandos complexos. Este tutorial irá guiá-lo passo a passo na instalação e utilização do Portainer, permitindo que você aproveite ao máximo seus recursos.

## Pré-requisitos

Docker instalado em seu sistema:**  
Se você ainda não possui o Docker, siga as instruções no post: [Instalando o Docker no Debian 12 Bookworm](https://blog.rosnertech.com.br/arquivos/756)

ou  a documentação oficial: [https://docs.docker.com/](https://docs.docker.com/).

## Criando um Volume Docker para o Portainer

Os dados do Portainer serão armazenados em um volume Docker, garantindo sua persistência entre as reinicializações do container. Execute o seguinte comando no terminal:

```bash
docker volume create portainer_data
```

## Executando o Container Portainer

Inicie o container Portainer com este comando:

```bash
docker run -d -p 8000:8000 -p 9000:9000 --name portainer_rosnertech --restart always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce
```

## Explicando o comando:

`-d`: Executa o container em segundo plano.  
`-p 8000:8000`: Mapeia a porta 8000 do container para a porta 8000 do host.  
`-p 9000:9000`: Mapeia a porta 9000 do container para a porta 9000 do host.  
`--name portainer`: Define o nome do container como "portainer".  
`--restart always`: Reinicia o container automaticamente em caso de falha.  
`-v /var/run/docker.sock:/var/run/docker.sock`: Monta o socket Docker do host no container.  
`-v portainer_data:/data`: Monta o volume "portainer\_data" no container.  
`portainer/portainer-ce`: A imagem do Portainer a ser utilizada (Community Edition).

## Acessando o Portainer

Abra seu navegador e acesse http://localhost:9000. Na primeira vez, configure um usuário e senha administrativos.

/\*! elementor - v3.20.0 - 26-03-2024 \*/ .elementor-widget-image{text-align:center}.elementor-widget-image a{display:inline-block}.elementor-widget-image a img\[src$=".svg"\]{width:48px}.elementor-widget-image img{vertical-align:middle;display:inline-block} ![](https://blog.rosnertech.com.br/wp-content/uploads/2024/03/portainer_01.png)

## Conectando o Portainer ao Docker

Após o login, o Portainer já deve ter detectado seu ambiente Docker local. Confirme a conexão para começar a gerenciar seus containers.

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/03/portainer_02.png)

## Explorando os Recursos do Portainer

Gerenciando Containers:

Visualizar:** Lista todos os containers em execução, com detalhes como status, imagem, portas e volumes.  
## Iniciar/Parar/Reiniciar:** Controle os containers com um clique.  
## Remover:** Elimine containers que não são mais necessários.  
## Logs:** Visualize os logs de cada container para identificar problemas**.  
Escalar:** Aumente ou diminua a quantidade de containers em execução (para aplicações escaláveis)**.  
Console:** Acesse o shell do container para executar comandos e gerenciar seu interior.

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/03/portainer_03.png)

## Outras Funcionalidades:

Imagens:** Visualize e gerencie as imagens Docker armazenadas em seu sistema.  
## Redes:** Crie e configure redes personalizadas para seus containers.  
## Volumes:** Crie e gerencie volumes para armazenar dados persistentes.  
## Stacks:** Implemente stacks compostos por vários containers interligados (com docker-compose).  
## Modelos de Aplicativos:** Desdobre facilmente aplicações pré-configuradas com um único clique.  
## Painéis:** Monitore o desempenho e a saúde de seus containers com gráficos e estatísticas.  
## Configurações:** Personalize o comportamento do Portainer e configure integrações com ferramentas externas.

![](https://blog.rosnertech.com.br/wp-content/uploads/2024/03/portainer_04.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2024/03/portainer_05.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2024/03/portainer_06.png)

## Conclusão:

O Portainer é uma ferramenta poderosa e intuitiva que simplifica o gerenciamento de containers Docker. Este tutorial o guiou pelos passos iniciais de instalação e configuração, além de apresentar as principais funcionalidades da ferramenta. Explore os recursos adicionais para se familiarizar com o Portainer e aproveitar todo o seu potencial para otimizar o gerenciamento de seus containers.

## Agradeço por ler esse artigo e espero vê-lo novamente em breve. Continue nos acompanhando para mais conteúdo relevante e inspirador. Até a próxima!
