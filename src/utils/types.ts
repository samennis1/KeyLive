import { ForwardRefExoticComponent, SVGProps } from "react";
import type {Product, ProductCode} from '@prisma/client'

export interface modalProps {
  title: string;
  subtext: string;
  buttonText: string;
  callback: () => void;
  closable: boolean;
}

export interface navigationItem {
  name: string;
  href: string;
  icon: ForwardRefExoticComponent<SVGProps<SVGSVGElement>>;
  current: boolean;
}

export interface statisticObject {
  topNumber: string;
  bottomText: string;
}

export interface tripleStatProps {
  listOfStats: statisticObject[];
}

export interface productKeyTableProps {
    tableData: productCodeExtension[],
    title: string,
    subtext: string,
    button: Button
}

export interface Button {
  text: string,
  callback: () => void;
}

export interface reqResponse {
  data: object,
  success: boolean
}

export interface productCodeExtension extends ProductCode {
  product: Product[]
}

export interface productCodeDateExtension extends ProductCode {
  createdTime: Date
}

export interface productListGrid {
  products: Product[]
}

export interface sidebarInputs {
  initialNumber?: number
}