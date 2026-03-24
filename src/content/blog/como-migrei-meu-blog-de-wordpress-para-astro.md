---
title: "Como migrei meu blog de WordPress para Astro — e não volto mais"
description: "Saiba como migrei 80+ posts do WordPress para o Astro com Docker, GitHub Actions e CI/CD completo. Prós, contras e tudo que aprendi no processo."
pubDate: 2026-03-25
tags: ["Astro", "WordPress", "Docker", "GitHub Actions", "DevOps"]
draft: false
---

## Introdução

Depois de quase 3 anos com WordPress + Elementor, tomei uma decisão que mudou completamente minha relação com o blog: migrar tudo para o **Astro**.

Neste post você vai ver o motivo dessa decisão, como foi o processo técnico de migração dos 80+ posts, a stack que montei e o que aprendi no caminho — incluindo os pontos negativos que ninguém costuma mencionar.

<p style="display:flex;flex-wrap:wrap;gap:6px;align-items:center;">
  <img style="display:inline" src="https://img.shields.io/badge/Astro-4.x-FF5D01?style=flat&logo=astro&logoColor=white" alt="Astro"/>
  <img style="display:inline" src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white" alt="TailwindCSS"/>
  <img style="display:inline" src="https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white" alt="Docker"/>
  <img style="display:inline" src="https://img.shields.io/badge/Nginx-009639?style=flat&logo=nginx&logoColor=white" alt="Nginx"/>
  <img style="display:inline" src="https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat&logo=githubactions&logoColor=white" alt="GitHub Actions"/>
  <img style="display:inline" src="https://img.shields.io/badge/MariaDB-003545?style=flat&logo=mariadb&logoColor=white" alt="MariaDB"/>
  <img style="display:inline" src="https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white" alt="Node.js"/>
  <img style="display:inline" src="https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white" alt="Python"/>
</p>

> ⚠️ **Nota de segurança:** todos os nomes de containers, bancos de dados, usuários e senhas mostrados neste post são **fictícios e criados exclusivamente para fins didáticos**. Em ambiente real, nunca exponha credenciais em documentação, repositórios ou posts públicos. Use sempre variáveis de ambiente e arquivos `.env` fora do controle de versão.

## Por que sair do WordPress?

O WordPress funcionou bem por um bom tempo. Mas com o passar dos meses, alguns problemas foram ficando cada vez mais evidentes:

**Performance ruim com Elementor**

O Elementor é prático para quem não quer escrever código, mas o preço é alto: páginas pesadas, muito JavaScript desnecessário e um Lighthouse score que envergonhava. Para um blog técnico onde a credibilidade importa, isso incomodava.

**Manutenção constante**

Atualização de plugins, vulnerabilidades, compatibilidade quebrada após update — a rotina de manutenção do WordPress consumia tempo que poderia ir para criação de conteúdo.

**Banco de dados para conteúdo estático**

Um blog que raramente muda não precisa de um banco de dados sendo consultado a cada acesso. Isso é desperdício de recurso e um ponto de falha desnecessário.

**Zero controle sobre o código**

O HTML gerado pelo Elementor é uma bagunça. Difícil de debugar, difícil de versionar, impossível de tratar como código de verdade.

## Por que o Astro?

Depois de avaliar Hugo, Jekyll e Next.js, o Astro ganhou por alguns motivos práticos:

**Geração estática nativa**

O Astro transforma todo o conteúdo em HTML puro no momento do build. Zero processamento no servidor, zero banco de dados — só arquivos estáticos servidos pelo Nginx.

**Markdown nativo para posts**

Cada post é um arquivo `.md` com frontmatter YAML. Escrever um post virou o mesmo fluxo que escrever código: editor, commit, push.

**Integração perfeita com o workflow DevOps**

O blog passou a ser tratado como qualquer outra aplicação: versionado no GitHub, deployado via CI/CD, containerizado com Docker.

**Syntax highlighting com Shiki**

Blocos de código renderizados com tema `github-dark` — essencial para um blog técnico.

## A stack final

Após a migração, o blog roda com a seguinte stack:

```
Astro 4 + Tailwind CSS + Shiki
Docker multi-stage build (node:20-alpine → nginx:alpine)
Nginx Proxy Manager como reverse proxy
GitHub Actions para CI/CD
Remark42 para comentários self-hosted
Cloudflare para CDN e SSL wildcard
SMTP para notificações de e-mail
```

A imagem Docker final ficou com cerca de **20MB** — contra os centenas de MB que um container WordPress com PHP ocupa.

## O processo de migração

### Exportando os posts do WordPress

O WordPress utilizava MariaDB. Para a exportação, criei um script Node.js que conecta direto no banco e exporta cada post como um arquivo `.md`.

> 💡 **Boa prática:** nunca coloque credenciais de banco de dados diretamente no código. Use variáveis de ambiente carregadas via arquivo `.env` que **não** é versionado no Git. No exemplo abaixo, todos os valores são fictícios.

```javascript
import mysql from 'mysql2/promise';
import Turndown from 'turndown';
import 'dotenv/config';

// ✅ credenciais carregadas via .env — nunca hardcoded no código
const conn = await mysql.createConnection({
  host:     process.env.DB_HOST,      // nome do container do banco
  port:     process.env.DB_PORT,      // porta padrão: 3306
  database: process.env.DB_NAME,      // nome do banco de dados
  user:     process.env.DB_USER,      // usuário do banco
  password: process.env.DB_PASSWORD,  // senha do banco
});

const td = new Turndown({ headingStyle: 'atx', codeBlockStyle: 'fenced' });

const [posts] = await conn.execute(`
  SELECT ID, post_title, post_content, post_excerpt, post_date
  FROM wp_posts
  WHERE post_status = 'publish'
    AND post_type   = 'post'
  ORDER BY post_date DESC
`);

for (const post of posts) {
  const slug   = post.post_title.toLowerCase().replace(/\s+/g, '-');
  const body   = td.turndown(post.post_content);
  const output = `---\ntitle: "${post.post_title}"\npubDate: ${post.post_date}\n---\n\n${body}`;

  fs.writeFileSync(`src/content/blog/${slug}.md`, output);
  console.log(`✅ Exportado: ${slug}.md`);
}
```

O arquivo `.env` correspondente — **adicionado ao `.gitignore`**:

```env
# .env — NÃO versionar este arquivo!
DB_HOST=nome-do-container-db
DB_PORT=3306
DB_NAME=nome-do-banco
DB_USER=usuario-do-banco
DB_PASSWORD=senha-forte-aqui
```

### Executando na rede Docker

Como o banco de dados roda em container em rede interna, o script precisa ser executado dentro da mesma rede:

```bash
# container temporário na mesma rede do banco
docker run --rm \
  --network nome-da-rede-interna \
  --env-file .env \
  -v "$(pwd)":/app \
  -w /app \
  node:20-alpine \
  sh -c "npm install && node export-wp.js"
```

> 💡 Use `docker network ls` para listar as redes disponíveis e identificar a rede correta do seu ambiente.

### Limpeza do conteúdo

O Elementor deixava blocos de CSS inline nos posts — código como `/*! elementor - v3.x.x */` aparecia misturado com o conteúdo. Foi necessário um script Python para limpar todos os 80 arquivos exportados:

```python
import os
import re

blog_dir = 'src/content/blog'

for filename in os.listdir(blog_dir):
    if not filename.endswith('.md'):
        continue

    filepath = os.path.join(blog_dir, filename)

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    before = len(content)

    # remover blocos de CSS do Elementor
    content = re.sub(r'/\*!?\s*elementor[\s\S]*?\*\/', '', content)

    # remover linhas com seletores CSS soltos
    content = re.sub(r'^.*\.elementor[^\n]*$', '', content, flags=re.MULTILINE)

    # remover linhas vazias excessivas
    content = re.sub(r'\n{3,}', '\n\n', content)

    if len(content) != before:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Limpo: {filename}')

print('Concluído!')
```

### Redirecionamentos 301

Para preservar o SEO, todos os posts antigos precisavam redirecionar do formato `/arquivos/ID` para o novo `/blog/slug`. O script de exportação gerou automaticamente o arquivo de configuração do Nginx:

```nginx
# redirects.conf — cole dentro do bloco server{} do nginx.conf
location = /arquivos/100 { return 301 /blog/titulo-do-post; }
location = /arquivos/101 { return 301 /blog/outro-post; }
# ... um location para cada post migrado
```

### Imagens do WordPress

As imagens dos posts antigos ficam no volume `wp-content/uploads/`. A solução foi criar um container Nginx separado que serve esse diretório como conteúdo estático — sem precisar mover nenhuma imagem:

```yaml
# docker-compose.prod.yml (trecho simplificado)
services:

  blog:
    build: .
    container_name: meu-blog
    expose:
      - "80"
    networks:
      - rede-interna

  # serve as imagens antigas do WordPress (somente leitura)
  wp-media:
    image: nginx:alpine
    container_name: wp-media
    volumes:
      - /caminho/do/wp-content:/usr/share/nginx/html/wp-content:ro
    expose:
      - "80"
    networks:
      - rede-interna

networks:
  rede-interna:
    external: true
```

> 💡 O sufixo `:ro` no volume garante acesso somente leitura — boa prática para containers que servem conteúdo estático.

## O CI/CD

O fluxo de publicação após a migração ficou assim:

```bash
# criar o post
nano src/content/blog/novo-post.md

# commitar na branch develop
git checkout develop
git add src/content/blog/novo-post.md
git commit -m "post: título do post"
git push origin develop

# criar PR e fazer merge via GitHub CLI
gh pr create --base main --head develop --title "post: título do post"
gh pr merge --merge --delete-branch=false

# GitHub Actions faz o deploy automaticamente em ~2 minutos
```

O GitHub Actions conecta na VPS via SSH usando um **usuário dedicado para deploy** com permissões mínimas — sem usar root ou usuário pessoal. Isso segue o princípio do menor privilégio:

```yaml
# .github/workflows/deploy.yml (trecho)
- name: Deploy na VPS
  uses: appleboy/ssh-action@v1.0.3
  with:
    host:     ${{ secrets.VPS_HOST }}     # IP da VPS — secret do GitHub
    username: ${{ secrets.VPS_USER }}     # usuário dedicado, não root
    key:      ${{ secrets.VPS_SSH_KEY }}  # chave SSH privada — secret do GitHub
    port:     ${{ secrets.VPS_PORT }}     # porta SSH customizada
    script: |
      cd /caminho/do/projeto
      git pull origin main
      docker compose -f docker-compose.prod.yml up --build -d
      docker image prune -f
```

> 💡 Todas as informações sensíveis ficam nos **Secrets** do repositório GitHub — criptografados e nunca visíveis nos logs. Nunca coloque IPs, usuários ou senhas diretamente no arquivo `.yml`.

## Sistema de comentários

Para substituir os comentários do WordPress, instalei o **Remark42** — um sistema open source e self-hosted que roda num container Docker:

```yaml
# docker-compose.prod.yml (trecho do Remark42)
remark42:
  image: umputun/remark42:latest
  container_name: remark42
  environment:
    - REMARK_URL=https://comments.seudominio.com.br
    - SITE=meu-site
    - SECRET=${REMARK_SECRET}           # carregado do .env
    - AUTH_GOOGLE_CID=${GOOGLE_CID}     # carregado do .env
    - AUTH_GOOGLE_CSEC=${GOOGLE_CSEC}   # carregado do .env
    - SMTP_HOST=${SMTP_HOST}            # carregado do .env
    - SMTP_PASSWORD=${SMTP_PASSWORD}    # carregado do .env
  volumes:
    - remark42_data:/srv/var
```

Configurei autenticação via Google OAuth e notificação por e-mail quando um novo comentário chega. Todo comentário fica pendente até aprovação manual — eliminando spam sem precisar de captcha.

## Prós e contras honestos

### O que melhorou

**Performance:** O Lighthouse foi de vergonhoso para consistentemente alto. Zero JavaScript desnecessário.

**Controle total:** O blog é código. Versionado, revisável, deployável como qualquer outra aplicação.

**Custo:** A imagem Docker de ~20MB consome muito menos recurso que um stack LAMP completo.

**Workflow DevOps:** Escrever um post é igual a criar qualquer outro arquivo no projeto. Git, commit, PR — o mesmo fluxo já conhecido.

**Segurança:** Sem PHP exposto, sem banco de dados acessível, sem plugins desatualizados. A superfície de ataque é mínima.

### O que ficou mais difícil

**Sem editor visual:** Tudo em Markdown e frontmatter YAML. Para quem não tem familiaridade com texto puro, pode ser uma barreira.

**Conhecimento técnico necessário:** Configurar Docker, GitHub Actions, Nginx e CI/CD exige conhecimento que nem todo criador de conteúdo tem.

**Comentários e busca:** Precisam de soluções externas. No WordPress isso vem integrado.

**Curva de aprendizado inicial:** O Astro tem suas particularidades — `is:inline` para scripts, coleções de conteúdo, SSG vs SSR — que levam um tempo para absorver.

## Vale a pena migrar?

Depende do perfil. Para quem trabalha com infraestrutura e DevOps, como é o meu caso, tratar o blog como código faz muito mais sentido do que depender de um painel de administração. O ganho de performance, controle e alinhamento com o workflow já existente justifica o esforço.

Para criadores de conteúdo sem background técnico, o WordPress ainda é a escolha mais prática.

## Conclusão

A migração levou mais tempo do que o esperado — principalmente pela limpeza dos 80 posts e configuração do CI/CD — mas o resultado valeu cada hora investida.

Se você trabalha com infraestrutura e está pensando em fazer o mesmo, o código do blog está disponível no GitHub. Deixe suas dúvidas nos comentários!

---

*Ferramentas utilizadas: Node.js · mysql2 · Turndown · Python · Astro 4 · Docker · GitHub Actions · Nginx Proxy Manager · Remark42 · Cloudflare*
