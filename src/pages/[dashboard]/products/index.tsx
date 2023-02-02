import { Product, ProductCode } from "@prisma/client";
import { useSession } from "next-auth/react";
import { ReactElement, useEffect, useState } from "react";
import Modal from "../../../components/Modal";
import SideBar from "../../../components/Sidebar";
import Table from "../../../components/ProductKeyTable";
import TripleStats from "../../../components/TripleStats";
import { api } from "../../../utils/api";
import type { productCodeExtension, statisticObject } from "../../../utils/types";
import type { NextPageWithLayout } from "../../_app";
import ProductTable from "../../../components/ProductTable";

const Dashboard: NextPageWithLayout = () => {
  const { data: session, status } = useSession();
  const { data: keyData } = api.keys.getAll.useQuery({max: 10});
  const { data: products } = api.products.get.useQuery();
  const [modalShow, showModal] = useState(false);
  const [productsList, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if(products) {
      setProducts([...products]);
    }
  }, [products])

  useEffect(() => {
    if(status == "unauthenticated") {
      showModal(true);
    } else {
      showModal(false)
    }
  }, [status])

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
      {modalShow ? (
        <Modal
          title="You are not logged in!"
          subtext="Please login or create an account to view the Dashboard"
          buttonText="Go to Home Page"
          callback={buttonCallback}
          closable={false}
        />
      ) : ""} {session ? (
        <>
          <SideBar initialNumber={1}></SideBar>
          <div className="flex flex-1 flex-col md:pl-64">
            <main>
              <div className="py-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                  <h1 className="text-2xl font-semibold text-gray-900">
                    Your Products
                  </h1>
                </div>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 pt-5">
                  {/* Replace with your content */}
                  <ProductTable 
                  products={productsList}/>
                  {/* /End replace */}
                </div>
              </div>
            </main>
          </div>
        </>
      ) : ""}
    </>
  );
};

// Dashboard.getLayout = (page: ReactElement) => {
//     return (
//         {page}
//     )
// }

export default Dashboard;
