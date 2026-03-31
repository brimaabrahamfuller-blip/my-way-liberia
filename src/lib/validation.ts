export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
  } catch {
    return false;
  }
}

export function sanitizeString(str: string): string {
  return str.trim().replace(/<script[^>]*>.*?<\/script>/gi, "");
}

export function validateFileSize(sizeInBytes: number, maxSizeInMB: number = 5): boolean {
  return sizeInBytes <= maxSizeInMB * 1024 * 1024;
}

export function validateFileType(file: File, allowedTypes: string[]): boolean {
  return allowedTypes.includes(file.type);
}
