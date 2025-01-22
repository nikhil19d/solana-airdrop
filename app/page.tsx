'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, XCircle, Code } from 'lucide-react'
import { PublicKey } from '@solana/web3.js'
import Link from 'next/link'

export default function SolanaAirdrop() {
    const quantity = ['0.5','1.0','1.5','2.0']
    interface detailsType {
      publicKey:string,
      quantity:string,
      isLoading:boolean
    }
    interface StatusMessage {
      res: "success" | "fail" | null
      msg: string
    }
    const [details, setDetails] = useState<detailsType>({
      publicKey: "",
      quantity: "",
      isLoading: false
    })
    const [statusMessage, setStatusMessage] = useState<StatusMessage>({
      res: null,
      msg: ""
    })
    const handleOnChange = ( e : React.ChangeEvent<HTMLInputElement> ) => {
      const { name, value } = e.target
      setDetails((prevState)=>({
        ...prevState,
        [name]:value
      }))
    }
    const handleOnValueChange = ( value : string ) => {
      setDetails((prevState)=>({
        ...prevState,
        quantity:value
      }))
    }
    useEffect(()=>{
      if(details.isLoading){
        document.title="Processing...."
      }
    },[details.isLoading])
    useEffect(()=>{
      if(!details.isLoading){
        document.title="Airdrop Solana"
      }
    },[details.isLoading])
    useEffect(()=>{
      if(statusMessage.res){
        const timer = setTimeout(()=>{ 
          setStatusMessage({ 
            res:null,
            msg:''
          })
        },20000)
        return () => clearTimeout(timer)
      }},[statusMessage])
    const handleAirdrop = async ( e : React.FormEvent<HTMLElement> ) => {
      e.preventDefault()
      try{
        new PublicKey(details.publicKey)
        setDetails((prevState)=>({...prevState,isLoading:true}))
        const response = await fetch('/api', 
        {
          method:"POST",
          body:JSON.stringify(details)
        })
        const data = await response.json()
        const { res, msg } = data
        setStatusMessage((prevState)=>({
          ...prevState,
          res, 
          msg
        }))
      } catch {
        setStatusMessage({
          res : "fail",
          msg: "Enter correct Public key"
        })
        }
        setDetails({
          publicKey:"",
          quantity:"",
          isLoading:false
        })
      }
    return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-100 p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center space-x-2 mb-8">
          <Code className="w-8 h-8 text-yellow-400" />
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
            Solana Airdrop
          </h1>
        </div>
        <p className="text-sm text-gray-400 mb-4 italic flex justify-center">Note: You can only make one airdrop request per minute.</p>
        <form onSubmit={handleAirdrop} className="space-y-6 bg-gray-80 p-6 rounded-lg shadow-xl">
          <div className="space-y-2">
            <Label htmlFor="publicKey" className="text-sm font-medium text-gray-300">Public Key</Label>
            <Input
              id="publicKey"
              type="text"
              name="publicKey"
              placeholder="Enter Solan a public key"
              onChange={handleOnChange}
              value={details.publicKey}
              required
              className="bg-gray-700 border-gray-600 text-gray-100 focus:ring-yellow-400 focus:border-yellow-400"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="quantity" className="text-sm font-medium text-gray-300">Quantity (SOL)</Label>
            <Select value={details.quantity} onValueChange={handleOnValueChange}>
              <SelectTrigger className="bg-gray-700 border-gray-600 text-gray-100 focus:ring-yellow-400 focus:border-yellow-400">
                <SelectValue placeholder="Select quantity" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600 text-gray-100">
                {
                  quantity.map((item, index) => (
                    <SelectItem key={index} value={item}>{item}</SelectItem>
                  ))
                }
              </SelectContent>
            </Select>
          </div>
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105" 
            disabled={details.isLoading}
          >Airdrop SOL
            {details.isLoading ? 'Processing...' : 'Airdrop SOL'}
          </Button>
        </form>
      </div>  {statusMessage.res && (
      <div
        className={`mt-6 p-4 w-fit rounded-lg ${
          statusMessage.res === "success" ? "bg-green-800" : "bg-red-800"
            } text-white flex items-start space-x-2`}
            role="alert"
            aria-live="assertive"
          >
            {statusMessage.res === "success" ? (
              <div className='flex flex-col justify-center'>
                <div className='flex'>
                  <CheckCircle className="w-5 h-5 mx-2" />
                  <p className='text-sm'>{statusMessage.msg}</p>
                </div>
                <Link className='text-sm flex justify-center' href={`https://explorer.solana.com/address/${statusMessage.msg}?cluster=devnet`}>Click here to view transaction details</Link>
              </div> ) : (
              <div className='flex justify-evenly'>
<XCircle className="w-5 h-5 mx-2" />
                <p className='text-sm px-2'>{statusMessage.msg}</p>
              </div>
            )}
          </div>
        )}
      
    </div>
  )
}

