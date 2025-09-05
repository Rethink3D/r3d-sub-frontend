const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export enum ContactType {
    EMAIL = 'EMAIL',
    PHONE = 'PHONE',
    WEBSITE = 'WEBSITE',
    INSTAGRAM = 'INSTAGRAM',
    FACEBOOK = 'FACEBOOK',
    X_TWITTER = 'X_TWITTER',
    WHATSAPP = 'WHATSAPP',
    MERCADO_LIVRE = 'MERCADO_LIVRE',
    OLX = 'OLX',
    SHOPEE = 'SHOPEE',
}
export enum MakerStatus {
    ACTIVE = 'ACTIVE',
    SUSPENDED = 'SUSPENDED',
    DEACTIVATED = 'DEACTIVATED',
}

export interface Maker {
    id: string;
    name: string;
    description: string;
    acceptsPersonalization: boolean;
    status: MakerStatus;
    contacts: { type: string; contactInfo: string }[];
    categories: { id: string; name: string }[];
    profileImage?: Image;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    material: string;
    price: number;
    isPersonalizable: boolean;
    maker: Maker; 
    images?: Image[];
    categories: { id: string; name: string }[];
}

export interface Category {
    id: string;
    name: string;
    description?: string;
}

export interface Image {
  id: string;
  filename: string;
  format: string;
  url?: string;
  altText?: string;
}

interface LoginResponse {
  access_token: string;
}

// Funções genéricas para fetch
async function request<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const url = `${API_BASE_URL}/${endpoint}`;
    const token = localStorage.getItem('authToken');

    const isFormData = options.body instanceof FormData;

    const headers = {
        ...(isFormData ? {}: {"Content-Type": "application/json"}),
        ...(token && { 'Authorization': `Bearer ${ token }`}),
        ...options.headers,
    };

    const response = await fetch(url, { ...options, headers });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Ocorreu um erro na requisição.");
    }

    // Retorna um objeto vazio para respostas sem conteúdo (ex: DELETE 204)
    if (response.status === 204 || response.headers.get('content-length') === '0') {
    return {} as T;
  }

    return response.json();
}

export const loginAdmin = (credentials: { username: string; password: string }): Promise<LoginResponse> => {
    return request<LoginResponse>('auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
    });
}

// --- Funções para Makers ---
export const getMakers = (): Promise<Maker[]> => request("maker");

export const getMakerById = (id: string): Promise<Maker> =>
    request(`maker/${id}`);

export const createMaker = (
    data: Omit<Maker, "id" | "categories"> & { categoryIds?: string[] }
): Promise<Maker> =>
    request("maker", { method: "POST", body: JSON.stringify(data) });

export const updateMaker = (
    id: string,
    data: Partial<Omit<Maker, "id" | "categories"> & { categoryIds?: string[] }>
): Promise<Maker> =>
    request(`maker/${id}`, { method: "PATCH", body: JSON.stringify(data) });

export const deleteMaker = (id: string): Promise<void> =>
    request(`maker/${id}`, { method: "DELETE" });

// --- Funções para Produtos ---
export const getProducts = (): Promise<Product[]> => request("product");

export const getProductById = (id: string): Promise<Product> =>
    request(`product/${id}`);

export const createProduct = (
    data: Omit<Product, "id" | "maker" | "categories"> & {
        makerId: string;
        categoryIds?: string[];
    }
): Promise<Product> =>
    request("product", { method: "POST", body: JSON.stringify(data) });

export const updateProduct = (
    id: string,
    data: Partial<
        Omit<Product, "id" | "maker" | "categories"> & {
            makerId?: string;
            categoryIds?: string[];
        }
    >
): Promise<Product> =>
    request(`product/${id}`, { method: "PATCH", body: JSON.stringify(data) });

export const deleteProduct = (id: string): Promise<void> =>
    request(`product/${id}`, { method: "DELETE" });

// --- Funções para Categorias ---
export const getCategories = (): Promise<Category[]> => request('category'); 

export const createCategory = (data: { name: string; description?: string }): Promise<Category> => request('category', { method: 'POST', body: JSON.stringify(data) });

// --- Funções para Imagens --- 
export const uploadProductImage = (productId: string, file: File): Promise<Image> => {
    const formData = new FormData();
    formData.append('file', file);
    return request(`image/product/${productId}`, {
        method: 'POST',
        body: formData,
    });
};

export const uploadMakerProfileImage = (makerId: string, file: File): Promise<Image> => {
    const formData = new FormData();
    formData.append('file', file);
    return request(`image/maker/${makerId}/profile`, {
        method: 'POST',
        body: formData,
    });
};

export const deleteImage = (imageId: string): Promise<void> => {
    return request(`image/${imageId}`, { method: 'DELETE' });
};

