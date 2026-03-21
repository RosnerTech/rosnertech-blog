---
title: "Como Melhorar o Zend OPcache no GLPI"
description: "Zend OPcache é um mecanismo de cache que armazena precompilações de scripts PHP em memória."
pubDate: 2023-10-17
updatedDate: 2023-10-17
tags: ["GLPI", "Linux"]
wpId: 1101
draft: false
---

/\*! elementor - v3.16.0 - 09-10-2023 \*/<br /> .elementor-heading-title{padding:0;margin:0;line-height:1}.elementor-widget-heading .elementor-heading-title\[class\*=elementor-size-\]>a{color:inherit;font-size:inherit;line-height:inherit}.elementor-widget-heading .elementor-heading-title.elementor-size-small{font-size:15px}.elementor-widget-heading .elementor-heading-title.elementor-size-medium{font-size:19px}.elementor-widget-heading .elementor-heading-title.elementor-size-large{font-size:29px}.elementor-widget-heading .elementor-heading-title.elementor-size-xl{font-size:39px}.elementor-widget-heading .elementor-heading-title.elementor-size-xxl{font-size:59px}

## Como Melhorar o Zend OPcache no GLPI

Utilizando meu ambiente GLPI, constatei que o mesmo estava apresentando alto consumo de memória, o que impactava negativamente no desempenho do sistema. Após uma análise minuciosa das configurações do servidor, confirmei que o Zend OPcache e o APCu estavam contribuindo para esse consumo excessivo de memória. Como resultado, decidi ajustar as configurações desses dois componentes, com o objetivo de otimizar o uso de recursos e melhorar o desempenho do GLPI. /\*! elementor - v3.16.0 - 09-10-2023 \*/<br /> .elementor-widget-image{text-align:center}.elementor-widget-image a{display:inline-block}.elementor-widget-image a img\[src$=".svg"\]{width:48px}.elementor-widget-image img{vertical-align:middle;display:inline-block} ![](https://blog.rosnertech.com.br/wp-content/uploads/2023/10/zendOPcache.png)

#### O que é Zend OPcache?

Você deve saber que o Zend OPcache é um mecanismo de cache que armazena pré-compilações de scripts PHP em memória, reduzindo o tempo de carregamento dos scripts e economizando recursos do servidor.

#### O que é APCu?

O APCu é um sistema de cache de dados em memória para PHP que ajuda a melhorar o desempenho, armazenando dados em cache na memória RAM e permitindo um acesso mais rápido a esses dados. Agora, siga os passos para ajustar as configurações do Zend OPcache e APCu no seu ambiente GLPI: **Faça um Backup da Pasta do PHP** Antes de qualquer modificação, é fundamental que você crie um backup da pasta do PHP. Isso é importante para que você possa restaurar as configurações originais, caso algo dê errado. **Pare os Serviços do Servidor Web** Se você estiver utilizando o Nginx, pare o serviço com o seguinte comando:

```bash
sudo systemctl stop nginx
```

Se estiver usando o Apache2, pare o serviço com o seguinte comando:

```bash
sudo systemctl stop apache2
```

## Verifique a Versão do PHP e o Local de Instalação** Certifique-se de saber qual versão do PHP você está usando e onde está instalado. Você pode verificar isso com o seguinte comando:

```bash
php -v
```

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/10/php-v.png) Isso exibirá a versão do PHP em uso. Anote o caminho da instalação, pois você precisará dele para as próximas etapas. **Edite as Configurações do Zend OPcache** Acesse o arquivo de configuração do Zend OPcache com um editor de texto. O caminho do arquivo pode variar, mas geralmente está em `/etc/php/<sua-versão>/fpm/php.ini`. Dentro do arquivo, ajuste-as conforme necessário. Por exemplo, você pode aumentar o limite de memória alocada:

```bash
sudo nano /etc/php/<sua-versão>fpm/php.ini
```

```bash
opcache.enable=1
opcache.memory_consumption=128
opcache.max_accelerated_files=10000
opcache.revalidate_freq=200
```

Depois de fazer todas as alterações, reinicie o servidor web para que as novas configurações entrem em vigor: Se estiver usando o Nginx:

```bash
sudo systemctl start nginx
```

Se estiver usando o Apache2:

```bash
sudo systemctl start apache2
```

Reinicie o serviço PHP-FPM

```bash
sudo systemctl reiniciar nginx php-8.2fpm
```

Agora, as configurações do Zend OPcache e APCu devem estar otimizadas para melhorar o desempenho do GLPI em seu ambiente Debian 12. Certifique-se de testar o sistema e monitorar o uso de memória para garantir que as alterações tenham o impacto desejado. ![](https://blog.rosnertech.com.br/wp-content/uploads/2023/10/zendOPcache2.png) **Agradeço por ler esse artigo e espero vê-lo novamente em breve. Continue nos acompanhando para mais conteúdo relevante e inspirador. Até a próxima!
