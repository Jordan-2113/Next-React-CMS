const { i18n } = require('./next-i18next.config');
const { createSecureHeaders } = require("next-secure-headers");
const { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } = require('next/constants');

const polyfillModules = [
    'core-js/stable/object',
    'core-js/stable/symbol',
    'core-js/stable/function',
    'core-js/stable/parse-int',
    'core-js/stable/parse-float',
    'core-js/stable/math',
    'core-js/stable/number',
    'core-js/stable/promise',
    'core-js/stable/array',
    'core-js/stable/regexp',
    'core-js/stable/set',
    'core-js/stable/weak-set',
    'core-js/stable/map',
    'core-js/stable/weak-map',
    'core-js/stable/string',
    'core-js/stable/dom-collections',
    'formdata-polyfill',
    'next/dist/client/polyfills',
    '@webcomponents/shadydom',
];

module.exports = (phase) => {
    const isDev = phase === PHASE_DEVELOPMENT_SERVER;
    const isProduction = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1';

    return {
        i18n,
        webpack5: false,
        poweredByHeader: false,
        productionBrowserSourceMaps: false,
        env: {
            productionMode: isProduction,
        },
        async headers() {
            return [
                {
                    source: '/:path*{/}?',
                    headers: isDev ? [] : createSecureHeaders({
                        contentSecurityPolicy: false
                    })
                },
                {
                    source: '/api/(.*)',
                    headers: [
                        { key: 'Access-Control-Allow-Credentials', value: 'true'},
                        { key: 'Access-Control-Allow-Headers', value: '*'},
                        { key: 'Access-Control-Allow-Methods', value: 'GET, PUT, POST, DELETE, HEAD, OPTIONS, PATCH'},
                        { key: 'Access-Control-Allow-Origin', value: '*'},
                        { key: 'Access-Control-Expose-Headers', value: '*'}
                    ]
                }
            ]
        },
        webpack: (config, { isServer, dev, webpack }) => {
            const originalEntry = config.entry;
            config.entry = async () => {
                const entries = await originalEntry();
                // deprecated next js build-in polyfills
                entries["polyfills"] = polyfillModules;
    
                return entries;
            }
    
            // css import rules
            config.module.rules.push({
                test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 100000,
                        name: '[name].[ext]',
                        esModule: false
                    }
                }
            })
    
            config.module.rules.push({
                test: /\.js?$/i,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            plugins: [
                                ['@babel/plugin-transform-react-jsx', {
                                    runtime: "automatic"
                                }],
                                ['@babel/plugin-proposal-class-properties', {
                                    // loose: true
                                }]
                            ],
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        modules: false,
                                        // loose: true,
                                        targets: {
                                            browsers: '> 0.25%, IE 11, not dead'
                                        },
                                    }
                                ]
                            ],
                            compact: !dev
                        },
                    }
                ],
                exclude: /core-js|framer-motion/
            })
    
            config.module.rules.push({
                test: /\.txt$/i,
                use: 'raw-loader',
            })
    
            config.plugins.push(new webpack.ProvidePlugin({
                "regeneratorRuntime": "regenerator-runtime",
                "React": "react"
            }))
    
            const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
            config.optimization.minimizer.push(
                new OptimizeCSSAssetsPlugin({
                    preset: [
                        "default",
                        { discardComments: { removeAll: true } }
                    ]
                })
            );
    
            return config;
        }
    }
}
