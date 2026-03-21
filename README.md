<div align="center">

<svg width="280" height="56" viewBox="0 0 220 44" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gw" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#52b788"/>
      <stop offset="100%" stop-color="#74c69d"/>
    </linearGradient>
  </defs>
  <polygon points="20,4 34,4 42,18 34,32 20,32 12,18" fill="#0e1f16" stroke="#52b788" stroke-width="1.5"/>
  <line x1="20" y1="4" x2="34" y2="4" stroke="#74c69d" stroke-width="2.2" stroke-linecap="round"/>
  <text x="19" y="22" font-family="JetBrains Mono,monospace" font-size="9" font-weight="700" fill="#52b788">$_</text>
  <text x="52" y="22" font-family="JetBrains Mono,monospace" font-size="18" font-weight="700" fill="url(#gw)">RosnerTech</text>
  <text font-family="JetBrains Mono,monospace" font-size="7.5" y="34">
    <tspan x="53" fill="#ffffff" opacity="0.85">Infra</tspan>
    <tspan fill="#52b788" opacity="0.5"> | </tspan>
    <tspan fill="#ffffff" opacity="0.85">DevOps</tspan>
    <tspan fill="#52b788" opacity="0.5"> | </tspan>
    <tspan fill="#ffffff" opacity="0.85">Automação</tspan>
  </text>
</svg>

# RosnerTech Blog

**Blog técnico sobre Infraestrutura, DevOps e Automação de Redes**

[![Deploy](https://github.com/RosnerTech/rosnertech-blog/actions/workflows/deploy.yml/badge.svg)](https://github.com/RosnerTech/rosnertech-blog/actions/workflows/deploy.yml)
[![Astro](https://img.shields.io/badge/Astro-4.x-FF5D01?style=flat&logo=astro&logoColor=white)](https://astro.build)
[![Docker](https://img.shields.io/badge/Docker-ready-2496ED?style=flat&logo=docker&logoColor=white)](https://www.docker.com)
[![License](https://img.shields.io/badge/License-MIT-52b788?style=flat)](LICENSE)

[![Astro](https://img.shields.io/badge/Astro-FF5D01?style=flat-square&logo=astro&logoColor=white)](#)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](#)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)](#)
[![Nginx](https://img.shields.io/badge/Nginx-009639?style=flat-square&logo=nginx&logoColor=white)](#)
[![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat-square&logo=githubactions&logoColor=white)](#)
[![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white)](#)
[![Linux](https://img.shields.io/badge/Linux-FCC624?style=flat-square&logo=linux&logoColor=black)](#)
[![Proxmox](https://img.shields.io/badge/Proxmox-E57000?style=flat-square&logo=proxmox&logoColor=white)](#)
[![Cisco](https://img.shields.io/badge/Cisco-1BA0D7?style=flat-square&logo=cisco&logoColor=white)](#)
[![Zabbix](https://img.shields.io/badge/Zabbix-CC0000?style=flat-square&logo=zabbix&logoColor=white)](#)

🌐 **[blog.rosnertech.com.br](https://blog.rosnertech.com.br)**

</div>

---

## 👤 Autor

<table>
  <tr>
    <td align="center">
      <img src="https://github.com/RosnerTech.png" width="100px" style="border-radius:50%"/><br/>
      <strong>Rosner Nascimento</strong><br/>
      <sub>RosnerTech</sub><br/>
      <sub>System Engineer | DevOps | Network Automation</sub><br/><br/>
      <a href="https://github.com/RosnerTech">
        <img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white"/>
      </a>
      <a href="https://linkedin.com/in/rosner-pelaes-nascimento">
        <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white"/>
      </a>
      <a href="https://youtube.com/@rosnertech">
        <img src="https://img.shields.io/badge/YouTube-FF0000?style=flat-square&logo=youtube&logoColor=white"/>
      </a>
      <a href="mailto:rosner@rosnertech.com.br">
        <img src="https://img.shields.io/badge/Email-52b788?style=flat-square&logo=gmail&logoColor=white"/>
      </a>
    </td>
  </tr>
</table>

---

## 🚀 Stack

| Camada | Tecnologia |
|--------|-----------|
| Framework | [Astro 4.x](https://astro.build) |
| CSS | [Tailwind CSS 3.x](https://tailwindcss.com) |
| Syntax Highlight | [Shiki](https://shiki.style) (tema github-dark) |
| Comentários | [Remark42](https://remark42.com) (self-hosted) |
| Server | [Nginx](https://nginx.org) (Alpine) |
| Container | [Docker](https://docker.com) + Docker Compose |
| Proxy | [Nginx Proxy Manager](https://nginxproxymanager.com) |
| CI/CD | [GitHub Actions](https://github.com/features/actions) |
| VPS | Linux + Docker |

---

## 📁 Estrutura

```
rosnertech-blog/
├── .github/
│   └── workflows/
│       └── deploy.yml          # CI/CD pipeline
├── src/
│   ├── components/
│   │   ├── Logo.astro          # Logo SVG animado
│   │   └── CookieBanner.astro  # Banner LGPD
│   ├── layouts/
│   │   ├── Base.astro          # Layout base (nav + footer)
│   │   └── Post.astro          # Layout de post (TOC + sidebar)
│   ├── pages/
│   │   ├── index.astro         # Home
│   │   ├── sobre.astro         # Sobre o autor
│   │   ├── privacidade.astro   # Política de privacidade
│   │   ├── lgpd.astro          # LGPD
│   │   └── blog/
│   │       ├── index.astro     # Listagem de posts
│   │       └── [slug].astro    # Post individual
│   ├── content/
│   │   ├── config.ts           # Schema da coleção
│   │   └── blog/               # Posts em Markdown (.md)
│   └── styles/
│       └── prose.css           # CSS do conteúdo dos posts
├── public/
│   ├── favicon.svg
│   └── foto-perfil.jpg
├── Dockerfile                  # Multi-stage build
├── docker-compose.yml          # Dev local
├── docker-compose.prod.yml     # Produção VPS
├── nginx.conf                  # Config Nginx
├── astro.config.mjs
└── tailwind.config.mjs
```

---

## 🛠️ Desenvolvimento local

### Pré-requisitos

- Docker e Docker Compose instalados
- Git

### Subir em dev

```bash
# clonar o repositório
git clone git@github.com:RosnerTech/rosnertech-blog.git
cd rosnertech-blog

# subir em modo desenvolvimento (hot-reload)
docker compose up --build -d

# acompanhar logs
docker compose logs -f

# acessar
open http://localhost:4321
```

### Criar um novo post

```bash
# criar arquivo na pasta de conteúdo
cat > src/content/blog/meu-novo-post.md << 'EOF'
---
title: "Título do Post"
description: "Descrição breve do post."
pubDate: 2026-03-20
tags: ["Docker", "Linux"]
draft: false
---

Conteúdo do post em Markdown...
EOF

# commitar na develop
git checkout develop
git add .
git commit -m "post: título do post"
git push
```

### Publicar (deploy)

```bash
# criar PR: develop → main no GitHub
# após merge, o GitHub Actions faz o deploy automaticamente

# ou deploy manual via GitHub Actions:
# Actions → Deploy RosnerTech Blog → Run workflow
```

---

## 🔄 Fluxo de CI/CD

```
develop branch
     │
     │  git push
     ▼
GitHub (PR develop → main)
     │
     │  merge aprovado
     ▼
GitHub Actions
     ├── SSH na VPS (porta 2222)
     ├── git pull origin main
     ├── docker compose down
     ├── docker compose up --build -d
     └── docker image prune -f
     │
     ▼
blog.rosnertech.com.br ✅
```

---

## ⚙️ Secrets necessários no GitHub

| Secret | Descrição |
|--------|-----------|
| `VPS_HOST` | IP da VPS |
| `VPS_USER` | `githubactions` |
| `VPS_SSH_KEY` | Chave SSH privada (ed25519) |
| `VPS_PORT` | `2222` |

---

## 📦 Deploy em produção

```bash
# na VPS — primeira vez
cd /opt/docker/blog-rosnertech
docker compose -f docker-compose.prod.yml up -d
```

---

## 📄 Licença

MIT © [Rosner Nascimento](https://blog.rosnertech.com.br) — RosnerTech

---

<div align="center">
  <sub>feito com ♥ usando <a href="https://astro.build">Astro</a></sub>
</div>
