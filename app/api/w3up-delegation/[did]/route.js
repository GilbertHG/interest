import { CarReader } from '@ipld/car'
import * as DID from '@ipld/dag-ucan/did'
import * as Delegation from '@ucanto/core/delegation'
import * as Signer from '@ucanto/principal/ed25519'
import * as Client from '@web3-storage/w3up-client'

export const GET = async (request, { params }) => {
	try {
		// Load client with specific private key
		const principal = Signer.parse(process.env.FILECOIN_KEY)
		const client = await Client.create({ principal })
		
		// Add proof that this agent has been delegated capabilities on the space
		const proof = await parseProof(process.env.FILECOIN_PROOF)
		const space = await client.addSpace(proof)
		await client.setCurrentSpace(space.did())
		
		// Create a delegation for a specific DID
		const audience = DID.parse(params.did)
		const abilities = ['store/add', 'upload/add']
		const expiration = Math.floor(Date.now() / 1000) + (60 * 60 * 24) // 24 hours from now
		const delegation = await client.createDelegation(audience, abilities, { expiration })
		
		// Serialize the delegation and send it to the client
		const archive = await delegation.archive()
		return archive.ok
	} catch (e) {
		return new Response("Failed to get UCAN delegation", {
			status: 500
		});
	}
};

/** @param {string} data Base64 encoded CAR file */
async function parseProof(data) {
	const blocks = []
	const reader = await CarReader.fromBytes(Buffer.from(data, 'base64'))
	for await (const block of reader.blocks()) {
		blocks.push(block)
	}
	return Delegation.importDAG(blocks)
}