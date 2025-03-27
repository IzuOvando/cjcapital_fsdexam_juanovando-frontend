"use client"

import { useState, useEffect } from "react"
import { IStaffForm } from "@/types/staff"
import { StaffService } from "@/services/staffService"
import { useRouter } from "next/navigation"; 

export function useStaffForm(initialData?: IStaffForm) {
  const photoUrls = [
    "https://drive.google.com/open?id=1ojesMjdBb_rgbUJM9Ee5mYQXsmIJLBuu",
    "https://drive.google.com/open?id=1imSJ9sw1FP-rcxfUM0DiCrOSbmU943pU",
    "https://drive.google.com/open?id=1ezk1rBVYHcsdAjXsh_d79dwaWYWIQ4-4",
    "https://drive.google.com/open?id=1Xtg13wHG6A0tFwdYj2dLDoeH8Quu8ugU",
    "https://drive.google.com/open?id=1qBt7Cu6Su4LQqwXuHTuDtuDP-IEg4X0F",
    "https://drive.google.com/open?id=1ruuvf9Q2Vdp74wZRhdK5eYzLTqpcDCRR",
    "https://drive.google.com/open?id=17u7Eln16SDTpsg6fX7ysb1m9_UGzO-_L",
  ];
  
  const documentUrls = [
    {
      "INE": "https://drive.google.com/open?id=1MIxaNB4SZi-jGPmhm6BCaSmN2r7Vz51T",
      "Comprobante_domicilio": "https://drive.google.com/open?id=18LaI4x5iEMIEa6H4biuhlFnQ_rOCbhu6",
      "RFC": "https://drive.google.com/open?id=19q1gf8TjMpqt3wTkrfvgBbaY2yULw9a7",
      "CURP": "https://drive.google.com/open?id=1Rd6ozBhym04vVyeSFeMB5MBK4DPzJDL3"
    },
    {
        "INE": "https://drive.google.com/open?id=1aXZu4bXOcFk9qPp70VVdgYkfRLe4UN5m",
        "Comprobante_domicilio": "https://drive.google.com/open?id=19ZHXK58FPVENqlLenx-HAi770R-z0BLf",
        "RFC": "https://drive.google.com/open?id=1y4epAukWKLiyZHoB5yG8bTavrkYk4px6",
        "CURP": "https://drive.google.com/open?id=1q5KqpLCVQHUial_SlsmEiX7keZ46Gl5X"
    },
    {
        "INE": "https://drive.google.com/open?id=17vQGWJ8w6El1JfMgvPCUSbSXDQ0aDkbW",
        "Comprobante_domicilio": "https://drive.google.com/open?id=1UdboM6rYkLsz9jwDIfDtjLTSaYmee9Ab",
        "RFC": "https://drive.google.com/open?id=1qj3N5JqLkYbmu9dtkIYKSTWDzGbgCxEA",
        "CURP": "https://drive.google.com/open?id=1EnKB1ZYlnZCExKk2SJ_vtdHjkKbphcua"
    },
    {
        "INE": "https://drive.google.com/open?id=1oVoOb35lwiQmXdXj11IqkqlvaARfbVwD",
        "Comprobante_domicilio": "https://drive.google.com/open?id=1_OC39_zDAqiic5yCGt7feAt0kvHDjZ5J",
        "RFC": "https://drive.google.com/open?id=1A5FxxMEZ4yB6-izzu9cFRM4ogZO1YKLp",
        "CURP": "https://drive.google.com/open?id=1GYLlid73Q73y4W822Yy8Y3lNSdimaAY9"
    },
    {
        "INE": "https://drive.google.com/open?id=1OtUdOeFh_bFK-OhQhESDzXM_cdwT4xZq",
        "Comprobante_domicilio": "https://drive.google.com/open?id=14x0DU3TG1KSvZQ5or9XI6dAsbrQ9Bq9R",
        "RFC": "https://drive.google.com/open?id=1XgD_2iQCuKxhv8rREmqxJ2cX4FETtcSQ",
        "CURP": "https://drive.google.com/open?id=1bXyyeS3fBiW67NqPhCzs9bTU61pgfJAO"
    },
    {
        "INE": "https://drive.google.com/open?id=1LFXo67R5eKHc0Ng2jAQQoEhcXhef5fMF",
        "Comprobante_domicilio": "https://drive.google.com/open?id=1j2alWyaUgbKm_0eg78xtKWesH-_FknFX",
        "RFC": "https://drive.google.com/open?id=1KKsL60pd4xlUWNiVaUvnCKPJMJY6k1IM",
        "CURP": "https://drive.google.com/open?id=1tqh0CkuM3kXziLVr7PqFtQR0x-OGuagb"
    },
    {
        "INE": "https://drive.google.com/open?id=1dmBtYOvcU46dwLLdeYM6iOUocSsNAVa5",
        "Comprobante_domicilio": "https://drive.google.com/open?id=1ydYFLchSmLGDKywtMM6H6ppZBQJrF4Wy",
        "RFC": "https://drive.google.com/open?id=1FqShbj760hWIAN7-ZJr0d4kd8XjAY8ql",
        "CURP": "https://drive.google.com/open?id=1ul8rvsmQqtzCUkkBp1V3NVrzEAWSBqbW"
    }
  ]

  const [formData, setFormData] = useState<IStaffForm>({
    paternalSurname: "",
    maternalSurname: "",
    names: "",
    email: "",
    phone: "",
    photo: [],
    estado: "",
    alcaldia: "",
    disponibilidad: "",
    direccion: "",
    edad: "",
    referidoDe: "",
    aniosExperiencia: "",
    escolaridad: "",
    tatuajes: false,
    animadora: false,
    pintaCaritas: false,
    globoflexia: false,
    coreografias: false,
    buenaVoz: false,
    rapelTirolesa: false,
    cuentasConDisfraces: false,
    otroIdioma: "",
    miedosFobias: "",
    banco: "",
    clabe: "",
    inePdf: [],
    comprobantePdf: [],
    rfcPdf: [],
    curpPdf: [],
    comentarios: "",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (formData) {
      setFormData(formData);
    } else if (initialData) {
      setFormData(initialData);
    }
  }, [formData, initialData]);
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked, files } = e.target as HTMLInputElement

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : files ? files : value
    }))
  }
  

  const getSignedUrls = async (files: File[], fieldName: string): Promise<string[]> => {
    try {
      const signedUrls = await Promise.all(
        files.map(async (file) => {
          const signedUrl = await StaffService.getSignedUrl(file, file.name, file.type);
          return signedUrl;
        })
      );
      return signedUrls;
    } catch (error) {
      console.error(`Error al obtener Signed URLs para ${fieldName}:`, error);
      setError("Ocurrió un error al obtener las URLs firmadas.");
      return [];
    }
  }
  
  const uploadFilesAndGenerateUrls = async (fieldName: string, files: File[]): Promise<string[]> => {
    if (files && files.length > 0) {
      const signedUrls = await getSignedUrls(files, fieldName);
      if (signedUrls.length > 0) {
        return signedUrls;
      }
    }
    return [];
  }
  
  const convertToFileArray = async (urls: string[]): Promise<File[]> => {
    const files = await Promise.all(urls.map(async (url, index) => {
      const response = await fetch(url);
      const blob = await response.blob();
      return new File([blob], `file-${index}.jpg`, { type: blob.type });
    }));
    return files;
  }

  function getRandom<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  const mockUploadFiles = async (fieldName: string, files: File[]): Promise<string[]> => {
    if (!files.length) return [];
  
    if (fieldName === "photo") {
      return files.map(() => getRandom(photoUrls));
    }
  
    const docSet = getRandom(documentUrls);
    if (fieldName === "inePdf") return [docSet.INE];
    if (fieldName === "comprobantePdf") return [docSet.Comprobante_domicilio];
    if (fieldName === "rfcPdf") return [docSet.RFC];
    if (fieldName === "curpPdf") return [docSet.CURP];
  
    return [];
  };

  function mapExperienceToNumber(experience: string): number {
    const experienceMapping: { [key: string]: number } = {
      "Entre 1 y 3 años": 2,
      "Entre 3 y 5 años": 4,
      "Más de 5 años": 6,
      "Menos de 1 año": 0,
    };
  
    return experienceMapping[experience] || 0; // Devuelve 0 si no se encuentra un mapeo
  }
  
  const createStaff = async () => {
    setLoading(true);
    setError(null);
  
    try {
      const updatedFormData = { ...formData };
  
      updatedFormData.photo = await (Array.isArray(formData.photo) && typeof formData.photo[0] === 'string'
        ? convertToFileArray(formData.photo as string[])
        : formData.photo);
  
      updatedFormData.inePdf = await (Array.isArray(formData.inePdf) && typeof formData.inePdf[0] === 'string'
        ? convertToFileArray(formData.inePdf as string[])
        : formData.inePdf);
  
      updatedFormData.comprobantePdf = await (Array.isArray(formData.comprobantePdf) && typeof formData.comprobantePdf[0] === 'string'
        ? convertToFileArray(formData.comprobantePdf as string[])
        : formData.comprobantePdf);
  
      updatedFormData.rfcPdf = await (Array.isArray(formData.rfcPdf) && typeof formData.rfcPdf[0] === 'string'
        ? convertToFileArray(formData.rfcPdf as string[])
        : formData.rfcPdf);
  
      updatedFormData.curpPdf = await (Array.isArray(formData.curpPdf) && typeof formData.curpPdf[0] === 'string'
        ? convertToFileArray(formData.curpPdf as string[])
        : formData.curpPdf);

      // This part was commented as it belongs to the flow of creating the files in signedurls but it was commented as vercel blob was not activated but the communication and the flow is complete.
  
      // updatedFormData.photo = await uploadFilesAndGenerateUrls("photo", updatedFormData.photo as File[]);
      // updatedFormData.inePdf = await uploadFilesAndGenerateUrls("inePdf", updatedFormData.inePdf as File[]);
      // updatedFormData.comprobantePdf = await uploadFilesAndGenerateUrls("comprobantePdf", updatedFormData.comprobantePdf as File[]);
      // updatedFormData.rfcPdf = await uploadFilesAndGenerateUrls("rfcPdf", updatedFormData.rfcPdf as File[]);
      // updatedFormData.curpPdf = await uploadFilesAndGenerateUrls("curpPdf", updatedFormData.curpPdf as File[]);

      updatedFormData.photo = await mockUploadFiles("photo", updatedFormData.photo as File[]);
      updatedFormData.inePdf = await mockUploadFiles("inePdf", updatedFormData.inePdf as File[]);
      updatedFormData.comprobantePdf = await mockUploadFiles("comprobantePdf", updatedFormData.comprobantePdf as File[]);
      updatedFormData.rfcPdf = await mockUploadFiles("rfcPdf", updatedFormData.rfcPdf as File[]);
      updatedFormData.curpPdf = await mockUploadFiles("curpPdf", updatedFormData.curpPdf as File[]);

      const formattedData = {
        contact_info: {
          email: updatedFormData.email.toLowerCase(),
          tel: updatedFormData.phone,
          address: updatedFormData.direccion,
          state: updatedFormData.estado,
          town: updatedFormData.alcaldia,
          img: updatedFormData.photo,
        },
        personal_info: {
          first_name: updatedFormData.names.split(" ")[0],
          last_name: updatedFormData.names.split(" ")[1] || "",
          second_last_name: updatedFormData.paternalSurname,
          age: parseInt(updatedFormData.edad),
          referred_by: updatedFormData.referidoDe,
          years_of_experience: mapExperienceToNumber(updatedFormData.aniosExperiencia),
          education: updatedFormData.escolaridad,
          has_tattoos: updatedFormData.tatuajes,
          has_animator_experience: updatedFormData.animadora,
          has_face_painting_experience: updatedFormData.pintaCaritas,
          has_balloon_twisting_experience: updatedFormData.globoflexia,
          has_choreography_experience: updatedFormData.coreografias,
          can_sing: updatedFormData.buenaVoz,
          has_rappelling_experience: updatedFormData.rapelTirolesa,
          has_costumes_material: updatedFormData.cuentasConDisfraces,
          speaks_other_languages: updatedFormData.otroIdioma,
          has_fears: updatedFormData.miedosFobias,
        },
        sensitive_documents: {
          account_clabe: updatedFormData.clabe,
          ine_pdf: updatedFormData.inePdf,
          address_proof_pdf: updatedFormData.comprobantePdf,
          rfc_pdf: updatedFormData.rfcPdf,
          curp_pdf: updatedFormData.curpPdf,
        },
        availability: {
          days_available: [updatedFormData.disponibilidad],
        },
      };
    
  
      await StaffService.createStaff(formattedData);
      alert("Staff creado con éxito")
      router.push("/")
    } catch (error) {
      console.error("Error al crear staff:", error)
      setError("Ocurrió un error al crear el staff.")
    } finally {
      setLoading(false)
    }
  }
  

  return {
    formData,
    handleChange,
    createStaff,
    loading,
    error,
    setFormData
  }
}
