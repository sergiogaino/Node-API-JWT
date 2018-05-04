//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

let fullName = 'Unit Test';
let email = `${makeName(5)}@test.com`;
let password = 123;

describe('User', () => {
/*
* Test the /POST Auth Register
*/
  describe('/POST Auth Register', () => {

    it('(200) it should register a new user and response a registered user', (done) => {
      chai.request(server)
        .post('/auth/register')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({fullName, email, password})
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('fullName');
          res.body.should.have.property('email');
          res.body.should.have.property('_id');
          res.body.should.have.property('created');
          done();
        });
    });

    it('(401) it shshould return an error when trying to register a user without a password', (done) => {
      chai.request(server)
        .post('/auth/register')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({fullName, email, password : ''})
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.equal('password não preenchido');
          done();
        });
    });

  });
});

//make a random name
function makeName(numberOfChars) {
  let text = "";
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < numberOfChars; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}