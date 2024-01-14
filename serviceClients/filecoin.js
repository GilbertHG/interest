import { CarReader } from '@ipld/car'
import * as Signer from '@ucanto/principal/ed25519'
import * as Client from '@web3-storage/w3up-client'
import {importDAG} from "@ucanto/core/delegation";
import {StoreMemory} from "@web3-storage/access/stores/store-memory";

/**
 * Connects to Filecoin using the specified private key and returns the connected client.
 *
 * @async
 * @function
 * @returns {Promise<Client>} A promise that resolves with the connected Filecoin client.
 * @throws {Error} Throws an error if there's an issue with connecting to Filecoin.
 */
export const connectToFilecoin = async () => {
	try {
		// Load client with a specific private key
		const principal = Signer.parse(process.env.FILECOIN_PRIVATE_KEY);
		
		// Create a Filecoin client with the loaded private key
		const filecoinClient = await Client.create({ principal, store: new StoreMemory() });
		
		// Add proof that this agent has been delegated capabilities on the space
		const proof = await parseProof(process.env.FILECOIN_PROOF);
		const space = await filecoinClient.addSpace(proof);
		
		// Return the connected Filecoin client
		return filecoinClient;
	} catch (error) {
		console.error('Error connecting to Filecoin:', error);
		throw new Error('Failed to connect to Filecoin');
	}
};


/**
 * Parses the provided base64-encoded CAR file data to create a Delegation.
 *
 * @async
 * @function
 * @param {string} data - Base64-encoded CAR file data.
 * @returns {Promise<Delegation>} A promise that resolves with a Delegation instance.
 * @throws {Error} Throws an error if there's an issue with parsing or importing the blocks.
 */
async function parseProof(data) {
	const blocks = []
	const reader = await CarReader.fromBytes(Buffer.from(data, 'base64'))
	for await (const block of reader.blocks()) {
		blocks.push(block)
	}
	return importDAG(blocks)
}