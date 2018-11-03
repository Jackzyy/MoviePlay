// vue.config.js
module.exports = {
    // 修改的配置
    devServer: {
        proxy: {
            '/api': {
                // target: 'http://localhost:3000',
                target:'http://www.jackzzc.com:3000/',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                  '^/api': ''
                }
            }
        }
    }
}