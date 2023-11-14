export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      App: {
        Row: {
          "app name": string | null
          created_at: string
          id: number
        }
        Insert: {
          "app name"?: string | null
          created_at?: string
          id?: number
        }
        Update: {
          "app name"?: string | null
          created_at?: string
          id?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      AppOS: "iOS" | "Android"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
