var expect = require('chai').expect;
var request = require("request");

describe('User api check',function(){


	var url="http://localhost:5000/api/users/test";

	it('return response 200 ',function(done){

		request(url,function(err,response,body){

			expect(response.statusCode).to.equal(200);
			done();
		})


	})

	var loginUrl="http://localhost:5000/api/users/login";

	it('Login api check',function(done){

		request.post({url:loginUrl,form:{email:'rajendra@gmail.com',password:'123456'}},function(err,response,body){
			console.log(body);					
			expect(response.statusCode).to.equal(200);
			done();

		})


	})


})