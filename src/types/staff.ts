export interface IStaffForm {
  paternalSurname: string
  maternalSurname: string
  names: string
  email: string
  phone: string
  photo: File[] | [] | string[]
  estado: string
  alcaldia: string
  disponibilidad: string
  direccion: string
  edad: string
  referidoDe: string
  aniosExperiencia: string
  escolaridad: string
  tatuajes: boolean
  animadora: boolean
  pintaCaritas: boolean
  globoflexia: boolean
  coreografias: boolean
  buenaVoz: boolean
  rapelTirolesa: boolean
  cuentasConDisfraces: boolean
  otroIdioma: string
  miedosFobias: string
  banco: string
  clabe: string
  inePdf: File[] | [] | string[]
  comprobantePdf: File[] | [] | string[]
  rfcPdf: File[] | [] | string[]
  curpPdf: File[] | [] | string[]
  comentarios: string
}

export interface Staff {
  id?: string;

  contact_info: {
    email: string;
    tel: string;
    address: string;
    state: string;
    town: string;
    img: string[];
  };

  personal_info: {
    first_name: string;
    last_name: string;
    second_last_name: string;
    age: number;
    referred_by: string;
    years_of_experience: number;
    education: string;
    has_tattoos: boolean;
    has_animator_experience: boolean;
    has_face_painting_experience: boolean;
    has_balloon_twisting_experience: boolean;
    has_choreography_experience: boolean;
    can_sing: boolean;
    has_rappelling_experience: boolean;
    has_costumes_material: boolean;
    speaks_other_languages: string;
    has_fears: string;
  };

  // sensitive_documents: {
  //   account_clabe: string;
  //   ine_pdf: string[];
  //   address_proof_pdf: string[];
  //   rfc_pdf: string[];
  //   curp_pdf: string[];
  // };

  availability: {
    days_available: string[];
  };

  hire?: {
    date_hire?: string;
    status?: "active" | "inactive";
  };
}
  