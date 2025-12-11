/* eslint-disable no-unused-vars */
const BASE_URL = 'http://localhost:3000'

async function request(url, options = {}) {
    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
        }
        , ...options
    })

    if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`)
    }
    const text = await response.text()
    return text ? JSON.parse(text) : null
}

// Metodo GET
export async function get(endpoint) {
    const url = `${BASE_URL}${endpoint}`
    return request(url)
}

// Metodo POST
export async function post(endpoint, data) {
    const url = `${BASE_URL}${endpoint}`
    return request(url, {
        method: 'POST',
        body: JSON.stringify(data),
    })
}

// Metodo PUT
export async function put(endpoint, data) {
    const url = `${BASE_URL}${endpoint}`
    return request(url, {
        method: 'PUT',
        body: JSON.stringify(data),
    })
}

// Metodo DELETE - está del por já existir o metodo delete no js
export async function del(endpoint) {
    const url = `${BASE_URL}${endpoint}`
    return request(url, {
        method: 'DELETE',
    })
}

// Constrói query string a partir de objeto de parâmetros
// Filtra valores vazios/null/undefined automaticamente
export function buildQueryString(params) {
    const query = new URLSearchParams()

    Object.entries(params).forEach(([key, value]) => {
    // Só adiciona se o valor não for vazio/null/undefined
        if (value !== null && value !== undefined && value !== '') {
            query.append(key, value)
        }
    })
    const queryString = query.toString()
    return queryString ? `?${queryString}` : ''
}