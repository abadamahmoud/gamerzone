"use client"
import { useState } from 'react';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Select from 'react-select';
import { Label } from './ui/ui/label';
import { Input } from './ui/ui/input';
import { Button } from './ui/ui/button';
import { redirect } from 'next/navigation';

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
  members: z.array(z.object({ label: z.string(), value: z.string() })).optional(),
});
const hardcodedUsers = [
  { label: 'User1', value: '1' },
  { label: 'User2', value: '2' },
  { label: 'User3', value: '3' },
];

const CreateServerForm = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);

  const { register, handleSubmit, control, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(serverSchema),
  });
  

  const onSubmit = (data: any) => {
    console.log('Form Data:', data);
   
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
          //onChange={(e) => setImageFile(e.target.files[0])}
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
              options={hardcodedUsers}
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
        <Button type="button" variant="secondary" onClick={()=> console.log("/messages/chatservers")}>
          Cancel
        </Button>
        <Button type="submit">Create Server</Button>
      </div>
    </form>
  );
};

export default CreateServerForm;
