// assets
import { IconKey } from '@tabler/icons';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
// constant
const icons = {
  IconKey
};
const AssignmentInd = {
  AssignmentIndIcon
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'pages',
  title: 'Pages',
  caption: 'Pages Caption',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'Authentication',
      type: 'collapse',
      icon: icons.IconKey,

      children: [
        {
          id: 'login3',
          title: 'Login',
          type: 'item',
          url: '/pages/login/login3',
          target: true
        },
        {
          id: 'register3',
          title: 'Register',
          type: 'item',
          url: '/pages/register/register3',
          target: true
        }
      ]
    },
    {
      id: 'master',
      title: 'Master',
      type: 'collapse',
      icon: AssignmentInd.AssignmentIndIcon,

      children: [
        {
          id: 'Demo',
          title: 'Academic',
          type: 'item',
          url: '/Master/Demo',
          target: true
        }
      ]
    }
  ]
};

export default pages;
