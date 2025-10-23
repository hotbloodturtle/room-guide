interface SegmentProps {
  options: string[]
  selected: number
  onChange: (index: number) => void
}

export default function Segment({ options, selected, onChange }: SegmentProps) {
  return (
    <div className="segment-control">
      {options.map((option, index) => (
        <button
          key={index}
          className={`segment-button ${selected === index ? 'active' : ''}`}
          onClick={() => onChange(index)}
        >
          {option}
        </button>
      ))}
    </div>
  )
}
