---
title: "Configurando IP Estático no Ubuntu 22.04"
description: "O Netplan é usado para definir as configurações de rede por meio de arquivos YAML."
pubDate: 2023-10-05
updatedDate: 2024-08-25
tags: ["Ubuntu", "Linux"]
wpId: 1094
draft: false
---

/\*! elementor - v3.16.0 - 20-09-2023 \*/<br /> .elementor-heading-title{padding:0;margin:0;line-height:1}.elementor-widget-heading .elementor-heading-title\[class\*=elementor-size-\]>a{color:inherit;font-size:inherit;line-height:inherit}.elementor-widget-heading .elementor-heading-title.elementor-size-small{font-size:15px}.elementor-widget-heading .elementor-heading-title.elementor-size-medium{font-size:19px}.elementor-widget-heading .elementor-heading-title.elementor-size-large{font-size:29px}.elementor-widget-heading .elementor-heading-title.elementor-size-xl{font-size:39px}.elementor-widget-heading .elementor-heading-title.elementor-size-xxl{font-size:59px}

## Configurando IP Estático no Ubuntu 22.04 com Netplan

Neste tutorial, vou guiá-lo na configuração de um endereço IP estático em um sistema Ubuntu 22.04 usando o utilitário Netplan. O Netplan é usado para definir as configurações de rede por meio de arquivos YAML. Siga os passos abaixo: **Passo 1:** Abra um terminal. Você pode pressionar `Ctrl+Alt+T` para abrir um terminal diretamente. **Passo 2:** Acesse o diretório Netplan usando o comando `cd`:

```bash
cd /etc/netplan
```

## Passo 3:** Verifique o nome do arquivo YAML de configuração existente na sua distribuição:

```bash
ls
```

Por padrão, o arquivo de configuração no Ubuntu Server 22.04 é frequentemente chamado de "50-cloud-init.yaml", mas pode variar. Anote o nome do arquivo ou crie um novo arquivo, caso nenhum esteja presente. **Passo 4 (opcional):** Se nenhum arquivo YAML estiver presente ou você deseja criar um novo, você pode usar o comando a seguir para gerar um arquivo de configuração padrão:

```bash
sudo netplan generate
```

Alternativamente, você pode criar um novo arquivo YAML com seu editor de texto favorito. Certifique-se de que ele tenha a extensão `.yaml` e, por convenção, comece o nome do arquivo com um número, como "01-myconfig.yaml". **Passo 5:** Faça backup do arquivo de configuração atual (caso já exista) para evitar perda de configurações:

```bash
sudo cp <nome-do-arquivo-existente>.yaml <nome-do-arquivo-existente>.yaml.old
```

## Passo 7:** Configure o arquivo YAML com as informações do seu IP estático. Aqui está um exemplo de como configurar uma interface de rede com IP estático:

```bash
network:
  version: 2
  renderer: networkd
  ethernets:
    enp0s3: # Nome da interface de rede (substitua pelo seu)
      dhcp4: no
      addresses: [192.168.1.100/24] # Substitua pelo IP e máscara da sua rede
      gateway4: 192.168.1.1 # Substitua pelo IP do gateway
      nameservers:
        addresses: [8.8.8.8, 8.8.4.4] # Substitua pelos servidores DNS desejados
```

Certifique-se de substituir os valores com as configurações específicas da sua rede. **Passo 8:** Salve as alterações e saia do editor de texto. **Passo 9:** Verifique a sintaxe do arquivo para garantir que não haja erros de formatação:

```bash
sudo netplan try
```

Se não houver erros, continue. **Passo 10:** Aplique a configuração:

```bash
sudo netplan apply
```

## Passo 11:** Verifique se as configurações foram aplicadas com sucesso:

```bash
ip addr show
```

## Agora você configurou com sucesso um endereço IP estático no seu servidor Ubuntu 22.04 usando o Netplan. Certifique-se de ter as informações corretas da sua rede antes de realizar essas configurações e substitua os valores no arquivo YAML conforme necessário.** **Agradeço por ler esse artigo e espero vê-lo novamente em breve. Continue nos acompanhando para mais conteúdo relevante e inspirador. Até a próxima!
