import {useCallback, useEffect, useRef, useState} from 'react'

function App() {
    const [length, setLength] = useState(6);
    const [password, setPassword] = useState("");
    const [charAllowed, setCharAllowed] = useState(false);
    const [numAllowed, setNumAllowed] = useState(false);
    const passwordRef = useRef(null);

    const passwordGenerator = useCallback(() => {
        let pass = ""
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

        if(numAllowed) str += "0123456789"
        if(charAllowed) str += "!@#$%^&*()_+{}[]"

        for (let i = 1; i <= length; i++) {
            const char = Math.floor(Math.random() * str.length + 1);
            pass += str.charAt(char);            
        }

        setPassword(pass);

    }, [length, numAllowed, charAllowed, setPassword])


    useEffect(() => {
        passwordGenerator()
    },[length, charAllowed, numAllowed, passwordGenerator])

    const copyToClipBoard = useCallback(() => {
        passwordRef.current?.select()
        passwordRef.current?.setSelectionRange(0, length)
        window.navigator.clipboard.writeText(password)
    }, [password])

    return (
        <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-48 bg-gray-800 text-orange-500'>
            <h1 className='text-white text-center my-3 text-xl'>Password Generator</h1>
            <div className='flex rounded shadow mb-4'>
                <input 
                    type="text" 
                    placeholder='Password'
                    value={password}
                    readOnly
                    className='w-full outline-none py-2 px-3 rounded-s-lg'
                    ref={passwordRef}
                />
                <button 
                    className='bg-orange-600 hover:bg-orange-400 rounded-r-lg text-white px-3'
                    onClick={copyToClipBoard}
                >
                    Copy
                </button>
            </div>
            <div className='flex text-sm gap-x-4'>
                <div className='flex items-center gap-x-2'>
                    <input 
                        type="range" 
                        min={6}
                        max={25}
                        value={length}
                        className='cursor-pointer'
                        onChange={(e) => setLength(e.target.value)}
                        name=''
                        id=''
                    />
                    <label htmlFor="length">Length: {length}</label>
                </div>
                <div className='flex items-center gap-x-2'>
                    <input 
                        type="checkbox" 
                        defaultChecked={numAllowed}
                        onChange={() => {
                            setNumAllowed((prev) => !prev)
                        }}
                        className='cursor-pointer'
                        name=''
                        id=''
                    />
                    <label htmlFor="number">Numbers</label>
                </div>
                <div className='flex items-center gap-x-2'>
                    <input 
                        type="checkbox" 
                        defaultChecked={charAllowed}
                        onChange={() => {
                            setCharAllowed((prev) => !prev)
                        }}
                        className='cursor-pointer'
                        name=''
                        id=''
                    />
                    <label htmlFor="number">Characters</label>
                </div>
            </div>
        </div>
    )
}

export default App