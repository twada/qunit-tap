#!/usr/bin/perl
use strict;
use warnings;

use TAP::Spec::Parser;
use Test::More;
use Path::Class;

for my $file ( dir('test/expected')->children ) {
  next unless $file =~ m{\.txt};
  my $result = eval {
    TAP::Spec::Parser->parse_from_file($file);
  };
  my $error = $@;
  ok $result, "Got parse for valid TAP";
  ok !$error, "No parse error for valid TAP";
  ok !$result->passed, "Valid TAP failed tests";
  is $result->plan->number_of_tests, 36, "Planned 36 tests";
  my @tests = $result->tests;
  is scalar @tests, 36, "Found 36 tests";
}

done_testing;
