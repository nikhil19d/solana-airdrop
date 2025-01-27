import { NextRequest, NextResponse } from "next/server"
import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js"
export const POST = async ( req : NextRequest ) =>{
  try {
    const body = await req.json()
    const { publicKey, quantity } = body
    const solanaConnection = new Connection(process.env.URL ?? "","processed")
    const address = new PublicKey(publicKey)
    try {
      const txid = await solanaConnection.requestAirdrop(address, parseFloat(quantity)*LAMPORTS_PER_SOL)
      return NextResponse.json({res: 'success', msg : txid})
    } catch {
      return NextResponse.json({res: 'fail',msg: 'Transaction limit exceeded please try again after some time'})
    }
  } catch (error) {
    return NextResponse.json({res: 'fail',msg: error})
  }
}
