import { useSession } from "next-auth/react";
import {  useEffect, useState } from "react";
import Modal from "../../../../components/Modal";
import SideBar from "../../../../components/Sidebar";
import { api } from "../../../../utils/api";
import type {
  modalProps,
  productExtension,
  statisticObject,
} from "../../../../utils/types";
import type { NextPageWithLayout } from "../../../_app";
import { useRouter } from "next/router";
import ProductSettings from "../../../../components/ProductSettings";
import { modalErrorLogin, modalErrorProduct } from "../../../../utils/modals";

const Dashboard: NextPageWithLayout = () => {
  const { data: session, status } = useSession();
  const [productData, setProductData] = useState<productExtension>();
  const [modalState, setModalState] = useState<modalProps>(modalErrorLogin);
  const router = useRouter();
  const id = router.query.id as string;
  const {data: products} = api.products.getOne.useQuery({
    product_id: id,
  });
  const [modalShow, showModal] = useState(false);

  useEffect(() => {
    if (!products) {
      setModalState(modalErrorProduct);
      showModal(true);
    } else {
      setProductData(products);
      showModal(false);
    }
  }, [products])

  useEffect(() => {
    if (status == "unauthenticated") {
      showModal(true);
    } else {
      showModal(false);
    }
  }, [status]);

  return (
    <>
      {modalShow ? <Modal {...modalState} /> : ""}{" "}
      {session?.user && productData ? (
        <>
          <SideBar initialNumber={1}></SideBar>
          <div className="flex flex-1 flex-col md:pl-64">
            <main>
              <div className="py-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                  <h1 className="text-2xl font-semibold text-gray-900">
                    {productData.name}
                  </h1>
                </div>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                  {/* Replace with your content */}
                  <ProductSettings {...productData} />
                  {/* /End replace */}
                </div>
              </div>
            </main>
          </div>
        </>
      ) : (
        ""
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
