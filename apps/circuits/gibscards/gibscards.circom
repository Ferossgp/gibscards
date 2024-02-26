pragma circom 2.0.0;

include "../node_modules/circomlib/circuits/bitify.circom";
include "../node_modules/circomlib/circuits/poseidon.circom";

// computes (nullifier + secret)
template CommitmentHasher() {
    signal input nullifier;
    signal input secret;
    signal output commitment;
    signal output nullifierHash;

    component commitmentHasher = Poseidon(2);
    component nullifierHasher = Poseidon(1);

    commitmentHasher.inputs[0] <== nullifier;
    commitmentHasher.inputs[1] <== secret;

    nullifierHasher.inputs[0] <== nullifier;

    commitment <== commitmentHasher.out;
    nullifierHash <== nullifierHasher.out;
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
