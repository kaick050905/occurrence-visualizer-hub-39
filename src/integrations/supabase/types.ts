export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      locations: {
        Row: {
          ID_LOCALIDADE: number
          ID_REGIAO: number | null
          IDH: string | null
          NOME: string | null
          População: string | null
        }
        Insert: {
          ID_LOCALIDADE: number
          ID_REGIAO?: number | null
          IDH?: string | null
          NOME?: string | null
          População?: string | null
        }
        Update: {
          ID_LOCALIDADE?: number
          ID_REGIAO?: number | null
          IDH?: string | null
          NOME?: string | null
          População?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "locations_ID_REGIAO_fkey"
            columns: ["ID_REGIAO"]
            isOneToOne: false
            referencedRelation: "region"
            referencedColumns: ["ID_REGIAO"]
          },
        ]
      }
      occurrences: {
        Row: {
          ANO: number | null
          ID_LOCALIDADE: number | null
          ID_OCORRENCIA: number
          QUANTIDADE: string | null
          TIPO_OCO: string | null
        }
        Insert: {
          ANO?: number | null
          ID_LOCALIDADE?: number | null
          ID_OCORRENCIA: number
          QUANTIDADE?: string | null
          TIPO_OCO?: string | null
        }
        Update: {
          ANO?: number | null
          ID_LOCALIDADE?: number | null
          ID_OCORRENCIA?: number
          QUANTIDADE?: string | null
          TIPO_OCO?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "occurrences_ID_LOCALIDADE_fkey"
            columns: ["ID_LOCALIDADE"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["ID_LOCALIDADE"]
          },
          {
            foreignKeyName: "occurrences_TIPO_OCO_fkey"
            columns: ["TIPO_OCO"]
            isOneToOne: false
            referencedRelation: "relacao"
            referencedColumns: ["TIPO_OCO"]
          },
        ]
      }
      region: {
        Row: {
          ID_REGIAO: number
          REGIAO: string | null
        }
        Insert: {
          ID_REGIAO: number
          REGIAO?: string | null
        }
        Update: {
          ID_REGIAO?: number
          REGIAO?: string | null
        }
        Relationships: []
      }
      relacao: {
        Row: {
          "DESCRICAO RESUMIDA": string | null
          NÍVEL: string | null
          TIPO_OCO: string
        }
        Insert: {
          "DESCRICAO RESUMIDA"?: string | null
          NÍVEL?: string | null
          TIPO_OCO: string
        }
        Update: {
          "DESCRICAO RESUMIDA"?: string | null
          NÍVEL?: string | null
          TIPO_OCO?: string
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
