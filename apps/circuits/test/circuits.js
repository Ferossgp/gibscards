const { assert } = require("chai");
const wasm_tester = require("circom_tester").wasm;

describe("gibscards circuit", function () {
  let gibscardsCircuit;

  before(async function () {
    gibscardsCircuit = await wasm_tester("gibscards/gibscards.circom");
  });
});
