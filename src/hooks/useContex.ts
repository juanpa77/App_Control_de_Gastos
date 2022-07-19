import { useContext } from "react";
import Context from "../context/categoryContext";

export const useCategoryContex = () => {
  const { category, setCategory } = useContext(Context);
  return { category, setCategory };
};
