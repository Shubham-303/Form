import React from 'react';
import { TextInput, FileInput, NativeSelect, Grid, Text } from '@mantine/core';
import { useController } from 'react-hook-form'; // import useController hook from react-hook-form
import { Item } from "../helpers";

interface AddPropertyProps {
  item: Item;
  control: any; // Control from react-hook-form
  errors: any; // Errors from react-hook-form
}

const AddProperty: React.FC<AddPropertyProps> = ({ item, control, errors }) => {
  const { field } = useController({
    name: item.name, // field name
    control, // the control passed from FormBuilder
    defaultValue: '', // initial value if any
  });

  const error = errors[item.name]; // Access specific field error

  const handleTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    field.onChange(e.target.value); // Manually trigger change
  };

  const handleFileInputChange = (file: File | null) => {
    field.onChange(file); // Manually trigger change
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    field.onChange(e.target.value); // Manually trigger change
  };

  switch (item.type) {
    case 'inputField':
      return (
        <Grid.Col span={item.gridSpan}>
          <TextInput
            label={item.label}
            description={item.description}
            placeholder={item.placeholder}
            value={field.value || ''}
            onChange={handleTextInputChange}
            error={error?.message} // Show error message if any
          />
        </Grid.Col>
      );

    case 'fileInputField':
      return (
        <Grid.Col span={item.gridSpan}>
          <FileInput
            label={item.label}
            description={item.description}
            placeholder={item.placeholder}
            value={field.value || undefined}
            onChange={handleFileInputChange}
            error={error?.message} // Show error message if any
          />
        </Grid.Col>
      );

    case 'staticSelect':
      return (
        <Grid.Col span={item.gridSpan}>
          <NativeSelect
            value={field.value || ''}
            onChange={handleSelectChange}
            data={item.options || []}
            label={item.label}
            description={item.description}
            error={error?.message} // Show error message if any
          />
        </Grid.Col>
      );

    default:
      return null;
  }
};

export default AddProperty;
