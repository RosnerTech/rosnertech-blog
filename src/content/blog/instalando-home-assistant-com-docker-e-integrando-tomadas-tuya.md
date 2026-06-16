---
title: "Instalando o Home Assistant com Docker e Integrando Tomadas Tuya"
description: "Aprenda a instalar o Home Assistant via Docker, configurar o assistente inicial e integrar tomadas inteligentes Tuya/Smart Life para monitorar consumo de energia."
pubDate: 2026-06-15
updatedDate: 2026-06-15
tags: ["Docker", "Home Assistant", "Automação", "Smart Home", "Tuya"]
draft: false
---

## Instalando o Home Assistant com Docker e integrando tomadas Tuya

## Introdução

O **Home Assistant** é uma plataforma open source de automação residencial que centraliza o controle de dispositivos smart home — tomadas, sensores, luzes, câmeras e muito mais — em um único painel, com automações totalmente personalizáveis e sem depender exclusivamente da nuvem dos fabricantes.

Neste artigo, você vai aprender a:

1. Instalar o Home Assistant usando Docker Compose
2. Concluir o assistente de configuração inicial
3. Integrar tomadas inteligentes **Tuya/Smart Life** (as mesmas usadas por marcas como LOF-V, Positivo, Intelbras, entre outras) para monitorar consumo de energia e controlar dispositivos direto pelo Home Assistant

No meu caso, uso essa integração para monitorar o consumo de energia de equipamentos de um aquário (luminária, filtro e bomba) e de uma régua de tomadas do meu home lab — mas o processo é o mesmo para qualquer tomada Tuya.

## Pré-requisitos

Antes de começar, você precisa ter:

1. **Docker** e **Docker Compose** instalados no servidor
2. Uma porta livre para o Home Assistant (padrão: `8123`)
3. As tomadas Tuya já configuradas no **app Tuya Smart** (ou Smart Life) e conectadas ao WiFi
4. Uma conta criada em [iot.tuya.com](https://iot.tuya.com) (Tuya IoT Platform) — vamos criar o projeto durante o artigo

⚠️ **Importante:** o Home Assistant precisa rodar em `network_mode: host` para conseguir descobrir dispositivos na rede local (mDNS, integrações que dependem de broadcast/multicast). Isso traz uma particularidade de DNS que vamos resolver mais adiante.

## 1. Estrutura de pastas

Crie o diretório onde ficará a configuração persistente do Home Assistant:

```bash
mkdir -p /opt/homeassistant/config
```

## 2. Criando o docker-compose.yml

```yaml
services:
  homeassistant:
    image: ghcr.io/home-assistant/home-assistant:stable
    container_name: homeassistant
    restart: unless-stopped
    privileged: true
    network_mode: host
    volumes:
      - /opt/homeassistant/config:/config
      - /opt/homeassistant/resolv.conf:/etc/resolv.conf:ro
      - /etc/localtime:/etc/localtime:ro
    environment:
      TZ: America/Sao_Paulo
```

💡 **Dica:** o volume `/etc/resolv.conf` é opcional na instalação inicial, mas recomendo já deixar preparado — veja o motivo na seção [Resolvendo problemas de DNS](#resolvendo-problemas-de-dns-apos-quedas-de-energia) ao final do artigo.

Crie o arquivo de DNS que será usado pelo container:

```bash
sudo tee /opt/homeassistant/resolv.conf <<EOF
nameserver 1.1.1.1
nameserver 1.0.0.1
EOF
```

> Substitua pelos servidores DNS da sua rede, se preferir usar o DNS do seu roteador/firewall.

## 3. Subindo o container

```bash
cd /opt/homeassistant
docker compose up -d
```

Verifique se o container está rodando:

```bash
docker ps
```

Você deve ver o container `homeassistant` com status `Up`.

## 4. Primeiro acesso e configuração inicial

Acesse no navegador, usando o IP do servidor:

```
http://<IP_DO_SERVIDOR>:8123
```

O assistente de boas-vindas será exibido:

![Tela de boas-vindas do Home Assistant](/img/home-assistant/01-bem-vindo.png)

Clique em **"Criar minha casa inteligente"** e preencha o usuário administrador:

![Tela de criação de usuário do Home Assistant](/img/home-assistant/02-criar-usuario.png)

Em seguida, defina a **localização da sua casa** — esse dado é armazenado localmente, mas algumas integrações baseadas em nuvem podem usá-lo para funcionar corretamente (previsão do tempo, por exemplo):

![Tela de localização da casa no Home Assistant](/img/home-assistant/03-localizacao.png)

Na tela seguinte, você decide se quer compartilhar dados anônimos de uso com o projeto Home Assistant. Essa etapa é totalmente opcional:

![Tela de telemetria e análises do Home Assistant](/img/home-assistant/04-telemetria.png)

Por fim, finalize a configuração inicial:

![Tela de conclusão do assistente do Home Assistant](/img/home-assistant/05-tudo-pronto.png)

Pronto! O Home Assistant está instalado e funcionando.

## 5. Integrando tomadas Tuya (Smart Life)

A forma mais simples de trazer dispositivos Tuya para o Home Assistant — **sem precisar extrair `local_key` manualmente** — é via integração oficial **Tuya**, que usa um Cloud Project na Tuya IoT Platform.

### 5.1 Criando o Cloud Project

Acesse [iot.tuya.com](https://iot.tuya.com), faça login e crie um novo projeto em **Cloud → Development → Create Cloud Project**:

![Tela de criação do Cloud Project na Tuya IoT Platform](/img/home-assistant/06-tuya-cloud-project.png)

Preencha os campos:

| Campo | Valor sugerido |
|---|---|
| **Project Name** | Um nome identificador, ex: `homeassistant-bifrost` |
| **Description** | Breve descrição do projeto |
| **Industry** | `Smart Home` |
| **Development Method** | `Smart Home` |
| **Data Center** | A região onde sua conta Tuya Smart foi criada (no Brasil, geralmente **Western America** ou **Central Europe**) |

⚠️ **Importante:** se o Data Center escolhido não corresponder ao da sua conta, você receberá erro de "usuário/senha inválido" mais adiante, mesmo com as credenciais corretas. Se isso acontecer, crie um novo projeto trocando o Data Center.

### 5.2 Autorizando os serviços de API

Após criar o projeto, será exibido o assistente de configuração para autorizar os serviços de API necessários:

![Tela de autorização de API Services do Cloud Project](/img/home-assistant/07-tuya-api-services.png)

Mantenha os serviços recomendados (incluindo **IoT Core** e **Smart Home Basic Service**) e clique em **Authorize**. Esses serviços possuem um plano gratuito (trial), suficiente para uso doméstico.

### 5.3 Vinculando sua conta Tuya Smart

Dentro do projeto, vá até a aba **Devices → Link App Account** e faça login com a conta do app **Tuya Smart** (a mesma usada para cadastrar suas tomadas).

Esse passo importa automaticamente toda a estrutura de **Home/Rooms** e os dispositivos vinculados àquela conta.

### 5.4 Obtendo o Access ID e Access Secret

Na aba **Overview** do projeto, anote:

- **Access ID / Client ID**
- **Access Secret / Client Secret**

Você vai precisar dessas duas informações no próximo passo.

### 5.5 Adicionando a integração no Home Assistant

No Home Assistant, vá em:

**Configurações → Dispositivos e Serviços → Adicionar Integração → Tuya**

Informe:

- Access ID
- Access Secret
- Conta e senha do app Tuya Smart

Ao concluir, o Home Assistant importa automaticamente todas as tomadas vinculadas, já com os sensores de **Corrente**, **Potência**, **Voltagem** e **Energia total**, além do controle de **Socket** (ligar/desligar).

![Dashboard do Home Assistant com as tomadas Tuya integradas e consumo em tempo real](/img/home-assistant/08-dashboard-tomadas.png)

## 6. Verificação

Vá em **Visão Geral** e confira se os novos dispositivos aparecem com os valores sendo atualizados (corrente em A, potência em W, energia em kWh). Ligue e desligue uma tomada pelo painel para confirmar que o controle remoto está funcionando.

## Resolvendo problemas de DNS após quedas de energia

Se o Home Assistant rodar em `network_mode: host`, ele usa o `/etc/resolv.conf` **da própria imagem do container** — não o do host automaticamente. Em alguns casos, esse arquivo aponta para `127.0.0.1`/`::1`, sem nenhum resolvedor DNS escutando ali dentro.

O sintoma mais comum: depois de uma queda de energia, a integração Tuya (ou qualquer integração que dependa de nuvem) falha ao iniciar com um erro parecido com:

```
urllib3.exceptions.NameResolutionError: Failed to resolve 'apigw.tuyaus.com'
```

A correção é montar um `resolv.conf` customizado no container, como já deixamos preparado no `docker-compose.yml` deste artigo:

```yaml
volumes:
  - /opt/homeassistant/resolv.conf:/etc/resolv.conf:ro
```

Se você ainda não tinha esse volume, adicione-o, depois recrie o container:

```bash
docker stop homeassistant
docker rm homeassistant
docker compose up -d
```

Teste a resolução de DNS dentro do container:

```bash
docker exec homeassistant nslookup apigw.tuyaus.com
```

Se retornar IPs corretamente, o problema está resolvido — e a integração Tuya volta a sincronizar normalmente em todo boot, mesmo após quedas de energia.

## Considerações finais

Com o Home Assistant rodando em Docker e a integração Tuya configurada, você já tem uma base sólida para:

1. Monitorar consumo de energia de qualquer tomada inteligente
2. Criar automações baseadas em horário, presença ou consumo
3. Expandir o ecossistema com MQTT, Zigbee, Z-Wave e outras integrações

A partir daqui, vale explorar **automações** (Configurações → Automações) para ligar/desligar dispositivos por horário, e dashboards personalizados para acompanhar o consumo de energia ao longo do tempo.

Agradeço por ler esse artigo e espero vê-lo novamente em breve. Continue nos acompanhando para mais conteúdo relevante e inspirador. Até a próxima!
