import { FaBugs } from "react-icons/fa6"

export const ErrorPage = () => {
  return (
    <div>
      <FaBugs />
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        Please try to reload the page or{" "}
        <a
          href="https://github.com/polkadot-fellows/dashboard/issues"
          target="_blank"
          rel="noreferrer"
        >
          open an issue
        </a>
        .
      </p>
    </div>
  )
}
