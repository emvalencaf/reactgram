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

} from '../../slices/photo.slice';

// Style
import './Search.css';


const Search = () => {
  return (
    <div>Search</div>
  )
}

export default Search;