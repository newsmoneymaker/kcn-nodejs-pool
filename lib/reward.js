/**
 * Block reward of Kylacoin mainnet (src/validation.cpp, GetBlockSubsidy): a standard Bitcoin-style halving.
 * Base subsidy is 0.005 KCN, halved (>>1) every 2,100,000 blocks (consensus.nSubsidyHalvingInterval -- NOT
 * Bitcoin's 210,000, confirmed in kernel/chainparams.cpp's CMainParams; this coin's max supply is a scarce
 * 21,000 KCN, not 21,000,000, with everything else scaled to match). Starting at consensus.nDevRewardHeight,
 * 10% of this subsidy is a mandatory, separate coinbase output to a fixed developer address (checked in
 * ConnectBlock) -- miners get the subsidy's other 90% plus fees. This function returns the full consensus
 * subsidy (informational use, same semantics as every other pool of this family).
 * Amounts in atomic units -- 1 KCN = 1e12 (consensus/amount.h: `COIN = 1000000000000`), NOT 1e8 like Bitcoin.
 * Originally shipped with 1e8/210,000 (copied from the Bitcoin-style tdc-nodejs-pool template without checking
 * this coin's own, different constants) -- found 2026-10-09 from a real getblocktemplate mismatch (live
 * coinbasevalue 2,250,000,000 did not match this function's own output under the old constants at all) and the
 * user noticing the pool's displayed "Last Reward" was comically tiny. No real payout had happened yet
 * (0 blocks found), so this was caught before it could underpay anyone.
 **/
const KCN_BASE = 1000000000000;
const BASE_SUBSIDY = Math.floor(0.005 * KCN_BASE);
const HALVING_INTERVAL = 2100000;

exports.minerReward = function (height) {
	if (!(height >= 0)) return 0;
	let halvings = Math.floor(height / HALVING_INTERVAL);
	if (halvings >= 64) return 0;
	return Math.floor(BASE_SUBSIDY / Math.pow(2, halvings));
};
