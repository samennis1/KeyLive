import { useSession } from "next-auth/react";
import type { ReactElement } from "react";
import Modal from "../components/Modal";
import SideBar from "../components/Sidebar";
import type { NextPageWithLayout } from "./_app";

const Dashboard: NextPageWithLayout = () => {
  const { data: session } = useSession();

  const buttonCallback = () => {
    window.location.href = "/";
  };

  return (
    <>
      {!session ? (
        <Modal
          title="You are not logged in!"
          subtext="Please login or create an account to view the Dashboard"
          buttonText="Go to Home Page"
          callback={buttonCallback}
          closable={false}
        />
      ) : (
        <>
          <SideBar></SideBar>
          <div className="flex flex-1 flex-col md:pl-64">
            <main>
              <div className="py-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                  <h1 className="text-2xl font-semibold text-gray-900">
                    Dashboard
                  </h1>
                </div>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                  {/* Replace with your content */}

                  <div className="py-4">
                    <div className="h-96 rounded-lg border-4 border-dashed border-gray-200" />
                  </div>
                  {/* /End replace */}
                </div>
              </div>
            </main>
          </div>
        </>
      )}
    </>
  );
};

// Dashboard.getLayout = (page: ReactElement) => {
//     return (
//         {page}
//     )
// }

export default Dashboard;
