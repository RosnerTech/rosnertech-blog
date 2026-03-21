---
title: "Instalando o Grafana no Docker Utilizando Docker Compose"
description: "O Grafana é uma plataforma de código aberto que permite a visualização e monitoramento de dados em tempo real."
pubDate: 2024-09-04
updatedDate: 2025-01-24
tags: ["Linux", "Grafana", "Debian 12 Bookworm", "Debian"]
wpId: 1569
draft: false
---

## Instalando o Grafana no Docker Utilizando Docker Compose

## Introdução ao Grafana e Docker

O **Grafana** é uma plataforma de código aberto que permite a visualização e monitoramento de dados em tempo real. Ele é amplamente utilizado para criar dashboards personalizados que ajudam a monitorar sistemas, servidores, aplicações e diversos serviços em um ambiente de TI. Com o Grafana, você pode se conectar a múltiplas fontes de dados, como Prometheus, InfluxDB, Elasticsearch, MySQL, entre outros.

Utilizar o **Docker** para rodar o Grafana é uma escolha estratégica devido às vantagens que os contêineres oferecem, como portabilidade, escalabilidade e isolamento. Usando Docker, você pode garantir que o Grafana funcione de maneira consistente em qualquer ambiente, seja em desenvolvimento, teste ou produção. O Docker Compose, por sua vez, simplifica a configuração e a execução de aplicações em contêineres, permitindo definir toda a infraestrutura em um único arquivo YAML.

## O que significa utilizar a versão "latest"?

Quando você especifica a versão "latest" (mais recente) de uma imagem Docker, está optando por usar a versão mais atualizada da imagem disponível no Docker Hub. Isso é útil para garantir que você tenha as últimas melhorias e correções de segurança. No entanto, lembre-se de que isso pode introduzir alterações inesperadas se a imagem for atualizada. Portanto, para ambientes de produção, é geralmente recomendado especificar uma versão específica para garantir previsibilidade.

## Diferença entre Docker Run e Docker Compose  
  
## Antes de utilizar o Docker Compose, você pode optar por utilizar o comando `docker run` para criar e executar o contêiner do Grafana. O comando `docker run` é utilizado para criar e executar contêineres diretamente na linha de comando. Aqui está um exemplo de como você poderia executar o Grafana usando `docker run`:

```bash
docker run -d 
  --name rosnertech_grafana 
  -p 3000:3000 
  -v /var/docker/zabbix/grafana:/var/lib/grafana 
  -e "GF_SECURITY_ADMIN_PASSWORD=410357" 
  -e "GF_DATABASE_MAX_OPEN_CONN=300" 
  -e "GF_ENABLE_GZIP=true" 
  -e "GF_INSTALL_PLUGINS=alexanderzobnin-zabbix-app,agenty-flowcharting-panel,grafana-clock-panel,grafana-piechart-panel" 
  grafana/grafana:latest
```

## Por que usar Docker Compose em vez de Docker Run?

Simplicidade e Manutenção:  
##   
Com o Docker Compose, você pode definir múltiplos contêineres em um único arquivo YAML (`docker-compose.yml`). Isso torna o processo de gerenciamento mais simples, especialmente quando você precisa configurar múltiplos serviços que dependem uns dos outros.  
O Docker Compose facilita a leitura, manutenção e compartilhamento da configuração com outros membros da equipe.  
  
## Reusabilidade e Portabilidade:  
  
## O arquivo de configuração `docker-compose.yml` pode ser facilmente reutilizado em diferentes ambientes (desenvolvimento, teste, produção) sem necessidade de modificar o script de execução.  
A portabilidade de um único arquivo YAML torna mais fácil replicar a infraestrutura em diferentes sistemas ou servidores.  
  
## Orquestração de Múltiplos Contêineres:  
## Se você precisar executar vários contêineres que dependem uns dos outros (por exemplo, Grafana junto com uma instância do Prometheus), o Docker Compose permite orquestrar esses contêineres facilmente, definindo a ordem de inicialização e dependências.  
  
## Facilidade de Uso:  
## Para iniciar os serviços definidos, basta um único comando `docker-compose up -d`, em vez de executar múltiplos comandos `docker run`.

## Em resumo**, o `docker run` é ótimo para testes rápidos e execução de contêineres únicos, mas o Docker Compose é mais adequado para ambientes de produção e desenvolvimento onde múltiplos serviços interdependentes precisam ser orquestrados de forma consistente.

## Preparar o Ambiente

Antes de começar, certifique-se de que o Docker e o Docker Compose estejam instalados no seu sistema. Se você ainda não instalou o Docker, consulte o tutorial [anterior](https://blog.rosnertech.com.br/arquivos/889) no blog para obter instruções detalhadas de instalação.

## Criar um Arquivo Docker Compose  
  
## Crie um Diretório para o Projeto do Grafana:

```bash
sudo mkdir /var/docker/zabbix/grafana
sudo cd /var/docker/zabbix/grafana
sudo nano docker-compose.yml
```

Crie um Arquivo `docker-compose.yml`:  
Dentro do diretório recém-criado, crie um arquivo chamado `docker-compose.yml` com o seguinte conteúdo:

```bash

services:
  grafana:
    container_name: rosnertech_grafana
    image: grafana/grafana:latest
    networks:
      - rosnertech_network
    restart: unless-stopped
    ports:
      - "3000:3000"
    volumes:
      - /var/docker/zabbix/grafana:/var/lib/grafana
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=410357
      - GF_DATABASE_MAX_OPEN_CONN=300
      - GF_ENABLE_GZIP=true
      - GF_INSTALL_PLUGINS=alexanderzobnin-zabbix-app,agenty-flowcharting-panel
      - GF_INSTALL_PLUGINS=grafana-clock-panel,grafana-piechart-panel
networks:
  rosnertech_network:
    driver: bridge
```

Este arquivo Docker Compose define um serviço chamado “grafana” que usa a imagem oficial do Grafana no Docker Hub. Ele mapeia a porta 3000 do contêiner para a porta 3000 do host, permitindo o acesso à interface web do Grafana. Além disso, o arquivo configura um volume persistente para armazenar os dados do Grafana, garantindo que suas configurações e dashboards sejam preservados mesmo após o reinício do contêiner.

## Inicializar o Contêiner Grafana

No diretório onde o arquivo `docker-compose.yml` foi criado, execute o comando abaixo para iniciar o contêiner:

```bash
sudo docker-compose up -d
```

Este comando executará o contêiner em segundo plano. Aguarde alguns segundos para que o Grafana inicialize completamente.

## Visualizando os Logs do Contêiner

Após iniciar o contêiner, é uma boa prática verificar os logs para garantir que tudo está funcionando corretamente. Para visualizar os logs do contêiner em tempo real, você pode usar o seguinte comando:

```bash
sudo docker-compose logs -f
```

O comando `docker-compose logs -f` irá exibir os logs do contêiner à medida que eles são gerados, permitindo que você monitore qualquer mensagem de erro ou confirmação de que o Grafana foi iniciado com sucesso.

## Acessar a Interface Web do Grafana

Abra um navegador da web e acesse `http://localhost:3000` (ou substitua "localhost" pelo endereço IP do seu servidor, se estiver executando remotamente). Você verá a tela de login do Grafana. Use o nome de usuário padrão "admin" e a senha "admin". Após o primeiro login, será solicitado que você altere a senha para garantir a segurança.

## Configuração Adicional no Grafana

Após o login, você pode configurar diferentes fontes de dados, criar dashboards personalizados e configurar alertas conforme as necessidades do seu projeto. O Grafana oferece uma vasta gama de plugins que você pode instalar diretamente da interface web para adicionar funcionalidades adicionais.

## Conclusão:

Instalar o Grafana usando Docker é uma maneira eficaz de configurar um ambiente de monitoramento que seja tanto escalável quanto fácil de gerenciar. Usando Docker e Docker Compose, você obtém a flexibilidade de implantar o Grafana em qualquer ambiente e garantir que ele funcione de maneira consistente. Lembre-se de manter o seu contêiner Grafana atualizado e de ajustar as configurações conforme necessário para otimizar o desempenho e a segurança.

Com esta instalação, você está preparado para monitorar e visualizar dados críticos em tempo real, ajudando a melhorar a performance e a estabilidade dos sistemas que você gerencia.

## Agradeço por ler esse artigo e espero vê-lo novamente em breve. Continue nos acompanhando para mais conteúdo relevante e inspirador. Até a próxima!
