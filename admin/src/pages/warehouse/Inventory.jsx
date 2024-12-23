import React from 'react'

const Inventory = () => {
  const [listImport, setListImport] = useState([]);
  const navigate = useNavigate();

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/import/list');
      if (response.data.success) { 
        setListImport(response.data.employees);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className='mb-2'>All Imports List</p>
      <div className='flex flex-col gap-2'>
        {/* -------------- List Table Title -------------- */}
        <div className='hidden md:grid grid-cols-[1fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>ID</b>
          <b>Date</b>
          <b>Amount</b>
          <b>Receipt</b>
        </div>

        {
          listImport.map((item, index) => (
            <div 
              className='grid grid-cols-[1fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm' 
              key={index}
            >
              <b>{item.import_id}</b>
              <b>{item.date}</b>
              <b>{item.amount}</b>
              <a href={item.receipt} download="example.txt">
                <img 
                  src="https://europipevietnam.com.vn/wp-content/uploads/2021/08/europipevietnam_icon_download-tai-lieu.png" 
                  alt="Download File" 
                  className="w-32 h-32 cursor-pointer" 
                />
              </a>
            </div>
          ))
        }
      </div>
    </>
  );
}

export default Inventory
