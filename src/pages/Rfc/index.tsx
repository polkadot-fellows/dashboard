import { useEffect, useState } from 'react'
import { GithubApiUrl, GithubOwner, GithubRfc } from '@/consts'
import { RFCText } from './RFCText'
import ReactMarkdown from 'react-markdown'
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
    <main className="grid flex-1 items-start gap-4 p-4 sm:mx-[5%] xl:mx-[15%] mx-0 sm:px-6 sm:py-0 md:gap-8">
      <div className="header">
        <h1 className="my-4 font-unbounded text-primary flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          RFCs
        </h1>
      </div>
      <div className="pageTop">
        <RFCText />
        <h1 className="my-4 font-unbounded text-primary flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          Open RFCs
        </h1>
        <div className="grid md:grid-cols-2 md:gap-4 grid-cols-1 gap-4">
          {data ? (
            data.length ? (
              data!.map((d: any) => {
                return (
                  <div className="border-gray-300 rounded-md border p-4">
                    <div>
                      <div className="my-2">
                        <Link
                          to={`https://www.github.com/${GithubOwner}/${GithubRfc}/pull/${d.number}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-primary font-semibold mb-2 h-10 my-10"
                        >
                          #{d.number} - {d.title}
                        </Link>
                      </div>
                      <div className="rfc-content">
                        <ReactMarkdown>{d.body}</ReactMarkdown>
                      </div>
                    </div>
                    <div className="flex items-center justify-between bg-gray-300 p-2 rounded-lg relative bottom-2">
                      <div>
                        <img
                          width="40"
                          style={{ borderRadius: '10rem', width: '4rem' }}
                          src={`${d.user.avatar_url}`}
                        />
                      </div>
                      <div>
                        <Link
                          to={d.user.html_url}
                          target="_blank"
                          rel="noreferrer"
                          className="font-bold text-sm"
                        >
                          {d.user.login}
                        </Link>
                      </div>
                      <div>
                        <p className="text-primary font-bold text-xs">
                          {new Date(d.created_at).toDateString()}
                        </p>
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
