import { CircuitSignals, groth16 } from "snarkjs";
import circomlib from "circomlibjs";
import { utils } from "ffjavascript";
const { leInt2Buff, leBuff2int } = utils;

function randomBytes(n: number) {
  const crypto = self.crypto,
    QUOTA = 65536;
  const a = new Uint8Array(n);
  for (let i = 0; i < n; i += QUOTA) {
    crypto.getRandomValues(a.subarray(i, i + Math.min(n - i, QUOTA)));
  }
  return a;
}

const rbigint = (nbytes: number) => leBuff2int(randomBytes(nbytes));

const pedersenHash = (data) =>
  circomlib.babyJub.unpackPoint(circomlib.pedersenHash.hash(data))[0];


function toHex(number: Buffer | Uint8Array | number, length = 32) {
  const str =
    number instanceof Buffer
      ? number.toString("hex")
      : number instanceof Uint8Array
        ? Buffer.from(number).toString("hex")
        : BigInt(number).toString(16);
  return "0x" + str.padStart(length * 2, "0");
}

export function generateComitment() {
  return toHex(43);
}

export function generateWithdrawProof(deposit: {
  nullifierHex: string;
  commitmentHex: string;
  nullifier: string;
  secret: string;
}, recipient: string) {
  const input = {
    nullifierHash: BigInt(deposit.nullifierHex),
    commitmentHash: BigInt(deposit.commitmentHex),
    recipient,
    nullifier: BigInt(deposit.nullifier),
    secret: BigInt(deposit.secret),
  };
  const wasm = "./zkproof/gibscards.wasm";
  const zkey = "./zkproof/gibscards_final.zkey";

  return exportCallDataGroth16(input, wasm, zkey);
}

export async function createDeposit({
  nullifier,
  secret,
}: {
  nullifier: bigint;
  secret: bigint;
}) {
  const preimage = Buffer.concat([
    leInt2Buff(nullifier, 31),
    leInt2Buff(secret, 31),
  ]);

  //generateCommitmentHash
  const commitment = await pedersenHash(preimage);
  const commitmentHex = toHex(commitment);

  //generateNullifierHash
  const nullifierHash = await pedersenHash(leInt2Buff(nullifier, 31));
  const nullifierHex = toHex(nullifierHash).toString();

  return {
    nullifier,
    secret,
    commitmentHex,
    nullifierHex,
  };
}

export function generateDeposit() {
  const secret = rbigint(31);
  const nullifier = rbigint(31);
  return createDeposit({ nullifier, secret });
}

export async function exportCallDataGroth16(
  input: CircuitSignals,
  wasmPath: string,
  zkeyPath: string
) {
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
