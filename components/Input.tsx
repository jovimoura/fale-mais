interface InputProps {
  onChange?: (e:any) => void
  value?: any
  type?: string
  placeholder?: any
  icon?: string
}

export default function Input({
  onChange,
  value,
  type,
  placeholder,
  icon
}: InputProps) {
  return (
    <div className="flex rounded-3xl border-2 border-solid border-zinc-300 justify-center items-center font-medium bg-transparent py-2.5 pl-2 pr-5">
      {icon && (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mx-2 text-stone-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={icon}
            />
          </svg>
        </>
      )}
      <input
        className="focus:outline-none text-stone-500"
        onChange={onChange}
        value={value}
        type={type}
        placeholder={placeholder}
      />
    </div>
  )
}
