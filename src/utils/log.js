const path = require('path');
module.exports = {
    appenders: {
      access: {
        type: 'dateFile',
        pattern: '-yyyy-MM-dd.log', //生成文件的规则
        filename: path.join('back-end/logs/', 'access.log') //生成文件名
      },
      error: {
        type: 'dateFile',
        pattern: '-yyyy-MM-dd.log',
        filename: path.join('back-end/logs/', 'error.log')
      },
      controllerError: {
        type: 'dateFile',
        pattern: '-yyyy-MM-dd.log',
        filename: path.join('back-end/logs/', 'controllerError.log')
      },
      out: {
        type: 'console'
      }
    },
    categories: {
      default: { appenders: [ 'out' ], level: 'info' },
      access: { appenders: [ 'access' ], level: 'info' },
      error: { appenders: [ 'error' ], level: 'info'},
      controllerError: { appenders: [ 'controllerError' ], level: 'info'}
    }
  }