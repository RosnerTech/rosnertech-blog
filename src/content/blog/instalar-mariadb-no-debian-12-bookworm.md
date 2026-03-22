---
title: "Instalar MariaDB no Debian 12 Bookworm"
description: "O MariaDB é um sistema de gerenciamento de banco de dados (SGBD) de código aberto que oferece uma alternativa ao MySQL. Ele é usado para armazenar, gerenciar e recuperar dados em aplicativos web e emp"
pubDate: 2023-09-11
updatedDate: 2023-09-23
tags: ["Debian", "MariaDB", "Mariadb"]
wpId: 856
draft: false
---

## Instalar MariaDB no Debian 12

O MariaDB é um sistema de gerenciamento de banco de dados relacional de código aberto amplamente utilizado. Ele é uma substituição direta para o MySQL, conhecido por sua confiabilidade e desempenho. O MariaDB é usado para armazenar, gerenciar e recuperar dados em aplicativos e sites, oferecendo recursos avançados de manipulação de bancos de dados relacionais. É uma escolha popular entre desenvolvedores e empresas devido à sua escalabilidade e comunidade ativa de desenvolvedores.

## Atualização do sistema.

```bash
sudo apt update
sudo apt upgrade
```

## Instale o MariaDB no Debian 12.

Depois que o sistema estiver atualizado, você pode prosseguir com a instalação do MariaDB. A versão 10 do MariaDB está disponível para instalação no repositório padrão do Debian 12. Para verificar isso, use o seguinte comando:

```bash
sudo apt show mariadb-server
```

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/09/mariadb_02.png)

Como podemos ver, o MariaDB 10 está disponível no repositório do Debian 12. Portanto, insira o seguinte comando no terminal para iniciar o processo de instalação.

```bash
sudo apt install mariadb-server -y
```

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/09/mariadb_03.png)

Durante a instalação, você será solicitado a inserir a senha do seu usuário. Forneça as informações necessárias e a instalação do MariaDB continuará no seu sistema.

## Proteja a Instalação do MariaDB.**  
Após a conclusão da instalação, é importante proteger a sua instalação do MariaDB. Para aumentar a segurança da sua instalação do MariaDB, o script de segurança padrão está incluído no MariaDB. O comando a seguir executará um script que realiza algumas medidas de segurança.

```bash
sudo mysql-secure-installation
```

Ao executar o script acima, você será conduzido por uma série de prompts interativos projetados para fortalecer a segurança da sua instalação do MariaDB. Esses prompts incluem:

\- Definir uma senha para o usuário root: Você terá a oportunidade de definir uma senha para a conta root, fornecendo uma camada adicional de proteção.  
\- Remover usuários anônimos: O script ajudará você a remover contas de usuário anônimas, garantindo que apenas usuários autenticados possam acessar os bancos de dados.  
\- Desativar login remoto do usuário root: Você será solicitado a desativar o login remoto do usuário root, impedindo o acesso não autorizado de fontes externas.  
\- Remover o banco de dados de teste: O script ajuda a remover o banco de dados de teste, que geralmente é acessível por usuários anônimos. Essa ação elimina quaisquer vulnerabilidades de segurança potenciais associadas ao banco de dados de teste.  
\- Recarregar as tabelas de privilégios: Depois que as medidas de segurança necessárias são implementadas, o script recarrega as tabelas de privilégios para aplicar as alterações de forma eficaz.

Durante todo o processo, siga cuidadosamente os prompts apresentados pelo script e forneça as respostas apropriadas para aumentar a segurança da sua instalação do MariaDB.

Verifique a instalação do MariaDB  
Após a conclusão da instalação do MariaDB, o serviço do MariaDB é iniciado automaticamente no seu sistema. Você pode verificar o status em execução do serviço MariaDB com o seguinte comando:

```bash
sudo systemctl status mariadb
```

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/09/mariadb_05.png)

## Acessando o MariaDB**  
Com a instalação e a configuração de segurança concluídas, você pode agora acessar o MariaDB. Use o seguinte comando para acessar o prompt do MariaDB:

```bash
sudo mariadb
```

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/09/mariadb_06.png)

Você será recebido com o prompt do MariaDB.  
Exibir a versão do MariaDB  
Para verificar se o MariaDB está instalado corretamente e funcionando no seu sistema, você pode executar um comando simples dentro do prompt do MariaDB. Execute o seguinte comando:

```bash
SELECT version();
```

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/09/mariadb_07.png)

Se o MariaDB estiver instalado corretamente, você verá o número da versão exibido na saída.

## Comandos para Gerenciar o serviço MariaDB  

## Iniciar o Serviço.

```bash
systemctl start mariadb
```

## Verificar o status do Serviço.

```bash
systemctl status mariadb
```

## Reiniciar o Serviço.

```bash
systemctl restart mariadb
```

## Desinstale o MariaDB do Debian 12.

Para remover os bancos de dados e a configuração do MariaDB, digite o seguinte comando.

```bash
sudo apt purge mariadb-server
```

![](https://blog.rosnertech.com.br/wp-content/uploads/2023/09/mariadb_08.png)

Você desinstalou o MariaDB conforme necessário.

Para ver como o MariaDB funciona, você pode visitar a documentação no site oficial da plataforma.

## Neste post, forneci um guia passo a passo sobre como realizar uma instalação do MariaDB no Debian 12 Bookworm. Com essas instruções, você agora tem um servidor de banco de dados instalado.

Agradeço por ler esse artigo e espero vê-lo novamente em breve. Continue nos acompanhando para mais conteúdo relevante e inspirador. Até a próxima!
