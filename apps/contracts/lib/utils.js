const { groth16 } = require("snarkjs");
const crypto = require("crypto");
const circomlib = require("circomlibjs");

const leInt2Buff = require("ffjavascript").utils.leInt2Buff;
const leBuff2int = require("ffjavascript").utils.leBuff2int;
const rbigint = (nbytes) => leBuff2int(crypto.randomBytes(nbytes));
const pedersenHash = (data) =>
  circomlib.babyJub.unpackPoint(circomlib.pedersenHash.hash(data))[0];
const bigInt = require("big-integer");

function toHex(number, length = 32) {
  const str =
    number instanceof Buffer
      ? number.toString("hex")
      : bigInt(number).toString(16);
  return "0x" + str.padStart(length * 2, "0");
}

function generateComitment() {
  return toHex(43);
}

async function generateWithdrawProof(deposit, recipient) {
  const input = {
    nullifierHash: deposit.nullifierHash,
    commitmentHash: deposit.commitment,
    recipient,
    nullifier: deposit.nullifier,
    secret: deposit.secret,
  };
  const wasm = "./zkproof/gibscards.wasm";
  const zkey = "./zkproof/gibscards_final.zkey";

  let dataResult = await exportCallDataGroth16(input, wasm, zkey);

  return dataResult;
}

async function createDeposit({ nullifier, secret }) {
  const preimage = Buffer.concat([
    leInt2Buff(nullifier, 31),
    leInt2Buff(secret, 31),
  ]);

  //generateCommitmentHash
  const commitment = pedersenHash(preimage);
  const commitmentHex = toHex(commitment);

  //generateNullifierHash
  const nullifierHash = pedersenHash(leInt2Buff(nullifier, 31));
  const nullifierHex = toHex(nullifierHash).toString();

  return {
    nullifier,
    secret,
    preimage,
    commitment,
    commitmentHex,
    nullifierHash,
    nullifierHex,
  };
}

function generateDeposit() {
  const secret = rbigint(31);
  const nullifier = rbigint(31);
  return createDeposit({ nullifier, secret });
}

async function exportCallDataGroth16(input, wasmPath, zkeyPath) {
  const { proof: proof, publicSignals: _publicSignals } =
    await groth16.fullProve(input, wasmPath, zkeyPath);

  const calldata = await groth16.exportSolidityCallData(proof, _publicSignals);

  const argv = calldata
    .replace(/["[\]\s]/g, "")
    .split(",")
    .map((x) => BigInt(x).toString());

  const a = [argv[0], argv[1]];
  const b = [
    [argv[2], argv[3]],
    [argv[4], argv[5]],
  ];
  const c = [argv[6], argv[7]];
  const Input = [];

  for (let i = 8; i < argv.length; i++) {
    Input.push(argv[i]);
  }

  const proofData = [
    argv[0],
    argv[1],
    argv[2],
    argv[3],
    argv[4],
    argv[5],
    argv[6],
    argv[7],
  ];

  return { a, b, c, Input, proofData };
}

module.exports = {
  exportCallDataGroth16,
  createDeposit,
  generateComitment,
  generateDeposit,
  generateWithdrawProof,
};
