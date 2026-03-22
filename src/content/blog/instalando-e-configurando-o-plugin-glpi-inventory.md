---
title: "Instalando e Configurando o plugin GLPI Inventory"
description: "O GLPI Inventory é uma ferramenta de software usada para coletar e gerenciar informações detalhadas sobre ativos de TI em uma organização. Ele rastreia hardware, software, dispositivos de rede e outro"
pubDate: 2023-09-28
updatedDate: 2023-10-01
tags: ["Apache", "Debian", "Docker", "Linux", "GLPI"]
wpId: 1018
draft: false
---

## Instalando e Configurando o plugin GLPI Inventory

O GLPI Inventory é uma ferramenta de software usada para coletar e gerenciar informações detalhadas sobre ativos de TI em uma organização. Ele rastreia hardware, software, dispositivos de rede e outros recursos, ajudando a manter um inventário completo. Isso permite o planejamento eficaz, manutenção proativa e resolução de problemas mais rápida na infraestrutura de TI. Além disso, o GLPI Inventory oferece recursos de relatórios e automação, tornando mais fácil acompanhar alterações e otimizar recursos de TI. Essa solução é valiosa para empresas que desejam aprimorar o controle e o gerenciamento de seus ativos de tecnologia, melhorando a eficiência operacional e a tomada de decisões informadas. **Baixando o plugin GLPI Inventory** Baixe a última versão do plugin de acordo com a versão do seu GLPI.

```bash
cd /tmp
wget https://github.com/glpi-project/glpi-inventory-plugin/releases/download/1.2.3/glpi-glpiinventory-1.2.3.tar.bz2
```

## Descompactando e preparando** Descompacte o arquivo baixado e mova-o para a pasta de plugins do seu GLPI, certificando-se de substituir pelo caminho onde o seu GLPI está instalado.

```bash
tar -xjf glpi-glpiinventory-1.2.3.tar.bz2
mv glpiinventory /var/www/html/glpi/plugins/
```

## Configurando o plugin GLPI Inventory** Acesse o GLPI e vá para a opção "Configurar" e, em seguida, clique em "Plug-ins" para acessar a administração do plugin. 
