
const routesConfig = {
    "admin": [
      { path: '/', element: 'Employee_manage/Employee' },
      { path: '/Admin/', element: 'Employee_manage/Employee' },
      { path: '/Admin/Employee_manage/List', element: 'Employee_manage/Employee' },
      { path: '/Admin/Employee_manage/Add', element: 'Employee_manage/Employee_add' },
      { path: '/Admin/Employee_manage/Edit/:employee_id', element: 'Employee_manage/Employee_edit' },
      { path: '/Admin/Order_manage', element: 'order_manage/Order' },
      { path: '/Admin/Product_manage/List', element: 'product_manage/Product' },
      { path: '/Admin/Product_manage/Add', element: 'product_manage/Product_add' },
      { path: '/Admin/Product_manage/Edit/:product_id', element: 'product_manage/Product_edit' },
      { path: '/Admin/Category_manage/List', element: 'Category' },
      { path: '/Admin/Category_manage/Add', element: 'Category_add' },
      { path: '/Admin/Category_manage/Edit/:category_id', element: 'Category_edit' },
      { path: '/Admin/Category_manage/ListProduct/:category_name', element: 'Category_product' },
      { path: '/Admin/Inventory', element: 'Inventory' },
      { path: '/Admin/Import_manage', element: 'Import_manage' },
    ],
    "sale": [
      { path: '/', element: 'Order' },
      { path: '/Sale', element: 'Order' },
      { path: '/Sale/Confirm', element: 'Confirm' },
      { path: '/Sale/Status', element: 'Status' },
      { path: '/Sale/Complete', element: 'Complete' },
    ],
  };
  
  export default routesConfig;
  