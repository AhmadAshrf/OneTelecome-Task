import { FormGroup } from "@angular/forms"

//Custom Validator on Passwords!
export function isPasswordMathc(password: any, confPassword: any) {
    return (formGroup: FormGroup) => {
      const PassControl = formGroup.controls[password]
      const ConfPassControl = formGroup.controls[confPassword]
      if (ConfPassControl.errors && !ConfPassControl.errors['isPasswordMathc']) return
      if (PassControl.value != ConfPassControl.value) {
        ConfPassControl.setErrors({ isPasswordMathc: true })
      } else {
        ConfPassControl.setErrors(null)
      }
    }
  }
