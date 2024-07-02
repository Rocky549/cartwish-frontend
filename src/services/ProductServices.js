import apiClient from "../utils/api-client";

export default function getSuggestionApi(search){
    return apiClient.get(`/products/suggestions?search=${search}`)
}