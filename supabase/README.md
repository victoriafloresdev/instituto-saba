# Supabase — conteúdo administrável

A migração `migrations/20260911000000_create_site_content.sql` prepara o CMS do Instituto:

- tabela `public.spectacles` para espetáculos e sessões;
- tabela `public.sponsors` para patrocinadores confirmados;
- bucket público `site-assets` para imagens e logos;
- leitura pública somente de espetáculos publicados e patrocinadores ativos;
- escrita, alteração e exclusão restritas a perfis com `role = 'admin'`.

> **Status:** enquanto esta migração não for executada, o painel exibe um aviso ao abrir
> as abas de conteúdo e as páginas públicas caem no estado "em breve". Nada quebra, mas
> nada pode ser cadastrado.

## Aplicação no projeto Supabase

Como o repositório ainda não está vinculado ao Supabase CLI, aplicar pelo painel:

1. Abrir o projeto no Supabase.
2. Acessar **SQL Editor → New query**.
3. Copiar todo o conteúdo do arquivo de migração e executar (**Run**).
4. Confirmar que não houve erro na execução.

A migração é idempotente para as tabelas, bucket, políticas e dados iniciais. Os registros
iniciais só são inseridos quando seus respectivos `slug`s ainda não existem, e reproduzem o
conteúdo que já estava fixo no código (os dois espetáculos da programação e a patrocinadora
master citada no material do Instituto).

## Validação rápida

No SQL Editor, depois da execução, consultar:

```sql
select slug, title, status from public.spectacles order by sort_order;
select slug, name, status from public.sponsors order by sort_order;
select id, name, public, file_size_limit from storage.buckets where id = 'site-assets';
```

## Onde esse conteúdo aparece

| Tabela | Painel administrativo | Página pública |
| --- | --- | --- |
| `spectacles` | Conteúdo do site → **Espetáculos** | `/programacao` e `/espetaculo/<slug>` |
| `sponsors` | Conteúdo do site → **Patrocinadores** | `/patrocinadores` |

Só aparecem no site os espetáculos com `status = 'published'` e os patrocinadores com
`status = 'active'`. As imagens enviadas pelo painel vão para o bucket `site-assets`, nas
pastas `spectacles/` e `sponsors/` exigidas pelas políticas de escrita.

## Pendente

As tabelas dos formulários públicos (`auditions`, `sponsorship_leads`,
`school_registrations`, `contact_messages` e `profiles`) foram criadas direto no painel e
ainda não têm migração versionada neste repositório.
