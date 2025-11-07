import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "../../services/api"; // [cite: 412]
import { Product } from "../../types/types"; // [cite: 412]

// --- (PROTÓTIPO) ---
// Precisamos saber QUAL maker está logado.
// No futuro, isso virá do seu contexto de autenticação (Firebase).
// Por agora, vamos usar um ID fixo de um maker que sabemos que existe[cite: 1055].
const MOCK_MAKER_ID = "cd392e02-7237-4386-a818-bf215d58f8ac";
// ---------------------

export const MakerProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      // 1. Pega TODOS os produtos (como o admin faz) [cite: 414, 383]
      const allProducts = await getProducts();
      
      // 2. Filtra APENAS os produtos do maker logado
      const makerProducts = allProducts.filter(
        (p) => p.maker?.id === MOCK_MAKER_ID
      );
      
      setProducts(makerProducts);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => { // [cite: 415]
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      try {
        await deleteProduct(id); // [cite: 415]
        setProducts(products.filter((p) => p.id !== id)); // [cite: 416]
      } catch (err: any) {
        alert(`Erro ao excluir: ${err.message}`);
      }
    }
  };

  if (loading) return <p className="text-texto-principal">Carregando produtos...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-texto-principal">Meus Produtos</h1>
        <Link
          to="/maker/produtos/novo" // Rota do Maker
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Novo Produto
        </Link>
      </div>
      <div className="bg-fundo-secundario shadow-md rounded-lg overflow-x-auto border border-borda">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-texto-secundario uppercase">
                Nome do Produto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-texto-secundario uppercase">
                Preço
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-texto-secundario uppercase">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-fundo-principal divide-y divide-gray-200 dark:divide-gray-700">
            {products.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-8 text-center text-texto-secundario">
                  Você ainda não cadastrou nenhum produto.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-texto-principal">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-texto-principal">
                    R$ {product.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      to={`/maker/produtos/editar/${product.id}`} // Rota do Maker
                      className="text-indigo-600 hover:text-indigo-400 mr-4"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600 hover:text-red-400"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};