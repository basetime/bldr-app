import React from "react";
import { useForm, Controller } from "react-hook-form";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';

export default function BasicTextFields(props: any) {

  const { control, register, handleSubmit, watch, formState: { errors } } = useForm();
 
  return (
    <>
      <form onChange={handleSubmit(props.onFormChange)}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item sx={{ display: 'flex', justifyContent: 'space-around' }} xs={12}>
              <Controller
                name="filter"
                control={control}
                rules={{ required: false }}
                render={({ field }) => <FormControl fullWidth sx={{ mx: 5 }}><TextField label="Filter Packages" defaultValue='' variant="standard"  {...field} /></FormControl>}
              />
              {errors.displayName && <span>This field is required</span>}

          </Grid>
          <Grid item sx={{ display: 'flex', justifyContent: 'space-around' }} xs={12}>
              {/* <Controller
                name="displayName"
                control={control}
                rules={{ required: true }}
                render={({ field }) => <FormControl fullWidth sx={{ mx: 5 }}><TextField label="Display Name" variant="standard"  {...field} /></FormControl>}
              />
              {errors.displayName && <span>This field is required</span>} */}
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item sx={{ display: 'flex', justifyContent: 'space-around' }} xs={12}>
              {/* <Controller
                name="displayName"
                control={control}
                rules={{ required: true }}
                render={({ field }) => <FormControl fullWidth sx={{ mx: 5 }}><TextField label="Display Name" variant="standard"  {...field} /></FormControl>}
                />
              {errors.displayName && <span>This field is required</span>} */}

              {/* <Controller
                name="displayName"
                control={control}
                rules={{ required: true }}
                render={({ field }) => <FormControl fullWidth sx={{ mx: 5 }}><TextField label="Display Name" variant="standard"  {...field} /></FormControl>}
                />
              {errors.displayName && <span>This field is required</span>} */}

              {/* <input type="submit" /> */}

            </Grid>
          </Grid>
        </Box>

      </form >
    </>
  );
}