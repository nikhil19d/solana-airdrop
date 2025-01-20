import { NextRequest, NextResponse } from "next/server"
import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js"
export const POST = async ( req : NextRequest ) =>{
  try {
    const body = await req.json()
    const { publicKey, quantity } = body
    const solanaConnection = new Connection(process.env.URL ?? "")
    console.log('conn establish')
    const address = new PublicKey(publicKey)
    const airdropSign = solanaConnection.requestAirdrop(address, parseFloat(quantity)*LAMPORTS_PER_SOL)
    console.log("connection successfull")
    try {
      const txid = await airdropSign
      console.log('in txid block')
      return NextResponse.json({msg : txid})        
// return NextResponse.json({transactionId : txid})
    } catch (error) {
      console.log('failed')
      return NextResponse.json({msg: 'transaction limit exceeded please try after some time'})
    }
  } catch (error) {
  console.log('data had not received')
    return NextResponse.json({msg: error})
  }
}
