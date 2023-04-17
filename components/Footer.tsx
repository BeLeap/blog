export default function Footer() {
  return (
    <footer
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        gap: "0.5rem",
      }}
    >
      {`${(new Date()).getFullYear()} © BeLeap`}
    </footer>
  )
}
