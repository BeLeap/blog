export default function Layout(props: any) {
  console.log(props)

  return (
    <div className="flex flex-col min-h-screen container mx-auto">
      <header className="">Navigation</header>
      <main className="flex-1 flex-col flex flex-wrap items-top justify-content">{props.children}</main>
      <footer className="">Footer</footer>
    </div>
  )
}
