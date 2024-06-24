import { FormControl, ValidatorFn } from '@angular/forms';

export const numbersUntil5: ValidatorFn = () => {
    return (control: FormControl) => {
        const value = parseInt(control.value, 10); // Parse the value to a number
        return (isNaN(value) || value < 1 || value > 5) ? { numberBetweenOneAndFive: true } : null;
      };
};
