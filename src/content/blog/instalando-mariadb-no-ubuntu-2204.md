---
title: "Instalando MariaDB no Ubuntu 22.04"
description: "MariaDB é um fork perfeitamente compatível do Mysql. Oferece um gerenciador de banco de dados, de código aberto, gratuito e muito estável para nossos projetos."
pubDate: 2023-03-02
updatedDate: 2023-08-13
tags: ["Ubuntu", "Linux", "MariaDB", "Mariadb"]
wpId: 533
draft: false
---

/\*! elementor - v3.14.0 - 26-06-2023 \*/ .elementor-heading-title{padding:0;margin:0;line-height:1}.elementor-widget-heading .elementor-heading-title\[class\*=elementor-size-\]>a{color:inherit;font-size:inherit;line-height:inherit}.elementor-widget-heading .elementor-heading-title.elementor-size-small{font-size:15px}.elementor-widget-heading .elementor-heading-title.elementor-size-medium{font-size:19px}.elementor-widget-heading .elementor-heading-title.elementor-size-large{font-size:29px}.elementor-widget-heading .elementor-heading-title.elementor-size-xl{font-size:39px}.elementor-widget-heading .elementor-heading-title.elementor-size-xxl{font-size:59px}

## Instalando MariaDB no Ubuntu 22.04

MariaDB é um fork perfeitamente compatível do Mysql. Oferece um gerenciador de banco de dados, de código aberto, gratuito e muito estável para nossos projetos. Apesar do seu carácter comunitário, não devemos perder de vista o facto de contar com apoio profissional. Assim, também podemos aplicá-lo em larga escala.

Atualizar o sistema

```bash
sudo apt update
sudo apt upgrade -y
```

Executar o comando abaixo para instalar o mariadb.

```bash
sudo apt install mariadb-server mariadb-client
```

/\*! elementor - v3.14.0 - 26-06-2023 \*/ .elementor-widget-image{text-align:center}.elementor-widget-image a{display:inline-block}.elementor-widget-image a img\[src$=".svg"\]{width:48px}.elementor-widget-image img{vertical-align:middle;display:inline-block} ![](https://blog.rosnertech.com.br/wp-content/uploads/2023/03/img_01.png)

Verificando a versão instalada.

```bash
mariadb --version
```

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/03/img_o2.png)

Por padrão, o MariaDB é instalado, iniciado e habilitado para iniciar junto ao sistema, caso necessite: iniciar, parar e reiniciar o MariaDB, utilizar os comandos.

```bash
sudo systemctl start mariadb
sudo systemctl stop mariadb
sudo systemctl restart mariadb
```

Verificando o status do MariaDB

```bash
sudo systemctl status mariadb
```

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/03/img_03.png)

Executar o seguinte script.

## mariadb-secure-installation** é um shell script disponível em sistemas Unix e permite melhorar a segurança da instalação do MariaDB

```bash
sudo mysql_secure_installation
```

Será perguntado se deseja alterar _**unix\_socket**_ para assim garantirmos que ninguém possa acessar o servidor como root sem permissões.

```bash
Switch to unix_socket authentication [Y/n].
Agora iremos definir a senha de root.
Change the root password? [Y/n]
Responder Y e definir a senha.
Re-enter new password: 
Password updated successfully!
Reloading privilege tables...
 ... Success!
```

Após definir a senha responder as perguntas para proteger o servidor.

```bash
Remove anonymous users? [Y/n] 
Disallow root login remotely? [Y/n]
Remove test database and access to it? [Y/n] 
Reload privilege tables now? [Y/n]
Responder Y para todas as perguntas.
All done!  If you've completed all of the above steps, your MariaDB
installation should now be secure.
Thanks for using MariaDB!
```

Pronto! MariaDB instalado e configurado com sucesso no Ubuntu 22.04

## Conclusão:

Com esse post você aprendeu a instalar o MariaDB no Ubuntu 22.04.
