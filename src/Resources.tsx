/* eslint-disable react-refresh/only-export-components */
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { NotebookText } from 'lucide-react'
import { DialogHeader } from './components/ui/dialog'
import { Link } from 'react-router-dom'
import { GetLinksType, resources } from './lib/utils'

export const getLink = ({
  label,
  link,
  target,
}: GetLinksType): React.ReactNode => {
  return (
    <Link to={link} target={target}>
      {label}
    </Link>
  )
}

export const getLinks = (title: string, arrays: GetLinksType[]) => (
  <div className="divide-y divide-dashed">
    <div>
      <h4 className="text-primary my-4 font-extrabold">{title}</h4>
      {arrays.map((arr) => (
        <p className="text-[#999] underline">{getLink(arr)}</p>
      ))}
    </div>
  </div>
)

export const Resources = () => {
  return (
    <div className="flex pt-8">
      <Dialog>
        <DialogTrigger asChild>
          <a
            href="#"
            className="text-muted-foreground hover:text-foreground flex items-center gap-4 px-2.5 py-2 transition-colors"
          >
            <NotebookText className="h-5 w-5" />
            <span className="left">Resources</span>
          </a>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-primary font-bold">
              Resources
            </DialogTitle>
            <DialogDescription>
              Useful resources on the Polkadot Technical Fellowship
            </DialogDescription>
          </DialogHeader>
          <div className="columns-1">
            {resources.map((r) => getLinks(r.title, r.resources))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
