---
title: "Atualizando pfSense 2.6.0 para 2.7.0"
description: "O pfSense 2.7.0 trouxe melhorias no desempenho do firewall, correções de problemas de UPnP relacionados à execução de vários sistemas de jogos na mesma rede e atualizações no OpenVPN."
pubDate: 2023-09-10
updatedDate: 2023-09-23
tags: ["PfSense", "Firewall", "Squid"]
wpId: 851
draft: false
---

## Atualizando pfSense 2.6.0 para 2.7.0

O pfSense 2.7.0 trouxe melhorias no desempenho do firewall, correções de problemas de UPnP relacionados à execução de vários sistemas de jogos na mesma rede e atualizações no OpenVPN.  
Antes de iniciar o processo de atualização, é fundamental fazer um backup das configurações do pfSense 2.6.0. Isso garantirá a capacidade de restaurar as configurações em caso de problemas durante a atualização.

## Efetuando backup das Configurações do pfSense 2.6.0.  

Acesse a interface web do pfSense digitando o endereço IP do servidor no navegador, normalmente **https://192.168.1.1** ou o endereço que você configurou anteriormente.  
Faça login na interface usando suas credenciais de administrador.  
No menu principal, clique em "Diagnostics" (Diagnósticos) e selecione "Backup/Restore" (Backup/Restaurar).

Na guia "Backup", você verá várias opções de backup. Selecione "Backup" para fazer o backup completo das configurações do sistema.

   **Backup area:** Escolha os módulos que deseja fazer backup (DNS Forwarder, Resolver, DHCP Server, Firewall Rules, Interfaces, VPN...) ou selecione a opção "All" para fazer backup de todo o conteúdo.

   **Skip Packages:** O backup irá ignorar informações de log.

   **Skip RRD data:** Esta opção vem marcada como padrão; neste caso, o backup ignorará os gráficos.

   **Encryption:** Selecione esta opção se desejar definir uma senha para o arquivo de backup.

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/09/pfsense_02.png)

Clique em "Download Configuration" para salvar o arquivo de backup em seu computador.  
Pronto, o backup foi concluído com sucesso.

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/09/pfsense_03.png)

## Atualizando o pfSense 2.6.2 para 2.7.0.

Na Dashboard, verifique a versão instalada. Se a versão 2.7.0 estiver disponível, clique no botão para obtê-la.

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/09/pfsense_10-1.png)

Na tela seguinte, você verá a versão atual e a última versão disponível. Clique em "Confirm".

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/09/pfsense_05.png)

O pfSense está sendo atualizado (isso pode demorar vários minutos). Não atualize a página durante o processo.

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/09/pfsense_06.png)

Após a conclusão da instalação, aguarde o pfSense reiniciar.

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/09/pfsense_08.png)

Faça login novamente na interface administrativa e aceite os termos.

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/09/pfsense_09.png)

Pronto pfSense atualizado com sucesso.

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/09/pfsense_04-1.png)

## Neste post, apresentei um guia passo a passo sobre como realizar a atualização do pfSense 2.6.0 para 2.7.0. Com essas instruções, agora você possui o pfSense na última versão.

Agradeço por ter lido este artigo e espero revê-lo em breve. Continue nos acompanhando para mais conteúdo relevante e inspirador. Até a próxima!
