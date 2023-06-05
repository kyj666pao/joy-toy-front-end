/* ---------==== custom forms ====--------- */

export interface collectionFormData {
  title: string,
  description?: string,
  type?: string,
  category?: string,
  series?: string,
  brand?: string
}

/* ---------===== auth forms =====--------- */

export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  passwordConf: string;
}

export interface ChangePasswordFormData {
  curPassword: string;
  newPassword: string;
  newPasswordConf: string;
}

export interface PhotoFormData {
  photo: File | null;
}
