---
title: "Instale o Pi-hole Usando Docker"
description: "O Pi-hole é uma ferramenta que atua como um servidor DNS com bloqueio de anúncios e rastreadores, protegendo sua rede contra propagandas indesejadas e melhorando a performance de navegação."
pubDate: 2025-07-01
updatedDate: 2025-07-03
tags: ["Docker", "Pi-hole"]
wpId: 2081
draft: false
---

## Instale o Pi-hole usando Docker

O **Pi-hole** é uma ferramenta que atua como um **servidor DNS com bloqueio de anúncios e rastreadores**, protegendo sua rede contra propagandas indesejadas e melhorando a performance de navegação.  
Ele funciona como um **filtro de DNS**, impedindo que domínios maliciosos ou de publicidade sejam resolvidos.  
Você pode usar o Pi-hole como o **DNS principal da sua rede**, apontando seus dispositivos ou o roteador/firewall para ele.

 **Pré-requisitos

Antes de começar, você precisa:

Ter o [Docker](https://blog.rosnertech.com.br/arquivos/756) e Docker Compose instalados.  
Um diretório dedicado para o Pi-hole no seu servidor.  
Uma porta disponível para o DNS (53) e para o painel web (80/443).  
Um IP fixo para o container dentro da rede Docker.

## Estrutura de Pastas**  
Crie uma pasta para o projeto:

```bash
mkdir -p ~/homelab/pihole
cd ~/homelab/pihole
```

Crie as subpastas que serão mapeadas:

```bash
mkdir etc-pihole etc-dnsmasq.d
```

Crie o arquivo docker-compose.yml com o conteúdo abaixo (ajustado se necessário):  
## docker-compose.yml

```bash
services:
  pihole:
    container_name: homelab_pihole 
    image: pihole/pihole:latest
    hostname: homelab_pihole 
    environment:
      TZ: America/Sao_Paulo
      FTLCONF_webserver_api_password: "sua_senha_forte"
    volumes:
      - ./etc-pihole:/etc/pihole
      - ./etc-dnsmasq.d:/etc/dnsmasq.d
    ports:
      - "53:53/tcp"
      - "53:53/udp"
      - "80:80"
      - "443:443"
    restart: always
    cap_add:
      - NET_ADMIN
    networks:
      default:
        ipv4_address: 192.168.1.250  # ajuste conforme necessário
networks:
  default:
    driver: bridge
    ipam:
      config:
        - subnet: 192.168.1.0/24  # ajuste se necessário
```

🔐 **Dica de segurança**: substitua `"sua_senha_forte"` por uma senha real e segura.

ℹ️ **Observação técnica – cap\_add: NET\_ADMIN

No `docker-compose.yml`, incluímos a diretiva `cap_add: - NET_ADMIN`. Isso permite que o container do Pi-hole tenha permissões extras relacionadas à rede, como escutar na porta 53 (DNS), manipular regras internas e configurar serviços como o `dnsmasq`.

Essa capacidade é necessária para o funcionamento correto do Pi-hole em containers, especialmente ao usar IP fixo ou quando você precisa de controle mais refinado sobre o tráfego DNS.

Apesar de poderosa, essa permissão é segura desde que usada com imagens confiáveis — como é o caso da imagem oficial do Pi-hole (`pihole/pihole`).

## Criar a rede Docker (se ainda não existir)  
##   
O Docker vai criar a rede automaticamente com base no docker-compose.yml, mas se quiser criar manualmente:

```bash
docker network create 
  --subnet=192.168.1.0/24 
  --driver=bridge 
  homelab_net
```

E no docker-compose.yml, mude o nome da rede de default para homelab\_net.

## Subir o container do Pi-hole  
##   
Agora, com tudo pronto, execute:

```bash
docker compose up -d
```

Verifique se o container está rodando:

```bash
docker ps
```

Você deve ver o `homelab_pihole` em execução.

## Acessar a interface do Pi-hole**  
  
Abra o navegador e acesse:

```bash
http://<IP_DO_SERVIDOR>:80
```

![](https://blog.rosnertech.com.br/wp-content/uploads/2025/07/login_pihole.png)

Exemplo: http://192.168.1.250 (ou o IP do host se você estiver usando o modo bridge com redirecionamento de porta)  
A interface de login aparecerá. Use a senha que você definiu em WEBPASSWORD.

 **Configurar o Pi-hole como seu DNS  
##   
Depois de acessar a interface:

## Vá em Settings > DNS.**  
Configure os servidores DNS upstream (Google, Cloudflare, etc).  
Ative as listas de bloqueio padrão.  
Aponte seu roteador, OPNsense ou clientes individuais para usar o IP do Pi-hole como servidor DNS primário.

## Verificando funcionamento  
##   
Rode este comando em uma máquina que esteja usando o Pi-hole como DNS:

```bash
nslookup doubleclick.net <IP_DO_PIHOLE>
```

Se ele bloquear, o Pi-hole está funcionando!

## Observações importantes

O Pi-hole usa as portas 53 (DNS), 80 e 443 (painel web), então certifique-se de que não há conflitos.  
Se estiver usando o OPNsense como seu firewall, você pode redirecionar o tráfego DNS para o Pi-hole.  
Lembre-se de fazer backup dos volumes ./etc-pihole e ./etc-dnsmasq.d.

🚀 **Conclusão  

Agora você já sabe como instalar o Pi-hole no Docker de forma organizada e eficiente. Com isso, você consegue bloquear anúncios em toda a sua rede local, melhorar o desempenho da navegação e ainda ter mais controle sobre os domínios acessados pelos seus dispositivos.

Deixe sua opinião nos comentários! Se tiver dúvidas ou sugestões, ficarei feliz em ajudar. E, claro, compartilhe com seus amigos se achar que esse conteúdo pode ser útil para eles.

Obrigado por acompanhar este guia! 🚀

Até a próxima!
