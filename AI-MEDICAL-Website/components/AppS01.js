import DownloadAppBadge from './DownloadAppBadge'
import PageTitle from './PageTitle'
import AsyncImage from './AsyncImage'

export default function AppS01( {data} ) {

  const content1 = (
    <>
      <div className="py-3">
        <PageTitle align="left" shadow>
          <div className="size--xxl text-dominant">{ data("App.S0101") }</div>
        </PageTitle>
      </div>
      <p className="text-gray" dangerouslySetInnerHTML={{ __html: data("App.S0102") }}></p>
      <PageTitle align="left">
        <div className="text-dominant pb-2"><a href="#">{ data("App.S0103") }</a></div>
      </PageTitle>
      <DownloadAppBadge noWrap align="left" qrcode="/images/FooterS0103.png" />
    </>
  )

  const content2 = (
    <div className="s-pm">
      <div className="py-2">
        <div className="size--md text-dominant">{ data("App.S0106") }</div>
      </div>
      <p className="text-gray">{ data("App.S0107") }</p>
      <AsyncImage src="/images/AppS0108.png" className="full-width pt-3" style={{ maxWidth: 550 }} />
    </div>
  )

  const content3 = (
    <div className="text-md-right s-pm">
      <div className="py-2">
        <div className="size--md text-dominant">{ data("App.S0109") }</div>
      </div>
      <p className="text-gray">{ data("App.S0110") }</p>
      <div className="py-2">
        <div className="size--md text-dominant">{ data("App.S0111") }</div>
      </div>
      <p className="text-gray">{ data("App.S0112") }</p>
    </div>
  )

  const content4 = (
    <div className="s-pm">
      <div className="py-2">
        <div className="size--md text-dominant">{ data("App.S0115") }</div>
      </div>
      <p className="text-gray">{ data("App.S0116") }</p>
      <div className="py-2">
        <div className="size--md text-dominant">{ data("App.S0117") }</div>
      </div>
      <p className="text-gray">{ data("App.S0118") }</p>
    </div>
  )

  return (
    <>
      <div className="main-container large no-padding bg--triangle">
        <div className="main-container">
          <div className="py-4">
            <div className="row align-items-center">
              <div className="col-12 col-md-6 col-lg-7">
                <div className="pb-4 pb-md-0">
                  {content1}
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-5">
                <AsyncImage src="/images/AppS0104.png" alt="" className="w-100" />
              </div>
            </div>
          </div>

          <div className="py-4">
            <div className="row align-items-center">
              <div className="col-12 col-md-6 col-lg-7 order-md-1">
                <div className="pb-3 pb-md-0">
                  {content2}
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-5">
                <AsyncImage src="/images/AppS0105.png" alt="" className="w-100" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="main-container">
        <div className="my-4 py-3">
          <div className="row align-items-center">
            <div className="col-12 col-md-6 col-lg-7">
              <div className="pb-1 pb-md-0">
                {content3}
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-5">
              <AsyncImage src="/images/AppS0113.png" alt="" className="w-100" />
            </div>
          </div>
        </div>

        <div className="my-4 py-3">
          <div className="row align-items-center">
            <div className="col-12 col-md-6 col-lg-5">
              <AsyncImage src="/images/AppS0114.png" alt="" className="w-100" />
            </div>
            <div className="col-12 col-md-6 col-lg-7">
              {content4}
            </div>
          </div>
        </div>

        <div className="py-4 my-3 my-md-5 p-md-5">
          <PageTitle>
            <div className="size--lg text-dominant">{ data("App.S0119") }</div>
          </PageTitle>
        </div>

      </div>
    </>
  )
}
