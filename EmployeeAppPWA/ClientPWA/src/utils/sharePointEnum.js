const sharePointEnum = {
  SHAREPOINT_ROOT_URL: 'https://unitestudentsyammer.sharepoint.com',
  // Debug Get all select to see whats there
  SHAREPOINT_REST_DEBUG_URL: 'https://unitestudentsyammer.sharepoint.com/sites/thehub/_api/web/lists/getbytitle(\'Site Pages\')/items?$select=*&$orderby=Created desc&$filter=PromotedState eq 2',
  // ItemCount
  // SHAREPOINT_REST_DEBUG_URL: 'https://unitestudentsyammer.sharepoint.com/sites/thehub/_api/web/lists/getbytitle(\'Site Pages\')/ItemCount',
  //SHAREPOINT_REST_DEBUG_URL: 'https://unitestudentsyammer.sharepoint.com/sites/thehub/_vti_bin/ListData.svc/Pages/$count?$filter=((PromotedState eq \'2\'))',
  
  
  SHAREPOINT_REST_SITE_PAGE_URL: 'https://unitestudentsyammer.sharepoint.com/sites/thehub/_api/web/lists/getbytitle(\'Site Pages\')/items?$select=Title,GUID,Created,Description,FileRef,BannerImageUrl/Url,TaxCatchAll/Term,ImageUrl&$expand=TaxCatchAll&$orderby=Created desc&$filter=PromotedState eq 2',
};

export default sharePointEnum;