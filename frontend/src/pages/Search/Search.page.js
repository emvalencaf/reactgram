// Components
import { Link } from 'react-router-dom';
import LikeContainer from '../../components/LikeContainer.component';
import PhotoItem from '../../components/PhotoItem.component';

// Hooks
import { useEffect } from 'react';
import {
    useSelector,
    useDispatch
} from 'react-redux';
import { useResetComponentMessage } from '../../hooks/useResetComponentMessage.hook';
import { useQuery } from '../../hooks/useQuery.hooks';

// Redux
import {
    searchPhotosByTitle,
    likePhoto
} from '../../slices/photo.slice';

// Style
import './Search.css';


const Search = () => {
    
    // Get queryString
    const query = useQuery();
    const search = query.get('q');

    const dispatch = useDispatch();

    const resetMessage = useResetComponentMessage(dispatch);

    // States
    const { user, loading:loadingUser } = useSelector(state => state.auth);
    const { photos, loading: loadingPhotos } = useSelector(state => state.photo);

    // Load photos by searching
    useEffect(() => {
        dispatch(searchPhotosByTitle(search));
    }, [dispatch, search]);

    // Insert like to a photo
    const handleLike = (photo = null) => {

        dispatch(likePhoto(photo._id));

        resetMessage();
    };

    if(loadingUser || loadingPhotos) return <p>Carregando...</p>


    return (
        <div id="search">
            <h2>Você está buscando por: {search}.</h2>
            {photos && photos.length === 0 && (
                <h2 className="no-photos">
                    Não foi encontrado resultados para sua busca.
                </h2>
            )}
            {photos && photos.map(photo => (
                <>
                    <div
                        key={photo._id}
                    >
                        <PhotoItem photo={photo} />
                        <LikeContainer
                            photo={photo}
                            user={user}
                            handleLike={handleLike}
                        />
                        <Link
                            className='btn'
                            to={`/photos/${photo._id}`}
                        >Ver mais</Link>
                    </div>
                </>
            ))}
        </div>
    )
}

export default Search;