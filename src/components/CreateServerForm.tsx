"use client";
import { useState, useEffect, useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Select from 'react-select';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

import { useUser } from '@/context/UserContext';
import { Socket, io } from 'socket.io-client';



const serverSchema = z.object({
  serverName: z.string().min(1, 'Server name is required'),
  file: z
    .any()
    .refine(
      (file) =>
        file instanceof File
          ? ['image/jpeg', 'image/png', 'image/gif'].includes(file.type)
          : true,
      {
        message: 'Only image files (jpg, png, gif) are allowed',
      }
    )
    .optional(),
  members: z.array(z.object({ label: z.string(), value: z.string() })).min(2).optional(),
});

const CreateServerForm = () => {
  const { user, loading } = useUser();
  const [users, setUsers] = useState([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const router = useRouter();
  const { register, handleSubmit, control, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(serverSchema),
  });


  useEffect(() => {
    // Initialize socket connection
    const socketIo: Socket = io('http://localhost:4000');
    setSocket(socketIo);

    // Cleanup function to disconnect the socket on component unmount
    return () => {
      if (socket) { // Ensure socket is defined before calling disconnect
        socket.disconnect();
      }
    };
  }, [socket]); 

  useEffect(() => {
    const abortController = new AbortController(); // Create an AbortController instance

    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users', { signal: abortController.signal });
        const data = await response.json();
        setUsers(data);
      } catch (error: any) {
        if (error.name === 'AbortError') {
          console.log('Fetch aborted');
        } else {
          console.error('Error fetching users:', error);
        }
      }
    };

    fetchUsers();

    return () => {
      abortController.abort(); // Abort the fetch request on component unmount
    };
  }, []); 

  const onSubmit = async (data: any) => {
   
    if (data.file && data.file[0]) {
      const file = data.file[0];
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
    
        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.message || 'Upload failed');
        }
        data.imageUrl = result.imgUrl;
      } catch (error) {
        console.error("Error uploading image:", error);
        throw error;
      }

      
    }

    await fetch('/api/servers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.serverName,
        ownerId: user?.id,
        image: data.imageUrl ?? "data:image/jpeg;base64,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",
        membersIds: data.members.map((member: any) => member.value),
      }),
    });
    
    socket?.emit('newServer');

    router.push('/chatservers');
  };

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      backgroundColor: 'var(--color-bg)',
      borderColor: 'var(--color-border)',
      color: 'var(--color-text)',
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: 'var(--color-bg)',
      color: 'var(--color-text)',
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? 'var(--color-bg-selected)' : 'var(--color-bg)',
      color: 'var(--color-text)',
    }),
    multiValue: (provided: any) => ({
      ...provided,
      backgroundColor: 'var(--color-bg-chip)',
    }),
    multiValueLabel: (provided: any) => ({
      ...provided,
      color: 'var(--color-text)',
    }),
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 min-w-96 w-1/2">
      <div>
        <Label htmlFor="serverName">Enter Server Name</Label>
        <Input
          id="serverName"
          {...register('serverName')}
          placeholder="Enter server name"
        />
        {errors.serverName && (
          <p className="text-red-500">{errors.serverName.message as string}</p>
        )}
      </div>

      <div>
        <Label htmlFor="file">Upload Image</Label>
        <Input
          id="file"
          type="file"
          accept="image/jpeg, image/png, image/gif"
          {...register('file')}
        />
        {errors.file && (
          <p className="text-red-500">{errors.file.message as string}</p>
        )}
      </div>

      <div>
        <Label htmlFor="members">Select Members</Label>
        <Controller
          name="members"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              isMulti
              options={users}
              placeholder="Select members"
              styles={customStyles}
            />
          )}
        />
        {errors.members && (
          <p className="text-red-500">{errors.members.message as string}</p>
        )}
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="secondary" onClick={() => router.push('/chatservers')}>
          Cancel
        </Button>
        <Button type="submit">Create Server</Button>
      </div>
    </form>
  );
};

export default CreateServerForm;
