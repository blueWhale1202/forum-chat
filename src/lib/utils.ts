import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import PasswordValidator from "password-validator";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const passwordSchema = new PasswordValidator();
passwordSchema
    .is()
    .min(6, "Min 6 characters")
    .has()
    .uppercase(1, "1 uppercase letter")
    .has()
    .lowercase(1, "1 lowercase letter")
    .has()
    .digits(1, "1 digit")
    .has()
    .symbols(1, "1 special character")
    .has()
    .not()
    .spaces(1, "No spaces");
