# -*- coding: utf-8 -*-

describe 'QUnit Version Compatibility' do

  expected_output = <<-EOS
# module: math module
# test: add
ok 1
ok 2
ok 3 - passing 3 args
ok 4 - just one arg
ok 5 - no args
not ok 6 - expected: '7' got: '1'
not ok 7 - with message, expected: '7' got: '1'
ok 8
ok 9 - with message
not ok 10
not ok 11 - with message
# module: incr module
# test: increment
ok 12
ok 13
# module: TAP spec compliance
# test: Diagnostic lines
ok 14 - with\r
# multiline
# message
not ok 15 - with\r
# multiline
# message, expected: 'foo\r
# bar' got: 'foo
# bar'
not ok 16 - with\r
# multiline
# message, expected: 'foo
# bar' got: 'foo\r
# bar'
1..16
EOS


  pretty_old_output = <<-EOS
# module: math module
# test: add
ok 1 - okay: 5
ok 2 - okay: -1
ok 3 - passing 3 args: 8
ok 4 - just one arg: 2
ok 5 - no args: 0
not ok 6 - failed, expected: 7 result: 1
not ok 7 - with message, expected: 7 result: 1
ok 8
ok 9 - with message
not ok 10
not ok 11 - with message
# module: incr module
# test: increment
ok 12 - okay: 2
ok 13 - okay: -2
# module: TAP spec compliance
# test: Diagnostic lines
ok 14 - with\r
# multiline
# message
not ok 15 - with\r
# multiline
# message, expected: "foo\r
# bar" result: "foo
# bar"
not ok 16 - with\r
# multiline
# message, expected: "foo
# bar" result: "foo\r
# bar"
1..16
EOS

  SUITE_DIR = File.expand_path(File.join(File.dirname(__FILE__), 'compatibility'))
  VERSIONS = Dir.glob("#{SUITE_DIR}/*").map{|d| d.split('/').last}.sort.freeze
  QUNIT_RUNNER = File.expand_path(File.join(File.dirname(__FILE__), '..', 'sample', 'js', 'run_qunit.js'))

  VERSIONS.each do |version|
    context "compatibility test upon #{version}" do
      before do
        @output = `phantomjs #{QUNIT_RUNNER} file://#{SUITE_DIR}/#{version}/test_compat.html`
      end
      subject { @output }
      case version
      when "001_two_args"
        it { should == pretty_old_output }
      else
        it { should == expected_output }
      end
    end
  end

end
