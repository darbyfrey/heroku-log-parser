'use strict';

var chai = require('chai')
var expect = chai.expect
var herokuLogParser = require('../heroku-log-parser.js')

describe('parse', function(){

  it('parses heroku log output', function(){

    let msg = "156 <40>1 2012-11-30T06:45:26+00:00 heroku web.3 d.73ea7440-270a-435a-a0ea-adf50b4e5f5a - Starting process with command `bundle exec rackup config.ru -p 24405`"

    let expected_event = {}

    expected_event.priority=40
    expected_event.syslog_version=1
    expected_event.emitted_at="2012-11-30T06:45:26+00:00"
    expected_event.hostname="heroku"
    expected_event.appname="web.3"
    expected_event.proc_id="d.73ea7440-270a-435a-a0ea-adf50b4e5f5a"
    expected_event.msg_id=null
    expected_event.structured_data=null
    expected_event.message="Starting process with command `bundle exec rackup config.ru -p 24405`"
    expected_event.original=msg.slice(4)

    let expected = [expected_event]

    let actual = herokuLogParser.parse(msg)

    expect(actual[0].priority).to.equal(expected[0].priority);
    expect(actual[0].syslog_version).to.equal(expected[0].syslog_version);
    expect(actual[0].emitted_at).to.equal(expected[0].emitted_at);
    expect(actual[0].hostname).to.equal(expected[0].hostname);
    expect(actual[0].appname).to.equal(expected[0].appname);
    expect(actual[0].proc_id).to.equal(expected[0].proc_id);
    expect(actual[0].msg_id).to.equal(expected[0].msg_id);
    expect(actual[0].structured_data).to.equal(expected[0].structured_data);
    expect(actual[0].message).to.equal(expected[0].message);
    expect(actual[0].original).to.equal(expected[0].original);
  });

  it('parses heroku postgres log output', function(){

    let msg = "530 <134>1 2016-02-13T21:20:25+00:00 host app heroku-postgres - source=DATABASE sample#current_transaction=15365 sample#db_size=4347350804bytes sample#tables=43 sample#active-connections=6 sample#waiting-connections=0 sample#index-cache-hit-rate=0.97116 sample#table-cache-hit-rate=0.73958 sample#load-avg-1m=0.05 sample#load-avg-5m=0.03 sample#load-avg-15m=0.035 sample#read-iops=0 sample#write-iops=112.73 sample#memory-total=15405636.0kB sample#memory-free=214004kB sample#memory-cached=14392920.0kB sample#memory-postgres=181644kB"

    let expected_event = {}

    expected_event.priority=134
    expected_event.syslog_version=1
    expected_event.emitted_at="2016-02-13T21:20:25+00:00"
    expected_event.hostname="host"
    expected_event.appname="app"
    expected_event.proc_id="heroku-postgres"
    expected_event.msg_id=null
    expected_event.structured_data=null
    expected_event.message="source=DATABASE sample#current_transaction=15365 sample#db_size=4347350804bytes sample#tables=43 sample#active-connections=6 sample#waiting-connections=0 sample#index-cache-hit-rate=0.97116 sample#table-cache-hit-rate=0.73958 sample#load-avg-1m=0.05 sample#load-avg-5m=0.03 sample#load-avg-15m=0.035 sample#read-iops=0 sample#write-iops=112.73 sample#memory-total=15405636.0kB sample#memory-free=214004kB sample#memory-cached=14392920.0kB sample#memory-postgres=181644kB"
    expected_event.original=msg.slice(4)

    let expected = [expected_event]

    let actual = herokuLogParser.parse(msg)

    expect(actual[0].priority).to.equal(expected[0].priority);
    expect(actual[0].syslog_version).to.equal(expected[0].syslog_version);
    expect(actual[0].emitted_at).to.equal(expected[0].emitted_at);
    expect(actual[0].hostname).to.equal(expected[0].hostname);
    expect(actual[0].appname).to.equal(expected[0].appname);
    expect(actual[0].proc_id).to.equal(expected[0].proc_id);
    expect(actual[0].msg_id).to.equal(expected[0].msg_id);
    expect(actual[0].structured_data).to.equal(expected[0].structured_data);
    expect(actual[0].message).to.equal(expected[0].message);
    expect(actual[0].original).to.equal(expected[0].original);
  });

  it('parses multiple messages on the same line', function(){

    let msg = '200 <190>1 2014-07-17T12:59:25.223980+00:00 d.8f7a4b11-c323-c764-a74f-89bf4c1100ab app web.2 - - Started GET "/2013/02/26/full-text-search-in-your-browser" for 197.112.207.103 at 2014-07-17 12:59:25 +0000\n164 <191>1 2014-07-17T12:59:25.239432+00:00 d.8f7a4b11-c323-c764-a74f-89bf4c1100ab app web.1 - - Started GET "/blog.rss" for 54.219.13.100 at 2014-07-18 12:59:25 +0000'

    let expected_event_one = {}

    expected_event_one.priority=190
    expected_event_one.syslog_version=1
    expected_event_one.emitted_at="2014-07-17T12:59:25.223980+00:00"
    expected_event_one.hostname="d.8f7a4b11-c323-c764-a74f-89bf4c1100ab"
    expected_event_one.appname="app"
    expected_event_one.proc_id="web.2"
    expected_event_one.msg_id=null
    expected_event_one.structured_data=null
    expected_event_one.message="- Started GET \"/2013/02/26/full-text-search-in-your-browser\" for 197.112.207.103 at 2014-07-17 12:59:25 +0000"
    expected_event_one.original="<190>1 2014-07-17T12:59:25.223980+00:00 d.8f7a4b11-c323-c764-a74f-89bf4c1100ab app web.2 - - Started GET \"/2013/02/26/full-text-search-in-your-browser\" for 197.112.207.103 at 2014-07-17 12:59:25 +0000"

    let expected_event_two = {}

    expected_event_two.priority=191
    expected_event_two.syslog_version=1
    expected_event_two.emitted_at="2014-07-17T12:59:25.239432+00:00"
    expected_event_two.hostname="d.8f7a4b11-c323-c764-a74f-89bf4c1100ab"
    expected_event_two.appname="app"
    expected_event_two.proc_id="web.1"
    expected_event_two.msg_id=null
    expected_event_two.structured_data=null
    expected_event_two.message="- Started GET \"/blog.rss\" for 54.219.13.100 at 2014-07-18 12:59:25 +0000"
    expected_event_two.original="<191>1 2014-07-17T12:59:25.239432+00:00 d.8f7a4b11-c323-c764-a74f-89bf4c1100ab app web.1 - - Started GET \"/blog.rss\" for 54.219.13.100 at 2014-07-18 12:59:25 +0000"

    let expected = [expected_event_one, expected_event_two]

    let actual = herokuLogParser.parse(msg)

    expect(actual[0].priority).to.equal(expected[0].priority);
    expect(actual[0].syslog_version).to.equal(expected[0].syslog_version);
    expect(actual[0].emitted_at).to.equal(expected[0].emitted_at);
    expect(actual[0].hostname).to.equal(expected[0].hostname);
    expect(actual[0].appname).to.equal(expected[0].appname);
    expect(actual[0].proc_id).to.equal(expected[0].proc_id);
    expect(actual[0].msg_id).to.equal(expected[0].msg_id);
    expect(actual[0].structured_data).to.equal(expected[0].structured_data);
    expect(actual[0].message).to.equal(expected[0].message);
    expect(actual[0].original).to.equal(expected[0].original);

    expect(actual[1].priority).to.equal(expected[1].priority);
    expect(actual[1].syslog_version).to.equal(expected[1].syslog_version);
    expect(actual[1].emitted_at).to.equal(expected[1].emitted_at);
    expect(actual[1].hostname).to.equal(expected[1].hostname);
    expect(actual[1].appname).to.equal(expected[1].appname);
    expect(actual[1].proc_id).to.equal(expected[1].proc_id);
    expect(actual[1].msg_id).to.equal(expected[1].msg_id);
    expect(actual[1].structured_data).to.equal(expected[1].structured_data);
    expect(actual[1].message).to.equal(expected[1].message);
    expect(actual[1].original).to.equal(expected[1].original);
  });

});

describe('_split_lines', function(){

  it('returns an array of strings if a newline exists', function(){
    let string = 'this is line one \n this is line two'
    let lines = herokuLogParser._split_lines(string)

    expect(lines[0]).to.equal('this is line one')
    expect(lines[1]).to.equal('this is line two')
  });

  it('returns an array with a single element if no newlines exist', function(){
    let string = 'this is line one '
    let lines = herokuLogParser._split_lines(string)

    expect(lines[0]).to.equal('this is line one')
  });

});

describe('_counting_frame', function(){

  it('returns the counting frame value if present', function(){
    let line = '1234 foo bar baz'

    expect(herokuLogParser._counting_frame(line)).to.equal(1234)
  });

  it('returns 0 if no counting frame present', function(){
    let line = 'this is line one'

    expect(herokuLogParser._counting_frame(line)).to.equal(0)
  });

});

describe('_parse_line', function(){

  it('parses a given line as expected', function(){
    let line = "156 <40>1 2012-11-30T06:45:26+00:00 heroku web.3 d.73ea7440-270a-435a-a0ea-adf50b4e5f5a - Starting process with command `bundle exec rackup config.ru -p 24405`"
    let data = herokuLogParser._parse_line(line)

    expect(data).to.equal("<40>1 2012-11-30T06:45:26+00:00 heroku web.3 d.73ea7440-270a-435a-a0ea-adf50b4e5f5a - Starting process with command `bundle exec rackup config.ru -p 24405`")
  });

});


describe('_extract_event_data', function(){

  it('returns a structured object given a valid parsed line', function(){
    let line = "156 <40>1 2012-11-30T06:45:26+00:00 heroku web.3 d.73ea7440-270a-435a-a0ea-adf50b4e5f5a - Starting process with command `bundle exec rackup config.ru -p 24405`"
    let data = herokuLogParser._extract_event_data(line)

    expect(data.priority).to.equal(40)
    expect(data.syslog_version).to.equal(1)
    expect(data.emitted_at).to.equal('2012-11-30T06:45:26+00:00')
    expect(data.hostname).to.equal('heroku')
    expect(data.appname).to.equal('web.3')
    expect(data.proc_id).to.equal('d.73ea7440-270a-435a-a0ea-adf50b4e5f5a')
    expect(data.msg_id).to.equal(null)
    expect(data.structured_data).to.equal(null)
    expect(data.message).to.equal('Starting process with command `bundle exec rackup config.ru -p 24405`')
    expect(data.original).to.equal(line.slice(4))
  });

});
