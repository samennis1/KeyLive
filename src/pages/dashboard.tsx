import { useSession } from "next-auth/react";
import type { ReactElement } from "react";
import Modal from "../components/Modal";
import SideBar from "../components/Sidebar";
import TripleStats from "../components/TripleStats";
import { statisticObject } from "../utils/types";
import type { NextPageWithLayout } from "./_app";

const Dashboard: NextPageWithLayout = () => {
  const { data: session } = useSession();

  const buttonCallback = () => {
    window.location.href = "/";
  };

  const listofStats: statisticObject[] = [
    {
      bottomText: "total product keys",
      topNumber: "125"
    },
    {
      bottomText: "activated keys",
      topNumber: "50"
    },
    {
      bottomText: "percentage activated",
      topNumber: "40%"
    }
  ]

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
                    Welcome back, {session.user.firstName}
                  </h1>
                </div>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                  {/* Replace with your content */}
                  <TripleStats listOfStats={listofStats}/>
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
