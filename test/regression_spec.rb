#!/usr/bin/env ruby

require 'rubygems'
require 'spec'

# assuming these executables are in PATH.
# memo: 'spidermonkey' is a symlink to my local spidermonkey build.
JS_EXECUTABLES = %w[rhino spidermonkey]
COMMON_JS_EXECUTABLES = %w[node narwhal]

JS_TESTS = %w[js interop]
COMMON_JS_TESTS = %w[commonjs interop]

SAMPLE_DIR = File.expand_path(File.join(File.dirname(__FILE__), '..', 'sample'))
def on_dir(name)
  savedir = Dir.pwd
  begin
    Dir.chdir(File.join(SAMPLE_DIR, name))
    yield
  ensure
    Dir.chdir(savedir)
  end
end


describe 'TAP Output' do

  js_expected = <<-EOS
1..13
# module: math module
# test: add
ok 1 - undefined, expected: 5
ok 2 - undefined, expected: -1
ok 3 - passing 3 args, expected: 8
ok 4 - just one arg, expected: 2
ok 5 - no args, expected: 0
not ok 6 - undefined, expected: 7 result: 1, diff: 7 1 
not ok 7 - with message, expected: 7 result: 1, diff: 7 1 
ok 8 - undefined
ok 9 - with message
not ok 10 - undefined
not ok 11 - with message
# module: incr module
# test: increment
ok 12 - undefined, expected: 2
ok 13 - undefined, expected: -2
EOS

  JS_TESTS.product(JS_EXECUTABLES).each do |test, command|
    context "#{test} test on #{command}" do
      before do
        on_dir(test) do
          @output = `#{command} run_tests.js`
        end
      end
      subject { @output }
      it { should == js_expected }
    end
  end


  commonjs_math_expected = <<-EOS
1..11
# module: math module
# test: add
ok 1 - undefined, expected: 5
ok 2 - undefined, expected: -1
ok 3 - passing 3 args, expected: 8
ok 4 - just one arg, expected: 2
ok 5 - no args, expected: 0
not ok 6 - undefined, expected: 7 result: 1, diff: 7 1 
not ok 7 - with message, expected: 7 result: 1, diff: 7 1 
ok 8 - undefined
ok 9 - with message
not ok 10 - undefined
not ok 11 - with message
EOS

  commonjs_incr_expected = <<-EOS
1..2
# module: incr module
# test: increment
ok 1 - undefined, expected: 2
ok 2 - undefined, expected: -2
EOS


  COMMON_JS_TESTS.product(COMMON_JS_EXECUTABLES).each do |test, command|
    context "#{test} test on #{command}" do
      context "math" do
        before do
          on_dir(test) do
            @output = `#{command} test/math_test.js`
          end
        end
        subject { @output }
        it { should == commonjs_math_expected }
      end
      context "incr" do
        before do
          on_dir(test) do
            @output = `#{command} test/incr_test.js`
          end
        end
        subject { @output }
        it { should == commonjs_incr_expected }
      end
    end
  end

end
