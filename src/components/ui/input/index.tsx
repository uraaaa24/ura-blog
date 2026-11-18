type InputProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  ariaLabel?: string
}

const Input = ({ value, onChange, placeholder = 'Enter text...', ariaLabel }: InputProps) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label={ariaLabel}
      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition-colors duration-300 focus:ring-2 focus:ring-gray-200 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:ring-gray-700"
    />
  )
}

export default Input
