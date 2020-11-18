const categoriesItems = [
  {
    name: 'Benefits',
    iconClass: 'icon-staff',
    items: [
      {
        name: 'Core HR',
        disabled: false,
        title: 'People services',
        introduction: 'Book holiday, view payslips, submit expenses and more with',
        image: require('../images/CoreHR.png'),
        linkAddress: 'https://my.corehr.com/pls/coreportal_untgp',
        linkTitle: 'corehr.com'      
      },
      {
        name: 'LifeWorks',
        disabled: false,
        title: 'Perks, discounts and welfare',
        introduction: 'Save money online and in-store and get well-being support with',
        image: require('../images/Lifeworks.png'),
        storeUrls: {
          android: 'https://play.google.com/store/apps/details?id=com.wam.android&hl=en_GB',
          ios: 'https://apps.apple.com/gb/app/lifeworks/id662088737',
        },
        linkAddress: 'https://www.lifeworks.com/uk/',
        linkTitle: 'lifeworks.com',
        appConfig: {
          appStoreId: '662088737',
          playStoreId: 'com.wam.android'
        }
      },
      {
        name: 'Benpal',
        disabled: false,
        title: 'Pension',
        introduction: 'View and manage your company pension with',
        image: require('../images/Benpal.png'),
        linkAddress: 'https://login.benpal.com/',
        linkTitle: 'benpal.com'
      },
      {
        name: 'Computershare',
        disabled: false,
        title: 'Childcare and sharesave',
        introduction: 'Access childcare vouchers and the sharesave scheme with',
        image: require('../images/Computershare.png'),
        linkAddress: 'https://www.computershare.com/uk',
        linkTitle: 'computershare.com'
      },
      {
        name: 'Medicash',
        disabled: false,
        title: 'Medicash',
        introduction: 'Claim back money spent on healthcare, access stress free support from the Best Doctors and Virtual GPs with',
        image: require('../images/Medicash.png'),
        type: 'store',
        storeUrls: {
          android: 'https://play.google.com/store/apps/details?id=org.medicash.app2',
          ios: 'https://apps.apple.com/gb/app/my-medicash-app/id1444883537',
        },
        linkAddress: 'https://www.medicash.org/',
        linkTitle: 'medicash.org',
      },
    ],
  },
  {
    name: 'Collaboration',
    iconClass: 'icon-multipleoccupancy',
    items: [
      {
        name: 'Yammer',
        disabled: false,
        title: 'Company social network',
        introduction: 'Follow projects, connect with colleagues, and share news on',
        image: require('../images/Yammer.png'),
        storeUrls: {
          android: 'https://play.google.com/store/apps/details?id=com.yammer.v1&hl=en_GB',
          ios: 'https://apps.apple.com/gb/app/yammer/id289559439',
        },
        linkAddress: 'https://www.yammer.com/unitestudents.com',
        linkTitle: 'yammer.com',
        deepLink: 'https://www.yammer.com/unitestudents.com/#/home?allow_app_redirect=1',
        appConfig: {
          appStoreId: '289559439',
          playStoreId: 'com.yammer.v1',
        }
      },
      {
        name: 'The Hub',
        disabled: false,
        title: 'The Hub',
        introduction: 'Find all the latest company news and know-how you need in',
        image: require('../images/TheHub.png'),
        storeUrls: {
          android: 'https://play.google.com/store/apps/details?id=com.microsoft.sharepoint',
          ios: 'https://apps.apple.com/gb/app/microsoft-sharepoint/id1091505266',
        },
        linkAddress: 'https://unitestudentsyammer.sharepoint.com/sites/thehub',
        linkTitle: 'unitestudentsyammer.sharepoint.com'
      },
      {
        name: 'Teams',
        disabled: false,
        title: 'Collaborative project space',
        introduction: 'Collaborate, chat, create wikis, and share files with colleagues on',
        image: require('../images/Teams.png'),
        storeUrls: {
          android: 'https://play.google.com/store/apps/details?id=com.microsoft.teams&hl=en_GB',
          ios: 'https://apps.apple.com/gb/app/microsoft-teams/id1113153706',
        },
        linkAddress: 'https://products.office.com/en-gb/microsoft-teams/group-chat-software',
        linkTitle: 'products.office.com/en-gb/microsoft-teams',
        appConfig: {
          appStoreId: '1113153706',
          playStoreId: ' ',
        }
      },
      {
        name: 'Outlook',
        disabled: false,
        title: 'Email and calendar',
        introduction: 'Manage your work email, calendar, and tasks with',
        image: require('../images/Outlook.png'),
        storeUrls: {
          android: 'https://play.google.com/store/apps/details?id=com.microsoft.office.outlook&hl=en_GB',
          ios: 'https://apps.apple.com/gb/app/microsoft-outlook/id951937596',
        },
        linkAddress: 'https://outlook.live.com/owa/',
        linkTitle: 'outlook.live.com',
        appConfig: {
          appStoreId: '951937596',
          playStoreId: ' ',
        }
      },
      {
        name: 'OneDrive',
        disabled: false,
        title: 'Collaborative file management',
        introduction: 'Share files and work on them with colleagues using',
        image: require('../images/OneDrive.png'),
        storeUrls: {
          android: 'https://play.google.com/store/apps/details?id=com.microsoft.skydrive&hl=en_GB',
          ios: 'https://apps.apple.com/gb/app/microsoft-onedrive/id477537958',
        },
        linkAddress: 'https://products.office.com/en-gb/onedrive/online-cloud-storage',
        linkTitle: 'products.office.com/en-gb/onedrive',
        appConfig: {
          appStoreId: '477537958',
          playStoreId: ' ',
        }
      },
      {
        name: 'OwnCloud',
        disabled: false,
        title: 'Large file sharing',
        introduction: 'Share large files with colleagues or external contacts using',
        image: require('../images/OwnCloud.png'),
        storeUrls: {
          android: 'https://play.google.com/store/apps/details?id=com.owncloud.android&hl=en_GB',
          ios: 'https://apps.apple.com/gb/app/owncloud/id543672169',
        },
        linkAddress: 'https://sharing.unite-group.co.uk/index.php/login',
        linkTitle: 'sharing.unite-group.co.uk',
        appConfig: {
          appStoreId: '543672169',
          playStoreId: ' ',
        }
      },
      {
        name: 'Skype for Business',
        disabled: false,
        title: 'Skype for Business',
        introduction: 'Connect and communicate with colleagues across the company with',
        image: require('../images/Skype.png'),
        type: 'store',
        storeUrls: {
          android: 'https://play.google.com/store/apps/details?id=com.microsoft.office.lync15',
          ios: 'https://apps.apple.com/gb/app/skype-for-business/id605841731',
        },
        linkAddress: 'https://products.office.com/en-gb/skype-for-business/download-app',
        linkTitle: 'products.office.com/en-gb/skype-for-business'      
      },
    ],
  },
  {
    name: 'Tools',
    iconClass: 'icon-maintenance',
    items: [
      {
        name: 'Duo Mobile',
        disabled: false,
        title: 'Security authentication',
        introduction: 'Log in securely using dual-factor authentication with',
        image: require('../images/DuoMobile.png'),
        storeUrls: {
          android: 'https://play.google.com/store/apps/details?id=com.duosecurity.duomobile&hl=en_GB',
          ios: 'https://apps.apple.com/gb/app/duo-mobile/id422663827',
        },
        appConfig: {
          appStoreId: '422663827',
          playStoreId: ' ',
        }
      },
    ],
  },
  {
    name: 'Support',
    iconClass: 'icon-chat',
    items: [
      {
        name: 'Osborne Clarke',
        disabled: false,
        title: 'Employee rights advice',
        introduction: 'Get legal advice and support on employee rights from',
        image: require('../images/OsborneClarke.png'),
        linkAddress: 'https://solutions.osborneclarke.com/osborneclarke/sitecontroller.action?metaData.siteID=16903',
        linkTitle: 'osborneclarke.com'
      },
      {
        name: 'IT Support Portal',
        disabled: false,
        title: 'IT Support Portal',
        introduction: 'Need IT help? You can log an issue or make a request through the',
        image: require('../images/MyIt.png'),
        type: 'web',
        linkAddress: 'https://ithelp.unitestudents.com',
        linkTitle: 'ithelp.unitestudents.com'
      },
    ],
  },

];

export default categoriesItems;