'use strict' ;

let fs = require('fs');
let mocha = require('mocha');
let should = require('should');

let generator = require('./');

describe('dockerfile-generator', function() {

  it('Invalid JSON', function(done) {
    generator.generate(fs.readFileSync('./tests/1_unparsable_input.json'), function(err, result) {
      should.exist(err) ;
    });
    done() ;
  }) ;
  it('Full test with all element ok', function(done) {
    let expected = fs.readFileSync('./tests/all_element_test.out');
    generator.generate(fs.readFileSync('./tests/all_element_test_input.json'), function(err, result) {
      should.not.exist(err) ;
      should.equal(result,expected.toString()) ;
    });
    done() ;
  }) ;

  it('ImageName does not exist', function(done) {
    generator.generate(fs.readFileSync('./tests/3_parsable_input_imagename_missing.json'), function(err, result) {
      should.exist(err) ;
    });
    done() ;
  }) ;

  it('ImageVersion does not exist', function(done) {
    generator.generate(fs.readFileSync('./tests/4_parsable_input_imageversion_missing.json'), function(err, result) {
      should.exist(err) ;
    });
    done() ;
  }) ;
  it('ImageName and imageVersion are missing', function(done) {
    generator.generate(fs.readFileSync('./tests/5_parsable_input_imageinfos_missing.json'), function(err, result) {
      should.exist(err) ;
      should.equal(err.message, 'Input JSON has a semantic error! (imagename or imageversion)') ;
    });
    done() ;
  }) ;
  it('Copy element missing', function(done) {
    generator.generate(fs.readFileSync('./tests/6_parsable_input_copy_missing.json'), function(err, result) {
      should.exist(err) ;
      should.equal(err.message, 'Input JSON has a semantic error! (copy)') ;
    });
    done() ;
  }) ;
  it('RUN element missing', function(done) {
    generator.generate(fs.readFileSync('./tests/7_parsable_input_run_missing.json'), function(err, result) {
      should.exist(err) ;
      should.equal(err.message, 'Input JSON has a semantic error! (run)') ;
    });
    done() ;
  }) ;
});