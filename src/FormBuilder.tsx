import React from 'react';
import { Fieldset, Grid } from '@mantine/core';
import { Item } from '../helpers';
import { Control, FieldErrors, FieldValues } from 'react-hook-form';
import AddProperty from './AddPRoperty';

interface FormBuilderProps {
  title: string;
  inputItems: Item[];
  control: Control<FieldValues>; // Use Control type
  errors: FieldErrors<FieldValues>; // Correct errors type
}

const FormBuilder: React.FC<FormBuilderProps> = ({ inputItems, control, errors, title }) => {
  return (
    <Fieldset legend={title} m={10}>
      <Grid>
        {inputItems.map((item) => (
          <AddProperty
            key={item.name}
            item={item}
            control={control}
            errors={errors}
          />
        ))}
      </Grid>
    </Fieldset>
  );
};

export default FormBuilder;
