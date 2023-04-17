export default function Layout(props: any) {
  console.log(props)

  return (
    <>
      <div>Navigation</div>
      {props.children}
      <div>Footer</div>
    </>
  )
}
