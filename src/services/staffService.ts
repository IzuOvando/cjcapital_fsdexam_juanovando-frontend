import blobClient from "@/lib/blobClient";
import CONFIG from "@/config";
import axios from 'axios';
import { Staff } from "@/types/staff"

export class StaffService {

    private static BASE_URL = `${CONFIG.BASE_URL_BACKEND}/crud`

    static async getSignedUrl(file: File, fileName: string, fileType: string) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const blob = await blobClient.putBlob(`/api/getSignedUrl?fileName=${fileName}&fileType=${fileType}`, buffer, { access: 'public' });
        return blob.url;
    }
    
  
    /**
     * CREATE: Envía JSON al endpoint de creación.
     * @param formData Data necesaria para crear Staff (incluyendo archivos).
     */
    public static async createStaff(data: any): Promise<any> {
      
      try {
        const res = await axios.post(this.BASE_URL, data, {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 10000,
        });
    
        return res.data;
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          if (error.code === 'ECONNABORTED') {
            alert("La solicitud ha tardado demasiado tiempo en responder.");
          } else {
            alert("Hubo un problema al crear el staff.");
          }
          throw new Error(error.response ? error.response.data : error.message);
        } else {
          alert("Ocurrió un error inesperado.");
          throw new Error("Error inesperado");
        }
      }
    }
  
    /**
     * READ (todos): Obtiene un listado de Staff.
     */
    public static async getAllStaff(): Promise<Staff[]> {

      try {
        const res = await axios.get(this.BASE_URL, {
          timeout: 10000,
          headers: {
            "Content-Type": "application/json",
          },
        });

        return res.data as Staff[];
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          if (error.code === "ECONNABORTED") {
            alert("La solicitud ha tardado demasiado tiempo en responder.");
          } else {
            alert("Hubo un problema al obtener la lista de staff.");
          }
          throw new Error(error.response ? error.response.data : error.message);
        } else {
          alert("Ocurrió un error inesperado.");
          throw new Error("Error inesperado");
        }
      }
    }

    /**
     * READ (uno): Obtiene datos de un Staff por ID.
     * @param id El ID del staff que deseas obtener.
     */
    public static async getStaffById(id: number | string): Promise<Staff> {
      const res = await fetch(`${this.BASE_URL}/${id}`, {
        method: "GET",
      })
  
      if (!res.ok) {
        throw new Error(`Error al obtener el staff con ID ${id}`)
      }
  
      return res.json()
    }
  
    /**
     * UPDATE: Actualiza la información de un Staff.
     * @param id El ID del Staff a actualizar.
     * @param formData Data con los campos y/o archivos a actualizar.
     */
    public static async updateStaff(id: number | string, date: Date): Promise<any> {
      try {
        const res = await axios.patch(`${this.BASE_URL}/${id}`, {
          hire: {
            date_hire: date.toISOString().split("T")[0],
            status: "active",
          },
        }, {
          timeout: 10000,
          headers: {
            "Content-Type": "application/json",
          },
        })
    
        return res.data
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          if (error.code === "ECONNABORTED") {
            alert("La solicitud ha tardado demasiado tiempo en responder.")
          } else {
            alert("Hubo un problema al actualizar la información del staff.")
          }
          throw new Error(error.response ? JSON.stringify(error.response.data) : error.message)
        } else {
          alert("Ocurrió un error inesperado.")
          throw new Error("Error inesperado")
        }
      }
    }
  
    /**
     * DELETE: Elimina un Staff por ID.
     * @param id El ID del Staff a eliminar.
     */
    public static async deleteStaff(id: number | string): Promise<any> {
      try {
        await axios.delete(`${this.BASE_URL}/${id}`, {
          timeout: 10000,
          headers: {
            "Content-Type": "application/json",
          },
        })
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          if (error.code === "ECONNABORTED") {
            alert("La solicitud ha tardado demasiado tiempo en responder.")
          } else {
            alert("Hubo un problema al actualizar la información del staff.")
          }
          throw new Error(error.response ? JSON.stringify(error.response.data) : error.message)
        } else {
          alert("Ocurrió un error inesperado.")
          throw new Error("Error inesperado")
        }
      }
    }
  }