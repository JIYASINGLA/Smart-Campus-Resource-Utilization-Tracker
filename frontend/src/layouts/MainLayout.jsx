import Sidebar from "../components/Sidebar";


const MainLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <Sidebar />

      {/* Right Section */}
      <div className="flex flex-col flex-1">

       

        {/* Page Content */}
        <main className="flex-1">
          {children}
        </main>

      </div>
    </div>
  );
};

export default MainLayout;