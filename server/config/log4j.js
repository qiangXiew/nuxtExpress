const logConfig = {
  'appenders': {
    'console': {
      'type': 'console'
    },
    'trace': {
      'type': 'file',
      'filename': 'log/access.log',
      'maxLogSize ': 30240000
    },
    'info': {
      'type': 'dateFile',
      'filename': 'log/api-info',
      'pattern': '-MM-dd.log',
      'alwaysIncludePattern': true,
      'compress': true
    },
    'maxInfo': {
      'type': 'logLevelFilter',
      'appender': 'info',
      'level': 'debug',
      'maxLevel': 'info'
    },
    'error': {
      'type': 'dateFile',
      'filename': 'log/api-error',
      'pattern': '-MM-dd.log',
      'alwaysIncludePattern': true,
      'compress': true
    },
    'minError': {
      'type': 'logLevelFilter',
      'appender': 'error',
      'level': 'error'
    }
  },
  'categories': {
    'default': {
      'appenders': [
        'console',
        'maxInfo',
        'minError',
        'trace'
      ],
      'level': 'info'
    }
  }
}

export default logConfig;
