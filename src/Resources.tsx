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
      <h4 className="text-primary font-extrabold my-4">{title}</h4>
      {arrays.map((arr) => (
        <p className="underline text-[#999]">{getLink(arr)}</p>
      ))}
    </div>
  </div>
)

export const Resources = () => {
  return (
    <div className="pt-8 flex">
      <Dialog>
        <DialogTrigger asChild>
          <a
            href="#"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground transition-colors py-2"
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
              Some resources of Felloship specific information.
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
