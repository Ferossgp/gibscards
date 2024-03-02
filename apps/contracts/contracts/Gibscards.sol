//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

interface IVerifier {
    function verifyProof(
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c,
        uint256[3] memory input
    ) external view returns (bool);
}

struct Commitment {
    address sender;
    uint256 createdAt;
    uint256 sentAt;
    address recipient;
    uint256 denomination;
    bool isUsed;
    IERC20 token;
}

contract Gibscards is ReentrancyGuard {
    using SafeERC20 for IERC20;

    address public verifierAddr;
    address payable public _owner;
    // 0x ExchangeProxy address.
    // See https://docs.0x.org/developer-resources/contract-addresses
    address public exchangeProxy;
    address public marketplaceAddr;

    mapping(bytes32 => bool) public nullifierHashes;
    mapping(bytes32 => Commitment) public commitments;

    event Deposit(
        bytes32 indexed commitment,
        uint256 timestamp,
        address sender,
        address token,
        uint256 denomination
    );
    event Withdrawal(address to, bytes32 nullifierHash);

    constructor(
        address _verifierAddr,
        address _exchangeProxy,
        address _marketplaceAddr
    ) {
        verifierAddr = _verifierAddr;
        _owner = payable(msg.sender);
        exchangeProxy = _exchangeProxy;
        marketplaceAddr = _marketplaceAddr;
    }

    modifier onlyOwner() {
        require(msg.sender == _owner, "ONLY_OWNER");
        _;
    }

    function verifyProof(
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c,
        uint256[3] memory input
    ) public view returns (bool) {
        return IVerifier(verifierAddr).verifyProof(a, b, c, input);
    }

    function deposit(
        bytes32 _commitment,
        uint256 _denomination,
        address token
    ) external nonReentrant {
        require(
            !commitments[_commitment].isUsed,
            "The commitment has been submitted"
        );
        require(_denomination > 0, "Denomination should be greater than 0");

        commitments[_commitment].createdAt = block.timestamp;
        commitments[_commitment].sender = msg.sender;
        commitments[_commitment].denomination = _denomination;
        commitments[_commitment].token = IERC20(token);
        commitments[_commitment].isUsed = true;
        IERC20(token).safeTransferFrom(
            msg.sender,
            address(this),
            _denomination
        );

        emit Deposit(
            _commitment,
            block.timestamp,
            msg.sender,
            token,
            _denomination
        );
    }

    function withdraw(
        uint256[8] calldata _proof,
        bytes32 _nullifierHash,
        bytes32 _commitment,
        address _recipient,
        bytes calldata swapCallData,
        address _buyToken,
        bytes calldata nftSwapCallData,
        bool _isSWAP
    ) external nonReentrant {
        require(
            !nullifierHashes[_nullifierHash],
            "The note has been already spent"
        );
        require(commitments[_commitment].isUsed, "Invalid note");
        require(
            verifyProof(
                [_proof[0], _proof[1]],
                [[_proof[2], _proof[3]], [_proof[4], _proof[5]]],
                [_proof[6], _proof[7]],
                [
                    uint256(_nullifierHash),
                    uint256(_commitment),
                    uint256(uint160(_recipient))
                ]
            ),
            "Invalid Withdraw proof"
        );

        nullifierHashes[_nullifierHash] = true;
        commitments[_commitment].recipient = _recipient;
        commitments[_commitment].sentAt = block.timestamp;

        if (_isSWAP) {
            fillQuote(
                commitments[_commitment].token,
                IERC20(_buyToken),
                exchangeProxy,
                payable(exchangeProxy),
                swapCallData
            );
        }

        swapNFT(nftSwapCallData, IERC20(_buyToken));

        emit Withdrawal(_recipient, _nullifierHash);
    }

    function fillQuote(
        IERC20 sellToken,
        IERC20 buyToken,
        address spender,
        address payable swapTarget,
        bytes calldata swapCallData
    ) internal {
        require(swapTarget == exchangeProxy, "Target not ExchangeProxy");
        uint256 boughtAmount = buyToken.balanceOf(address(this));

        require(sellToken.approve(spender, type(uint256).max));
        (bool success, ) = swapTarget.call{value: msg.value}(swapCallData);
        require(success, "SWAP_CALL_FAILED");
        payable(msg.sender).transfer(address(this).balance);

        boughtAmount = buyToken.balanceOf(address(this)) - boughtAmount;
    }

    function swapNFT(
        bytes calldata nftSwapCallData,
        IERC20 _buyToken
    ) internal {
        require(_buyToken.approve(marketplaceAddr, type(uint256).max));

        (bool success, ) = marketplaceAddr.call(nftSwapCallData);
        require(success, "NFT_CALL_FAILED");
    }
}
