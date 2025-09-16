import { useCatalog } from "../hooks/useCatalog";
import { CatalogContext } from "./CatalogContext";

interface CatalogProviderProps {
  children: React.ReactNode;
}

export const CatalogProvider: React.FC<CatalogProviderProps> = ({
  children,
}) => {
  const catalogData = useCatalog();

  return (
    <CatalogContext.Provider value={catalogData}>
      {children}
    </CatalogContext.Provider>
  );
};
