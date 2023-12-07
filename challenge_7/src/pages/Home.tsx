import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveToken } from '../redux/slices/token';
import Header from '../components/Header';

interface UserEntity {
  id: number;
  name: string;
  email: string;
  profile_picture_url: string;
}

interface TweetEntity {
  id: number;
  content: string;
  user: UserEntity;
}

const tweets_api_base_url = 'http://localhost:8082';

export default function Home() {
  const [tweets, setTweets] = useState<TweetEntity[]>([]);

  // Use if you want to use passing state by props
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTweets = async () => {
      const response = await fetch(tweets_api_base_url + '/api/tweets');
      const responseJSON = await response.json();

      setTweets(responseJSON.data.tweets);
    };

    const checkIsLoggedIn = () => {
      const accessToken = localStorage.getItem('access_token');

      // Use if you want to use passing state by props
      if (accessToken) {
        setIsLoggedIn(true);

        // TODO:
        // Save token to redux store
        dispatch(saveToken(accessToken));
      } else setIsLoggedIn(false);
    };

    fetchTweets();
    checkIsLoggedIn();
  }, []);

  return (
    Header()
  );
}
