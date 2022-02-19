import { useEffect, useState } from 'react';

import './/style.scss';
import { Button } from '../Button/Index';
import { api } from '../../services/api';
import { GenreResponsePropsInterface } from '../../interfaces/GenreResponsePropsInterface';

interface SideBarProps {
    handleClickButton: (id: number) => void;
    selectedGenreId: number;
}

export function SideBar({ handleClickButton, selectedGenreId }: SideBarProps) {
    const [genres, setGenres] = useState<GenreResponsePropsInterface[]>([]);

    useEffect(() => {
        api.get<GenreResponsePropsInterface[]>('genres').then((response) => {
            setGenres(response.data);
        });
    }, []);

    return (
        <nav className="sidebar">
            <span>
                Watch<p>Me</p>
            </span>

            <div className="buttons-container">
                {genres.map((genre) => (
                    <Button
                        key={String(genre.id)}
                        iconName={genre.name}
                        title={genre.title}
                        onClick={() => handleClickButton(genre.id)}
                        selected={selectedGenreId === genre.id}
                    />
                ))}
            </div>
        </nav>
    );
}
