import { BaseService } from './baseService';

interface LoginCredentials {
  email: string;
  password: string;
  remember?: boolean;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface AuthResponse {
  success: boolean;
  token?: string;
  user?: {
    id: number;
    name: string;
    email: string;
  };
  error?: string;
}

class AuthService extends BaseService {
  constructor() {
    super();
    
    // Ajouter un intercepteur pour inclure le token d'authentification dans les requêtes
    this.api.interceptors.request.use(
      (config) => {
        const token = this.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  /**
   * Connecte un utilisateur
   * @param credentials Les identifiants de connexion
   * @returns Une promesse avec la réponse d'authentification
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      this.abortPreviousRequest();
      
      const response = await this.api.post('/auth/login', {
        email: credentials.email,
        password: credentials.password
      }, {
        signal: this.controller?.signal
      });

      const data = response.data;

      if (data.success && typeof window !== 'undefined' && window.localStorage) {
        // Stocker le token dans le localStorage
        localStorage.setItem('auth_token', data.token);
        localStorage.setItem('auth_user', JSON.stringify(data.user));
      }

      return data;
    } catch (error) {
      console.error('Erreur de connexion:', error);
      return {
        success: false,
        error: 'Une erreur est survenue lors de la connexion'
      };
    }
  }
  
  /**
   * Inscrit un nouvel utilisateur
   * @param data Les données d'inscription
   * @returns Une promesse avec la réponse d'authentification
   */
  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      this.abortPreviousRequest();
      
      const response = await this.api.post('/auth/register', data, {
        signal: this.controller?.signal
      });

      const responseData = response.data;

      if (responseData.success && typeof window !== 'undefined' && window.localStorage) {
        // Stocker le token dans le localStorage
        localStorage.setItem('auth_token', responseData.token);
        localStorage.setItem('auth_user', JSON.stringify(responseData.user));
      }

      return responseData;
    } catch (error) {
      console.error('Erreur d\'inscription:', error);
      return {
        success: false,
        error: 'Une erreur est survenue lors de l\'inscription'
      };
    }
  }
  
  /**
   * Déconnecte l'utilisateur
   */
  logout(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
    }
  }
  
  /**
   * Vérifie si l'utilisateur est connecté
   * @returns true si l'utilisateur est connecté, false sinon
   */
  isAuthenticated(): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      return !!this.getToken();
    }
    return false;
  }
  
  /**
   * Récupère l'utilisateur connecté
   * @returns L'utilisateur connecté ou null
   */
  getUser(): any {
    if (typeof window !== 'undefined' && window.localStorage) {
      const userJson = localStorage.getItem('auth_user');
      if (userJson) {
        try {
          return JSON.parse(userJson);
        } catch (e) {
          return null;
        }
      }
    }
    return null;
  }
  
  /**
   * Récupère le token d'authentification
   * @returns Le token d'authentification ou null
   */
  getToken(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('auth_token');
    }
    return null;
  }

  /**
   * Vérifie si le token est valide
   * @returns Une promesse avec la réponse de validation
   */
  async validateToken(): Promise<boolean> {
    try {
      const token = this.getToken();
      
      if (!token) {
        return false;
      }

      this.abortPreviousRequest();
      
      const response = await this.api.get('/auth/validate', {
        signal: this.controller?.signal
      });

      return response.data.valid === true;
    } catch (error) {
      console.error('Erreur de validation du token:', error);
      return false;
    }
  }

  /**
   * Récupère les informations de l'utilisateur actuel depuis l'API
   * @returns Une promesse avec les informations de l'utilisateur
   */
  async fetchCurrentUser(): Promise<any> {
    try {
      const token = this.getToken();
      
      if (!token) {
        return null;
      }

      // Vérifier si les données sont en cache
      const cacheKey = 'current_user';
      const cachedData = this.getCacheItem(cacheKey);
      if (cachedData) {
        return cachedData;
      }

      this.abortPreviousRequest();
      
      const response = await this.api.get('/auth/user', {
        signal: this.controller?.signal
      });

      const data = response.data;
      
      if (data.success && data.user && typeof window !== 'undefined' && window.localStorage) {
        // Mettre à jour les informations de l'utilisateur dans le localStorage
        localStorage.setItem('auth_user', JSON.stringify(data.user));
        
        // Mettre en cache les données
        this.setCacheItem(cacheKey, data.user);
        
        return data.user;
      }
      
      return null;
    } catch (error) {
      console.error('Erreur lors de la récupération des informations de l\'utilisateur:', error);
      return null;
    }
  }
}

export const authService = new AuthService(); 