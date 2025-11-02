import React, { useEffect, useState, useCallback } from 'react';
// --- MOCK ---: Não precisamos mais do getDevolutions real
// import { getDevolutions } from '../../services/api'; 
import { DevolutionResponseDTO, OrderStatusEnum } from '../../types/types';
import { LoadingSpinner } from '../Catalog/components/Icons';
import DevolutionCard from './components/DevolutionCard';
import DevolutionForm from './components/DevolutionForm';

// --- MOCK ---: Nossos dados falsos.
const mockDevolutions: DevolutionResponseDTO[] = [
  {
    id: 'uuid-1',
    orderId: 'PEDIDO-1001',
    reason: 'Produto veio quebrado na ponta, impossível de usar.',
    contact: 'cliente1@email.com',
    creationTime: new Date('2025-10-30T10:30:00Z'),
    orderStatus: OrderStatusEnum.REFUND_IN_ANALYSIS,
    images: [
      { id: 1, filename: 'imagem-quebrada-1', format: '.jpg' },
      { id: 2, filename: 'imagem-quebrada-2', format: '.png' },
    ],
    products: [
      {
        id: 'pdi-1', // ID do ProductItem
        quantity: 2,
        approvedQuantity: 0,
        price: 50.0,
        product: { id: 'prod-A', name: 'Action Figure Herói', price: 50.0 },
      },
      {
        id: 'pdi-2',
        quantity: 1,
        approvedQuantity: 0,
        price: 75.0,
        product: { id: 'prod-B', name: 'Base Diorama', price: 75.0 },
      },
    ],
  },
  {
    id: 'uuid-2',
    orderId: 'PEDIDO-1002',
    reason: 'Cor errada. Pedi vermelho e veio azul.',
    contact: 'cliente2@email.com',
    creationTime: new Date('2025-10-29T14:00:00Z'),
    orderStatus: OrderStatusEnum.REFUND_IN_ANALYSIS,
    images: [{ id: 3, filename: 'imagem-cor-errada', format: '.jpg' }],
    products: [
      {
        id: 'pdi-3',
        quantity: 1,
        approvedQuantity: 0,
        price: 30.0,
        product: { id: 'prod-C', name: 'Chaveiro Personalizado', price: 30.0 },
      },
    ],
  },
  {
    id: 'uuid-3',
    orderId: 'PEDIDO-1003',
    reason: 'Nenhuma imagem enviada, apenas motivo.',
    contact: 'cliente3@email.com',
    creationTime: new Date('2025-10-28T18:00:00Z'),
    orderStatus: OrderStatusEnum.REFUND_IN_ANALYSIS,
    images: [], // Testando o caso de nenhuma imagem
    products: [
      {
        id: 'pdi-4',
        quantity: 5,
        approvedQuantity: 0,
        price: 10.0,
        product: { id: 'prod-D', name: 'Miniatura de Vaso', price: 10.0 },
      },
    ],
  },
];
// --- FIM DO MOCK ---

const Devolutions: React.FC = () => {
  // --- MOCK ---: Inicializa o estado com os dados falsos
  const [devolutions, setDevolutions] = useState<DevolutionResponseDTO[]>(
    mockDevolutions,
  );
  // --- MOCK ---: Define o loading como false para vermos os dados imediatamente
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedDevolutionId, setSelectedDevolutionId] = useState<string | null>(
    null,
  );

  // --- MOCK ---: Comentamos a busca real de dados
  // const fetchDevolutions = useCallback(async () => {
  //   try {
  //     setLoading(true);
  //     const data = await getDevolutions();
  //     data.sort(
  //       (a, b) =>
  //         new Date(b.creationTime).getTime() -
  //         new Date(a.creationTime).getTime(),
  //     );
  //     setDevolutions(data);
  //   } catch (err: any) {
  //     setError(err.message || 'Erro ao buscar devoluções');
  //   } finally {
  //     setLoading(false);
  //   }
  // }, []);

  // useEffect(() => {
  //   fetchDevolutions();
  // }, [fetchDevolutions]);
  // --- FIM DO MOCK ---

  const selectedDevolution = devolutions.find(
    (dev) => dev.id === selectedDevolutionId,
  );

  const handleUpdate = (newStatus: OrderStatusEnum) => { 
    setDevolutions((prev) => {
      const updatedItem = prev.find((dev) => dev.id === selectedDevolutionId);
      if (!updatedItem) return prev;

      updatedItem.orderStatus = newStatus;

      const otherItems = prev.filter((dev) => dev.id !== selectedDevolutionId);

      return [...otherItems, updatedItem];
    });
    setSelectedDevolutionId(null);
  };

  if (loading && devolutions.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner className="w-12 h-12" />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-black">Gerenciar Devoluções</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Coluna da Lista de Devoluções */}
        <div className="lg:col-span-4 h-[calc(100vh-12rem)] overflow-y-auto custom-scrollbar space-y-4 pr-2">
          {loading && <p>Atualizando lista...</p>}
          {devolutions.length === 0 && !loading ? (
            <p className="text-gray-500">Nenhuma devolução pendente.</p>
          ) : (
            devolutions.map((dev) => (
              <DevolutionCard
                key={dev.id}
                data={dev}
                isSelected={selectedDevolutionId === dev.id}
                onSelect={() => setSelectedDevolutionId(dev.id)}
              />
            ))
          )}
        </div>

        {/* Coluna do Formulário de Detalhe */}
        <div className="lg:col-span-8">
          {selectedDevolution ? (
            <DevolutionForm
              key={selectedDevolution.id}
              data={selectedDevolution}
              onUpdateSuccess={handleUpdate}
            />
          ) : (
            <div className="flex justify-center items-center h-full bg-white shadow-md rounded-lg p-8">
              <p className="text-gray-500">
                Selecione uma devolução ao lado para ver os detalhes.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Devolutions;