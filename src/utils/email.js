module.exports = {
    redis: {
      get host() {
        return '127.0.0.1'
      },
      get port() {
        return 6379
      }
    },
    smtp: {
      get host() {
        return 'smtp.qq.com'
      },
      get user() {
        return '2209102475@qq.com'
      },
      get pass() {
        return 'rxjfqhoqkhhdeadj'
      },
      get code() {
        return () => {
          return Math.random().toString(16).slice(2, 6).toUpperCase()
        }
      },
      get expire() {
        return () => {
          return new Date().getTime() + 60 * 1000
        }
      }
    }
  }