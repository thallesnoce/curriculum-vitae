# Guia de Conhecimentos por Fase de Carreira em TI

Este documento serve como um guia para estudantes e profissionais de TI entenderem quais habilidades e conhecimentos são geralmente esperados em cada fase da carreira de desenvolvimento de software.

## 1. Estágio (Intern)
O foco principal nesta fase é o aprendizado, a capacidade de absorver conhecimento e entender a base do desenvolvimento de software.

**Conhecimentos Esperados:**
*   **Lógica de Programação:** Entendimento sólido de algoritmos, estruturas de controle (if, for, while) e estruturas de dados básicas (listas, dicionários/mapas).
*   **Git (Básico):** Saber o que é controle de versão. Comandos fundamentais: `clone`, `add`, `commit`, `push`, `pull`.
*   **Banco de Dados (Básico):** Entender a diferença entre dados estruturados e não estruturados.
    *   **SQL:** Comandos CRUD básicos (SELECT, INSERT, UPDATE, DELETE).
*   **Web/APIs:** Entendimento conceitual do que é uma requisição HTTP, verbos básicos (GET, POST) e o que é uma API REST.
*   **Soft Skills:** Vontade de aprender, saber fazer perguntas, proatividade e boa comunicação.

## 2. Júnior
O desenvolvedor Júnior consegue entregar tarefas bem definidas com alguma supervisão, focando em escrever código que funcione.

**Conhecimentos Esperados:**
*   **Git (Intermediário):** Criação e gerenciamento de branches, criação de Pull Requests (PRs), resolução de conflitos simples e entendimento do Git Flow básico.
*   **Paradigma de Programação:** Domínio de Orientação a Objetos (Classes, Herança, Polimorfismo, Interfaces) ou Programação Funcional, dependendo da linguagem.
*   **Boas Práticas e Código Limpo:**
    *   **SOLID (Introdução):** Entender e começar a aplicar os princípios, especialmente o SRP (Princípio da Responsabilidade Única).
    *   Nomes significativos para variáveis e funções.
*   **Bancos de Dados & Mapeamento:**
    *   **SQL (Intermediário):** Joins, subqueries, chaves primárias e estrangeiras.
    *   **ORM (Object-Relational Mapping):** Entender como mapear objetos para tabelas (ex: Entity Framework, Hibernate, Prisma). Operações CRUD via ORM.
    *   **NoSQL (Básico):** Conhecer bancos orientados a documentos (ex: MongoDB) e quando usá-los.
*   **DevOps e Infraestrutura (Noções):** Entender o que é CI/CD (o motivo de existir automação de testes e deploy). Saber rodar uma aplicação em um container já configurado (usar comandos básicos do Docker).
*   **Testes:** Capacidade de escrever testes unitários básicos.

## 3. Pleno (Mid-level)
O Pleno é um profissional autônomo. Ele não apenas escreve código que funciona, mas código manutenível. Começa a tomar decisões de design de software e guia os mais juniores.

**Conhecimentos Esperados:**
*   **Arquitetura e Design:**
    *   **SOLID (Avançado):** Domínio de todos os 5 princípios e aplicação constante no dia a dia.
    *   **Design Patterns:** Conhecimento de padrões comuns (Factory, Singleton, Strategy, Observer, Repository).
*   **Bancos de Dados & Mapeamento Avançado:**
    *   **SQL (Avançado):** Otimização de consultas, criação de índices (Indexes), transações e normalização.
    *   **NoSQL (Intermediário):** Modelagem de dados para NoSQL, entendimento de bancos chave-valor (ex: Redis).
    *   **Mapeamento:** Padrões avançados de mapeamento em ORMs, N+1 problem, lazy vs eager loading.
*   **Git (Avançado):** `rebase`, `cherry-pick`, `stash`, compreensão de estratégias complexas de versionamento.
*   **DevOps e Infraestrutura:** Conhecimentos práticos de Docker (criação de `Dockerfile` e `docker-compose`). Entendimento prático de pipelines de CI/CD (Continuous Integration / Continuous Deployment), sabendo ler e fazer manutenções em scripts (ex: GitHub Actions, GitLab CI).
*   **Testes e Qualidade:** TDD (Test-Driven Development), testes de integração e mock frameworks.

## 4. Sênior
O Sênior resolve problemas de negócio complexos, desenha a arquitetura de sistemas, pensa em escala, performance, segurança e atua como líder técnico e mentor para toda a equipe.

**Conhecimentos Esperados:**
*   **Arquitetura de Sistemas:**
    *   Microsserviços vs Monolitos, Arquitetura Orientada a Eventos (Mensageria como Kafka, RabbitMQ).
    *   Domain-Driven Design (DDD) e Clean Architecture.
*   **Escalabilidade e Alta Disponibilidade:**
    *   Load balancing, caching distribuído, estratégias de resiliência (Circuit Breaker, Retry).
*   **DevOps e Infraestrutura (Avançado):** Orquestração de containers (ex: Kubernetes). Desenho e implementação de pipelines complexos de CI/CD, garantindo automação total, análise de qualidade de código (SonarQube) e estratégias de deploy sem downtime (Blue/Green, Canary).
*   **Bancos de Dados (Especialista):**
    *   Sharding, replicação, trade-offs do Teorema CAP.
    *   Saber exatamente quando escolher SQL, NoSQL ou outros tipos de armazenamento (Time-Series, Graph DBs).
*   **Performance e Segurança:** Profiling de aplicações, identificação de gargalos de memória/CPU, práticas do OWASP Top 10.
*   **Soft Skills e Liderança:** Mentoria técnica, negociação com stakeholders, estimativa de projetos complexos, visão de produto e impacto no negócio.