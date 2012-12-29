# -*- coding: utf-8 -*-
require 'fileutils'
require 'rubygems'
require 'versionomy'

describe 'QUnit Version Compatibility' do
  SUITE_DIR = File.expand_path(File.join(File.dirname(__FILE__), 'compatibility'))
  VERSIONS = Dir.glob("#{SUITE_DIR}/*").map{|d| d.split('/').last}.sort.freeze
  QUNIT_RUNNER = File.expand_path(File.join(File.dirname(__FILE__), '..', 'sample', 'js', 'run_qunit.js'))
  SUITE_FILE_NAME = 'test_compat.html'
  SUITE_FILE = "#{File.dirname(__FILE__)}/phantomjs/#{SUITE_FILE_NAME}"
  HEAD_VERSION_TEST_DIR = "#{SUITE_DIR}/current"
  EXPECTATION_DIR = File.expand_path(File.join(File.dirname(__FILE__), 'expected'))

  def self.lessThan(base, version)
    begin
      return Versionomy.parse(version) < Versionomy.parse(base)
    rescue Versionomy::Errors::ParseError => e
    end
    true
  end

  before(:all) do
    FileUtils::mkdir_p HEAD_VERSION_TEST_DIR
    FileUtils::cp SUITE_FILE, HEAD_VERSION_TEST_DIR
    FileUtils::cp File.join(SUITE_DIR, 'stable', 'qunit.js'), HEAD_VERSION_TEST_DIR
  end
  after(:all) do
    FileUtils::rm_rf HEAD_VERSION_TEST_DIR
  end

  VERSIONS.each do |version|
    context "compatibility test upon #{version}" do
      before do
        unless File.exist? File.join(SUITE_DIR, version, SUITE_FILE_NAME)
          FileUtils::cp SUITE_FILE, File.join(SUITE_DIR, version)
        end
      end
      after do
        FileUtils::rm File.join(SUITE_DIR, version, SUITE_FILE_NAME)
      end
      let(:output) { `phantomjs #{QUNIT_RUNNER} file://#{SUITE_DIR}/#{version}/#{SUITE_FILE_NAME}` }

      case
      when version == "001_two_args"
        it { output.should == File.read(File.join(EXPECTATION_DIR, '001_format.txt')) }
      when version == "stable"
        it { output.should == File.read(File.join(EXPECTATION_DIR, 'latest_format.txt')) }
      when lessThan('1.4.0', version)
        it { output.should == File.read(File.join(EXPECTATION_DIR, 'output_before_1_4_0.txt')) }
      when lessThan('1.10.0', version)
        it { output.should == File.read(File.join(EXPECTATION_DIR, 'output_before_1_10_0.txt')) }
      else
        it { output.should == File.read(File.join(EXPECTATION_DIR, 'latest_format.txt')) }
      end
    end
  end

end
