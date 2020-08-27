import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Home',
    icon: 'home-outline',
    link: '/web/dashboard',
    home: true,

    children: [
      {
        title: 'Dashboard',
        link: '/web/dashboard',
      },
      {
        title: 'Live Track',
        link: '/web/livetrack',
      },
      {
        title: 'Track History',
        link: '/web/trackhistory',
      },

    ],
  },
  {
    title: 'My Account',
    icon: 'person',
    link: '/web/myaccount',
    children: [
      {
        title: 'My Profile',
        link: '/web/myaccount/myprofile',
      },
      {
        title: 'My Wallet',
        link: '/web/myaccount/mywallet',
      },
      {
        title: 'My Trips',
        link: '/web/myaccount/mytrips',
      },
      {
        title: 'My Geofence',
        link: '/web/myaccount/mygeofence',
      },
      {
        title: 'My Routes',
        pathMatch: 'prefix',
        link: '/web/myaccount/myroutes',
      },
      {
        title: 'My Shared Users',
        pathMatch: 'prefix',
        link: '/web/myaccount/mysharedusers',
      },
      {
        title: 'My Drivers',
        pathMatch: 'prefix',
        link: '/web/myaccount/mydrivers',
      },
      {
        title: 'My Groups',
        pathMatch: 'prefix',
        link: '/web/myaccount/mygroups',
      },

    ],

  },

  {
    title: 'Reports & Charts',
    icon: 'browser-outline',
    link: '/web/reports_charts',
  },
  {
    title: 'Fleet Management',
    icon: 'pie-chart-outline',
    link: '/web/fleet-management',
  },
  {
    title: 'GPS Lock',
    icon: 'message-circle-outline',
    link: '/web/gpslock',
  },
  {
    title: 'Purchases',
    icon: 'layout-outline',
    link: '/web/purchases',
    children: [
      {
        title: 'Buy Plans',
        link: '/web/purchases/buyplans',
      },
      {
        title: 'Buy Products',
        link: '/web/purchases/buyproducts',
      },
      {
        title: 'My Orders',
        link: '/web/purchases/myorders',
      },

    ],
  },


  {
    title: 'Notifications',
    icon: 'shuffle-2-outline',
    link: '/web/notifications',
  },
  {
    title: 'Others',
    icon: 'edit-2-outline',
    link: '/web/others',
    children: [
      {
        title: 'Settings',
        link: '/web/others/settings',
      },
      {
        title: 'Contact Us',
        link: '/web/others/contactus',
      },
      {
        title: 'Help',
        link: '/web/others/help',
      },
      {
        title: 'Refer & Earn',
        link: '/web/others/refernearn',
      },
    ],
  },
  // {
  //   title: 'Logout',
  //   icon: 'power-outline',
  //   link: '/login',
  // },
];
