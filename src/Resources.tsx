import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@radix-ui/react-tooltip'
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
    <div className="pt-8">
      <Dialog>
        <Tooltip key={'1'}>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <a href="#">
                <NotebookText className="h-5 w-5" />
                <span className="sr-only">Resources</span>
              </a>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent side="right">Resources</TooltipContent>
        </Tooltip>
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
