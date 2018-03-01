var Nightmare = require("nightmare");
var expect = require("chai").expect;
var app = require('../server.js');

describe("BabyStamp", function() {
  // The default tests in mocha is 2 seconds.
  // Extending it to 30 seconds to have time to load the pages

  this.timeout(30000);
  it("should send user to the login page", function(done) {
    // ID for the login button.
    Nightmare({ show: true })
      .goto("http://localhost:8080")
            // Enter username.
      .type("#username", "tuser")
      // Enter password.
      .type("#password", "1234")
      // Click the login button
      .click("#submit")

      // Click the catalog link
      // .click("a[href='/learn/all']")
      // Evaluate the title
      .evaluate(function() {
        return document.title;
      })
      // Asset the title is as expected
      .then(function(title) {
        expect(title).to.equal("index");
        done();
      });
  });

  // it("should present a link to course catalog after login", function(done) {
  //   new Nightmare({ show: true })
  //     .goto("localhost:8080")
  //     // Enter username.
  //     .type("#username", "test")
  //     // Enter password.
  //     .type("#password", "1234")
  //     // Click the login button
  //     .click("#submit")
  //     // Evaluate the following selector
  //     .evaluate(function() {
  //       // Assert the "learn" link can be found
  //       return document.querySelector("a[href='/learn']");
  //     })
  //     .then(function(link) {
  //       expect(link).to.not.equal(undefined);
  //       done();
  //     });
  // });

  // it("should throw an error for fun", function() {
  //   throw new Error("Failed on purpose, just to make the Mocha output more interesting.");
  // });
});
