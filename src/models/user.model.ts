export interface IUser {
    id: string;
    username: string;
    password: string;
    email?: string;
    phone?: string;
    gender: string;
    photoUrl: string;
    dob: Date | null;
    registeredType: string;
    twoWayAuth: boolean;
}

export interface ICategory {
    id: string;
    name: string;
    description: string;
    created_at: Date;
    updated_at: Date;
    movies: IMovie[];
    crated_user: IUser[];
}


export interface IMovie {
    id: string;
    name: string;
    caption: string;
    description: string;
    url: string;
    likes: number;
    view_count: number;
    thumbnail_url: string;
    categories: ICategory[];
    created_at?: Date;
}

export type MovieUpdateProp = {
    name: string;
    caption: string;
    description: string;
    url: string;
    likes?: number;
    view_count?: number;
    thumbnail_url?: string;
}

export type MovieCreateProp = {
    categories?: ICategory[];
    favourites?: IUser[];
    created_user?: Partial<IUser>;
} & MovieUpdateProp;

