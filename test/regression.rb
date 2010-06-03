#!/usr/bin/env ruby

# assume these executables are in PATH.
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

JS_TESTS.product(JS_EXECUTABLES).each do |test, command|
  puts "# #{test} test on #{command}"
  on_dir(test) do
    system "#{command} run_tests.js"
  end
end

COMMON_JS_TESTS.product(COMMON_JS_EXECUTABLES).each do |test, command|
  puts "# #{test} test on #{command}"
  on_dir(test) do
    system "#{command} test/math_test.js"
    system "#{command} test/incr_test.js"
  end
end
