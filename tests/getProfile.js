var expect = require('chai').expect;
var app = require('../SmokinSpaceJam/server.js');
var request = require('supertest');

//let's set up the data we need to pass to the login method
const userCredentials = {
  username: 'tuser', 
  password: '1234'
}
//now let's login the user before we run any tests
// this test says: make a POST to the /login route with the email: sponge@bob.com, password: garyTheSnail
// after the POST has completed, make sure the status code is 200 
// also make sure that the user has been directed to the /home page

describe('GET /login', function(done){

//addresses 1st bullet point: if the user is logged in we should get a 200 status code
var authenticatedUser = request.agent(app);
before(function(done){
  this.enableTimeouts(false);
  // app.listen(process.env.PORT || 8080 );
  authenticatedUser
    .post('/authenticate')
    .send(userCredentials)
    .end(function(err, response){
      expect(response.statusCode).to.equal(302);
      expect('Location', '/index');
      done();
    });
});
  it('should return a 302 response if the user is logged in', function(done){
    authenticatedUser.get('/login')

    .then(function() {
      expect(response.statusCode).to.equal(302);
      done();
    });
  });
// //addresses 2nd bullet point: if the user is not logged in we should get a 302 response code and be directed to the /login page
//   it('should return a 302 response and redirect to /login', function(done){
//     request(app).get('/login')
//     .expect('Location', '/index')
//     .expect(302, done);
//   });
});

  // describe('GET /', function(){
  //   it('should respond OK', function(done){
  //     request(app)
  //       .get('/')
  //       .end(function(err, res){
  //         res.status.should.equal(200);
  //         done(err);
  //       });
  //   });
  // });
