---
title: "Liberando Acesso Remoto ao Docker"
description: "Liberar acesso ao seu Cluster de Docker Swarm para o desenvolvedor subir Stacks sem autenticação adicional. Permitir que a ferramenta de CI/CD suba Stacks automaticamente."
pubDate: 2023-10-03
updatedDate: 2023-10-03
tags: ["Debian", "Docker", "Linux", "Debian 12 Bookworm"]
wpId: 1080
draft: false
---

/\*! elementor - v3.16.0 - 20-09-2023 \*/<br /> .elementor-heading-title{padding:0;margin:0;line-height:1}.elementor-widget-heading .elementor-heading-title\[class\*=elementor-size-\]>a{color:inherit;font-size:inherit;line-height:inherit}.elementor-widget-heading .elementor-heading-title.elementor-size-small{font-size:15px}.elementor-widget-heading .elementor-heading-title.elementor-size-medium{font-size:19px}.elementor-widget-heading .elementor-heading-title.elementor-size-large{font-size:29px}.elementor-widget-heading .elementor-heading-title.elementor-size-xl{font-size:39px}.elementor-widget-heading .elementor-heading-title.elementor-size-xxl{font-size:59px}

## Liberando Acesso Remoto ao Docker

Você aprenderá como liberar o acesso remoto ao Docker em seu servidor. Isso permitirá que você execute comandos Docker a partir de uma máquina local em seu servidor Docker sem a necessidade de autenticação adicional. **Motivos para Liberar Acesso Remoto** Liberar acesso ao seu Cluster de Docker Swarm para o desenvolvedor subir Stacks sem autenticação adicional. Permitir que a ferramenta de CI/CD suba Stacks automaticamente após o processo de build e testes. **Habilitando o Acesso Remoto ao Docker** Acesse o servidor onde o Docker está instalado. Abra o arquivo \`daemon.json\` para edição com o comando:

```bash
nano /etc/docker/daemon.json
```

Adicione as seguintes configurações no arquivo `daemon.json`.

```bash
{
       "hosts": ["unix:///var/run/docker.sock", "tcp://0.0.0.0:2376"]
}
```

Nesta configuração, estamos definindo que o Docker estará ouvindo na porta TCP 2376. Antes de reiniciar o Docker, vamos fazer uma pequena alteração no arquivo de inicialização para evitar erros: Execute os seguintes comandos

```bash
 sed -i 's# -H fd://# #g' /lib/systemd/system/docker.service
   systemctl daemon-reload
   systemctl restart docker.service
```

Isso remove a flag \`-H\` do arquivo \`docker.service\`, pois já definimos a configuração do socket no arquivo \`daemon.json\`. Após o reinício do Docker, verifique se tudo está funcionando corretamente.

```bash
ss -tunelp |grep :2376
```

/\*! elementor - v3.16.0 - 20-09-2023 \*/<br /> .elementor-widget-image{text-align:center}.elementor-widget-image a{display:inline-block}.elementor-widget-image a img\[src$=".svg"\]{width:48px}.elementor-widget-image img{vertical-align:middle;display:inline-block} ![](https://blog.rosnertech.com.br/wp-content/uploads/2023/10/docker_01.png) Isso mostrará se a porta 2376 está sendo ouvida. Certifique-se de que o Docker esteja funcionando sem erros. **Testando o Acesso Remoto** Agora que o acesso remoto ao Docker está habilitado, você pode testá-lo a partir de sua máquina local. Certifique-se de que o Docker também está instalado em sua máquina local. Substitua \`${IP\_HOST}\` pelo endereço IP do seu servidor. Por exemplo, \`192.168.1.219\`.

```bash
docker -H ${IP_HOST}:2376 [comando]
```

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/10/docker_02.png) **Pronto! Agora você liberou com sucesso o acesso remoto ao Docker em seu servidor e pode executar comandos Docker remotamente a partir de sua máquina local. Certifique-se de manter a segurança, limitando o acesso apenas a máquinas confiáveis e configurando medidas de segurança adequadas, como autenticação e firewall, conforme necessário.** **Agradeço por ler esse artigo e espero vê-lo novamente em breve. Continue nos acompanhando para mais conteúdo relevante e inspirador. Até a próxima!
