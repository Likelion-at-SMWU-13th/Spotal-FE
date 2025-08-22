const Tag = ({ label }) => {
  if (!label) return null
  return (
    <div className='bg-grey-100 rounded-[5px] py-[2px] px-[6.5px] text-[0.75rem]'># {label}</div>
  )
}

export default Tag
