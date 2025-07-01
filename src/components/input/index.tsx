type InputProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

const Input = ({ value, onChange, placeholder = 'Enter text...' }: InputProps) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full py-2.5 px-4 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all duration-300"
    />
  )
}

export default Input
