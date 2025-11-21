import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    getMyProducts,
    deleteProduct,
    updateProductStatus,
} from "../../services/api";
import { Product, ProductStatusEnum } from "../../types/types";
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
                await deleteProduct(id);
                setProducts(products.filter((p) => p.id !== id));
            } catch (err: any) {
                alert(`Erro ao excluir: ${err.message}`);
            }
        }
    };
    const activeProductCount = products.filter(
        (p) => p.status === ProductStatusEnum.ACTIVE
    ).length;

    const handleStatusToggle = async (product: Product) => {
        const newStatus =
            product.status === ProductStatusEnum.ACTIVE
                ? ProductStatusEnum.PAUSED
                : ProductStatusEnum.ACTIVE;

        if (newStatus === ProductStatusEnum.ACTIVE) {
            // TODO: No futuro, checar a assinatura aqui
            if (activeProductCount >= ACTIVE_PRODUCT_LIMIT) {
                alert(
                    "Limite de 3 produtos ativos atingido. Para ativar mais, considere fazer um upgrade do seu plano."
                );
                return;
            }
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
            setError(err.message || "Erro ao atualizar o status.");
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
                    to="/maker/produtos/novo" // Rota do Maker
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                >
                    Novo Produto
                </Link>
            </div>

            <div className="mb-4 p-4 bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700 rounded-lg">
                <p className="font-bold text-blue-800 dark:text-blue-200">
                    Você está usando {activeProductCount} de{" "}
                    {ACTIVE_PRODUCT_LIMIT} produtos ativos.
                </p>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                    Produtos "Pausados" não aparecem no catálogo principal.
                </p>
            </div>

            {error && <p className="text-red-500 mb-4">{error}</p>}

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
                            <th className="px-6 py-3 text-center text-xs font-medium text-texto-secundario uppercase">
                                Status (Ativo)
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
                                    colSpan={3}
                                    className="px-6 py-8 text-center text-texto-secundario"
                                >
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
                                            />
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <Link
                                            to={`/maker/produtos/editar/${product.id}`} // Rota do Maker
                                            className="text-indigo-600 hover:text-indigo-400 mr-4"
                                        >
                                            Editar
                                        </Link>
                                        <button
                                            onClick={() =>
                                                handleDelete(product.id)
                                            }
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
