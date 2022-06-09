interface SelectProps {
  items: any
  onChange?: (e:any) => void
  value?: any
  label?: string
}

/*
  style={{ fontFamily: 'Montserrat-Bold', fontSize: '12px', padding: '0.6rem 1.3rem 0.6rem 0.6rem', border: '1px solid #DBDBDB', color: '#777', width: width || 'auto', borderRadius: '10px', backgroundColor: 'transparent' }}
*/

export default function Select({ items, onChange, value, label }: SelectProps) {
  return (
    <select className="text-sm py-2.5 pl-2 pr-5 rounded-3xl border-2 border-solid border-zinc-300 text-stone-500 w-auto bg-transparent focus:outline-none font-medium" value={value} onChange={onChange}>
      <option className="font-medium">{label}</option>
      {
        items.map((item: any, i: number) => {
          return (
            <option className="font-medium" key={i}>{item}</option>
          )
        })
      }
    </select>
  )
}