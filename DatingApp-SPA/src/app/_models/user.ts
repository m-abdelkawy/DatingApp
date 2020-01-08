import { Photo } from './photo';
export interface User {
    //properties from UserForDetailedDto in the web service
    id: number;
    username: string;
    gender: string;
    knownAs: string;
    age: number;
    created: Date;
    lastactive: Date;
    photoUrl: string;
    city: string;
    country: string;
    interests?: string;
    introduction?: string;
    lookingFor?: string;
    photos: Photo[];
}
