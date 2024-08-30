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
                return (
                  <div className="flex w-full justify-between">
                    <div className="w-[65%] rounded-bl-lg rounded-tl-lg border-2 p-2">
                      <Link
                        to={`https://www.github.com/${GithubOwner}/${GithubRfc}/pull/${d.number}`}
                        target="_blank"
                        rel="noreferrer"
                        className="word-break my-10 mb-2 h-10 font-semibold text-primary"
                      >
                        #{d.number} - {d.title}
                      </Link>
                    </div>
                    <div className="flex w-[35%] items-center justify-between rounded-br-lg rounded-tr-lg border-2 border-l-0 bg-gray-100 p-2 dark:bg-gray-800">
                      <div className="w-[70%]">
                        <Link
                          to={d.user.html_url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm font-bold"
                        >
                          {d.user.login}
                        </Link>
                        <p className="text-xs font-bold text-primary">
                          {new Date(d.created_at).toDateString()}
                        </p>
                      </div>
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
                    </div>
                  </div>
                )
              })
            ) : (
              'Nothing to see here'
            )
          ) : (
            <TbLoaderQuarter className="h-20 w-20 animate-spin text-primary" />
          )}
        </div>
      </div>
    </>
  )
}
