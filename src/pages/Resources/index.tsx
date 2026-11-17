import { ArrowUpRight } from 'lucide-react'
import { PageHeader } from '@/components/page'
import { usePageTitle } from '@/lib/usePageTitle'
import { resources } from '@/nav'

export const Resources = () => {
  usePageTitle('Resources')
  return (
    <>
      <PageHeader
        title="Resources"
        lead="Useful places to learn about, follow and take part in the Polkadot Technical Fellowship."
      />
      <div className="space-y-12">
        {resources.map(({ title, links }) => (
          <section key={title}>
            <h2 className="mb-4 text-lg font-semibold tracking-tight">
              {title}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {links.map(({ label, href, description }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="group bg-card hover:border-primary/50 rounded-xl border p-5 transition-colors"
                >
                  <span className="flex items-center justify-between gap-2 font-medium">
                    {label}
                    <ArrowUpRight className="text-muted-foreground group-hover:text-primary h-4 w-4 shrink-0 transition-colors" />
                  </span>
                  {description && (
                    <span className="text-muted-foreground mt-1.5 block text-sm leading-6">
                      {description}
                    </span>
                  )}
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  )
}
