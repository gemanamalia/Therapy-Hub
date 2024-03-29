import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { useState } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#523a25',
    }
  },
});

interface Props {
    items: string[];
    checked?: string[];
    onChange: (items: string[]) => void;
}

export default function CheckboxButtons({ items, checked, onChange }: Props) {
    const [checkedItems, setCheckedItems] = useState(checked || []);

    function handleChecked(value: string) {
        const currentIndex = checkedItems.findIndex(item => item === value);
        let newChecked: string[] = [];
        if (currentIndex === -1) newChecked = [...checkedItems, value];
        else newChecked = checkedItems.filter(i => i !== value);
        setCheckedItems(newChecked);
        onChange(newChecked);
    }

    return (
        <FormGroup>
            {items.map(item => (
                <ThemeProvider theme={theme} key={item}>
                    <FormControlLabel
                        control={<Checkbox
                            color='primary'
                            checked={checkedItems.indexOf(item) !== -1}
                            onClick={() => handleChecked(item)}
                        />}
                        label={item} />
                </ThemeProvider>
            ))}
        </FormGroup>
    )
}
