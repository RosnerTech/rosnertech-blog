---
title: "Automatizando a Reestruturação do File Server e Active Directory com PowerShell"
description: "Descubra como automatizar a reestruturação do seu File Server e Active Directory com PowerShell! Este guia prático apresenta scripts poderosos que facilitam a gestão de usuários, grupos e permissões, "
pubDate: 2025-08-07
updatedDate: 2025-08-07
tags: ["Windows", "Server 2025", "Active Directory", "File Server"]
wpId: 2093
draft: false
---

## Automatizando a Reestruturação do File Server e Active Directory com PowerShell

Antes de começar, certifique-se de que:

Você está executando os comandos no PowerShell com **permissões de administrador**.  
O módulo `ActiveDirectory` está instalado no servidor (para comandos relacionados ao AD).  
Você tem acesso ao servidor de arquivos (File Server).  
Diretório padrão para relatórios: `D:DADOS`

## Estrutura dos Scripts  
## Todos os scripts estão disponíveis publicamente no GitHub:

 [github.com/rosnertech/powershell-ad-fileserver-tools](https://github.com/rosnertech/powershell-ad-fileserver-tools)

## Scripts Disponíveis  
****Listar usuários do AD com status (ativo/inativo)

Script:** `Get-ADUsersStatus.ps1`

Este script gera um relatório com todos os usuários do Active Directory, informando se estão ativos ou inativos.  
Saída:  
`UsuariosAtivos.txt   ``UsuariosAtivos.csv`

📌 Útil para auditorias e gestão de contas obsoletas.

## Listar grupos e seus membros

Script:** `Get-ADGroupsAndMembers.ps1`

Gera um relatório de todos os grupos existentes no AD e lista os respectivos membros de cada grupo.  
 Saída:  
`UsuariosPorGrupo.txt   ``UsuariosPorGrupo.csv`

📌 Ideal para entender a estrutura de permissões baseadas em grupo.

## Listar permissões de pastas no nível principal

Script:** `Get-FolderPermissions.ps1`

Audita as permissões (ACLs) das pastas diretamente no diretório base (`D:DADOS`, por padrão).  
Saída:  
`PermissoesPastas.txt   ``PermissoesPastas.csv`

## Listar permissões de todas as subpastas

Script:** `Get-AllFolderPermissions.ps1`

Faz a mesma auditoria do script anterior, mas incluindo todas as subpastas de forma recursiva.  
Saída:  
`PermissoesPastas.txt   ``PermissoesPastas.csv`

📌 Recomendado para estruturas complexas com vários níveis de pastas.

## Sincronizar permissões com base na pasta raiz

Script:** `Sync-FolderPermissions.ps1`

Este script faz algo poderoso:  
Gera um relatório **antes** da alteração.  
Sincroniza as permissões de todas as subpastas com a mesma ACL da pasta raiz.  
Garante que "Administradores" sempre tenham acesso total.  
Gera outro relatório **após** a alteração para comparação.  
 Saída:  
`Relatorio_Permissoes_ANTES_*.txt` / `.csv   ``Relatorio_Permissoes_DEPOIS_*.txt` / `.csv`

📌 Ideal para normalizar permissões bagunçadas sem precisar redefinir manualmente.

## Como utilizar os scripts

Faça o download dos scripts pelo GitHub.  
Copie todos os arquivos para o servidor.  
Execute os scripts desejados no PowerShell como administrador:

```bash
.Get-ADUsersStatus.ps1
.Get-ADGroupsAndMembers.ps1
.Get-AllFolderPermissions.ps1
.Sync-FolderPermissions.ps1
```

 **Lembre-se de ajustar o caminho `D:DADOS` nos scripts, caso seu ambiente utilize outro local.

Benefícios da automação com PowerShell

Economia de tempo  
Redução de erros manuais  
Geração de relatórios confiáveis  
Reutilização em outros projetos/clientes

#### **📎 Conclusão

Com esses scripts, você consegue automatizar grande parte da administração do File Server e do Active Directory. Seja para reestruturações completas, auditorias recorrentes ou simples verificações de acesso, essa abordagem facilita a vida do administrador e melhora a governança de TI.

Se você gostou desse conteúdo ou aplicou algo no seu ambiente, compartilhe comigo nos comentários ou nas redes 👇

#### **🔗 Recursos

🔗 [GitHub - Scripts PowerShell](https://github.com/rosnertech/powershell-ad-fileserver-tools)  
📘 [Outros posts no blog](https://blog.rosnertech.com.br)  
💼 [LinkedIn - Rosner Pelaes](https://br.linkedin.com/in/rosner-pelaes-nascimento)  
📺 [YouTube - Rosner Tech](https://www.youtube.com/channel/UCik9XQ-ymobqhDOa9_aye-g)
