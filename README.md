heroku-log-parser
=================

This is a port of [https://github.com/rwdaigle/heroku-log-parser]() to ES6. The interface is slightly different but the logic is essentially the same.


## Usage

```
> let incomingMessage = "156 <40>1 2012-11-30T06:45:26+00:00 heroku web.3 d.73ea7440-270a-435a-a0ea-adf50b4e5f5a - Starting process with command `bundle exec rackup config.ru -p 24405`"

> let herokuLogParser = require('../heroku-log-parser.js')

> let parsedMessage = herokuLogParser.parse(incomingMessage)

> parsedMessage
[ { priority: 40,
    syslog_version: 1,
    emitted_at: '2012-11-30T06:45:26+00:00',
    hostname: 'heroku',
    appname: 'web.3',
    proc_id: 'd.73ea7440-270a-435a-a0ea-adf50b4e5f5a',
    msg_id: null,
    structured_data: null,
    message: 'Starting process with command `bundle exec rackup config.ru -p 24405`',
    original: '<40>1 2012-11-30T06:45:26+00:00 heroku web.3 d.73ea7440-270a-435a-a0ea-adf50b4e5f5a - Starting process with command `bundle exec rackup config.ru -p 24405`' } ]
```
