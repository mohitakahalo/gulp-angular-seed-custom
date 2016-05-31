(function() {
  'use strict';
  
  angular
    .module('services')
    .factory('appConstants', appConstants); 

  /** @ngInject */
  function appConstants(env) {
    
    return  {
      BASE_API_URL: env.platformHost + ':' + env.platformPort + '/api',
      MOCK_API_URL: env.platformHost + ':' + env.platformPort + '/mock',
      ACCOUNT_API_URL: '/account',
      USER_PROFILE_API_URL: '/account/user-profile/',
      COMPANY_PROFILE_API_URL: '/company/company-profile/',
      DEAL_ROOM_API_URL: '/deal-room',
      HOME_API_URL: '/stream',
      TRIBE_API_URL: '/tribe',
      USER_ROLES: {
        entrepreneur: 'entrepreneur',
        individual_investor: 'individual_investor',
        institutional_investor: 'institutional_investor'
      },
      NUM_TYPE_FOR_USER_ROLES: {
        entrepreneur: 0,
        investor: 1,
        lead_investor: 2,
        service_provider: 3,
        sha_service_provider: 4
      },
      NUM_ROLES_TO_CATEGORY_MAP: {
        0: 'Entrepreneur',
        1 : 'Investor',
        2: 'Lead Investor',
        3: 'Service Provider',
        4: 'SHA Service Provider'
      },
      OFFER_INVITE_STATUS: {
        send_from_entrepreneur: 0,
        send_from_investor: 1,
        accept: 2,
        reject: 3,
        offer: 4,
        finalized: 5
      },
      INVITE_SENDER_TYPE: {
        entrepreneur: 0,
        investor: 1
      },
      BUISNESS_ROLES: {
        individual_investor: 'individualInvestor',
        institutional_investor: 'institutionalInvestor',
        service_provider: 'serviceProvider'
      },
      STATES_TO_EXCLUDE_FOR_AUTH: [
        'landing_page',
        'landing_page.home',
        'landing_page.team',
        'register'
      ],
      DEAL_TYPES: {
        'Debt': 0,
        'Equity': 1,
        'Grant': 2
      },
      DEFAULT_SLICK_CONFIG: {
        dots: false,
        autoplay: false,
        arrows: true,
        infinite: false,
        slidesToSlide: 1,
        variableWidth: true,
        prevArrow: "<div class='slick-arrow slick-prev'></div>",
        nextArrow: "<div class='slick-arrow slick-next'></div>",
        method: {} // don't remove this empty object
      },
      CK_EDITOR_OPTIONS: {
        language: 'en',
        uiColor: '#FFFFFF',
        width: '100%',
        height: '200px',
        toolbarLocation: 'bottom',
        extraPlugins: 'font,colorbutton',
        removePlugins : 'elementspath',
        resize_enabled: false,
        toolbar: 'custom',
        toolbar_custom :[
          { name: 'document', items : [ 'NewPage','Preview' ] },
          { name: 'clipboard', items : [ 'Cut','Copy','Paste','PasteText','PasteFromWord','-','Undo','Redo' ] },
          { name: 'editing', items : [ 'Find','Replace','-','SelectAll','-','Scayt' ] },
          { name: 'insert', items : [ 'Table','HorizontalRule','Smiley','SpecialChar','PageBreak'] },
                      '/',
          { name: 'styles', items : [ 'Styles','Format','Font','FontSize' ] },
          { name: 'basicstyles', items : [ 'Bold','Italic','Strike','-','RemoveFormat' ] },
          { name: 'paragraph', items : [ 'NumberedList','BulletedList','-','Outdent','Indent','-','Blockquote','CreateDiv',
            '-','JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock','-','BidiLtr','BidiRtl' ] },
          { name: 'links', items : [ 'Link','Unlink','Anchor' ] },
          { name: 'tools', items : [ 'Maximize','-' ] },
          { name: 'colors', items : [ 'TextColor','BGColor' ] }
        ]
      },
      DUE_DILIGENCE_STATUS: {
          0: 'initial',
          1: 'accepted',
          2: 'rejected',
          3: 'approved'
      },
      DEAL_STATUS: {
        'open': 0,
        'closed': 1,
        'abandoned': 2
      },
      DEAL_TYPE_MAP: {
        0: 'Debt',
        1: 'Equity',
        2: 'Grant'
      },
      DEBT_TYPE_TO_NUMBER_MAP: {
        'working_capital' : 0,
        'termLoan' : 1,
        'invoice_discounting': 2,
        'purchase_order': 3,
        'financing': 4,
        'loan_against_property': 5
      },
      DEBT_NUMBER_TO_TYPE_MAP: {
        0: 'Working Capital',
        1 : 'Termloan',
        2: 'Invoice Discounting',
        3: 'Purchase Order',
        4: 'Financing',
        5: 'Loan Against Property'
      },
      TERM_SHEET_STATUS: {
        'created': 0,
        'approved': 1,
        'proceed_DD': 2,
        'frozen': 3,
        'finally_frozen': 4
      },
      BOOKMARK_TYPE: {
        'tribe': 0,
        'user': 1,
        'enterprise': 2
      }
    };
  }
})();