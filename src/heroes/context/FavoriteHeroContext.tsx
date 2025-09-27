import { createContext, useEffect, useState } from "react";
import type { Hero } from "../types/heroes.interface";
import type { PropsWithChildren } from 'react';

interface FavoriteHeroContextProps {
    //State
    favorites: Hero[];
    favoriteCount: number;
    //Methods
    toggleFavorite: (hero: Hero) => void;
    isHeroFavorite: (hero: Hero) => boolean;
}


export const FavoriteHeroContext = createContext({} as FavoriteHeroContextProps);


const getFavoritesFromLocalStorage = (): Hero[] => {
    const favs = localStorage.getItem('favorites');
    return favs ? JSON.parse(favs) : [];
}

export const FavoriteHeroProvider = ({ children }: PropsWithChildren) => {
    const [favorites, setFavorites] = useState<Hero[]>(getFavoritesFromLocalStorage());
    ;

    const toggleFavorite = (hero: Hero) => {
        const heroExist = favorites.find(fav => fav.id === hero.id);

        if (heroExist) {
            setFavorites(prev => prev.filter(fav => fav.id !== hero.id));
            return;
        }

        setFavorites(prev => [...prev, hero]);
    }

    const isFavorite = (hero: Hero) => {
        return favorites.some(fav => fav.id === hero.id);
    }

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    return (
        <FavoriteHeroContext
            value={{
                favorites: favorites,
                favoriteCount: favorites.length,
                toggleFavorite: toggleFavorite,
                isHeroFavorite: isFavorite,
            }}
        >
            {children}
        </FavoriteHeroContext>
    )
}