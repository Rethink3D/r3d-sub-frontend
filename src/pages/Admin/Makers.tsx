import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteMaker, mergeMakers, getMakersForAdmin } from "../../services/api";
import CategoryManager from "./components/CategoryManager";
import { Maker } from "../../types/types";
import { StatusBadge } from "./components/StatusBadge";

const Makers: React.FC = () => {
    const [makers, setMakers] = useState<Maker[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    
    const [isMergeMode, setIsMergeMode] = useState(false);
    const [sourceId, setSourceId] = useState<string | null>(null);
    const [targetId, setTargetId] = useState<string | null>(null);

    const fetchMakers = async () => {
        setLoading(true);
        try {
            const data = await getMakersForAdmin();
            const sortedData = data.sort((a, b) => {
                const weight = { PENDING: 0, ACTIVE: 1, SUSPENDED: 2, DEACTIVATED: 3 };
                // @ts-ignore
                return weight[a.status] - weight[b.status];
            });
            setMakers(sortedData);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMakers();
    }, []);

    const handleDelete = async (id: string) => {
        if (window.confirm("Tem certeza que deseja excluir este maker? Isso apagará todos os produtos dele.")) {
            try {
                await deleteMaker(id);
                setMakers(makers.filter((maker) => maker.id !== id));
            } catch (err: any) {
                alert(`Erro ao excluir: ${err.message}`);
            }
        }
    };

    const handleMerge = async () => {
        if (!sourceId || !targetId) return;
        if (sourceId === targetId) {
            alert("Origem e Destino não podem ser o mesmo Maker.");
            return;
        }

        if (window.confirm("ATENÇÃO: Isso moverá TODOS os produtos do Maker Antigo para o Novo. A conta antiga será DESATIVADA (não excluída). Confirmar?")) {
            try {
                setLoading(true);
                await mergeMakers(sourceId, targetId);
                alert("Migração realizada com sucesso!");
                setIsMergeMode(false);
                setSourceId(null);
                setTargetId(null);
                fetchMakers();
            } catch (err: any) {
                alert("Erro na migração: " + err.message);
                setLoading(false);
            }
        }
    };

    const toggleMergeSelection = (id: string) => {
        if (sourceId === id) {
            setSourceId(null);
        } else if (targetId === id) {
            setTargetId(null);
        } else if (!sourceId) {
            setSourceId(id);
        } else if (!targetId) {
            setTargetId(id);
        }
    };

    if (loading) return <p>Carregando...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-black">Gerenciar Makers</h1>
                <div className="flex gap-2">
                    {!isMergeMode ? (
                        <>
                            <button 
                                onClick={() => setIsMergeMode(true)}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                            >
                                ⚡ Migrar Contas
                            </button>
                            <Link
                                to="/admin/makers/new"
                                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                            >
                                Novo Maker
                            </Link>
                        </>
                    ) : (
                        <div className="flex items-center gap-2 bg-blue-50 p-2 rounded-lg border border-blue-200">
                            <span className="text-sm text-blue-800">
                                1. Selecione o <b>ANTIGO</b> (Origem) <br/>
                                2. Selecione o <b>NOVO</b> (Destino)
                            </span>
                            <button 
                                onClick={handleMerge}
                                disabled={!sourceId || !targetId}
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Confirmar Fusão
                            </button>
                            <button 
                                onClick={() => {
                                    setIsMergeMode(false);
                                    setSourceId(null);
                                    setTargetId(null);
                                }}
                                className="text-gray-600 px-3 hover:text-gray-800"
                            >
                                Cancelar
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {isMergeMode && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Migração</th>}
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Produtos</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {makers.map((maker) => {
                            const isSource = maker.id === sourceId;
                            const isTarget = maker.id === targetId;
                            
                            return (
                                <tr key={maker.id} className={isSource ? "bg-red-50" : isTarget ? "bg-green-50" : ""}>
                                    {isMergeMode && (
                                        <td className="px-6 py-4">
                                            <input 
                                                type="checkbox" 
                                                checked={isSource || isTarget}
                                                onChange={() => toggleMergeSelection(maker.id)}
                                                className="w-5 h-5 cursor-pointer"
                                            />
                                            {isSource && <span className="ml-2 text-xs font-bold text-red-600">ANTIGO</span>}
                                            {isTarget && <span className="ml-2 text-xs font-bold text-green-600">NOVO</span>}
                                        </td>
                                    )}
                                    <td className="px-6 py-4 whitespace-nowrap text-black">
                                        {maker.name} 
                                        <span className="text-xs text-gray-400 block">{maker.products?.length || maker.productCount || 0} prods</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-black">
                                        <StatusBadge status={maker.status} />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Link to={`/admin/makers/${maker.id}/products`} className="text-blue-600 hover:underline">
                                            Ver Produtos
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <Link to={`/admin/makers/edit/${maker.id}`} className="text-indigo-600 hover:text-indigo-900 mr-4">
                                            Editar
                                        </Link>
                                        <button onClick={() => handleDelete(maker.id)} className="text-red-600 hover:text-red-900">
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <CategoryManager onCategoryAdded={() => console.log("Categoria adicionada")} />
        </div>
    );
};

export default Makers;
