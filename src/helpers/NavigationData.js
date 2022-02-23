import Home from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import CreateIcon from '@mui/icons-material/Create';

export const DataNavigation = [
  {
    id: 1,
    to: '/',
    articleName: 'Home',
    Icon: <Home />,
    fontSize: 'small',
  },
  {
    id: 2,
    to: '/articles/my',
    articleName: 'My article',
    Icon: <ArticleIcon />,
    fontSize: 'small',
  },
  {
    id: 3,
    to: '/articles/create',
    articleName: 'Create article',
    Icon: <CreateIcon />,
    fontSize: 'small',
  },
];
