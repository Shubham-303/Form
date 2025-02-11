import { Button } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FormBuilder from './FormBuilder';
import { schema } from './Components/validationSchema';

const inputItems = [
  {
    type: 'inputField',
    name: 'name',
    label: 'Name',
    description: 'Your full name',
    placeholder: 'Enter your name',
    gridSpan: 4,
  },
  {
    type: 'fileInputField',
    name: 'profilePicture',
    label: 'Profile Picture',
    description: 'Upload your profile picture',
    placeholder: 'Choose a file',
    gridSpan: 4,
  },
  {
    type: 'staticSelect',
    name: 'framework',
    label: 'Framework',
    description: 'Select your preferred framework',
    options: ['React', 'Angular', 'Svelte', 'Vue'],
    gridSpan: 3,
  },
];

function App() {
  const { handleSubmit, control, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log('Form submitted successfully:', data);
  };

  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormBuilder
        title="Personal Information"
        inputItems={inputItems}
        control={control}
        errors={errors}
      />
      <Button type='submit'>Submit</Button>
      </form>
    </>
  );
}

export default App;
