import { Link } from "react-router-dom";
import { ProductStatusEnum, ProductTypeEnum } from "../../../../types/types";
import { ToggleSwitch } from "../../components/ToggleSwitch";
import { LoadingSpinner } from "../../../Catalog/components/Icons";
import { useMakerProductList } from "../../../../hooks/useMakerProductList";

export const MakerProductList: React.FC = () => {
  const {
    products,
    loading,
    updatingId,
    activeStandardCount,
    activePromoCount,
    limit,
    handleDelete,
    handleStatusToggle,
  } = useMakerProductList();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner className="w-10 h-10" />
        <span className="ml-3 text-texto-principal">
          Carregando produtos...
        </span>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-texto-principal">
          Meus Produtos
        </h1>
        <Link
          to="/maker/produtos/novo"
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors shadow-sm font-medium"
        >
          Novo Produto
        </Link>
      </div>

      {/* Painel de Status do Plano */}
      <div className="mb-6 p-4 bg-white dark:bg-gray-800 border border-borda rounded-lg shadow-sm flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div>
          <p className="text-texto-principal">
            <span className="font-bold text-blue-600 dark:text-blue-400">
              Plano Gratuito:
            </span>{" "}
            Você tem{" "}
            <strong
              className={`${
                activeStandardCount >= limit ? "text-red-500" : "text-green-600"
              }`}
            >
              {activeStandardCount}
            </strong>{" "}
            de <strong>{limit}</strong> produtos padrão ativos.
          </p>
          {activePromoCount > 0 && (
            <p className="text-sm text-green-600 dark:text-green-400 mt-1">
              + {activePromoCount} produtos promocionais ativos (Ilimitado).
            </p>
          )}
        </div>
        {activeStandardCount >= limit && (
          <span className="text-xs font-semibold bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full whitespace-nowrap">
            Limite Atingido
          </span>
        )}
      </div>

      <div className="bg-fundo-secundario shadow-md rounded-lg overflow-x-auto border border-borda">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-texto-secundario uppercase tracking-wider">
                Nome
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-texto-secundario uppercase tracking-wider">
                Tipo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-texto-secundario uppercase tracking-wider">
                Preço
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-texto-secundario uppercase tracking-wider">
                Ativo?
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-texto-secundario uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-fundo-principal divide-y divide-gray-200 dark:divide-gray-700">
            {products.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-12 text-center text-texto-secundario"
                >
                  <p className="mb-2">
                    Você ainda não cadastrou nenhum produto.
                  </p>
                  <Link
                    to="/maker/produtos/novo"
                    className="text-blue-500 hover:underline text-sm"
                  >
                    Começar agora
                  </Link>
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-texto-principal font-medium">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.type === ProductTypeEnum.PROMOTIONAL ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                        Promocional
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                        Padrão
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-texto-principal">
                    R$ {Number(product.price).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {updatingId === product.id ? (
                      <LoadingSpinner className="w-5 h-5 mx-auto" />
                    ) : (
                      <ToggleSwitch
                        checked={product.status === ProductStatusEnum.ACTIVE}
                        onChange={() => handleStatusToggle(product)}
                        disabled={
                          product.status === ProductStatusEnum.PAUSED &&
                          product.type === ProductTypeEnum.STANDARD &&
                          activeStandardCount >= limit
                        }
                      />
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      to={`/maker/produtos/editar/${product.id}`}
                      className="text-indigo-600 hover:text-indigo-400 mr-4 font-semibold transition-colors"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600 hover:text-red-400 font-semibold transition-colors"
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
