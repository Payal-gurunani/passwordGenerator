import React ,{ useContext, useEffect, useRef, useState} from 'react'
import { generatePassword } from '../utils/passUtils'
import { passwordContext } from '../context/PasswordContext'

const PasswordGenrator = () => {
  const [password , setPassword] = useState('')
  const [length, setLength] = useState(4)
  const [number, setNumber] = useState(false)
  const [character, setCharacter] = useState(false)
  const [copied, setCopied] = useState(false)
  const passRef = useRef(null)
  const {addPass} = useContext(passwordContext)


    useEffect(() => {
    const newPass = generatePassword(length, {
      upper: true, 
      lower: true, 
      numbers: number,
      symbols: character,
    });
    setPassword(newPass);
    addPass(newPass)
  }, [length, number, character]);

  const copyPassword = ()=>{
    passRef.current?.select();
    window.navigator.clipboard.writeText(password);
    // alert("Copied!")
    setCopied(true)
    setTimeout(()=>setCopied(false),2000)
  }
  return (
  <div className=' '>
   <h1 className='text-2xl font-bold'> 🔐 Password Generator</h1>
    <div>
      <input 
      type="text"
       value={password}
      className='text-white m-1 p-2 bg-gray-800 rounded'
      placeholder='Password'
      readOnly
      />

      <button 
      onClick={copyPassword}
      className='bg-blue-500 p-2 cursor-pointer text-white hover:bg-blue-400 rounded-lg'
      >
        Copy
      </button>
    </div>

   <div className='flex text-sm gap-x-2'>
   <div className='flex items-center gap-x-1'>
        <input 
        type='range'
        value={length}
        min={4}
        max={128}
        className='cursor-pointer'
        onChange={(e) => {setLength(e.target.value)}}
         />
         <label>Length :{length}</label>
      </div>

      <div>
        <input
        type='checkbox'
        defaultChecked={number}
        id='numberinput'
        onChange={() => setNumber(prev => !prev)} 

        />
        <label htmlFor="numberinput">Numbers</label>
      </div>

      <div>
        <input
        type='checkbox'
        defaultChecked={character}
        id='charcterInput'
        onChange={() => setCharacter(prev => !prev)} // ✅ This is correct

        />
        <label htmlFor="charcterInput">Character</label>
      </div>
   </div>
   {copied && (
    <p className='text-green-600 mt-3'>Copied!</p>
   )}
  </div>
  )
}

export default PasswordGenrator
