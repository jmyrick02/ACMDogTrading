import { Breed } from "./Breed";

export class Dog {
    name: string;
    description: string;
    age: number;
    breed: Breed;
    photoUrl: string;

    constructor(name: string, description: string, age: number, breed: Breed, photoUrl: string) {
        this.name = name;
        this.description = description;
        this.age = age;
        this.breed = breed;
        this.photoUrl = photoUrl;
    }
}