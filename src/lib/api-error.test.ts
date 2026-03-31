import { ApiError, createApiError, createApiSuccess } from '@/lib/api-error'

describe('API Error Handling', () => {
  describe('ApiError Class', () => {
    it('should create error with status code', () => {
      const error = new ApiError(400, 'Bad Request')
      expect(error.statusCode).toBe(400)
      expect(error.message).toBe('Bad Request')
    })

    it('should have default status code', () => {
      const error = new ApiError()
      expect(error.statusCode).toBe(500)
    })
  })

  describe('createApiError', () => {
    it('should create error response', () => {
      const response = createApiError('Test error', 400)
      expect(response.status).toBe(400)
      expect(response.payload.error).toBe('Test error')
      expect(response.payload.success).toBe(false)
    })

    it('should have default status 500', () => {
      const response = createApiError('Server error')
      expect(response.status).toBe(500)
    })
  })

  describe('createApiSuccess', () => {
    it('should create success response', () => {
      const data = { id: '123', name: 'Test' }
      const response = createApiSuccess(data, 201)

      expect(response.status).toBe(201)
      expect(response.payload.data).toEqual(data)
      expect(response.payload.success).toBe(true)
    })

    it('should have default status 200', () => {
      const response = createApiSuccess({})
      expect(response.status).toBe(200)
    })
  })
})
