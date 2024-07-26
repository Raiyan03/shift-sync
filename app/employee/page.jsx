"use client"
import { getEmployeeData } from "@/lib/utilities";
import Evaluation from "@/components/manager/evaluation/evaluation";
import UserTable from "@/components/manager/employees/employees";

export default function Employees() {
    const [employeeData, setEmployeeData] = useState();
    
    const fetchData = async () => {
      const userData = await getUser();
      const employees = await getEmployeeData(userData.id);
      console.log(employees);
      const data = {
        employees,
      };
  
      setEmployeeData(data);
    };
  
    useEffect(() => {
      fetchData();
    }, []);
    
    return (
        <div className="flex flex-col space-y-4 p-4">
            <UserTable employeeData={employeeData} setEmployeeData={setEmployeeData} />
            <div className="flex flex-col bg-secondary shadow-md border rounded-md p-4">
                <h1 className="text-xl font-bold mb-4">Evaluation</h1>
                <Evaluation />
            </div>
        </div>
    );
}

export default page

//convertTimeStamp( (value.shift.shift[0]) , (value.shift.shift[1])) 
