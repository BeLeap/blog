export default function Layout(props: any) {
  console.log(props)

  return (
    <>
      <header>Navigation</header>
      <main>{props.children}</main>
      <footer>Footer</footer>
    </>
  )
}
