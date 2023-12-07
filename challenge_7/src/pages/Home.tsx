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


export default function Home() {


  return (
    Header()
  );
}
