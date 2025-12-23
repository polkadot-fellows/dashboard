import { useEffect, useState } from 'react'
import { GithubApiUrl, GithubOwner, GithubRfc, reusableH1 } from '@/consts'
import { RFCText } from './RFCText'
import './index.css'
import { Link } from 'react-router-dom'
import { TbLoaderQuarter } from 'react-icons/tb'

export const Rfc = () => {
  const [data, setData] = useState<Array<any> | undefined>()

  useEffect(() => {
    const fetchOpenPRs = async () => {
      const response = await (await fetch(`${GithubApiUrl}/pulls`)!).json()
      setData(response)
    }
    fetchOpenPRs()
  }, [])

  return (
    <>
      <div className="header">
        <h1 className={reusableH1 + ' my-4'}>RFCs</h1>
      </div>
      <div className="w-full">
        <div className="grid grid-cols-1 gap-4 md:gap-4">
          <RFCText />
          <h1 className={reusableH1 + ' my-4'}>RFCs List</h1>
          {data ? (
            data.length ? (
              data!.map((d: any) => {
                if (d.number === 130) {
                  console.log('d', d)
                }
                return (
                  <div className="flex w-full justify-between">
                    <div className="flex w-[35%] items-center justify-between rounded-tl-lg rounded-bl-lg border-2 bg-gray-100 p-2 dark:bg-gray-800">
                      <div className="w-[30%]">
                        <Link
                          to={d.user.html_url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm font-bold"
                        >
                          <img
                            style={{ borderRadius: '10rem', width: '4rem' }}
                            src={`${d.user.avatar_url}`}
                          />
                        </Link>
                      </div>
                      <div className="w-[70%]">
                        <Link
                          to={d.user.html_url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm font-bold"
                        >
                          {d.user.login}
                        </Link>
                        <p className="text-primary text-xs font-bold">
                          {new Date(d.created_at).toDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex w-[10%] items-center border-2 border-r-0 border-l-0 p-2">
                      <p className="text-xs">
                        {(d?.labels && d?.labels[0]?.name) || '-'}
                      </p>
                    </div>
                    <div className="w-[55%] rounded-tr-lg rounded-br-lg border-2 p-2">
                      <Link
                        to={`https://www.github.com/${GithubOwner}/${GithubRfc}/pull/${d.number}`}
                        target="_blank"
                        rel="noreferrer"
                        className="word-break text-primary my-10 mb-2 h-10 font-semibold"
                      >
                        #{d.number} - {d.title}
                      </Link>
                    </div>
                  </div>
                )
              })
            ) : (
              'Nothing to see here'
            )
          ) : (
            <TbLoaderQuarter className="text-primary h-20 w-20 animate-spin" />
          )}
        </div>
      </div>
    </>
  )
}
