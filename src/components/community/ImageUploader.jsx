import { useState, useEffect } from 'react'
import Camera from '@/assets/Camera.svg'
import { toast } from 'sonner'
import Limit from '@/assets/NoResult.svg?react'

const sameImageList = (a = [], b = []) =>
  a.length === b.length && a.every((x, i) => x?.id === b[i]?.id && x?.src === b[i]?.src)

const mergeUnique = (list = []) => {
  const map = new Map()
  for (const it of list) {
    if (!it?.src) continue
    const key = it?.id != null ? `id:${it.id}` : `src:${it.src}`
    if (!map.has(key)) map.set(key, it)
  }
  return Array.from(map.values())
}

const ImageUploader = ({ urllist, onFilesChange, onRemove }) => {
  const [images, setImages] = useState([])
  const [files, setFiles] = useState([])
  const [removedIds, setRemovedIds] = useState(new Set())

  useEffect(() => {
    if (!urllist) return
    console.log(urllist)
    const normalized = (Array.isArray(urllist) ? urllist : [])
      .map((u) => {
        const src = typeof u === 'string' ? u : (u?.image_url ?? u?.src)
        const id = typeof u === 'number' ? null : (u?.image_id ?? null)
        return src ? { id, src, isLocal: false } : null
      })
      .filter(Boolean)

    setImages((prev) => {
      const locals = prev.filter((it) => it.isLocal)
      const merged = mergeUnique([...normalized, ...locals])
      return sameImageList(prev, merged) ? prev : merged
    })
  }, [urllist, removedIds])

  useEffect(() => {
    onFilesChange?.(files)
  }, [files, onFilesChange])

  const handleUpload = (e) => {
    const uploaded = Array.from(e.target.files || [])
    if (images.length + uploaded.length > 10) {
      toast('🟡 이미지는 최대 10개까지 업로드할 수 있어요!')
      return
    }
    const newItems = uploaded.map((f) => ({
      id: null,
      src: URL.createObjectURL(f),
      isLocal: true,
      file: f,
    }))

    setFiles((prev) => [...prev, ...uploaded])
    setImages((prev) => mergeUnique([...prev, ...newItems]))
    e.target.value = ''
  }

  const handleDelete = (index) => {
    setImages((prev) => {
      const target = prev[index]
      if (target?.id != null) {
        onRemove?.(target.id)
        setRemovedIds((s) => new Set(s).add(target.id))
      }

      if (target?.isLocal && target.src?.startsWith('blob:')) {
        const localIdx = prev.slice(0, index).filter((it) => it.isLocal).length
        setFiles((fprev) => fprev.filter((_, i) => i !== localIdx))
        URL.revokeObjectURL(target.src)
      }
      return prev.filter((_, i) => i !== index)
    })
  }

  return (
    <div className='relative'>
      <div className='flex gap-[7px] overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
        <label className='flex shrink-0 snap-start flex-col justify-center items-center w-[14.87vw] h-[14.87vw] max-w-[10rem] max-h-[10rem] bg-white border-[0.9px] border-grey-200 rounded-[9px] cursor-pointer'>
          <span>
            <img src={Camera} />
          </span>
          <span className='text-grey-700 text-[11px] font-[Medium] mt-[2px]'>
            {images.length}/10
          </span>
          <input type='file' accept='image/*' multiple className='hidden' onChange={handleUpload} />
        </label>
        {images.map((image, i) => (
          <div
            key={i}
            className='relative flex flex-col shrink-0 snap-start justify-center items-center w-[14.87vw] h-[14.87vw] max-w-[10rem] max-h-[10rem] bg-white border-[0.9px] border-grey-200 rounded-[9px] overflow-hidden'
          >
            <img
              src={image.src}
              alt={`upload-${i}`}
              className='w-full h-full object-cover'
              loading='lazy'
            />
            <button
              type='button'
              onClick={() => handleDelete(i)}
              className='absolute top-1 right-1 w-4 h-4 flex items-center justify-center rounded-full bg-black/60 text-white text-xs'
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ImageUploader
