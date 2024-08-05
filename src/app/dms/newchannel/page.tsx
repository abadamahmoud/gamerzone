
"use client";
import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Select from 'react-select';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import { io } from 'socket.io-client';

const socket = io('http://localhost:4000');

const channelSchema = z.object({
  recipient: z.object({ label: z.string(), value: z.string() }).optional(),
});

const CreateChannelForm = () => {
  const { user } = useUser();

  const [users, setUsers] = useState([]);
  const router = useRouter();
  const { control, handleSubmit, formState: { errors } } = useForm({
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
    if (!data.recipient) {
      console.error('Recipient is required');
      return;
    }

    try {
      const response = await fetch('/api/channels/direct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          creatorId: user?.id,
          recipientId: data.recipient.value,
        }),
      });

      if (!response.ok) {
        console.error('Failed to submit data:', await response.text());
      } else {
        socket.emit('newDirectChannel');
      }

      router.push(`/dms`);
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
    singleValue: (provided: any) => ({
      ...provided,
      backgroundColor: 'var(--color-bg-chip)',
    }),
    valueContainer: (provided: any) => ({
      ...provided,
      display: 'flex',
      alignItems: 'center',
    }),
    placeholder: (provided: any) => ({
      ...provided,
      display: 'flex',
      alignItems: 'center',
    }),
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 min-w-96 w-1/2 m-auto">
      <div>
        <Label htmlFor="recipient">Select Recipient</Label>
        <Controller
          name="recipient"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={users}
              placeholder="Select recipient"
              styles={customStyles}
              formatOptionLabel={(option: any) => (
                <div className="flex items-center">
                  <img
                    src={option.image}
                    alt={option.label}
                    className="w-6 h-6 rounded-full mr-2"
                  />
                  {option.label}
                </div>
              )}
            />
          )}
        />
        {errors.recipient && (
          <p className="text-red-500">{errors.recipient.message as string}</p>
        )}
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="secondary" onClick={() => router.push(`/dms`)}>
          Cancel
        </Button>
        <Button type="submit">Start Discussion</Button>
      </div>
    </form>
  );
};

export default CreateChannelForm;
