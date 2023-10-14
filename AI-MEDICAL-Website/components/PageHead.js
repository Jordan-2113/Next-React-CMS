import Link from 'next/link'
import PageTitle from './PageTitle'
import AsyncImage from './AsyncImage'

export default function PageHead( { title, alttext, image, breadcrumb } ) {
  return (
    <>
      <div className="frame-bg border-bg">
        <div className="frame-bg--wrapper">
          <AsyncImage src={ image } alt={ alttext } className="img-bg" objectFit />
          <div className="text-bg">
            <div className="main-container">
              <PageTitle shadow>
                <h1 className="text-white text-center size--xl">
                  { title }
                </h1>
              </PageTitle>
            </div>
          </div>
        </div>
      </div>
      <div className="main-container">
        <div className="py-3 mb-3">
          <nav className="nav" aria-label="breadcrumb">
            { breadcrumb }
          </nav>
        </div>
      </div>
    </>
  )
}
