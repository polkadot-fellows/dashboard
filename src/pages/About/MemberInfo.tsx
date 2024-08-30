import { Polkicon } from '@polkadot-ui/react'
import { AccountName } from './AccountName'
import { ellipsisFn, transformToBaseUnit } from '@polkadot-ui/utils'
import { rankInfo } from '@/consts'

import copy from 'copy-to-clipboard'

import { api } from '@/clients'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Check, Copy, Mail } from 'lucide-react'

import { TbWorldWww } from 'react-icons/tb'
import { SiElement } from 'react-icons/si'
import { FaXTwitter } from 'react-icons/fa6'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Link } from 'react-router-dom'
import type { FellowshipMember } from '@/queries/useFellowshipMembers'

export type LcStatusType = {
  lcStatus: boolean
}

type MemberInfoProps = {
  member: FellowshipMember
  open: boolean
  onOpenChange: Dispatch<SetStateAction<boolean>>
} & LcStatusType

type MemberDetailsProps = {
  address: string
}

const iconSize = 24
const precision = 3

// TODO - fix the chain units to be loaded from the chain and not hardcoded
const roundUp = (num: bigint): string => {
  const n = parseFloat(transformToBaseUnit(num.toString(), 10))
  const prec = Math.pow(10, precision)
  return (Math.ceil(n * prec) / prec).toString()
}

const MemberDetails = ({ address }: MemberDetailsProps) => {
  const [copyClicked, setCopyClicked] = useState<boolean>(false)

  useEffect(() => {
    if (copyClicked) {
      setTimeout(() => {
        setCopyClicked(false)
      }, 2000)
    }
  }, [copyClicked])

  const props = {
    style: { marginLeft: '0.75rem', cursor: 'pointer' },
    onClick: () => {
      copy(address)
      setCopyClicked(true)
    },
  }

  return (
    <>
      <div>{ellipsisFn(address, 6)}</div>
      {copyClicked ? (
        <Check className="w-4 text-[green]" {...props} />
      ) : (
        <Copy className="w-4 text-primary" {...props} />
      )}
    </>
  )
}

export const MemberInfo = ({
  member,
  lcStatus,
  open,
  onOpenChange,
}: MemberInfoProps) => {
  const { address, display, web, twitter, email, matrix } = member

  const [reserved, setReserved] = useState<string>('')
  const [transferrable, setTransferrable] = useState<string>('')
  const [total, setTotal] = useState<string>('')
  const [rank, setRank] = useState<number>()

  useEffect(() => {
    const getBalance = async () => {
      const promisesRes = await Promise.all([
        api.query.System.Account.getValue(address),
        api.query.FellowshipCollective.Members.getValue(address),
      ])

      const bal = promisesRes[0]
      setRank(promisesRes[1])

      if (bal?.data) {
        const { free, reserved } = bal.data

        setTransferrable(roundUp(free))
        setReserved(roundUp(reserved))
        setTotal(roundUp(free + reserved))
      }
    }
    getBalance()
    return () => {
      setTransferrable('')
      setReserved('')
      setTotal('')
    }
  }, [address])

  return member && Object.keys(member)?.length ? (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="px-0">
          <DialogHeader>
            <DialogTitle>
              <Polkicon copy size={72} address={address} />
            </DialogTitle>
            <DialogDescription>
              <div className="flex, justify-center items-center">
                <div className="my-4 flex flex-col items-center">
                  {display && (
                    <AccountName display={display} address={address} />
                  )}
                  <div className={`px-4 py-2 text-primary`}>
                    Rank {rank} - {rankInfo[member.rank].name}
                  </div>
                  <div className="flex flex-row justify-center">
                    <MemberDetails address={address} />
                  </div>
                </div>
              </div>
              <div className="mt-6 flex flex-row justify-evenly text-primary">
                {twitter && (
                  <Link to={`https://x.com/${twitter}`} target={'_blank'}>
                    <FaXTwitter size={iconSize} className="pointer" />
                  </Link>
                )}
                {matrix && (
                  <Link to={`https://matrix.to/#/${matrix}`} target={'_blank'}>
                    <SiElement size={iconSize} className="pointer" />
                  </Link>
                )}
                {web && (
                  <Link to={web} target={'_blank'}>
                    <TbWorldWww size={iconSize} className="pointer" />
                  </Link>
                )}
                {email && (
                  <Link to={`mailto:${email}`} target={'_blank'}>
                    <Mail size={iconSize} className="pointer" />
                  </Link>
                )}
              </div>

              <div className="chart-wrapper mx-auto flex max-w-6xl flex-col flex-wrap items-start justify-center gap-6 p-6 sm:flex-row sm:p-8">
                <div className="grid w-full gap-6 sm:grid-cols-2 lg:max-w-[22rem] lg:grid-cols-1 xl:max-w-[25rem]">
                  <Card>
                    <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2 [&>div]:flex-1">
                      <div>
                        <CardDescription className="text-left">
                          Total
                        </CardDescription>
                        <CardTitle className="flex items-baseline gap-1 text-2xl tabular-nums">
                          {lcStatus ? (
                            `≃ ${total}`
                          ) : (
                            <Skeleton className="h-10 w-[120px]" />
                          )}
                          <span className="text-sm font-normal tracking-normal text-muted-foreground">
                            DOT
                          </span>
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="flex flex-row items-center gap-4 space-y-0 pb-2 [&>div]:flex-1 my-4">
                      <div>
                        <CardDescription className="text-left">
                          Transferrable
                        </CardDescription>
                        <CardTitle className="flex items-baseline gap-1 text-2xl tabular-nums">
                          {lcStatus ? (
                            `≃ ${transferrable}`
                          ) : (
                            <Skeleton className="h-8 w-[80px]" />
                          )}
                          <span className="text-sm font-normal tracking-normal text-muted-foreground">
                            DOT
                          </span>
                        </CardTitle>
                      </div>
                      <div>
                        <CardDescription className="text-left">
                          Reserved
                        </CardDescription>
                        <CardTitle className="flex items-baseline gap-1 text-2xl tabular-nums">
                          {lcStatus ? (
                            `≃ ${reserved}`
                          ) : (
                            <Skeleton className="h-8 w-[80px]" />
                          )}
                          <span className="text-sm font-normal tracking-normal text-muted-foreground">
                            DOT
                          </span>
                        </CardTitle>
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-row items-center gap-4 space-y-0 pb-2 [&>div]:flex-1">
                      <div>
                        <CardDescription className="text-left">
                          Salary
                        </CardDescription>
                        <CardTitle className="flex items-baseline gap-1 text-2xl tabular-nums">
                          ≃ {(rankInfo[member.rank].salary / 12).toFixed(3)}
                          <span className="text-sm font-normal tracking-normal text-muted-foreground">
                            USDT
                          </span>
                        </CardTitle>
                      </div>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  ) : null
}
