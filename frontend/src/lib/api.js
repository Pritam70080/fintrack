const API_ROOT = (import.meta.env.VITE_API_URL || '/api/v1').replace(/\/$/, '')

export function apiUrl(path) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${API_ROOT}${normalizedPath}`
}

export async function apiRequest(path, options = {}) {
  const { token, ...requestOptions } = options
  const headers = new Headers(requestOptions.headers || {})

  if (requestOptions.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }
  if (token) headers.set('Authorization', `Bearer ${token}`)

  let response
  try {
    response = await fetch(apiUrl(path), { ...requestOptions, headers })
  } catch {
    throw new Error('Unable to connect to Fintrack. Check your connection and try again.')
  }

  const contentType = response.headers.get('content-type') || ''
  const body = response.status === 204
    ? null
    : contentType.includes('application/json')
      ? await response.json()
      : await response.text()

  if (!response.ok) {
    const message = typeof body === 'object' && body !== null
      ? body.message || body.error
      : body
    throw new Error(message || `Request failed (${response.status})`)
  }

  return body
}

export function oauthUrl() {
  return apiUrl('/oauth2/authorization/google')
}
