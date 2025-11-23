import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    getMyProducts,
    deleteMyProduct,
    updateProductStatus,
} from "../../services/api";
import { Product, ProductStatusEnum, ProductTypeEnum } from "../../types/types";
import { ToggleSwitch } from "./components/ToggleSwitch";
import { LoadingSpinner } from "../Catalog/components/Icons";

const ACTIVE_PRODUCT_LIMIT = 3;

export const MakerProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [updatingId, setUpdatingId] = useState<string | null>(null);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const makerProducts = await getMyProducts();
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

    const handleDelete = async (id: string) => {
        if (window.confirm("Tem certeza que deseja excluir este produto?")) {
            try {
                await deleteMyProduct(id);
                setProducts(products.filter((p) => p.id !== id));
            } catch (err: any) {
                alert(`Erro ao excluir: ${err.message}`);
            }
        }
    };

    // --- LÓGICA DE CONTAGEM CORRIGIDA ---
    const activeStandardCount = products.filter(
        (p) =>
            p.status === ProductStatusEnum.ACTIVE &&
            p.type === ProductTypeEnum.STANDARD
    ).length;

    const activePromoCount = products.filter(
        (p) =>
            p.status === ProductStatusEnum.ACTIVE &&
            p.type === ProductTypeEnum.PROMOTIONAL
    ).length;
    // -------------------------------------

    const handleStatusToggle = async (product: Product) => {
        const newStatus =
            product.status === ProductStatusEnum.ACTIVE
                ? ProductStatusEnum.PAUSED
                : ProductStatusEnum.ACTIVE;

        if (newStatus === ProductStatusEnum.ACTIVE) {
            // Se for STANDARD e já estiver no limite, avisa no front antes de chamar a API
            if (
                product.type === ProductTypeEnum.STANDARD &&
                activeStandardCount >= ACTIVE_PRODUCT_LIMIT
            ) {
                alert(
                    "Limite de 3 produtos padrão ativos atingido. Desative um produto padrão para ativar este, ou use produtos promocionais."
                );
                return;
            }
            // Se for PROMOTIONAL, passa direto (backend garante segurança, mas front libera UX)
        }

        setUpdatingId(product.id);
        setError("");

        try {
            const updatedProduct = await updateProductStatus(
                product.id,
                newStatus
            );
            setProducts((prev) =>
                prev.map((p) =>
                    p.id === updatedProduct.id ? updatedProduct : p
                )
            );
        } catch (err: any) {
            // Se o backend bloquear (ex: race condition), mostra o erro
            alert(err.message || "Erro ao atualizar o status.");
        } finally {
            setUpdatingId(null);
        }
    };

    if (loading)
        return <p className="text-texto-principal">Carregando produtos...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="p-4 md:p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-texto-principal">
                    Meus Produtos
                </h1>
                <Link
                    to="/maker/produtos/novo"
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
                >
                    Novo Produto
                </Link>
            </div>

            {/* Card de Status / Limites */}
            <div className="mb-6 p-4 bg-white dark:bg-gray-800 border border-borda rounded-lg shadow-sm flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div>
                    <p className="text-texto-principal">
                        <span className="font-bold text-blue-600 dark:text-blue-400">
                            Plano Gratuito:
                        </span>{" "}
                        Você tem{" "}
                        <strong
                            className={`${
                                activeStandardCount >= ACTIVE_PRODUCT_LIMIT
                                    ? "text-red-500"
                                    : "text-green-600"
                            }`}
                        >
                            {activeStandardCount}
                        </strong>{" "}
                        de <strong>{ACTIVE_PRODUCT_LIMIT}</strong> produtos
                        padrão ativos.
                    </p>
                    {activePromoCount > 0 && (
                        <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                            + {activePromoCount} produtos promocionais ativos
                            (Ilimitado).
                        </p>
                    )}
                </div>
                {activeStandardCount >= ACTIVE_PRODUCT_LIMIT && (
                    <span className="text-xs font-semibold bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
                        Limite Atingido
                    </span>
                )}
            </div>

            <div className="bg-fundo-secundario shadow-md rounded-lg overflow-x-auto border border-borda">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-texto-secundario uppercase">
                                Nome
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-texto-secundario uppercase">
                                Tipo
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-texto-secundario uppercase">
                                Preço
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-texto-secundario uppercase">
                                Ativo?
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-texto-secundario uppercase">
                                Ações
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-fundo-principal divide-y divide-gray-200 dark:divide-gray-700">
                        {products.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="px-6 py-8 text-center text-texto-secundario"
                                >
                                    Você ainda não cadastrou nenhum produto.
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
                                        {product.type ===
                                        ProductTypeEnum.PROMOTIONAL ? (
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
                                                checked={
                                                    product.status ===
                                                    ProductStatusEnum.ACTIVE
                                                }
                                                onChange={() =>
                                                    handleStatusToggle(product)
                                                }
                                                // Desabilita se for Standard inativo e o limite já estourou
                                                disabled={
                                                    product.status ===
                                                        ProductStatusEnum.PAUSED &&
                                                    product.type ===
                                                        ProductTypeEnum.STANDARD &&
                                                    activeStandardCount >=
                                                        ACTIVE_PRODUCT_LIMIT
                                                }
                                            />
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <Link
                                            to={`/maker/produtos/editar/${product.id}`}
                                            className="text-indigo-600 hover:text-indigo-400 mr-4 font-semibold"
                                        >
                                            Editar
                                        </Link>
                                        <button
                                            onClick={() =>
                                                handleDelete(product.id)
                                            }
                                            className="text-red-600 hover:text-red-400 font-semibold"
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
