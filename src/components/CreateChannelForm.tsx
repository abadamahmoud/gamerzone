// CreateChannelForm.tsx
"use client";
import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Select from 'react-select';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import { io } from 'socket.io-client';

const socket = io('http://localhost:4000');

const channelSchema = z.object({
  channelName: z.string().min(1, 'Channel name is required'),
  members: z.array(z.object({ label: z.string(), value: z.string() })).min(2).optional(),
});

const CreateChannelForm = ({ serverId }: { serverId: string }) => {
  const { user } = useUser();
  console.log(user)
  const [users, setUsers] = useState([]);
  const router = useRouter();
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: zodResolver(channelSchema),
  });

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('/api/users');
      const data = await response.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const onSubmit = async (data: any) => {
     try {
          console.log(user)
       const response = await fetch(`/api/servers/${serverId}/channels`, {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
           name: data.channelName,
           serverId,
           creatorId: user?.id,
           membersIds: data.members.map((member: any) => member.value),
         }),
       });
   
       if (!response.ok) {
         console.error('Failed to submit data:', await response.text());
       } else {
         console.log('Data successfully submitted');
         socket.emit('newChannel');

       }
   
       router.push(`/chatservers/${serverId}`);
     } catch (error) {
       console.error('Error submitting data:', error);
     }
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
        <Label htmlFor="channelName">Enter Channel Name</Label>
        <Input
          id="channelName"
          {...register('channelName')}
          placeholder="Enter channel name"
        />
        {errors.channelName && (
          <p className="text-red-500">{errors.channelName.message as string}</p>
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
        <Button type="button" variant="secondary" onClick={() => router.push(`/chatservers/${serverId}`)}>
          Cancel
        </Button>
        <Button type="submit">Create Channel</Button>
      </div>
    </form>
  );
};

export default CreateChannelForm;
