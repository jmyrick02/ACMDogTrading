import React, { useState } from 'react';
import './App.css';
import { allBreeds, Breed } from './Breed';
import { Dog } from './Dog';
import { DogDisplay } from './DogDisplay';
import { dogs } from './Dogs';

interface Filters {
  name: string;
  description: string;
  age: number;
  breeds: Breed[];
  requireFavorited: boolean;
}

function App() {
  const [filters, setFilters] = useState<Filters>({name: '', description: '', age: -1, breeds: allBreeds, requireFavorited: false});
  const [favorites, setFavorites] = useState<Dog[]>([]);

  return (
    <div style={{margin: "20px"}}>
      <h1>ACM Dog Trading</h1>
      <input style={{margin:"10px"}} placeholder="Name" onChange={event => {setFilters({name: event.target.value.toLowerCase(), description: filters.description, age: filters.age, breeds: filters.breeds, requireFavorited: filters.requireFavorited})}} />
      <input style={{margin:"10px"}} placeholder="Description" onChange={event => {setFilters({name: filters.name, description: event.target.value.toLowerCase(), age: filters.age, breeds: filters.breeds, requireFavorited: filters.requireFavorited})}} />
      <input style={{margin:"10px"}} placeholder="Age" onChange={event => {setFilters({name: filters.name, description: filters.description, age: event.target.value === '' ? -1 : Number(event.target.value), breeds: filters.breeds, requireFavorited: filters.requireFavorited})}} />
      <select name="Test" multiple onChange={event => {
        let breeds : Breed[] = [];
        for (let i = 0; i < event.target.options.length; i++) {
          if (event.target.options[i].selected) {
            breeds.push(event.target.options[i].value as Breed);
          }
        }
        setFilters({name: filters.name, description: filters.description, age: filters.age, breeds: breeds.length !== 0 ? breeds : allBreeds, requireFavorited: filters.requireFavorited});
      }}>
        {Object.values(Breed).map((val, index) => <option key={index} value={val}>{val}</option>)}
      </select>
      <input type="checkbox" id="favorited" onChange={() => {setFilters({name: filters.name, description: filters.description, age: filters.age, breeds: filters.breeds, requireFavorited: !filters.requireFavorited})}} />
      <label htmlFor="favorited">Favorited</label>
      <hr />
      {dogs.filter(dog => {
        return dog.name.toLowerCase().includes(filters.name) && dog.description.toLowerCase().includes(filters.description) && (filters.age === -1 || dog.age === filters.age) && filters.breeds.includes(dog.breed) && (filters.requireFavorited ? favorites.includes(dog) : true);
      }).map((dog, index) => { 
        return <DogDisplay
          key={dog.photoUrl+dog.name+dog.description+dog.breed+dog.age}
          dog={dog} 
          favorites={favorites}
          onFavorite={(dog : Dog) => {
            favorites.push(dog);
            setFavorites(favorites);
          }} 
          onUnfavorite={(dog: Dog) => {
            setFavorites(favorites.filter(favorite => favorite !== dog));
          }}/>
      })}
    </div>
  );
}

export default App;
