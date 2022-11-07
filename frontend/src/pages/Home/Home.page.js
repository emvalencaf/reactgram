// Componenets
import { Link } from 'react-router-dom';
import PhotoItem from '../../components/PhotoItem.component';
import LikeContainer from '../../components/LikeContainer.component';

// Hooks
import { useEffect } from 'react';
import {
  useSelector,
  useDispatch
} from 'react-redux';
import { useResetComponentMessage } from '../../hooks/useResetComponentMessage.hook';

// Redux
import {
  getAllPhotos,
  likePhoto
} from '../../slices/photo.slice';

// Styles
import './Home.css';

const Home = () => {

  const dispatch = useDispatch();

  const resetMessage = useResetComponentMessage(dispatch);

  const { user } = useSelector(state => state.auth);
  const {
    photos,
    loading
  } = useSelector(state => state.photo);

  // Load all photos
  useEffect(
    () => {
      dispatch(getAllPhotos());
    },
    [dispatch]
  );

  // Insert a like to a photo
  const handleLike = (photo) => {
    dispatch(likePhoto(photo._id));

    resetMessage();
  };

  
  if(loading) return <p>Carregando fotos do servidor...</p>


  return (
    <div id='home'>
      {photos && photos.length === 0 && (
        <h2 className="no-photos">
          Ainda não  há fotos publicadas, <Link
            to={`/users/${user.userId}`}
          >clique aqui</Link>
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
  );
};

export default Home;