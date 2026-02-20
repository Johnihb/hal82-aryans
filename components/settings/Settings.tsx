"use client"
import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import {User} from '@/app/settings/page'
import { updateUser } from '@/lib/action/updateUser'


const Settings = ({userData}:{
  userData:User
}) => {
  const handleUpdate = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const phone = formData.get('phone') ;
    const username = formData.get('username');

    if (!phone && !username) return;

    if (phone === userData.phoneNumber && username === userData.username) return;

    const data = {
      phone : phone as string,
      username : username as string
    }


     updateUser({data}).catch(e=>{})
    
     return
    }
   const date = userData?.createdAt.toLocaleDateString()
  return (
     <div className='size-100 shadow-2xl rounded-2xl flex gap-2 justify-center '>
      <Image src={userData?.image || '/default/defaultUser.jfif'} alt={`${userData?.username}'s image`} className='rounded-2xl size-20' width={20} height={20} />



      <form onSubmit={handleUpdate} >
        <label htmlFor="phone"> Phone : </label>
        <input type="text" name="phone" id="phone" className='font-bold shadow-xl hover:border-none rounded-md' defaultValue={userData?.phoneNumber||' '}  />
        <label htmlFor="username"> Username : </label>
        <input type="text" name="username" id="username" className='font-bold shadow-xl hover:border-none rounded-md' defaultValue={userData?.username||' '}  />
      
        <p >Member since {date}</p>

        
        
        <label htmlFor="email"> Email :{userData.email||''} </label>
        <br />
        <Button type="submit">Update</Button>
      </form>
    </div>
  )
}

export default Settings