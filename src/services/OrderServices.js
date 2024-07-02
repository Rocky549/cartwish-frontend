import apiClient from "../utils/api-client";

export default function  checkOutApi() {
    return apiClient.post("/order/checkout");
}
