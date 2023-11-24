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
          created_at: string
          id: number
          last_supported_android_version: string | null
          last_supported_ios_version: string | null
          name: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          last_supported_android_version?: string | null
          last_supported_ios_version?: string | null
          name?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          last_supported_android_version?: string | null
          last_supported_ios_version?: string | null
          name?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "App_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
