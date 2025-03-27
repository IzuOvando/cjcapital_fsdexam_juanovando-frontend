interface TextInputProps {
    name: string
    label: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    type?: React.InputHTMLAttributes<unknown>["type"]
  }
  
  export function TextInput({ name, label, value, onChange, type = "text" }: TextInputProps) {
    return (
      <div>
        <label className="block font-medium">{label}</label>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full border p-2"
        />
      </div>
    )
  }
  