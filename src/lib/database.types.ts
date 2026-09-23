export type Status = "Novo" | "Em análise" | "Aprovado" | "Recusado" | "Contatado";
export type SpectacleStatus = "draft" | "published" | "archived";
export type SponsorStatus = "active" | "inactive";
export type SponsorType = "master" | "sponsor" | "supporter" | "partner";

export interface Audition {
  [key: string]: unknown;
  id: string;
  nome: string;
  email: string;
  whatsapp: string;
  idade: number;
  cidade: string;
  modalidade: string | null;
  experiencia: string | null;
  portfolio: string | null;
  mensagem: string | null;
  status: Status;
  created_at: string;
  updated_at: string;
}

export interface SponsorshipLead {
  [key: string]: unknown;
  id: string;
  nome: string;
  empresa: string | null;
  documento: string | null;
  email: string;
  whatsapp: string;
  valor: number | null;
  mensagem: string | null;
  tipo: "PF" | "PJ";
  status: Status;
  created_at: string;
  updated_at: string;
}

export interface SchoolRegistration {
  [key: string]: unknown;
  id: string;
  escola: string;
  responsavel: string;
  cargo: string;
  email: string;
  whatsapp: string;
  cidade: string;
  alunos: number;
  faixa: string;
  mensagem: string | null;
  status: Status;
  created_at: string;
  updated_at: string;
}

export interface ContactMessage {
  [key: string]: unknown;
  id: string;
  nome: string;
  email: string;
  assunto: string;
  mensagem: string;
  status: Status;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  [key: string]: unknown;
  id: string;
  role: "member" | "admin";
  created_at: string;
}

export interface Spectacle {
  [key: string]: unknown;
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  description: string;
  synopsis: string | null;
  date_label: string | null;
  event_date: string | null;
  start_time: string | null;
  end_time: string | null;
  venue: string | null;
  address: string | null;
  city: string | null;
  classification: string | null;
  ticket_url: string | null;
  image_path: string | null;
  image_alt: string | null;
  status: SpectacleStatus;
  sort_order: number;
  created_by: string | null;
  updated_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface SpectacleInsert {
  [key: string]: unknown;
  id?: string;
  slug: string;
  title: string;
  subtitle?: string | null;
  description?: string;
  synopsis?: string | null;
  date_label?: string | null;
  event_date?: string | null;
  start_time?: string | null;
  end_time?: string | null;
  venue?: string | null;
  address?: string | null;
  city?: string | null;
  classification?: string | null;
  ticket_url?: string | null;
  image_path?: string | null;
  image_alt?: string | null;
  status?: SpectacleStatus;
  sort_order?: number;
  created_by?: string | null;
  updated_by?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface Sponsor {
  [key: string]: unknown;
  id: string;
  slug: string;
  name: string;
  sponsor_type: SponsorType;
  description: string | null;
  website_url: string | null;
  logo_path: string | null;
  logo_alt: string | null;
  status: SponsorStatus;
  sort_order: number;
  created_by: string | null;
  updated_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface SponsorInsert {
  [key: string]: unknown;
  id?: string;
  slug: string;
  name: string;
  sponsor_type?: SponsorType;
  description?: string | null;
  website_url?: string | null;
  logo_path?: string | null;
  logo_alt?: string | null;
  status?: SponsorStatus;
  sort_order?: number;
  created_by?: string | null;
  updated_by?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface Database {
  public: {
    Tables: {
      auditions: {
        Row: Audition;
        Insert: Omit<Audition, "id" | "status" | "created_at" | "updated_at"> & { status?: Status };
        Update: Partial<Omit<Audition, "id" | "created_at">>;
        Relationships: [];
      };
      sponsorship_leads: {
        Row: SponsorshipLead;
        Insert: Omit<SponsorshipLead, "id" | "status" | "created_at" | "updated_at"> & {
          status?: Status;
        };
        Update: Partial<Omit<SponsorshipLead, "id" | "created_at">>;
        Relationships: [];
      };
      school_registrations: {
        Row: SchoolRegistration;
        Insert: Omit<SchoolRegistration, "id" | "status" | "created_at" | "updated_at"> & {
          status?: Status;
        };
        Update: Partial<Omit<SchoolRegistration, "id" | "created_at">>;
        Relationships: [];
      };
      contact_messages: {
        Row: ContactMessage;
        Insert: Omit<ContactMessage, "id" | "status" | "created_at" | "updated_at"> & {
          status?: Status;
        };
        Update: Partial<Omit<ContactMessage, "id" | "created_at">>;
        Relationships: [];
      };
      profiles: { Row: Profile; Insert: Profile; Update: Partial<Profile>; Relationships: [] };
      spectacles: {
        Row: Spectacle;
        Insert: SpectacleInsert;
        Update: Partial<Omit<Spectacle, "id" | "created_at">>;
        Relationships: [];
      };
      sponsors: {
        Row: Sponsor;
        Insert: SponsorInsert;
        Update: Partial<Omit<Sponsor, "id" | "created_at">>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
