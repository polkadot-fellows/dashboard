import { BsCheckCircleFill } from "react-icons/bs"

export const AccountName = ({ display }: any) => {
  return (
    <div style={{ display: "flex" }}>
      <p>
        {display !== "-" ? (
          <BsCheckCircleFill
            style={{ color: "green", marginRight: "0.5rem" }}
          />
        ) : null}
      </p>
      <p>{display}</p>
    </div>
  )
}
