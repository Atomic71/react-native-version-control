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
      app_versions: {
        Row: {
          app: number | null
          app_os: Database["public"]["Enums"]["AppOS"] | null
          created_at: string
          id: number
          is_blocked: boolean | null
          is_latest: boolean | null
          version_number: string
        }
        Insert: {
          app?: number | null
          app_os?: Database["public"]["Enums"]["AppOS"] | null
          created_at?: string
          id?: number
          is_blocked?: boolean | null
          is_latest?: boolean | null
          version_number: string
        }
        Update: {
          app?: number | null
          app_os?: Database["public"]["Enums"]["AppOS"] | null
          created_at?: string
          id?: number
          is_blocked?: boolean | null
          is_latest?: boolean | null
          version_number?: string
        }
        Relationships: [
          {
            foreignKeyName: "app_versions_app_fkey"
            columns: ["app"]
            isOneToOne: false
            referencedRelation: "apps"
            referencedColumns: ["id"]
          }
        ]
      }
      apps: {
        Row: {
          created_at: string
          id: number
          name: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "apps_user_id_fkey"
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
