import { useEffect, useState } from 'react'
import { GithubApiUrl, GithubOwner, GithubRfc } from '@/consts'
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
    <main>
      <div className="header">
        <h1 className="my-4 font-unbounded text-primary flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          RFCs
        </h1>
      </div>
      <div className="w-full">
        <div className="grid md:gap-4 grid-cols-1 gap-4">
          <RFCText />
          <h1 className="my-4 font-unbounded text-primary flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            RFCs List
          </h1>
          {data ? (
            data.length ? (
              data!.map((d: any) => {
                return (
                  <div className="w-full flex justify-between">
                    <div className="w-[65%] border-2 p-2 rounded-tl-lg rounded-bl-lg">
                      <Link
                        to={`https://www.github.com/${GithubOwner}/${GithubRfc}/pull/${d.number}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-primary font-semibold mb-2 h-10 my-10 word-break"
                      >
                        #{d.number} - {d.title}
                      </Link>
                    </div>
                    <div className="w-[35%] flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-2 border-2 border-l-0 rounded-tr-lg rounded-br-lg">
                      <div className="w-[70%]">
                        <Link
                          to={d.user.html_url}
                          target="_blank"
                          rel="noreferrer"
                          className="font-bold text-sm"
                        >
                          {d.user.login}
                        </Link>
                        <p className="text-primary font-bold text-xs">
                          {new Date(d.created_at).toDateString()}
                        </p>
                      </div>
                      <div className="w-[30%]">
                        <Link
                          to={d.user.html_url}
                          target="_blank"
                          rel="noreferrer"
                          className="font-bold text-sm"
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
    </main>
  )
}
