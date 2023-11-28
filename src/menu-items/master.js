import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
const AssignmentInd = {
    AssignmentIndIcon
  };
  

const Master = {
    id: 'pages',
    title: 'Master',
    type: 'group',
    children: [
      {
        id: 'master',
        title: 'Academic Master',
        type: 'collapse',
        icon: AssignmentInd.AssignmentIndIcon,
  
        children: [
          {
            id: 'Demo',
            title: 'Demo',
            type: 'item',
            url: '/Master/Demo',
           
          },
          {
            id: 'CountryMaster',
            title: 'Country Master',
            type: 'item',
            url: '/Master/CountryMaster',
            
          }
        ]
      }
    ]
  };

export default Master;
