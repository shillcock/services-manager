import { AbstractControl, ValidationErrors } from '@angular/forms';

export function jsonValidator(
  control: AbstractControl
): ValidationErrors | null {
  if (!control.value) {
    return { json: 'A valid JSON document is required' };
  }

  try {
    JSON.parse(control.value);
    return null;
  } catch (err) {
    return { json: `${err.name}: ${err.message}` };
  }
}
