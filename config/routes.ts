export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
    ],
  },
  {
    path: '/overview',
    name: 'overview',
    access: 'canUser|canRoot|canServer',
    icon: 'home',
    component: './Overview',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'user',
    access: 'canUser|canRoot|canServer',
    component: './userCenter',
  },
  {
    path: '/project',
    name: 'project',
    icon: 'folder',
    access: 'canUser|canRoot|canServer',
    routes: [
      {
        path: '/project/newpro',
        name: 'newpro',
        icon: 'folder',
        routes: [
          {
            path: '/project/newpro/ap',  //创建AP项目
            name: 'ap',
            icon: 'folder',
            component: './profile/createPro/ap'
          },
        ],
      },
      {
        path: '/project/list',
        name: 'list',
        icon: 'folder',
        routes: [
          {
            path: '/project/list/ap',
            name: 'ap',
            icon: 'smile',
            component: './profile/proList/apList',

          },
        ],
      },
    ],

  },
  {
    path: '/device',
    name: 'device',
    icon: 'ClusterOutlined',
    access: 'canUser|canRoot|canServer',
    component: './Admin',
    routes: [
      {
        path: '/device/apmanager',
        name: 'apmanager',
        icon: 'smile',
        component: './Welcome',
        routes: [
          {
            path: '/device/apmanager/ap',
            name: 'ap',
            icon: 'smile',
            component: './Welcome',

          },
          {
            path: '/device/apmanager/sta',
            name: 'sta',
            icon: 'smile',
            component: './Welcome',

          },
        ],
      },
    ],
  },
  {
    path: '/root',
    name: 'root',
    icon: 'crown',
    access: 'canRoot',
    component: './Admin',
    routes: [
      {
        path: '/root/server',
        name: 'server',
        icon: 'smile',
        component: './Welcome',
      },
      {
        path: '/root/serverCheck',
        name: 'serverCheck',
        icon: 'smile',
        component: './Welcome',
      },
      {
        path: '/root/proManager',
        name: 'proManager',
        icon: 'smile',
        component: './Welcome',
      },
      {
        path: '/root/devStatistic',
        name: 'devStatistic',
        icon: 'smile',
        component: './Welcome',
      },
    ],
  },
  {
    path: '/syslog',
    name: 'syslog',
    icon: 'file',
    access: 'canUser|canRoot|canServer',
    component: './Admin',
    routes: [
      {
        path: '/syslog/login',
        name: 'login',
        icon: 'smile',
        component: './Welcome',
      },
      {
        path: '/syslog/alarm',
        name: 'alarm',
        icon: 'smile',
        component: './Welcome',
      },
      {
        path: '/syslog/action',
        name: 'action',
        icon: 'smile',
        component: './Welcome',
      },
    ],
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    path: '/',
    redirect: '/overview',
  },
  {
    component: './404',
  },
];
