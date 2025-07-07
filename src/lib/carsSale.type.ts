import { ImageProps } from "./image.type"

export interface CarsSalesProps{
    "car_id": string,
    "images": ImageProps[],
    "car_name": string,
    "model": string,
    "year": string,
    "km": string,
    "phone": string,
    "city": string,
    "price": number,
    "description": string,
    "user_id": string
}