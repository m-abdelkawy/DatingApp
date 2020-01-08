export interface Photo {
    //properties from PhotoForDetailedDto in the web service
    id: number;
    url: string;
    description: string;
    dateAdded: Date;
    isMain: boolean;
}