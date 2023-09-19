import { useState } from 'react'

const initialState = {
  email: '',
  password: '',
}

export default function useLoginVM() {
  const [form, setForm] = useState(initialState)

  return { form, setForm }
}
