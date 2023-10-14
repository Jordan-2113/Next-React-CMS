import Image from 'next/image'
import AsyncImage from './AsyncImage'
import PageTitle from './PageTitle'

function Content({ title, content }) {
  return (
    <div className="d-flex flex-column justify-content-center p-3 py-4" style={{ minHeight: 180, maxWidth: 500, margin: "auto", height: "100%" }}>
      <h3 className="size--xs text-black pb-2">{ title }</h3>
      <p className="size--xxs text-gray w-100" dangerouslySetInnerHTML={{ __html: content }}></p>
    </div>
  )
}

export default function HomeS04({ data }) {
  return (
    <div className="container-fluid m-0 p-0">

      <div className="py-5" style={{ backgroundColor: "#f6f6f6" }}>
        <PageTitle underline shadow>
          <h2 className="size--sm text-dominant">{ data("Home.S0401") }</h2>
        </PageTitle>
      </div>

      <div className="border-bottom">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4 order-md-0 p-0">
              <AsyncImage src="/images/HomeS0402.jpg" alt={ data("Home.S0403") } className="w-100 h-100" objectFit />
            </div>
            <div className="col-md-4 order-md-3">
              <Content title={ data("Home.S0403") } content={ data("Home.S0404") } />
            </div>
            <div className="col-md-4 order-md-4 p-0">
              <AsyncImage src="/images/HomeS0407.jpg" alt={ data("Home.S0405") } className="w-100 h-100" objectFit />
            </div>
            <div className="col-md-4 order-md-2">
              <Content title={ data("Home.S0405") } content={ data("Home.S0406") } />
            </div>
            <div className="col-md-4 order-md-2 p-0">
              <AsyncImage src="/images/HomeS0408.jpg" alt={ data("Home.S0409") } className="w-100 h-100" objectFit />
            </div>
            <div className="col-md-4 order-md-5">
              <Content title={ data("Home.S0409") } content={ data("Home.S0410") } />
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
