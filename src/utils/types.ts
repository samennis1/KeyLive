import { ForwardRefExoticComponent, SVGProps } from "react";

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
