---
title: "Instalar Zabbix Proxy com Docker"
description: "Zabbix é uma solução de monitoramento open-source para redes, servidores, aplicações e serviços. Ele coleta dados de desempenho e disponibilidade e permite que você configure alertas, dashboards e rel"
pubDate: 2025-01-19
updatedDate: 2025-01-19
tags: ["Debian", "Docker", "Linux", "Zabbix", "Docker-Compose", "Zabbix Proxy"]
wpId: 1808
draft: false
---

## Instalar Zabbix Proxy com Docker

## O que é Zabbix e Zabbix Proxy?

Zabbix** é uma solução de monitoramento open-source para redes, servidores, aplicações e serviços. Ele coleta dados de desempenho e disponibilidade e permite que você configure alertas, dashboards e relatórios detalhados.

## Zabbix Proxy** é um componente intermediário que você pode usar para:  
Reduzir a carga no servidor Zabbix principal.  
Coletar dados de agentes em locais remotos e consolidar a comunicação.  
Operar em ambientes onde o servidor principal não é diretamente acessível.  
  
Existem dois modos de operação para o proxy:  
##   
Ativo**: Envia os dados coletados ao servidor periodicamente.  
## Passivo**: Responde às requisições do servidor Zabbix.

## Boas Práticas ao Utilizar Zabbix Proxy

Escolha do Modo: Utilize o modo ativo se o proxy estiver em um local com conexão instável com o servidor.  
Segurança: Habilite criptografia TLS com PSK ou certificados para proteger a comunicação.  
Buffer Offline: Configure buffers para garantir a retenção de dados em caso de desconexões temporárias.  
Recursos do Sistema: Monitore o uso de CPU, memória e disco para dimensionar corretamente os recursos do container.  
Manutenção: Atualize regularmente a imagem Docker para garantir suporte e segurança.

## Comandos Pré-Requisitos  
  
## Crie a Rede Docker:  
Antes de iniciar o Zabbix Proxy, você precisa criar uma rede Docker. Use o comand

```bash
docker network create homelab_network
```

Esse comando cria a rede "homelab\_network", que será usada pelo container.

## Gere uma Chave PSK**: Para habilitar comunicação segura entre o proxy e o servidor Zabbix, você precisa de uma chave PSK (Pre-Shared Key). No Debian ou Ubuntu, use o comando:

```bash
openssl rand -hex 32
```

Copie e guarde essa chave, pois ela será configurada no arquivo `docker-compose.yml`.

## Instale o Docker Compose** (se não estiver instalado):

```bash
sudo apt update
sudo apt install docker-compose -y
```

## Criando o Arquivo docker-compose.yml  
## No diretório onde você deseja configurar o Zabbix Proxy, abra o editor nano:

```bash
services:
  zabbix-proxy:
    container_name: "homelab_zbxproxy"
    image: zabbix/zabbix-proxy-sqlite3:ubuntu-7.0-latest
    user: root
    environment:
      - ZBX_PROXYMODE=0  # 0 - active proxy and 1 - passive proxy
      - ZBX_SERVER_HOST=91.107.217.93     # IP OU DNS DO SEU ZABBIX SERVER
      - ZBX_SERVER_PORT=10051
      - ZBX_HOSTNAME=homelab_zbxproxy
      - ZBX_DEBUGLEVEL=3  # Nível de detalhamento dos logs
      - ZBX_TLSCONNECT=psk
      - ZBX_TLSACCEPT=psk
      - ZBX_TLSPSKIDENTITY=homelab_zbxproxy
      - ZBX_TLSPSK=<SUA_CHAVE_PSK>
    restart: always
    volumes:
      - /etc/localtime:/etc/localtime:ro
    networks:
      - homelab_network
networks:
  homelab_network:
    external: true
```

Substitua `<SUA_CHAVE_PSK>` pela chave gerada no passo anterior. Salve e saia do editor pressionando `CTRL+O`, `Enter` e depois `CTRL+X`.

## Inicie o Zabbix Proxy

Certifique-se de que o arquivo docker-compose.yml está salvo corretamente.  
Execute o comando para iniciar o container:

```bash
docker-compose up -d
```

Esse comando inicia o container em segundo plano.

## Exiba os Logs do Container

Para verificar os logs do Zabbix Proxy e diagnosticar possíveis problemas, use:

```bash
docker logs -f homelab_zbxproxy
```

O argumento `-f` exibe os logs em tempo real.

## Comandos Adicionais

Parar o Container:

```bash
docker-compose down
```

## Reiniciar o Container:

```bash
docker-compose restart
```

## Listar Containers Ativos:

```bash
docker ps
```

## Configurando o Zabbix Proxy no Zabbix Server

Acesse a Interface Web do Zabbix Server:**  
Abra o navegador e acesse a interface web do seu Zabbix Server usando o endereço configurado, como http://<IP\_DO\_SERVIDOR\_ZABBIX>/zabbix.

## Navegue até Administration > Proxies:**  
No menu superior, clique em Administration e selecione Proxies.

## Adicione um Novo Proxy:

Clique no botão Create proxy no canto superior direito.

## Preencha os seguintes campos:

Proxy name: homelab\_zbxproxy (mesmo valor configurado em ZBX\_HOSTNAME).

## Proxy mode: Escolha Active.

Encryption:

Connections from proxy: Selecione PSK.

Connections to proxy: Selecione PSK.

PSK identity: homelab\_zbxproxy (mesmo valor configurado em ZBX\_TLSPSKIDENTITY).

PSK: Cole o valor hexadecimal gerado anteriormente.

## Clique em Add para salvar.

Verifique o Status do Proxy:

Após adicionar o proxy, aguarde alguns minutos e confira o status na lista de proxies. Ele deve aparecer como Online se tudo estiver configurado corretamente.

![](https://blog.rosnertech.com.br/wp-content/uploads/2025/01/zabbix_01.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2025/01/zabbix_02.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2025/01/zabbix_03.png)

## Conclusão:

Este tutorial mostrou como configurar o Zabbix Proxy com Docker Compose, cobrindo desde a geração de uma chave PSK até a configuração no Zabbix Server.  
Sempre mantenha sua infraestrutura atualizada e monitorada para garantir a segurança e eficiência.

## Agradeço por ler esse artigo e espero vê-lo novamente em breve. Continue nos acompanhando para mais conteúdo relevante e inspirador. Até a próxima!
