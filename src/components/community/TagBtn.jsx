const TagBtn = ({ label, onClick, isSelected }) => {
  return (
    <div>
      <button
        value={label}
        type='button'
        className={`rounded-[5px] w-full h-[3.673vh] py-[2px] px-[6.5px] text-[0.875rem] ${isSelected ? 'bg-primary-200' : 'bg-grey-100'} cursor-pointer`}
        onClick={onClick}
      >
        # {label}
      </button>
    </div>
  )
}

export default TagBtn
