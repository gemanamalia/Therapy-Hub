import { FormControl, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#523a25',
    }
  },
});


interface Props {
    options: any[];
    onChange: (event: any) => void;
    selectedValue: string;
}

export default function RadioButtonGroup({ options, onChange, selectedValue }: Props) {
    return (
        <FormControl component="fieldset" >
            <RadioGroup 
                onChange={onChange} value={selectedValue}

            >
                {options.map(({ value, label }) => (
                    <ThemeProvider theme={theme}>
                        <FormControlLabel
                            value={value}
                            control={<Radio color="primary" />}
                            label={label} key={value}
                        />
                    </ThemeProvider>
                ))}
            </RadioGroup>
        </FormControl>
    )
}