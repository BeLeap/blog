export default function Layout(props: any) {
  console.log(props)

  return (
    <>
      <header>Navigation</header>
      {props.children}
      <footer>Footer</footer>
    </>
  )
}
