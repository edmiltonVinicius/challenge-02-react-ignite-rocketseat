import { useEffect, useState } from 'react';

import { SideBar } from './components/SideBar/Index';
import { Content } from './components/Content/Index';

import './styles/global.scss';
import { api } from './services/api';
import { GenreResponsePropsInterface } from './/interfaces/GenreResponsePropsInterface';

export function App() {
    const [selectedGenreId, setSelectedGenreId] = useState(1);
    const [selectedGenre, setSelectedGenre] = useState<GenreResponsePropsInterface>({} as GenreResponsePropsInterface);

    useEffect(() => {
        api.get<GenreResponsePropsInterface>(`genres/${selectedGenreId}`).then((response) => {
            setSelectedGenre(response.data);
        });
    }, [selectedGenreId]);

    function handleClickButton(id: number) {
        setSelectedGenreId(id);
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <SideBar handleClickButton={handleClickButton} selectedGenreId={selectedGenreId} />
            <Content selectedGenreId={selectedGenreId} selectedGenre={selectedGenre} />
        </div>
    );
}
