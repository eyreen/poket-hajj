import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { AuthStore, FiltersStore, PackageFilters, User } from '@/types'
import { loginUser } from './api'

// Auth Store
export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        try {
          const response = await loginUser(email, password)
          const { token, ...user } = response.data
          
          set({
            user,
            token,
            isAuthenticated: true,
          })
          
          // Store token in localStorage for API interceptor
          localStorage.setItem('auth_token', token)
        } catch (error) {
          console.error('Login failed:', error)
          throw error
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        })
        localStorage.removeItem('auth_token')
      },

      updateUser: (userData: Partial<User>) => {
        const currentUser = get().user
        if (currentUser) {
          set({
            user: { ...currentUser, ...userData },
          })
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)

// Filters Store
const defaultFilters: PackageFilters = {
  priceRange: [20000, 80000],
  hotelRating: [],
  airline: [],
  category: [],
  specialNeeds: [],
}

export const useFiltersStore = create<FiltersStore>()(
  persist(
    (set) => ({
      packageFilters: defaultFilters,

      updateFilters: (filters: Partial<PackageFilters>) => {
        set((state) => ({
          packageFilters: { ...state.packageFilters, ...filters },
        }))
      },

      resetFilters: () => {
        set({ packageFilters: defaultFilters })
      },
    }),
    {
      name: 'filters-storage',
    }
  )
)

// UI State Store (for app-wide UI state)
interface UIStore {
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  sidebarCollapsed: false,
  
  toggleSidebar: () => {
    set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed }))
  },
  
  setSidebarCollapsed: (collapsed: boolean) => {
    set({ sidebarCollapsed: collapsed })
  },
}))

// Notification Store
interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  timestamp: Date;
  read: boolean;
}

interface NotificationStore {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  notifications: [
    {
      id: '1',
      title: 'Welcome to Smart Hajj!',
      message: 'Your journey to Hajj starts here. Complete your profile to get started.',
      type: 'info',
      timestamp: new Date(),
      read: false,
    },
    {
      id: '2',
      title: 'Queue Position Updated',
      message: 'Your queue position has moved up by 150 spots.',
      type: 'success',
      timestamp: new Date(Date.now() - 60000),
      read: false,
    },
  ],
  unreadCount: 2,

  addNotification: (notification) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false,
    }

    set((state) => ({
      notifications: [newNotification, ...state.notifications],
      unreadCount: state.unreadCount + 1,
    }))
  },

  markAsRead: (id) => {
    set((state) => ({
      notifications: state.notifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      ),
      unreadCount: Math.max(0, state.unreadCount - 1),
    }))
  },

  markAllAsRead: () => {
    set((state) => ({
      notifications: state.notifications.map((notif) => ({ ...notif, read: true })),
      unreadCount: 0,
    }))
  },

  removeNotification: (id) => {
    const notification = get().notifications.find((n) => n.id === id)
    set((state) => ({
      notifications: state.notifications.filter((notif) => notif.id !== id),
      unreadCount: notification && !notification.read ? state.unreadCount - 1 : state.unreadCount,
    }))
  },

  clearAll: () => {
    set({ notifications: [], unreadCount: 0 })
  },
}))
