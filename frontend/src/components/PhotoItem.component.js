// Images from directory
import { uploads } from '../utils/config.utils';

// Components
import { Link } from 'react-router-dom';

// Styles
import './PhotoItem.css';

const PhotoItem = ({ photo }) => {
    return (
        <div className='photo-item'>
            {photo.image && (
                <>
                    <img
                        src={`${uploads}/photos/${photo.image}`}
                        alt={photo.title}
                    />
                    <h2>{photo.title}</h2>
                    <p className="photo-author">
                        Publiada por: <Link to={`/users/${photo.userId}`}>{photo.userName}</Link>
                    </p>
                </>
            )}
        </div>
    )
}

export default PhotoItem