'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Code } from 'lucide-react'
import { PublicKey } from '@solana/web3.js'

export default function SolanaAirdrop() {
  // const [publicKey, setPublicKey] = useState('')
  // const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
    interface dataType {
      publicKey:string,
      quantity:string,
      isLoading:boolean
    }
    const [data, setData] = useState<dataType>({
      publicKey: "",
      quantity: "",
      isLoading: false
    })
    const handleOnChange = ( e : React.ChangeEvent<HTMLInputElement> ) => {
      const { name, value } = e.target
      setData((prevState)=>({
        ...prevState,
        [name]:value
      }))
    }
    const handleOnValueChange = ( value : string ) => {
      setData((prevState)=>({
        ...prevState,
        quantity:value
      }))
    }
    
    const handleAirdrop = async ( e : React.FormEvent<HTMLElement> ) => {
      e.preventDefault()
      try{
new PublicKey(data.publicKey)
setData((prevState)=>({...prevState,isLoading:true}))
await fetch('/api', 
      {
        method:"POST",
        body:JSON.stringify(data)
      })
      .then((res) => {
        return res.json()
      })
      .then(data=>console.log(data.msg))
      .catch((err)=>console.log(err))
}catch(err){
toast({
title: "Airdrop Failed",
description: `Provided incorrect Public Key`,
variant: "destructive"
})
console.log(`enter correct public key`)}console.log(data)
    setData({
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
        <p className="text-sm text-gray-400 mb-4 italic">Note: You can only make one airdrop request per minute.</p>
        <form onSubmit={handleAirdrop} className="space-y-6 bg-gray-80 p-6 rounded-lg shadow-xl">
          <div className="space-y-2">
            <Label htmlFor="publicKey" className="text-sm font-medium text-gray-300">Public Key</Label>
            <Input
              id="publicKey"
              type="text"
              name="publicKey"
              placeholder="Enter Solan a public key"
              onChange={handleOnChange}
              value={data.publicKey}
              required
              className="bg-gray-700 border-gray-600 text-gray-100 focus:ring-yellow-400 focus:border-yellow-400"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="quantity" className="text-sm font-medium text-gray-300">Quantity (SOL)</Label>
            <Select value={data.quantity} onValueChange={handleOnValueChange}>
              <SelectTrigger className="bg-gray-700 border-gray-600 text-gray-100 focus:ring-yellow-400 focus:border-yellow-400">
                <SelectValue placeholder="Select quantity" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600 text-gray-100">
                <SelectItem value="0.5">0.5</SelectItem>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="1.5">1.5</SelectItem>
                <SelectItem value="2">2</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105" 
            disabled={data.isLoading}
          >Airdrop SOL
            {data.isLoading ? 'Processing...' : 'Airdrop SOL'}
          </Button>
        </form>
      </div>
    </div>
  )
}

