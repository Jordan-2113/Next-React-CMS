import Document, { Html, Head, Main, NextScript } from 'next/document'

class CustomDocument extends Document {
  static async getInitialProps (ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    const userAgent = ctx.req?.headers['user-agent']?.toLowerCase()
    return { ...initialProps, userAgent }
  }
  isMobileNTablet () {
    const { userAgent } = this.props

    if (userAgent == null) return false

    if (/mobi/i.test(userAgent)) {
      return true
    }
    return false
  }
  render () {
    return (
      <Html
        lang='zh-HK'
        className={this.isMobileNTablet() ? 'mobile' : 'desktop'}
      >
        <Head>
          {this.props.userAgent?.indexOf('MSIE ') > 0 && (
            <meta httpEquiv='X-UA-Compatible' content='IE=edge,chrome=1' />
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default CustomDocument
