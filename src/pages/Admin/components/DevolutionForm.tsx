import React, { useState } from 'react';
import {
  DevolutionResponseDTO,
  DevolutionProductItem,
  OrderStatusEnum,
} from '../../../types/types';
// --- MOCK ---: Não precisamos mais da API real
// import { updateDevolutionStatus } from '../../../services/api'; 
import { LoadingSpinner } from '../../Catalog/components/Icons';

// --- MOCK ---: A URL da API de devoluções (para as imagens)
// Lembre-se de ter VITE_DEVOLUTION_API_BASE_URL=http://... no seu .env
const API_BASE_URL = import.meta.env.VITE_DEVOLUTION_API_BASE_URL || 'http://localhost:3000';

interface DevolutionFormProps {
  data: DevolutionResponseDTO;
  onUpdateSuccess: (newStatus: OrderStatusEnum) => void;
}

const getImageUrl = (devolutionId: string, image: { filename: string; format: string }) => {
  // IMPORTANTE: Para o mock funcionar, você precisa estar com o backend
  // rodando (mesmo sem autenticação), apenas para servir as imagens estáticas.
  // Se não estiver, as imagens aparecerão quebradas, mas o resto funcionará.
  return `${API_BASE_URL}/files/images/devolutions/${devolutionId}/${image.filename}${image.format}`;
};

const DevolutionForm: React.FC<DevolutionFormProps> = ({
  data,
  onUpdateSuccess,
}) => {
  const [productQuantities, setProductQuantities] = useState<Map<string, number>>(
    new Map(data.products.map((p) => [p.id, p.quantity])),
  );
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleQuantityChange = (productItemId: string, newQuantity: number) => {
    const originalItem = data.products.find((p) => p.id === productItemId);
    if (!originalItem) return;

    const clampedQuantity = Math.max(
      0,
      Math.min(newQuantity, originalItem.quantity),
    );

    setProductQuantities(new Map(productQuantities.set(productItemId, clampedQuantity)));
  };

  // --- MOCK ---: Modificamos esta função
  const handleSubmit = async (decision: 'approve' | 'deny') => {
    setIsSubmitting(true);
    setError(null);

    // Esta lógica de preparação de dados continua a mesma,
    // pois testamos se estamos montando o DTO corretamente.
    let status: OrderStatusEnum;
    let productsToRefund: { productToDevolutionId: string; quantity: number }[] = [];

    if (decision === 'deny') {
      status = OrderStatusEnum.DONE;
      productsToRefund = [];
    } else {
      status = OrderStatusEnum.REFUND_IN_PROCESS;
      productQuantities.forEach((quantity, productToDevolutionId) => {
        if (quantity > 0) {
          productsToRefund.push({ productToDevolutionId, quantity });
        }
      });
    }

    // --- MOCK ---
    // Simula uma chamada de API de 1 segundo
    console.log('--- MOCK SUBMIT ---');
    console.log('Enviando para a API (simulado):', {
      devolutionId: data.id,
      status: status,
      products: productsToRefund,
    });

    setTimeout(() => {
      // Simula um sucesso.
      console.log('--- MOCK SUCCESS ---');
      setIsSubmitting(false);
      onUpdateSuccess(status); // Chama o callback para o Pai remover o item
    }, 1000); // 1 segundo de delay

    // --- MOCK ---: O código real da API foi comentado
    // try {
    //   await updateDevolutionStatus({
    //     devolutionId: data.id,
    //     status: status,
    //     products: productsToRefund,
    //   });
    //   onUpdateSuccess();
    // } catch (err: any) {
    //   setError(err.message || 'Ocorreu um erro ao processar a solicitação.');
    //   setIsSubmitting(false);
    // }
    // --- FIM DO MOCK ---
  };

  // O JSX abaixo permanece exatamente igual
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* --- Seção de Informações Básicas --- */}
      <section className="border-b pb-4 mb-4">
        <h2 className="text-2xl font-bold text-black mb-4">
          Analisar Devolução
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <strong className="text-gray-600 block">Nº Pedido:</strong>
            <span className="text-gray-900">{data.orderId}</span>
          </div>
          <div>
            <strong className="text-gray-600 block">Contato (Usuário):</strong>
            <span className="text-gray-900">{data.contact}</span>
          </div>
          <div className="col-span-full">
            <strong className="text-gray-600 block">Motivo da Devolução:</strong>
            <p className="text-gray-900 bg-gray-50 p-2 rounded border">
              {data.reason}
            </p>
          </div>
        </div>
      </section>

      {/* --- Seção de Imagens --- */}
      <section className="border-b pb-4 mb-4">
        <h3 className="text-xl font-semibold text-black mb-3">Imagens Enviadas</h3>
        {data.images.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {data.images.map((image) => (
              <a
                key={image.id}
                href={getImageUrl(data.id, image)}
                target="_blank"
                rel="noopener noreferrer"
                className="relative group"
              >
                <img
                  src={getImageUrl(data.id, image)}
                  alt={`Imagem ${image.id} da devolução`}
                  className="w-full h-32 object-cover rounded-md border"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 flex items-center justify-center transition-opacity">
                  <span className="text-white opacity-0 group-hover:opacity-100">
                    Ver
                  </span>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">Nenhuma imagem foi enviada.</p>
        )}
      </section>

      {/* --- Seção de Produtos --- */}
      <section>
        <h3 className="text-xl font-semibold text-black mb-3">
          Produtos Solicitados para Devolução
        </h3>
        <div className="space-y-4">
          {data.products.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row items-center gap-4 bg-gray-50 p-3 rounded-lg border"
            >
              <div className="flex-1">
                <p className="font-bold text-black">{item.product.name}</p>
                <p className="text-sm text-gray-600">
                  Preço unitário: R$ {item.product.price}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <label
                  htmlFor={`qty-${item.id}`}
                  className="text-sm font-medium text-gray-700"
                >
                  Qtde. Solicitada:
                  <span className="text-lg font-bold text-black ml-2">
                    {item.quantity}
                  </span>
                </label>
                <input
                  type="number"
                  id={`qty-${item.id}`}
                  value={productQuantities.get(item.id) || 0}
                  onChange={(e) =>
                    handleQuantityChange(item.id, parseInt(e.target.value, 10))
                  }
                  max={item.quantity}
                  min={0}
                  className="w-20 px-2 py-1 border rounded-lg text-black text-center"
                  disabled={isSubmitting}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- Seção de Ações --- */}
      <footer className="mt-6 pt-6 border-t">
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <div className="flex flex-col sm:flex-row justify-end gap-4">
          <button
            onClick={() => handleSubmit('deny')}
            disabled={isSubmitting}
            className="px-6 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? <LoadingSpinner /> : 'Negar Devolução'}
          </button>
          <button
            onClick={() => handleSubmit('approve')}
            disabled={isSubmitting}
            className="px-6 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? (
              <LoadingSpinner />
            ) : (
              'Aprovar (Total/Parcial)'
            )}
          </button>
        </div>
      </footer>
    </div>
  );
};

export default DevolutionForm;