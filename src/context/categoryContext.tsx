import { createContext, ReactNode, useState } from "react";
interface props {
  children: ReactNode;
}

export type CategoryContex = {
  category: string[];
  setCategory: (category: string[]) => void;
};

const Context = createContext<CategoryContex>({} as CategoryContex);

export const CategoryProvider = ({ children }: props) => {
  const [category, setCategory] = useState([""]);

  return (
    <Context.Provider value={{ category, setCategory }}>
      {children}
    </Context.Provider>
  );
};

export default Context;
