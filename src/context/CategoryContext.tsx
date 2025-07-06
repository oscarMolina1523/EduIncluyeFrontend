import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
} from "react";
import CategoryModel from "../models/CategoryModel";
import CategoryService from "../services/CategoryService";

interface CategoryContextProps {
  categories: CategoryModel[];
  getAllCategories: () => Promise<void>;
  getCategoryById: (id: string) => Promise<CategoryModel | null>;
  addCategory: (category: CategoryModel) => Promise<CategoryModel | null>;
  updateCategory: (id: string, category: CategoryModel) => Promise<CategoryModel | null>;
  deleteCategory: (id: string) => Promise<void>;
  loading: boolean;
}

const CategoryContext = createContext<CategoryContextProps>({
  categories: [],
  getAllCategories: async () => {},
  getCategoryById: async () => null,
  addCategory: async () => null,
  updateCategory: async () => null,
  deleteCategory: async () => {},
  loading: false,
});

interface CategoryProviderProps {
  children: ReactNode;
}

export const CategoryProvider = ({ children }: CategoryProviderProps) => {
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const categoryService = useMemo(() => new CategoryService(), []);

  const getAllCategories = async () => {
    setLoading(true);
    try {
      const data = await categoryService.getAll();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryById = async (id: string) => {
    try {
      return await categoryService.getById(id);
    } catch (error) {
      console.error("Error fetching category by ID:", error);
      return null;
    }
  };

  const addCategory = async (category: CategoryModel) => {
    try {
      const newCategory = await categoryService.addCategory(category);
      if (newCategory) {
        setCategories((prev) => [...prev, newCategory]);
      }
      return newCategory;
    } catch (error) {
      console.error("Error adding category:", error);
      return null;
    }
  };

  const updateCategory = async (id: string, category: CategoryModel) => {
    try {
      const updated = await categoryService.updateCategory(id, category);
      if (updated) {
        setCategories((prev) =>
          prev.map((cat) => (cat.id === id ? updated : cat))
        );
      }
      return updated;
    } catch (error) {
      console.error("Error updating category:", error);
      return null;
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      await categoryService.deleteCategory(id);
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <CategoryContext.Provider
      value={{
        categories,
        getAllCategories,
        getCategoryById,
        addCategory,
        updateCategory,
        deleteCategory,
        loading,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => useContext(CategoryContext);
