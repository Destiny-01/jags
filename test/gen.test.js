const assert = require("assert");
const path = require("path");
const fs = require("fs");
const jags = require("../src/gen");

// Remove all generated files before tests are run
before(() => {
  fs.readdir("test/jsons", (err, files) => {
    const jsonFiles = files.filter((file) => path.extname(file) === ".js");
    jsonFiles.forEach((file) => fs.unlink(path.join(".", file), (err) => {}));
  });
  setTimeout(() => jags(), 1500);
});

beforeEach((done) => setTimeout(done, 1500));

describe("JAGS test preview", () => {
  it("should print jags test preview", () => {
    const end = "jags test preview";
    let combo = "jags" + " test preview";
    assert.strictEqual(end, combo);
  });
});

describe("Check that jags only runs for deployed files", () => {
  it("should successfully run jags on a json file containing just the abi", () => {
    fs.readFile("Marketplace.js", "utf8", (err, data) => {
      if (err) {
        assert.fail("File does not exist");
      }
    });
  });
  it("should successfully run jags on a json file containing the abi and other details", () => {
    fs.readFile("AuctionContract.js", "utf8", (err, data) => {
      if (err) {
        assert.fail("File does not exist");
      }
    });
  });
  // This will fail for open zeppelin files, so we'll have to avoid that folder later on
  it("should fail to run jags on a json file generated by external libraries", () => {
    fs.readFile("IERC20Token.js", "utf8", (err, data) => {
      if (!err) {
        assert.fail("Something went wrong, jags not working properly");
      }
    });
  });
  it("should fail to run jags on a normal random json file", () => {
    fs.readFile("notABI.js", "utf8", (err, data) => {
      if (!err) {
        assert.fail("Something went wrong, jags not working properly");
      }
    });
  });
});