/**
 * 环境配置
 */
const env = process.env.NODE_ENV || 'development'
const EnvConfig = {
    // 开发环境
    development: {
        baseUrl: '/api/v1',
        mockUrl: 'http://127.0.0.1:4523/mock/695511/api/v1'
    },
    // 测试环境
    test: {
        baseUrl: '/api/v1',
        mockUrl: 'http://127.0.0.1:4523/mock/695511/api/v1'
    },
    // 生产环境
    production: {
        baseUrl: '/api/v1',
        mockUrl: 'http://127.0.0.1:4523/mock/695511/api/v1'
    }
}
export default {
    env,
    mock: false,
    // @ts-ignore
    ...EnvConfig[env],
    namespace: 'ThinkReactAdmin'
}