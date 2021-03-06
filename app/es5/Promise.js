"use strict";
describe("promises", function() {
  it("should execute the callback given to then", function(done) {
    var promise = new Promise(function(resolve, reject) {
      resolve();
    });
    promise.then(function() {
      done();
    });
  });
  it("should receive the resolved data", function(done) {
    var promise = new Promise(function(resolve, reject) {
      resolve(1);
    });
    promise.then(function(data) {
      expect(data).toBe(1);
      done();
    });
  });
  it("should fail the when rejected", function(done) {
    var promise = new Promise(function(resolve, reject) {
      reject(Error('oh noes'));
    });
    promise.then(function(data) {}, function(error) {
      expect(error.message).toBe('oh noes');
      done();
    });
  });
  it("should have a catch", function(done) {
    var promise = new Promise(function(resolve, reject) {
      reject(Error('oh noes'));
    });
    promise.catch(function(error) {
      expect(error.message).toBe('oh noes');
      done();
    });
  });
  it("should compose when resolved with a promise", function(done) {
    var prevPromise = new Promise(function(resolve, reject) {
      resolve(3);
    });
    var promise = new Promise(function(resolve, reject) {
      resolve(prevPromise);
    });
    promise.then(function(data) {
      expect(data).toBe(3);
      done();
    });
  });
  it("should have a static resolve", function(done) {
    var prevPromise = Promise.resolve(3);
    var promise = Promise.resolve(prevPromise);
    promise.then(function(data) {
      expect(data).toBe(3);
      done();
    });
  });
  it("should have a static reject", function(done) {
    var promise = Promise.reject(Error('oh noes'));
    promise.catch(function(error) {
      expect(error.message).toBe('oh noes');
      done();
    });
  });
  it("should be a sync", function(done) {
    var async = false;
    var promise = new Promise(function(resolve, reject) {
      resolve();
    });
    promise.then(function(data) {
      expect(async).toBe(true);
      done();
    });
    async = true;
  });
  it("should chain sequentially using then", function(done) {
    getOrder(3).then(function(order) {
      return getUser(order.userId);
    }).then(function(user) {
      return getCompany(user.companyId);
    }).then(function(company) {
      expect(company.name).toBe('Pluralsight');
      done();
    }).catch(function(error) {});
  });
  it("should execute after all promises with all", function(done) {
    done();
  });
  it("should be difficult to read with regular async", function() {
    console.log('start');
    oldPause(500, function() {
      console.log('middle');
      oldPause(500, function() {
        console.log('end');
      });
    });
  });
  it("should be easier to read with generators", function(done) {
    var $__0 = $traceurRuntime.initGeneratorFunction(main);
    function main() {
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              console.log('start');
              $ctx.state = 10;
              break;
            case 10:
              $ctx.state = 2;
              return pause(500);
            case 2:
              $ctx.maybeThrow();
              $ctx.state = 4;
              break;
            case 4:
              console.log('middle');
              $ctx.state = 12;
              break;
            case 12:
              $ctx.state = 6;
              return pause(500);
            case 6:
              $ctx.maybeThrow();
              $ctx.state = 8;
              break;
            case 8:
              console.log('end');
              done();
              $ctx.state = -2;
              break;
            default:
              return $ctx.end();
          }
      }, $__0, this);
    }
    async.run(main);
  });
});

//# sourceMappingURL=Promise.js.map
