'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useState } from 'react';

const UserForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // const result = await createUser({ username, email });

    // if (result.success) {
    //   alert('User created successfully!');
    //   setUsername('');
    //   setEmail('');
    // } else {
    //   alert(`Error: ${result.error}`);
    // }
  };
  return (
    <form onSubmit={handleSubmit} className='max-w-md mx-auto p-4'>
      <div className='mb-4'>
        <Label className='block mb-2'>Username</Label>
        <Input
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className='w-full p-2 border rounded'
          required
        />
      </div>
      <div className='mb-4'>
        <Label className='block mb-2'>Email</Label>
        <Input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='w-full p-2 border rounded'
          required
        />
      </div>
      <Button type='submit'>Create User</Button>
    </form>
  );
};

export default UserForm;
