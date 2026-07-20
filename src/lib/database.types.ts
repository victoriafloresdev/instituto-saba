export type Status = "Novo" | "Em análise" | "Aprovado" | "Recusado" | "Contatado";

export interface Audition {
  id: string; nome: string; email: string; whatsapp: string; idade: number; cidade: string;
  modalidade: string | null; experiencia: string | null; portfolio: string | null; mensagem: string | null;
  status: Status; created_at: string; updated_at: string;
}

export interface SponsorshipLead {
  id: string; nome: string; empresa: string | null; documento: string | null; email: string;
  whatsapp: string; valor: number | null; mensagem: string | null; tipo: "PF" | "PJ";
  status: Status; created_at: string; updated_at: string;
}

export interface SchoolRegistration {
  id: string; escola: string; responsavel: string; cargo: string; email: string; whatsapp: string;
  cidade: string; alunos: number; faixa: string; mensagem: string | null; status: Status;
  created_at: string; updated_at: string;
}

export interface ContactMessage {
  id: string; nome: string; email: string; assunto: string; mensagem: string; status: Status;
  created_at: string; updated_at: string;
}

export interface Profile { id: string; role: "member" | "admin"; created_at: string; }

export interface Database {
  public: {
    Tables: {
      auditions: { Row: Audition; Insert: Omit<Audition, "id" | "status" | "created_at" | "updated_at"> & { status?: Status }; Update: Partial<Omit<Audition, "id" | "created_at">> };
      sponsorship_leads: { Row: SponsorshipLead; Insert: Omit<SponsorshipLead, "id" | "status" | "created_at" | "updated_at"> & { status?: Status }; Update: Partial<Omit<SponsorshipLead, "id" | "created_at">> };
      school_registrations: { Row: SchoolRegistration; Insert: Omit<SchoolRegistration, "id" | "status" | "created_at" | "updated_at"> & { status?: Status }; Update: Partial<Omit<SchoolRegistration, "id" | "created_at">> };
      contact_messages: { Row: ContactMessage; Insert: Omit<ContactMessage, "id" | "status" | "created_at" | "updated_at"> & { status?: Status }; Update: Partial<Omit<ContactMessage, "id" | "created_at">> };
      profiles: { Row: Profile; Insert: Profile; Update: Partial<Profile> };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
