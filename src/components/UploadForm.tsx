"use client"

import { Upload, X } from "lucide-react"
import Link from "next/link"
import { useStaffForm } from "@/hooks/useStaffForm" 
import { IStaffForm } from "@/types/staff"

export function UploadForm() {
  const {
    formData,
    handleChange,
    createStaff,
    loading,
    setFormData,
  } = useStaffForm()

  const checkboxFields = [
    "tatuajes",
    "animadora",
    "pintaCaritas",
    "globoflexia",
    "coreografias",
    "buenaVoz",
    "rapelTirolesa",
    "cuentasConDisfraces",
  ]

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target
    if (files && files.length > 0) {
      handleChange({
        ...e,
        target: {
          ...e.target,
          name: "photo",
          files: [...formData.photo, ...Array.from(files)] as unknown as FileList,
        },
      } as any)
    }
  }

  const removeImage = (index: number) => {
    const updatedPhotos = [...(formData.photo as File[])].filter((_, i) => i !== index)
    setFormData(prev => ({ ...prev, photo: updatedPhotos }))
  }

  const handlePdfInput = (e: React.ChangeEvent<HTMLInputElement>, name: keyof IStaffForm) => {
    const { files } = e.target
    if (files && files.length > 0) {
      handleChange({
        ...e,
        target: {
          ...e.target,
          name,
          files,
        },
      } as any)
    }
  }  
  

  return (
    <form onSubmit={(e) => {
        e.preventDefault()
        createStaff()
      }} className="space-y-8 bg-white rounded-lg shadow-sm p-6 border border-border">
      <h1 className="text-3xl font-bold text-center text-primary mb-8">Registro de Personal</h1>

      <div className="space-y-6">
        <h2 className="text-xl font-semibold border-b pb-2">Información Personal</h2>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <label htmlFor="names" className="text-sm font-medium text-gray-700">
              Nombre(s) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="names"
              placeholder="Nombre(s)"
              required
              name="names"
              onChange={handleChange}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring placeholder-white"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="paternalSurname" className="text-sm font-medium text-gray-700">
              Apellido Paterno <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="paternalSurname"
              placeholder="Apellido Paterno"
              required
              name="paternalSurname"
              onChange={handleChange}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring placeholder-white"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="maternalSurname" className="text-sm font-medium text-gray-700">
              Apellido Materno <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="maternalSurname"
              name="maternalSurname"
              placeholder="Apellido Materno"
              required
              onChange={handleChange}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring placeholder-white"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="edad" className="text-sm font-medium text-gray-700">
              Edad <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="edad"
              placeholder="Edad"
              required
              name="edad"
              onChange={handleChange}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring placeholder-white"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Correo Electrónico <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              placeholder="Correo Electrónico"
              required
              name="email"
              onChange={handleChange}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring placeholder-white"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium text-gray-700">
              Número telefónico <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              placeholder="Número telefónico"
              required
              name="phone"
              onChange={handleChange}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring placeholder-white"
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-semibold border-b pb-2">Ubicación</h2>
        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="estado" className="text-sm font-medium text-gray-700">
              Estado <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="estado"
              placeholder="Estado"
              required
              name="estado"
              onChange={handleChange}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring placeholder-white"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="alcaldia" className="text-sm font-medium text-gray-700">
              Alcaldía/Municipio <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="alcaldia"
              placeholder="Alcaldía/Municipio"
              required
              name="alcaldia"
              onChange={handleChange}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring placeholder-white"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label htmlFor="direccion" className="text-sm font-medium text-gray-700">
              Dirección <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="direccion"
              placeholder="Dirección"
              required
              name="direccion"
              onChange={handleChange}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring placeholder-white"
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-semibold border-b pb-2">Información Profesional</h2>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <label htmlFor="referidoDe" className="text-sm font-medium text-gray-700">
              Referido de
            </label>
            <input
              type="text"
              id="referidoDe"
              placeholder="Referido de"
              name="referidoDe"
              onChange={handleChange}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring placeholder-white"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="escolaridad" className="text-sm font-medium text-gray-700">
              Escolaridad
            </label>
            <select
              id="escolaridad"
              name="escolaridad"
              onChange={handleChange}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring placeholder-white"
            >
              <option value="">Selecciona una opción</option>
              <option value="Primaria">Primaria</option>
              <option value="Secundaria">Secundaria</option>
              <option value="Preparatoria">Preparatoria</option>
              <option value="Carrera Técnica">Carrera Técnica</option>
              <option value="Licenciatura">Licenciatura</option>
              <option value="Posgrado">Posgrado</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="aniosExperiencia" className="text-sm font-medium text-gray-700">
              Años de experiencia
            </label>
            <select
              id="aniosExperiencia"
              name="aniosExperiencia"
              onChange={handleChange}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring placeholder-white"
            >
              <option value="">Selecciona una opción</option>
              <option value="Menos de 1 año">Menos de 1 año</option>
              <option value="Entre 1 y 3 años">Entre 1 y 3 años</option>
              <option value="Entre 3 y 5 años">Entre 3 y 5 años</option>
              <option value="Más de 5 años">Más de 5 años</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="otroIdioma" className="text-sm font-medium text-gray-700">
              Idiomas adicionales
            </label>
            <input
              type="text"
              id="otroIdioma"
              placeholder="Idiomas adicionales"
              name="otroIdioma"
              onChange={handleChange}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring placeholder-white"
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-semibold border-b pb-2">Disponibilidad</h2>
        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="disponibilidad" className="text-sm font-medium text-gray-700">
              Días disponibles <span className="text-red-500">*</span>
            </label>
            <select
              id="disponibilidad"
              multiple
              required
              name="disponibilidad"
              onChange={handleChange}
              className="h-32 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring placeholder-white"
            >
              <option value="monday">Lunes</option>
              <option value="tuesday">Martes</option>
              <option value="wednesday">Miércoles</option>
              <option value="thursday">Jueves</option>
              <option value="friday">Viernes</option>
              <option value="saturday">Sábado</option>
              <option value="sunday">Domingo</option>
            </select>
            <p className="text-xs text-white">Ctrl/Cmd para seleccionar múltiples días</p>
          </div>

          <div className="space-y-2">
            <label htmlFor="workHours" className="text-sm font-medium text-gray-700">
              Horario <span className="text-red-500">*</span>
            </label>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1">
                <label htmlFor="startTime" className="text-xs font-medium text-gray-600">
                  Hora de inicio
                </label>
                <input
                  id="startTime"
                  type="time"
                  defaultValue="09:00"
                  required
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring placeholder-white"
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="endTime" className="text-xs font-medium text-gray-600">
                  Hora de fin
                </label>
                <input
                  id="endTime"
                  type="time"
                  defaultValue="17:00"
                  required
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring placeholder-white"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label htmlFor="fobias" className="text-sm font-medium text-gray-700">
              ¿Tienes algún miedo o fobia?
            </label>
            <input
              type="text"
              id="fobias"
              placeholder="Especifica si tienes alguno"
              name= "miedosFobias"
              onChange={handleChange}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring placeholder-white"
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-semibold border-b pb-2">Experiencia y Habilidades</h2>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {checkboxFields.map((field) => (
            <label
              key={field}
              className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted/50 transition-colors"
            >
            <input
            type="checkbox"
            name={field}
            checked={formData[field as keyof IStaffForm] as boolean || false}
            onChange={handleChange}
            className="h-3 w-3 rounded border-gray-300 text-primary focus:ring-primary"
            />
              <span className="text-sm text-gray-700 leading-none">
                {
                  {
                    tatuajes: "¿Tienes tatuajes?",
                    animadora: "¿Experiencia como animadora?",
                    pintaCaritas: "¿Experiencia como pinta caritas?",
                    globoflexia: "¿Experiencia en globoflexia?",
                    coreografias: "¿Experiencia en coreografías?",
                    buenaVoz: "¿Tienes buena voz para cantar?",
                    rapelTirolesa: "¿Experiencia en rapel o tirolesa?",
                    cuentasConDisfraces: "¿Cuentas con disfraces o material?",
                  }[field]
                }
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-semibold border-b pb-2">Información Bancaria</h2>
        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="banco" className="text-sm font-medium text-gray-700">
              Selecciona tu banco
            </label>
            <select
              id="banco"
              name="banco"
              onChange={handleChange}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring placeholder-white"
            >
              <option value="">Selecciona una opción</option>
              <option value="BBVA">BBVA</option>
              <option value="Santander">Santander</option>
              <option value="Banorte">Banorte</option>
              <option value="HSBC">HSBC</option>
              <option value="Scotiabank">Scotiabank</option>
              <option value="Citibanamex">Citibanamex</option>
              <option value="Azteca">Banco Azteca</option>
              <option value="Otro">Otro</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="clabe" className="text-sm font-medium text-gray-700">
              Cuenta CLABE (18 dígitos)
            </label>
            <input
              type="text"
              id="clabe"
              name="clabe"
              onChange={handleChange}
              placeholder="Cuenta CLABE"
              maxLength={18}
              pattern="[0-9]{18}"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring placeholder-white"
            />
            <p className="text-xs text-white">Ingresa los 18 dígitos sin espacios</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-semibold border-b pb-2">Fotografía y Documentos</h2>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Fotografía donde se vea claramente tu rostro <span className="text-red-500">*</span>
          </label>
            <div className="flex flex-wrap gap-4">
                {(formData.photo as File[]).map((file, index) => {
                    const url = URL.createObjectURL(file)
                    return (
                    <div key={index} className="relative h-32 w-32 overflow-hidden rounded-md border border-border">
                        <img src={url || "/placeholder.svg"} alt={`Preview ${index}`} className="h-full w-full object-cover" />
                        <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute right-1 top-1 rounded-full bg-destructive p-1 text-destructive-foreground shadow-sm hover:bg-destructive/90"
                        >
                        <X className="h-4 w-4" />
                        </button>
                    </div>
                    )
                })}

                <label className="flex h-32 w-32 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-input bg-muted hover:bg-muted/80 transition-colors">
                    <Upload className="mb-2 h-6 w-6 text-white" />
                    <span className="text-xs text-white">Subir foto</span>
                    <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="hidden"
                    required={(formData.photo as File[]).length === 0}
                    />
                </label>
            </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
            {[
                { name: "inePdf" as const, label: "INE (ambos lados) en PDF", required: true },
                { name: "comprobantePdf" as const, label: "Comprobante de domicilio en PDF", required: true },
                { name: "rfcPdf" as const, label: "RFC en PDF", required: true },
                { name: "curpPdf" as const, label: "CURP en PDF", required: true },
            ].map(({ name, label, required }) => (
                <div key={name} className="space-y-2">
                <label htmlFor={name} className="text-sm font-medium text-gray-700">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
                <div className="flex items-center gap-2">
                    <label className="flex flex-1 cursor-pointer items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm hover:bg-muted transition-colors">
                    <Upload className="h-4 w-4 text-white" />
                    <span className="text-white truncate">
                        {(formData[name] as File[])[0]?.name || "Seleccionar archivo"}
                    </span>
                    <input
                        id={name}
                        type="file"
                        accept=".pdf"
                        onChange={(e) => handlePdfInput(e, name)}
                        className="hidden"
                        required={required}
                    />
                    </label>
                </div>
                </div>
            ))}
        </div>

        <div className="space-y-2">
          <label htmlFor="comentarios" className="text-sm font-medium text-gray-700">
            Comentarios adicionales
          </label>
          <textarea
            id="comentarios"
            rows={4}
            name="comentarios"
            onChange={handleChange}
            placeholder="Información adicional que quieras compartir"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring placeholder-white"
        ></textarea>
        </div>
      </div>

      <div className="flex flex-col gap-4 pt-6 sm:flex-row sm:justify-end">
        <Link
          href="/staff"
          className="rounded-md border border-input bg-background px-4 py-2 text-center text-sm font-medium hover:bg-muted transition-colors"
        >
          Cancelar
        </Link>
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-primary px-6 py-2 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-50 transition-colors"
        >
          {loading ? "Guardando..." : "Guardar Información"}
        </button>
      </div>
    </form>
  )
}


// This form should be made in smaller and more optimal components but for prototyping purposes it was all assembled here.
