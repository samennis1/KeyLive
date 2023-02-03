import { productListGrid, type productKeyTableProps } from "../utils/types";
import { CalendarIcon, MapPinIcon, UsersIcon } from '@heroicons/react/20/solid'
import { KeyIcon } from "@heroicons/react/24/solid";

export default function ProductTable({
  products,
}: productListGrid) {
    return (
        <div className="overflow-hidden bg-white shadow sm:rounded-md">
          <ul role="list" className="divide-y divide-gray-200">
            {products.map((product) => (
              <li key={product.id}>
                <a href={`/dashboard/products/${product.id}`} className="block hover:bg-gray-50">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="truncate text-sm font-medium text-indigo-600">{product.name}</p>
                      <div className="ml-2 flex flex-shrink-0">
                      <p
                        className={`inline-flex rounded-full bg-${
                          product.active ? "green" : "red"
                        }-100 px-2 text-xs font-semibold leading-5 text-${
                          product.active ? "green" : "red"
                        }-800`}
                      >
                        {product.active ? "Active" : "Disabled"}
                      </p>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          <KeyIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                          {product.keys.length ? product.keys.length : "0"} Keys
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )
}
