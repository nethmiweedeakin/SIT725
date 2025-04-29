//Description: This is a test file for the addTwoNumbers API. It checks if the API is working correctly by sending requests and validating the responses. The tests include checking the status code, response body, and result type. The tests also include cases for valid and invalid inputs.

var expect  = require("chai").expect;
var request = require("request");
const cheerio = require("cheerio");
const chaiHttp = require("chai-http");


describe("Add Two Numbers", function() {
    var url = "http://localhost:8080/addTwoNumbers/3/5";
    it("returns status 200 to check if api works", function(done) {
        request(url, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done()
          });
    });
    it("returns statusCode key in body to check if api give right result should be 200", function(done) {
        request(url, function(error, response, body) {
            body = JSON.parse(body)
            expect(body.statusCode).to.equal(200);
            done()
          });
    });
    it("returns the result as number", function(done) {
        request(url, function(error, response, body) {
            body = JSON.parse(body)
            expect(body.result).to.be.a('number');
            done()
          });
    });
    it("returns the result equal to 8", function(done) {
      request(url, function(error, response, body) {
          body = JSON.parse(body)
          expect(body.result).to.equal(8);
          done()
        });
  });
  it("returns the result not equal to 15", function(done) {
    request(url, function(error, response, body) {
        body = JSON.parse(body)
        expect(body.result).to.not.equal(15);
        done()
      });
});
  });

  describe("Add Two strings", function() {
    var url = "http://localhost:8080/addTwoNumbers/a/b";
    it("should return status 200", function(done) {
        request(url, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done()
          });
    });
    it("returns statusCode key in body to check if api gives right result should be 400", function(done) {
        request(url, function(error, response, body) {
            body = JSON.parse(body)
            expect(body.statusCode).to.equal(400);
            done()
          });
    });
    it("returns the result as null", function(done) {
        request(url, function(error, response, body) {
            body = JSON.parse(body)
            expect(body.result).to.be.a('null');
            done()
          });
    });
  });


  describe("Check API gets data", function() {
    var url = "http://localhost:8080/api/projects";
    it("should return status 200", function(done) {
        request(url, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done()
          });
    });
    it("returns the result as array", function(done) {
      request(url, function(error, response, body) {
          body = JSON.parse(body)
          expect(body.data).to.be.an('array'); // Check the 'data' property
          done()
      });
    });  
      it("each item in data should have title, image, link, and description", function (done) {
        request(url, function (error, response, body) {
          body = JSON.parse(body);
          if (body.data.length > 0) {
            const item = body.data[0];
            expect(item).to.have.property("title");
            expect(item).to.have.property("image");
            expect(item).to.have.property("link");
            expect(item).to.have.property("description");
          }
          done();
        });
      });
  });
 
  describe("HTML View Rendering with Request", function () {
    const url = "http://localhost:8080"; 
  
    it("should load the homepage with status 200", function (done) {
      request(url, function (error, response, body) {
        expect(error).to.be.null;
        expect(response && response.statusCode).to.equal(200);
        done();
      });
    });
  
    it("should contain the heading 'Welcome to SIT 725 Week 3'", function (done) {
      request(url, function (error, response, body) {
        expect(error).to.be.null;
        const $ = cheerio.load(body);
        const headingText = $("#heading").text();
        expect(headingText).to.include("Welcome to SIT 725 Week 3");
        done();
      });
    });
  
    it("should render at least one card in #card-section", function (done) {
      request(url, function (error, response, body) {
        expect(error).to.be.null;
        const $ = cheerio.load(body);
        const cardCount = $("#card-section .card").length;
        expect(cardCount).to.be.at.least(1);
        done();
      });
    });
  
    it("should display an image and title inside the first card", function (done) {
      request(url, function (error, response, body) {
        expect(error).to.be.null;
        const $ = cheerio.load(body);
        const firstCard = $("#card-section .card").first();
        const imgSrc = firstCard.find("img").attr("src");
        const cardTitle = firstCard.find(".card-title").text();
        expect(imgSrc).to.exist;
        expect(cardTitle).to.not.be.empty;
        done();
      });
    });
  });
  
describe("Check POST API", function () {
  const baseUrl = "http://localhost:8080";
  const testProject = {
    title: "Created by Test",
    image: "/images/kitten.jpg",
    link: "http://example.com/project",
    description: "This is a test by mocha."
  };


  it("should create a new project", function (done) {
    request.post({
      url: `${baseUrl}/api/projects`,
      json: true,
      body: testProject
    }, function (error, response, body) {
      expect(error).to.be.null;
      expect(response.statusCode).to.equal(200);
      done();    });
  });
});