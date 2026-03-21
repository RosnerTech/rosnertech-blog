---
title: "Como Resolver Falta de Espaço no Diretório Raiz (/)"
description: "LVM (Logical Volume Manager) é uma ferramenta que gerencia o espaço em disco no sistema operacional Linux. Ele é também conhecido como Gerenciamento de Volume Lógico"
pubDate: 2025-03-28
updatedDate: 2025-03-31
tags: ["Ubuntu", "Linux"]
wpId: 1879
draft: false
---

## Como Resolver Falta de Espaço no Diretório Raiz (/)

Se o seu sistema operacional está apresentando problemas de armazenamento no diretório raiz (/), você pode expandir o volume lógico (LV) usando o LVM (Logical Volume Manager). Siga este guia passo a passo para resolver essa situação de forma segura e eficiente.

## Verificar o Espaço em Disco Atual  
##   
Antes de realizar qualquer alteração, é importante conferir o espaço atual do seu sistema de arquivos raiz.  
Execute o comando abaixo:

```bash
df -h /
```

Saída esperada (exemplo):

```bash
Filesystem                        Size  Used Avail Use% Mounted on  
/dev/mapper/ubuntu--vg-ubuntu--lv  98G   91G  2.8G   98% /
```

![](https://blog.rosnertech.com.br/wp-content/uploads/2025/03/linux_01.png)

print do Servidor Ubuntu

Se o uso está próximo de 100%, você precisa expandir o volume lógico.

## Identificar o Grupo de Volumes (VG) e o Volume Lógico (LV)

Liste os grupos de volumes existentes:

```bash
sudo vgs
```

Saída esperada (exemplo):

```bash
VG         #PV #LV #SN Attr   VSize   VFree  
ubuntu-vg   1   1   0  wz--n- 100.00g 2.00g  
```

![](https://blog.rosnertech.com.br/wp-content/uploads/2025/03/linux_02-1.png)

Armazenamento livre

Se **VFree** for maior que 0, você pode expandir o volume lógico diretamente. Caso contrário, pule para o **Passo Extra** para adicionar mais espaço ao grupo de volumes.

## Expandir o Volume Lógico (LV)  
  
## Se houver espaço livre no VG, expanda o LV com o comando:

```bash
sudo lvextend -l +100%FREE /dev/mapper/ubuntu--vg-ubuntu--lv
```

## Saída esperada:

```bash
Size of logical volume ubuntu-vg/ubuntu-lv changed from 98.00 GiB to 100.00 GiB.  
Logical volume ubuntu-vg/ubuntu-lv successfully resized. 
```

![](https://blog.rosnertech.com.br/wp-content/uploads/2025/03/linux_03-1.png)

Agora você precisa redimensionar o sistema de arquivos para reconhecer o novo espaço disponível.

## Redimensionar o Sistema de Arquivos  
##   
Verifique qual é o tipo do sistema de arquivos:

```bash
lsblk -f /dev/mapper/ubuntu--vg-ubuntu--lv
```

## Execute o comando apropriado:

Se o sistema de arquivos for EXT4:

```bash
sudo resize2fs /dev/mapper/ubuntu--vg-ubuntu--lv
```

## Se for XFS:

```bash
sudo xfs_growfs /
```

Confirme o novo espaço disponível:

```bash
df -h /
```

## Saída esperada:

```bash
Filesystem                        Size  Used Avail Use% Mounted on  
/dev/mapper/ubuntu--vg-ubuntu--lv 100G   91G  9.8G   91% /
```

![](https://blog.rosnertech.com.br/wp-content/uploads/2025/03/linux_05.png)

## Passo Extra (Caso Não Haja Espaço Livre no VG): Adicionar um Novo Disco

Se o grupo de volumes não possui espaço livre, siga estas etapas para adicionar um novo disco físico.  
Adicione um novo disco ao servidor (exemplo: `/dev/sdb`).  
Crie uma partição LVM no novo disco:

```bash
sudo fdisk /dev/sdb
```

## Dentro do fdisk:

Pressione **n** para criar uma nova partição.  
Escolha o tipo **8e** (Linux LVM).  
Salve com **w**.

## Validar e Testar

Reinicie o servidor (opcional):

```bash
sudo reboot
```

Confirme se o espaço foi expandido corretamente:

```bash
df -h /
```

![](https://blog.rosnertech.com.br/wp-content/uploads/2025/03/linux_05.png)

## Por Que Isso Funciona?**  
  
O **LVM** permite redimensionar volumes dinamicamente sem a necessidade de reiniciar o servidor.  
Você pode expandir o armazenamento aproveitando o espaço livre ou adicionando novos discos ao grupo de volumes.

## ⚠️ Atenção Crítica

Backup**: Sempre faça backup dos seus dados antes de modificar partições.  
## Ambientes Virtuais**: Se estiver usando VMware, AWS ou outro ambiente virtual, expanda o disco virtual antes de seguir os passos.

## Exemplo de Resolução de Problemas**  
## Erro comum: _resize2fs: Bad magic number in super-block while trying to open...  
  
_****Causa**: O sistema de arquivos não é EXT4 (provavelmente XFS).  
## Solução**: Use `xfs_growfs /` em vez de `resize2fs`.

## Conclusão:  
  
## Seguindo este passo a passo, você conseguiu expandir o espaço do diretório raiz de forma segura e eficiente utilizando LVM. Esse método permite um gerenciamento flexível do armazenamento, evitando interrupções no sistema e melhorando a escalabilidade.  
  
Caso encontre dificuldades ou precise de mais suporte, fique à vontade para compartilhar sua experiência. Manter um bom controle do espaço em disco é essencial para garantir a estabilidade e o desempenho do seu ambiente.  
  
## Obrigado por acompanhar este guia! 🚀**  
 **Até a próxima!
