import {
    Category,
    DevolutionResponseDTO,
    Image,
    Maker,
    MakerPayload,
    OrderStatusEnum,
    Product,
    ProductPayload,
    ProductStatusEnum,
} from "../types/types";

interface LoginResponse {
    access_token: string;
}

interface MakerInvitePayload {
    name: string;
    contactInfo: string;
    checked: boolean;
}

interface ProductToRefundDTO {
    productToDevolutionId: string;
    quantity: number;
}

interface UpdateDevolutionStatusDTO {
    devolutionId: string;
    status: OrderStatusEnum;
    products: ProductToRefundDTO[];
}

async function request<T>(
    endpoint: string,
    options: RequestInit = {},
    apiTarget: "catalog" | "devolution" = "catalog"
): Promise<T> {
    const VITE_CATALOG_URL = import.meta.env.VITE_API_BASE_URL;
    const VITE_DEVOLUTION_URL = import.meta.env.VITE_DEVOLUTION_API_BASE_URL;

    let baseUrl;
    if (apiTarget === "devolution") {
        baseUrl = VITE_DEVOLUTION_URL;
    } else {
        baseUrl = VITE_CATALOG_URL;
    }

    if (!baseUrl) {
        throw new Error(`URL da API (${apiTarget}) não definida em .env`);
    }

    const url = `${baseUrl}/${endpoint}`;
    const token = localStorage.getItem("authToken");

    const isFormData = options.body instanceof FormData;

    const headers = {
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
    };

    const response = await fetch(url, { ...options, headers });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Ocorreu um erro na requisição.");
    }

    if (
        response.status === 204 ||
        response.headers.get("content-length") === "0"
    ) {
        return {} as T;
    }

    return response.json();
}

export const loginAdmin = (credentials: {
    username: string;
    password: string;
}): Promise<LoginResponse> => {
    return request<LoginResponse>("auth/login", {
        method: "POST",
        body: JSON.stringify(credentials),
    });
};

async function requestMakerApi<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  if (!baseUrl) {
    throw new Error(`URL da API não definida em .env`);
  }

  const token = localStorage.getItem('makerAuthToken'); // Diferente da 'request'

  const isFormData = options.body instanceof FormData;
  const headers = {
    ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${baseUrl}/${endpoint}`, { ...options, headers });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Ocorreu um erro na requisição.');
  }

  if (
    response.status === 204 ||
    response.headers.get('content-length') === '0'
  ) {
    return {} as T;
  }

  return response.json();
}

export const updateProductStatus = (
    id: string,
    status: ProductStatusEnum
): Promise<Product> => {
    return requestMakerApi(`product/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
    });
};

export const getMakers = async (): Promise<Maker[]> => {
    const makers = await request<Maker[]>("maker");
    return makers.map((maker) => ({
        ...maker,
        location: "São Luís",
    }));
};

export const getMakerById = async (id: string): Promise<Maker> => {
    const maker = await request<Maker>(`maker/${id}`);
    return {
        ...maker,
        location: "São Luís",
    };
};

export const createMaker = (data: MakerPayload): Promise<Maker> =>
    request("maker", { method: "POST", body: JSON.stringify(data) });

export const updateMaker = (
    id: string,
    data: Partial<MakerPayload>
): Promise<Maker> =>
    request(`maker/${id}`, { method: "PATCH", body: JSON.stringify(data) });

export const deleteMaker = (id: string): Promise<void> =>
    request(`maker/${id}`, { method: "DELETE" });

export const getProducts = (): Promise<Product[]> => request("product");

export const getProductById = (id: string): Promise<Product> =>
    request(`product/${id}`);

export const createProduct = (data: ProductPayload): Promise<Product> =>
    request("product", { method: "POST", body: JSON.stringify(data) });

export const updateProduct = (
    id: string,
    data: Partial<ProductPayload>
): Promise<Product> =>
    request(`product/${id}`, { method: "PATCH", body: JSON.stringify(data) });

export const deleteProduct = (id: string): Promise<void> =>
    request(`product/${id}`, { method: "DELETE" });

export const getCategories = (): Promise<Category[]> => request("category");

export const createCategory = (data: {
    name: string;
    description?: string;
}): Promise<Category> =>
    request("category", { method: "POST", body: JSON.stringify(data) });

export const uploadProductImage = (
    productId: string,
    file: File
): Promise<Image> => {
    const formData = new FormData();
    formData.append("file", file);
    return request(`image/product/${productId}`, {
        method: "POST",
        body: formData,
    });
};

export const uploadMakerProfileImage = (
    makerId: string,
    file: File
): Promise<Image> => {
    const formData = new FormData();
    formData.append("file", file);
    return request(`image/maker/${makerId}/profile`, {
        method: "POST",
        body: formData,
    });
};

export const deleteImage = (imageId: string): Promise<void> => {
    return request(`image/${imageId}`, { method: "DELETE" });
};

export const createMakerInvite = (data: MakerInvitePayload): Promise<void> => {
    return request<void>("maker-invite", {
        method: "POST",
        body: JSON.stringify(data),
    });
};

export const getDevolutions = (): Promise<DevolutionResponseDTO[]> =>
    request("devolutions", {}, "devolution");

export const updateDevolutionStatus = (
    data: UpdateDevolutionStatusDTO
): Promise<void> => {
    return request(
        `devolutions`,
        {
            method: "PATCH",
            body: JSON.stringify(data),
        },
        "devolution"
    );
};

export const getMyProducts = (): Promise<Product[]> => {
  return requestMakerApi("product/my-products", {
    method: 'GET',
  });
};

export const createMyProduct = (data: ProductPayload): Promise<Product> => {
  return requestMakerApi("product/my-product", { 
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const getMyMakerProfile = (): Promise<Maker> => {
  return requestMakerApi("maker/me", {
    method: 'GET',
  });
};

export const uploadMyProfileImage = (
    makerId: string,
    file: File
): Promise<Image> => {
    const formData = new FormData();
    formData.append("file", file);
    
    return requestMakerApi(`image/maker/${makerId}/profile`, {
        method: "POST",
        body: formData,
    });
};
