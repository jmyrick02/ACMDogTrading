import { useState } from "react";
import { Dog } from "./Dog";

export function DogDisplay(props: {dog: Dog, favorites: Dog[], onFavorite: (dog: Dog) => void, onUnfavorite: (dog: Dog) => void}) {
    const [isFavorited, setFavorited] = useState<boolean>(false);
    const [isPurchased, setPurchased] = useState<boolean>(false);
    
    return <div style={{backgroundColor: (isPurchased ? "#90EE90" : "")}}>
        <img src={props.dog.photoUrl} width="auto" height="175px" alt="dog" style={{float: "left", margin: "10px"}}/>
        <h3>{props.dog.name + ' - ' + props.dog.breed + ', ' + props.dog.age + ' years old'}</h3>
        <p>{props.dog.description}</p>
        <button onClick={() => {
            !isFavorited ? props.onFavorite(props.dog) : props.onUnfavorite(props.dog);
            setFavorited(!isFavorited);
        }} style={{backgroundColor: (isFavorited ? "red" : "")}}>{!isFavorited ? 'Favorite' : 'Unfavorite'}</button>
        <button onClick={() => {
            setPurchased(true);
            alert('You have bought ' + props.dog.name + '!');
        }} style={{margin: "5px"}}>Purchase</button>
        <hr style={{clear: "both"}} />
    </div>
}