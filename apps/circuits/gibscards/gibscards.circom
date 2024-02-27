pragma circom 2.0.0;

include "../node_modules/circomlib/circuits/bitify.circom";
// include "../node_modules/circomlib/circuits/poseidon.circom";
include "../node_modules/circomlib/circuits/pedersen.circom";

// computes (nullifier + secret)
template CommitmentHasher() {
    signal input nullifier;
    signal input secret;
    signal output commitment;
    signal output nullifierHash;

    component commitmentHasher = Pedersen(496);
    component nullifierHasher = Pedersen(248);
    component nullifierBits = Num2Bits(248);
    component secretBits = Num2Bits(248);
    nullifierBits.in <== nullifier;
    secretBits.in <== secret;
    for (var i = 0; i < 248; i++) {
        nullifierHasher.in[i] <== nullifierBits.out[i];
        commitmentHasher.in[i] <== nullifierBits.out[i];
        commitmentHasher.in[i + 248] <== secretBits.out[i];
    }

    commitment <== commitmentHasher.out[0];
    nullifierHash <== nullifierHasher.out[0];
}

template Withdraw() {
    //pulic inputs
    signal input nullifierHash;
    signal input commitmentHash;
    signal input recipient;

    // private inputs
    signal input nullifier;
    signal input secret;

    component hasher = CommitmentHasher();
    hasher.nullifier <== nullifier;
    hasher.secret <== secret;
    hasher.nullifierHash === nullifierHash;
    hasher.commitment === commitmentHash;
}

component main {public [nullifierHash,commitmentHash,recipient]} = Withdraw();
