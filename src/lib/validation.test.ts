import { validateEmail, validateUrl, sanitizeString, validateFileSize, validateFileType } from '@/lib/validation'

describe('Validation Utils', () => {
  describe('validateEmail', () => {
    it('should validate correct email formats', () => {
      expect(validateEmail('test@example.com')).toBe(true)
      expect(validateEmail('user.name@domain.co.uk')).toBe(true)
    })

    it('should reject invalid email formats', () => {
      expect(validateEmail('invalid')).toBe(false)
      expect(validateEmail('invalid@')).toBe(false)
      expect(validateEmail('@example.com')).toBe(false)
    })
  })

  describe('validateUrl', () => {
    it('should validate correct URLs', () => {
      expect(validateUrl('https://example.com')).toBe(true)
      expect(validateUrl('http://localhost:3000')).toBe(true)
    })

    it('should reject invalid URLs', () => {
      expect(validateUrl('not a url')).toBe(false)
      expect(validateUrl('htp://invalid')).toBe(false)
    })
  })

  describe('sanitizeString', () => {
    it('should remove script tags', () => {
      const input = 'Hello <script>alert("xss")</script> World'
      const result = sanitizeString(input)
      expect(result).not.toContain('<script>')
    })

    it('should trim whitespace', () => {
      expect(sanitizeString('  hello  ')).toBe('hello')
    })
  })

  describe('validateFileSize', () => {
    it('should validate file size', () => {
      expect(validateFileSize(1024 * 1024 * 5, 5)).toBe(true) // 5MB with 5MB limit
      expect(validateFileSize(1024 * 1024 * 10, 5)).toBe(false) // 10MB with 5MB limit
    })
  })

  describe('validateFileType', () => {
    it('should validate file types', () => {
      const mockFile = new File([''], 'test.pdf', { type: 'application/pdf' })
      expect(validateFileType(mockFile, ['application/pdf'])).toBe(true)
      expect(validateFileType(mockFile, ['image/png'])).toBe(false)
    })
  })
})
