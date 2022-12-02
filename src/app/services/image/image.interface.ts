import { SafeResourceUrl } from "@angular/platform-browser";

export interface ImageResponse {
    id: number;
    fileName: string;
    content: string;
}

export interface ImagesResponse {
    id: number;
    name: string;
}

export interface Image extends ImagesResponse {
    source: SafeResourceUrl;
}