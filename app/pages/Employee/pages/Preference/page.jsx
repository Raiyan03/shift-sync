import Layout from '@/app/pages/Employee/layout';
import DayCard from '../../comps/dayCard';
const Preferences = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return (
        <>
      <h1 className="text-2xl font-bold mb-4">Set Your Preferences</h1>
      <div>
        <select className="border p-2 mb-4">
          <option>Week 1</option>
          <option>Week 2</option>
          {/* Add more weeks as needed */}
        </select>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {days.map((day) => (
            <DayCard key={day} day={day} />
          ))}
        </div>
      </div>
      </>
  );
};

export default Preferences;
