// components/ToastProvider.js
'use client'

import { Toaster } from 'react-hot-toast'

export const ToastProvider = ({ children }) => (
  <>
    {children}
    <Toaster position="top-right" />
  </>
)
