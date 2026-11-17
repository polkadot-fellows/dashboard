import {
  type AnchorHTMLAttributes,
  type ReactNode,
  useEffect,
  useState,
} from 'react'
import { ArrowUpRight, Info } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { usePageTitle } from '@/lib/usePageTitle'

/** External link: always opens in a new tab */
export const A = ({
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <a target="_blank" rel="noreferrer" {...props}>
    {children}
  </a>
)

export const ButtonLink = ({
  href,
  children,
  variant = 'default',
  className,
}: {
  href: string
  children: ReactNode
  variant?: 'default' | 'outline' | 'secondary'
  className?: string
}) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className={cn(
      buttonVariants({ variant }),
      'not-prose gap-1.5 no-underline',
      className,
    )}
  >
    {children}
    <ArrowUpRight className="h-4 w-4 opacity-70" />
  </a>
)

export const Figure = ({
  src,
  alt,
  caption,
  className,
}: {
  src: string
  alt: string
  caption?: ReactNode
  className?: string
}) => (
  <figure className={cn('my-6', className)}>
    <a
      href={src}
      target="_blank"
      rel="noreferrer"
      title="Open the image in full size"
      className="not-prose bg-muted block overflow-hidden rounded-lg border"
    >
      <img src={src} alt={alt} loading="lazy" className="w-full" />
    </a>
    <figcaption className="text-muted-foreground mt-2 text-center text-xs">
      {caption ?? alt}
    </figcaption>
  </figure>
)

export const Callout = ({ children }: { children: ReactNode }) => (
  <div className="bg-accent/60 text-foreground flex gap-3 rounded-lg border border-transparent p-4 text-sm leading-6">
    <Info className="text-accent-foreground mt-0.5 h-4 w-4 shrink-0" />
    <div>{children}</div>
  </div>
)

export const PageHeader = ({
  title,
  lead,
  children,
}: {
  title: string
  lead?: ReactNode
  children?: ReactNode
}) => (
  <header className="mb-10 max-w-3xl">
    <h1 className="font-display text-2xl tracking-tight sm:text-3xl">
      {title}
    </h1>
    {lead && (
      <p className="text-muted-foreground mt-4 text-base leading-7 sm:text-lg">
        {lead}
      </p>
    )}
    {children}
  </header>
)

export type DocSection = { id: string; title: string; content: ReactNode }

const useActiveSection = (ids: string[]) => {
  const [active, setActive] = useState(ids[0])
  const key = ids.join('|')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting)
        if (visible) setActive(visible.target.id)
      },
      // A section becomes the active one when it crosses the top third
      { rootMargin: '-15% 0px -70% 0px' },
    )
    key.split('|').forEach((id) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })
    return () => observer.disconnect()
  }, [key])

  return active
}

/** A documentation-like page: prose sections with an "on this page" index */
export const DocPage = ({
  title,
  lead,
  sections,
}: {
  title: string
  lead?: ReactNode
  sections: DocSection[]
}) => {
  usePageTitle(title)
  const active = useActiveSection(sections.map(({ id }) => id))

  return (
    <>
      <PageHeader title={title} lead={lead} />
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_13rem] lg:gap-12">
        <article className="max-w-3xl min-w-0 space-y-14">
          {sections.map(({ id, title, content }) => (
            <section key={id} id={id} className="scroll-mt-24">
              <h2 className="mb-4 border-b pb-3 text-xl font-semibold tracking-tight">
                {title}
              </h2>
              <div className="prose">{content}</div>
            </section>
          ))}
        </article>
        {sections.length > 1 && (
          <aside className="hidden lg:block">
            <nav
              aria-label="On this page"
              className="sticky top-24 space-y-1 text-sm"
            >
              <p className="text-muted-foreground mb-3 text-xs font-semibold tracking-wider uppercase">
                On this page
              </p>
              {sections.map(({ id, title }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() =>
                    document
                      .getElementById(id)
                      ?.scrollIntoView({ behavior: 'smooth' })
                  }
                  className={cn(
                    '-ml-px block w-full cursor-pointer border-l-2 py-1 pl-3 text-left transition-colors',
                    active === id
                      ? 'border-primary text-foreground font-medium'
                      : 'text-muted-foreground hover:text-foreground border-transparent',
                  )}
                >
                  {title}
                </button>
              ))}
            </nav>
          </aside>
        )}
      </div>
    </>
  )
}
