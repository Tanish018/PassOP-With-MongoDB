import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {

    const ref = useRef()
    const passwordRef = useRef()
    const [form, setForm] = useState({site:"", username:"", password:""})
    const [passwordArray, setPasswordArray] = useState([])

    const getPasswords = async () => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        setPasswordArray(passwords)
    }
    
    useEffect(() => {
        getPasswords()
    }, [])
    

    const showPassword = () => {
        passwordRef.current.type = "text"
        if (ref.current.src.includes("icons/hide.svg")) {
            passwordRef.current.type = "password"
            ref.current.src = "./public/icons/view.svg"
        }
        else {
            ref.current.src = "icons/hide.svg"
            passwordRef.current.type = "text"
        }
    }

    const savePassword = async () => {
    if (form.site.length >= 1 && form.username.length >= 3 && form.password.length >= 4) {
        const isEditing = !!form.id
        const id = isEditing ? form.id : uuidv4()
        if (isEditing) { await fetch("http://localhost:3000/", {method: "DELETE", headers: {"Content-Type": "application/json"}, body: JSON.stringify({ id: form.id })}) }
        const newEntry = { ...form, id }
        setPasswordArray([...passwordArray, newEntry])
        await fetch("http://localhost:3000/", {method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(newEntry)})
        setForm({ site: "", username: "", password: "" })
        toast('Password Saved!', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
        } else {
            alert("Please fill all the fields correctly!");
        }
    };


    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const copyText = (text) =>{
        toast('Copied to Clipboard !', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
        navigator.clipboard.writeText(text)
    }

    const deletePassword = async (id)=> {
        if (confirm("Are you sure you want to delete this password?")) {
            setPasswordArray(passwordArray.filter(item=> item.id!==id))
            let res = await fetch("http://localhost:3000/", {method: "DELETE", headers: {"Content-Type": "application/json"}, body: JSON.stringify({id})})
            toast('Password Deleted !', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
        }
    }

    const editPassword = (id)=> {
        setForm({...passwordArray.filter(item=> item.id===id)[0], id:id})
        setPasswordArray(passwordArray.filter(item=> item.id!==id))
    }

  return (
    <>
        <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover={false}
            theme="dark"
            transition={Bounce}
        />
        <ToastContainer />
        <div className="absolute top-0 z-[-2] h-screen w-screen"></div>
 
        <div className="p-2 md:p-0 myContainer text-white min-h-[80.8vh]">
            <h1 className='text-[40px] font-bold text-center cursor-pointer'>
                <span className='text-green-600'>&lt;</span>
                Pass
                <span className='text-green-600'>OP/&gt;</span>
            </h1>
            <p className='text-center font-medium text-[20px] cursor-pointer'>
                Most Advanced&nbsp;
                <span className='text-green-600'>Password Manager</span> 
                &nbsp;Application
            </p>
            <div className="text-white flex flex-col p-4 gap-5">
                <input value={form.site} onChange={handleChange} placeholder='Webiste Name' className='rounded-full py-3 px-7 border text-[20px] border-green-600 w-full' type="text" name='site' id='site' />
                <div className="flex md:flex-row flex-col w-full justify-between gap-5">
                    <input value={form.username} onChange={handleChange} placeholder='Username' className='rounded-full py-3 px-7 border text-[20px] border-green-600 w-full' type="text" name="username" id="username" />
                    
                    <div className='relative'>
                        <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Password' className='rounded-full py-3 px-7 border text-[20px] border-green-600 w-full' type="password" name="password" id="password" />
                        <span className='absolute right-4 top-3.5'>
                            <img ref={ref} onClick={showPassword} width={30} src="icons/view.svg" alt="" />
                        </span>
                    </div>
                
                </div>
                <div className='flex items-center justify-center'>
                    <button onClick={savePassword} className='text-green-600 font-bold bg-white py-3 px-5 rounded-[8px] text-[20px] cursor-pointer flex items-center gap-2 hover:bg-green-100 transition-all duration-300'>
                        Add Password 
                        <lord-icon
                            src="https://cdn.lordicon.com/sbnjyzil.json"
                            trigger="hover">
                        </lord-icon>
                    </button>
                </div>
            </div>

            <div className="passwords">
                <h2 className='font-bold text-3xl text-center mt-[30px] mb-[20px] text-green-600 hover:text-white transition-all duration-200 cursor-pointer'>Your Passwords</h2>
                {passwordArray.length === 0 && <div className='text-[18px] cursor-pointer font-semibold text-center'>No Passwords To Show</div>}
                {passwordArray.length != 0 &&
                <table className="table-auto w-full text-left text-[20px] mb-10 bg-transparent rounded-lg border-collapse border border-green-600">
                    <thead className='bg-green-600 text-white text-[25px]'>
                        <tr className='hover:bg-green-700 transition-all duration-200'>
                        <th className='text-center py-2'>Website</th>
                        <th className='text-center py-2'>Username</th>
                        <th className='text-center py-2'>Password</th>
                        <th className='text-center py-2'>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='font-semibold'>
                        {passwordArray.map((item, index)=> {
                            return (
                                <tr key={index} className='hover:bg-green-400 transition-all duration-50'>
                                    <td className='text-center py-3 border border-green-600'>
                                        <div className='flex items-center justify-center gap-2'>
                                            <a href={item.site} target='_blank'>{item.site}</a>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={()=>{copyText(item.site)}}>
                                               <lord-icon
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover"
                                                    style={{"paddingTop":"3px", "paddingLeft":"3px"}}
                                                    colors="primary:#ffffff,secondary:#ffffff">
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='text-center py-3 border border-green-600'>
                                        <div className='flex items-center justify-center gap-2'>
                                            <span>{item.username}</span>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={()=>{copyText(item.username)}}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover"
                                                    style={{"paddingTop":"3px", "paddingLeft":"3px"}}
                                                    colors="primary:#ffffff,secondary:#ffffff">
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='text-center py-3 border border-green-600'>
                                        <div className='flex items-center justify-center gap-2'>
                                            <span>{"*".repeat(item.password.length)}</span>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={()=>{copyText(item.password)}}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover"
                                                    style={{"paddingTop":"3px", "paddingLeft":"3px"}}
                                                    colors="primary:#ffffff,secondary:#ffffff">
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='text-center py-3 border border-green-600'>
                                        <span className='cursor-pointer mx-1' onClick={()=>{editPassword(item.id)}}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/gwlusjdu.json"
                                                trigger="hover"
                                                colors="primary:#ffffff"
                                                style={{"width":"25px", "height":"25px"}}>
                                            </lord-icon>
                                        </span>
                                        <span className='cursor-pointer mx-1' onClick={()=>{deletePassword(item.id)}}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover"
                                                colors="primary:#ffffff"
                                                style={{"width":"25px", "height":"25px"}}>
                                            </lord-icon>
                                        </span>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>}
            </div>
        </div>
    </>
  )
}

export default Manager