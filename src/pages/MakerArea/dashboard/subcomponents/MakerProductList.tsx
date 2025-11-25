import { Link, useOutletContext } from "react-router-dom";
import {
  ProductStatusEnum,
  ProductTypeEnum,
  Maker,
  MakerStatusEnum,
} from "../../../../types/types";
import { ToggleSwitch } from "../../components/ToggleSwitch";
import { LoadingSpinner } from "../../../Catalog/components/Icons";
import { useMakerProductList } from "../../../../hooks/useMakerProductList";

export const MakerProductList: React.FC = () => {
  const maker = useOutletContext<Maker>();

  const { products, loading, updatingId, handleDelete, handleStatusToggle } =
    useMakerProductList();

  const isPending = maker?.status === MakerStatusEnum.PENDING;

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
    <div className="p-4 md:p-8 animate-fade-in pb-20 md:pb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-texto-principal">
          Meus Produtos
        </h1>

        {/* Botão de Novo Produto */}
        <Link
          to="/maker/produtos/novo"
          className="w-full sm:w-auto bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors shadow-sm font-medium text-center"
        >
          + Novo Produto
        </Link>
      </div>

      {/* BANNER DE AVISO */}
      {isPending && (
        <div className="mb-6 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 p-4 rounded-r-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <span className="text-2xl">ℹ️</span>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700 dark:text-blue-200">
                <strong className="font-bold">
                  Sua conta está em análise.
                </strong>
                <br />
                Você já pode cadastrar seus produtos para adiantar! Eles ficarão
                visíveis aqui para você gerenciar, mas só aparecerão no catálogo
                público após a aprovação do seu perfil.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* === ESTADO VAZIO === */}
      {products.length === 0 && (
        <div className="text-center py-12 bg-fundo-secundario rounded-lg border border-borda">
          <p className="text-texto-secundario mb-2">
            Você ainda não cadastrou nenhum produto.
          </p>
          <Link
            to="/maker/produtos/novo"
            className="text-blue-500 hover:underline text-sm font-bold"
          >
            Começar agora
          </Link>
        </div>
      )}

      {/* === VERSÃO MOBILE (CARDS) === */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-fundo-principal dark:bg-gray-800 p-4 rounded-xl border border-borda shadow-sm flex flex-col gap-3"
          >
            {/* Cabeçalho do Card: Nome e Preço */}
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-lg text-texto-principal line-clamp-2">
                {product.name}
              </h3>
              <span className="font-mono font-semibold text-green-600 dark:text-green-400 whitespace-nowrap ml-2">
                R$ {Number(product.price).toFixed(2)}
              </span>
            </div>

            {/* Corpo do Card: Status e Tipo */}
            <div className="flex justify-between items-center border-t border-borda py-3 my-1">
              <div className="flex flex-col gap-1">
                <span className="text-xs text-texto-secundario uppercase tracking-wider">
                  Status
                </span>
                <div className="flex items-center gap-2">
                  {updatingId === product.id ? (
                    <LoadingSpinner className="w-5 h-5" />
                  ) : (
                    <ToggleSwitch
                      checked={product.status === ProductStatusEnum.ACTIVE}
                      onChange={() => handleStatusToggle(product)}
                    />
                  )}
                  <span className="text-sm font-medium text-texto-principal">
                    {product.status === ProductStatusEnum.ACTIVE
                      ? "Ativo"
                      : "Pausado"}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-1 items-end">
                <span className="text-xs text-texto-secundario uppercase tracking-wider">
                  Tipo
                </span>
                {product.type === ProductTypeEnum.PROMOTIONAL ? (
                  <span className="px-2 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                    Promocional
                  </span>
                ) : (
                  <span className="px-2 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                    Padrão
                  </span>
                )}
              </div>
            </div>

            {/* Rodapé do Card: Botões de Ação */}
            <div className="flex gap-3 pt-1">
              <Link
                to={`/maker/produtos/editar/${product.id}`}
                className="flex-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 py-2.5 rounded-lg text-center text-sm font-bold hover:bg-indigo-100 transition-colors"
              >
                Editar
              </Link>
              <button
                onClick={() => handleDelete(product.id)}
                className="flex-1 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 py-2.5 rounded-lg text-center text-sm font-bold hover:bg-red-100 transition-colors"
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* === VERSÃO DESKTOP (TABELA) === */}
      <div className="hidden md:block bg-fundo-secundario shadow-md rounded-lg overflow-hidden border border-borda">
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
                Ativo
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-texto-secundario uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-fundo-principal divide-y divide-gray-200 dark:divide-gray-700">
            {products.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <td className="px-6 py-4 text-texto-principal font-medium">
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
                  <div className="flex justify-center">
                    {updatingId === product.id ? (
                      <LoadingSpinner className="w-5 h-5" />
                    ) : (
                      <ToggleSwitch
                        checked={product.status === ProductStatusEnum.ACTIVE}
                        onChange={() => handleStatusToggle(product)}
                      />
                    )}
                  </div>
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
