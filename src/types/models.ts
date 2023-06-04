/* ---------===== custom props ====--------- */

export interface Collection {
  title: string,
  img?: string,
  description?: string,
  type?: string,
  category?: string,
  series?: string,
  brand?: string,
  profileId: number,
  createdAt: string;
  updatedAt: string;
}

/* ---------===== auth models =====--------- */

export interface Profile {
  name: string;
  photo?: string;
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  name: string;
  email: string;
  profile: { id: number };
  id: number;
  createdAt: string;
  updatedAt: string;
}
