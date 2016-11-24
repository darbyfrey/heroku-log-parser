'use strict';

module.exports = class HerokuLogParser {

  static parse(data){
    let events = []
    let lines = HerokuLogParser._split_lines(data)

    lines.forEach(function(line){
      events.push(HerokuLogParser._extract_event_data(line))
    })

    return events
  }

  static _split_lines(data){
    return data.split('\n').map(s => s.trim())
  }

  static _counting_frame(line){
    let frame = /^(\d+) /.exec(line)
    if(frame === null){
      console.log('Unable to parse counting frame')
      return 0
    } else {
      return Number.parseInt(frame[0])
    }
  }

  static _parse_line(line){
    let byte_length = HerokuLogParser._counting_frame(line)
    let offset = byte_length.toString().length + 1

    return line.slice(offset, byte_length + offset)
  }

  static _extract_event_data(line){
    let regex = /\<(\d+)\>(1) (\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.\d\d\d\d\d\d)?\+00:00) ([a-z0-9\-\_\.]+) ([a-z0-9\.-]+) ([a-z0-9\-\_\.]+) (\-) (.*)$/
    let extracted_data = regex.exec(HerokuLogParser._parse_line(line))
    let event = {}

    event.priority = Number.parseInt(extracted_data[1])
    event.syslog_version = Number.parseInt(extracted_data[2])
    event.emitted_at = extracted_data[3]
    event.hostname = extracted_data[4]
    event.appname = extracted_data[5]
    event.proc_id = extracted_data[6]
    event.msg_id = null
    event.structured_data = null
    event.message = extracted_data[8]
    event.original = extracted_data[0]

    return event
  }

}
