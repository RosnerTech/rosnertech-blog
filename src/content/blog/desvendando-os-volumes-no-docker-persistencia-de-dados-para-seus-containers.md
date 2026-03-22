---
title: "Desvendando os Volumes no Docker: Persistência de Dados para seus Containers"
description: "Um volume é um diretório ou arquivo persistente, que não faz parte da imagem do container. Isso significa que seus dados não são perdidos quando o container é parado, reiniciado ou excluído."
pubDate: 2024-02-09
updatedDate: 2024-02-09
tags: ["Docker", "Debian", "Linux", "Volumes Docker"]
wpId: 1301
draft: false
---

## Desvendando os Volumes no Docker: Persistência de Dados para seus Containers

No ecossistema do Docker, os volumes são uma funcionalidade essencial para lidar com o armazenamento persistente de dados entre os containers e o host. Eles são uma forma de compartilhar e persistir dados além do ciclo de vida dos containers. Em termos simples, um volume em Docker é uma pasta ou um diretório que pode ser montado dentro de um ou mais containers, permitindo que os dados sejam compartilhados e persistidos de forma independente.

Antes de começarmos, é importante garantir que você tenha o Docker instalado em seu sistema. Para este exemplo, utilizaremos o Debian 12. Certifique-se de ter o Docker instalado seguindo as instruções oficiais para o Debian.

## Por que usar Volumes?

   Persistência de Dados: Os volumes permitem que os dados persistam mesmo após a exclusão ou reinicialização dos containers.  
   Compartilhamento de Dados: Volumes facilitam o compartilhamento de dados entre diferentes containers.  
   Desempenho: Volumes oferecem melhor desempenho em comparação com o armazenamento de dados diretamente nos containers.  
   Backup e Restauração: Com volumes, é mais fácil realizar backups e restaurar dados importantes.

## Exemplos de Utilização de Volumes

Vamos exemplificar como utilizar volumes com um container do Nginx.

## Instalando o Docker no Debian 12

Certifique-se de ter o Docker instalado em seu sistema **[Debian 12](https://blog.rosnertech.com.br/arquivos/889)**. Você pode seguir as instruções oficiais do Docker para Debian para instalar o [**Docker**](https://blog.rosnertech.com.br/arquivos/1120).

## Criando um Volume

```bash
docker volume create meu_volume
```

## Subindo um Container do Nginx com o Volume

```bash
docker run -d -p 8080:80 
  --name meu_container 
  -v meu_volume:/usr/share/nginx/html 
  nginx
```

Neste exemplo:

-   `-d`: Executa o container em segundo plano.
-   `-p 8080:80`: Mapeia a porta 8080 do host para a porta 80 do container.
-   `--name meu_container`: Nomeia o container como "meu\_container".
-   `-v meu_volume:/usr/share/nginx/html`: Monta o volume "meu\_volume" no diretório padrão do Nginx onde os arquivos HTML são servidos.

## Atualizando Dados no Volume

```bash
docker exec -it meu_container bash
echo "Olá, mundo!" > /usr/share/nginx/html/index.html
exit
```

## Acessando o Nginx

Abra um navegador e acesse `http://localhost:8080` para ver o conteúdo do arquivo `index.html`.

## Conclusão

Com este exemplo, você pode ver como os volumes permitem a persistência e o compartilhamento de dados entre o container do Nginx e o host, tornando o armazenamento de dados mais flexível e seguro. Certifique-se de adaptar os comandos conforme necessário para o seu ambiente específico.

Agradeço por ler esse artigo e espero vê-lo novamente em breve. Continue nos acompanhando para mais conteúdo relevante e inspirador. Até a próxima!
