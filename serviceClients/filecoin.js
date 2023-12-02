import { filesFromPaths } from 'files-from-path'
import { create } from '@web3-storage/w3up-client'

export const connectToFilecoin = async () => {
    // authorize your local agent to act on your behalf
    const client = await create()
    await client.login(process.env.FILECOIN_EMAIL)

    // create a Space, a decentralized bucket for your files
    const space = await client.createSpace(process.env.FILECOIN_NAME)
    await client.setCurrentSpace(space.did())

    console.log(`Space DID: ${space.did()}`)
    console.log(`Gateway URL: https://w3s.link/ipfs/${cid}`)

    return client;
}