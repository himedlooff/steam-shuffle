var request = require('supertest'),
	expect = require('chai').expect,
	should = require('chai').should(),
	express = require('express');

var app = require('../app.js');

describe('GET /', function(){
	it('/ respond with plain text', function(done){
		request(app)
			.get('/')
			.expect(200, done);
	})
})

describe('GET /about', function(){
	it('/about respond with plain text', function(done){
		request(app)
			.get('/about')
			.expect(200, done)
	})
})

describe('GET /login', function(){
	it('/login respond with plain text', function(done){
		request(app)
			.get('/login')
			.expect(200, done)
	})
})

describe('GET /logout', function(){
	it('/logout respond with plain text', function(done){
		request(app)
			.get('/logout')
			.end(function(err, res){
				if (err) return done(err);
				res.header['location'].should.be.eql('/');
				done();
			})
	})
})

describe('GET /games', function(){
	it('/games redirects to login if not logged in', function(done){
		request(app)
			.get('/games')
			.end(function(err, res){
				if (err) return done(err);
				res.header['location'].should.be.eql('/login');
				done();
			});
	})
})


describe('GET /shuffle', function(){
	it('/shuffle should redirect to login if not logged in', function(done){
		request(app)
			.get('/shuffle')
			.end(function(err, res){
				if (err) return done(err);
				res.header['location'].should.to.be.eql('/login');
				done();
			})
	});
})


describe('GET /account', function(){
	it('/account should redirect to login if not logged in', function(done){
		request(app)
			.get('/account')
			.end(function(err, res){
				if (err) return done(err);
				res.header['location'].should.be.eql('/login');
				done();
			})
	});
})

describe('GET /404', function(){
	it('/404 page should be display when no route found', function(done){
		request(app)
			.get('/none')
			.expect(404, done);
	})
})