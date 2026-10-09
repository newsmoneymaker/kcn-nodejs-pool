/**
 * Block reward of Kylacoin mainnet (src/validation.cpp, GetBlockSubsidy): a standard Bitcoin-style halving.
 * Base subsidy is 0.005 KCN, halved (>>1) every 210,000 blocks (consensus.nSubsidyHalvingInterval). Starting
 * at consensus.nDevRewardHeight, 10% of this subsidy is a mandatory, separate coinbase output to a fixed
 * developer address (checked in ConnectBlock) -- miners get the subsidy's other 90% plus fees. This function
 * returns the full consensus subsidy (informational use, same semantics as every other pool of this family).
 * Amounts in atomic units (1 KCN = 1e8).
 **/
const KCN_BASE = 100000000;
const BASE_SUBSIDY = Math.floor(0.005 * KCN_BASE);
const HALVING_INTERVAL = 210000;

exports.minerReward = function (height) {
	if (!(height >= 0)) return 0;
	let halvings = Math.floor(height / HALVING_INTERVAL);
	if (halvings >= 64) return 0;
	return Math.floor(BASE_SUBSIDY / Math.pow(2, halvings));
};
