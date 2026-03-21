---
title: "Criando um servidor de arquivos NAS com Raspberry Pi"
description: "Um NAS é um dispositivo de armazenamento de rede que permite compartilhar arquivos e dados em uma rede local. É uma solução conveniente para armazenar e acessar seus arquivos de qualquer dispositivo c"
pubDate: 2023-10-01
updatedDate: 2023-10-01
tags: ["Debian", "Linux", "Raspberry", "NAS"]
wpId: 1045
draft: false
---

/\*! elementor - v3.16.0 - 20-09-2023 \*/<br /> .elementor-heading-title{padding:0;margin:0;line-height:1}.elementor-widget-heading .elementor-heading-title\[class\*=elementor-size-\]>a{color:inherit;font-size:inherit;line-height:inherit}.elementor-widget-heading .elementor-heading-title.elementor-size-small{font-size:15px}.elementor-widget-heading .elementor-heading-title.elementor-size-medium{font-size:19px}.elementor-widget-heading .elementor-heading-title.elementor-size-large{font-size:29px}.elementor-widget-heading .elementor-heading-title.elementor-size-xl{font-size:39px}.elementor-widget-heading .elementor-heading-title.elementor-size-xxl{font-size:59px}

## Criando um servidor de arquivos NAS com Raspberry Pi

Neste tutorial, você aprenderá como criar um servidor de arquivos NAS (Network Attached Storage) usando um Raspberry Pi 3 ou superior. Isso permitirá que você compartilhe arquivos em sua rede local de forma simples e eficiente. **O que é NAS?** Um NAS é um dispositivo de armazenamento de rede que permite compartilhar arquivos e dados em uma rede local. É uma solução conveniente para armazenar e acessar seus arquivos de qualquer dispositivo conectado à rede. **O que é um servidor de arquivos?** Um servidor de arquivos é um computador ou dispositivo que hospeda e fornece acesso a arquivos e pastas compartilhados em uma rede. Ele atua como um repositório centralizado para armazenamento de dados compartilhado. **O que é o software Samba e o protocolo SMB?** O Samba é um conjunto de programas que permite que sistemas não-Windows compartilhem arquivos e recursos com sistemas Windows usando o protocolo SMB (Server Message Block). Isso facilita o compartilhamento de arquivos entre diferentes sistemas operacionais. **Requisitos** - Raspberry Pi 3 ou superior. - Cartão de memória de 8 GB para instalar o sistema operacional ([consulte o tutorial específico](https://blog.rosnertech.com.br/arquivos/790)). - Fonte de alimentação para o Raspberry Pi. **Conectar ao Raspberry Pi** O primeiro passo é se conectar ao seu Raspberry Pi por meio de uma conexão SSH. Por padrão, o Raspberry Pi não vem com o servidor SSH habilitado, então você precisará ativá-lo por meio da interface gráfica ou usando o comando:

```bash
ssh seu_usuario@ip_raspberry_sua_rede
```

## Instalando o Samba** Vamos instalar o serviço Samba para disponibilizar os arquivos na rede. Execute o seguinte comando para instalar o Samba:

```bash
sudo apt-get install samba
```

Durante a instalação, o Samba pode solicitar uma alteração nas configurações de WINS. Por padrão, você pode responder "Não", pois é possível configurar isso manualmente posteriormente. **Configurando e compartilhando a pasta na rede** Agora, vamos configurar o compartilhamento de pasta. Abra o arquivo de configuração do Samba com o seguinte comando:

```bash
sudo nano /etc/samba/smb.conf
```

No final do arquivo, adicione as seguintes linhas:

```bash
[Lab - RosnerTech NAS]
comment = "Lab - RosnerTech NAS"
path = /mnt/storage
browseable = yes
writeable = yes
read only = no
create mask = 0777
directory mask = 0777
public = no
```

/\*! elementor - v3.16.0 - 20-09-2023 \*/<br /> .elementor-widget-image{text-align:center}.elementor-widget-image a{display:inline-block}.elementor-widget-image a img\[src$=".svg"\]{width:48px}.elementor-widget-image img{vertical-align:middle;display:inline-block} ![](https://blog.rosnertech.com.br/wp-content/uploads/2023/10/samba_01.png) Essas configurações definem uma pasta compartilhada chamada "Lab - RosnerTech NAS" localizada em \`**/mnt/storage**\`. Você pode personalizar essas configurações conforme necessário. Criando a pasta compartilhada e ajustando as permissões

```bash
sudo mkdir /mnt/storage
sudo chmod 777 /mnt/storage
```

## Ativando o serviço Samba** Para ativar o serviço Samba, execute o seguinte comando:

```bash
sudo systemctl enable smbd
```

Em seguida, verifique o status do serviço com:

```bash
sudo systemctl status smbd
```

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/10/samba_02.png) Certifique-se de que o serviço esteja em execução e funcionando corretamente. **Habilitando seu usuário para acessar a pasta compartilhada** Configure o usuário que você criou em sua instalação do Samba com o seguinte comando, substituindo \`seu\_usuario\` pelo nome do usuário desejado:

```bash
sudo smbpasswd -a seu_usuario
```

Atribua uma senha ao usuário quando solicitado. ![](https://blog.rosnertech.com.br/wp-content/uploads/2023/10/samba_03.png) Reiniciando o serviço do samba, para aplicar as novas configurações

```bash
sudo systemctl restart smbd
```

## Configurando o Cliente Windows** Agora, você pode acessar a pasta compartilhada a partir de um computador Windows. Abra o Windows Explorer e digite o seguinte na barra de endereços: **\\ip\_raspberry\_sua\_rede** A pasta compartilhada configurada no smb.conf aparecerá automaticamente. ![](https://blog.rosnertech.com.br/wp-content/uploads/2023/10/samba_04.png) **Mapeando uma unidade de rede** Clique com o botão direito na pasta compartilhada e selecione "Mapear Unidade de Rede". Siga as instruções e, quando solicitado, insira o usuário "seu\_usuario" e a senha que você atribuiu usando o comando smbpasswd. ![](https://blog.rosnertech.com.br/wp-content/uploads/2023/10/samba_05.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2023/10/samba_07.png) ![](https://blog.rosnertech.com.br/wp-content/uploads/2023/10/samba_08.png) **Pronto! Agora você tem um servidor de arquivos NAS funcional com seu Raspberry Pi, acessível a partir de computadores Windows em sua rede local. Isso facilita o compartilhamento de arquivos e o armazenamento centralizado de dados.** **Agradeço por ler esse artigo e espero vê-lo novamente em breve. Continue nos acompanhando para mais conteúdo relevante e inspirador. Até a próxima!
