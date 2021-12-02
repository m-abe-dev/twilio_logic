import React from 'react'
import { SmsAuthPresentation } from './SmsAuth.presentation'
import router from 'next/router'
import { useAuth } from '../../../../lib/authContext'
import { http } from '../../../../lib/setting'
import { useToast } from '../../../../components/Toaster'
import { getRuleErrorRecords } from 'src/utils/error-messages'
interface SmsAuthPresentationProps {
  id: React.ReactNode
}

export const SmsAuthContainer: React.FC<SmsAuthPresentationProps> = ({
  id,
}) => {
  const { user, unautholized } = useAuth()
  const { showToast } = useToast()
  const [errorMsg, setErrorMsg] = React.useState('')

  const sendTelephoneNumber = async (telephone: string): Promise<void> => {
    setErrorMsg('')
    const formData = new FormData()
    formData.append('tel', telephone)
    await http
      .post(`/api/v1/users/identification`, formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((_) => {
        showToast('success', '電話番号を送信しました。')
      })
      .catch((error) => {
        if (error.response.status === 403) unautholized()
        if (error.response.status === 400) {
          setErrorMsg(
            getRuleErrorRecords(error.response.data.error.rule)[0].message
          )
        }
        showToast(
          'error',
          '電話番号の送信に失敗しました。もう一度お試しください'
        )
      })
  }

  const sendSmsCode = async (code: string): Promise<void> => {
    setErrorMsg('')
    const formData = new FormData()
    formData.append('code', code)
    await http
      .post(`/api/v1/users/identification/verify`, formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((_) => {
        showToast('success', '認証コードを送信しました。')
        router.push(`/lesson/${id}/sms/complete`)
      })
      .catch((error) => {
        console.log(error)
        if (error.response.status === 403) unautholized()
        if (error.response.status === 400) {
          setErrorMsg(
            getRuleErrorRecords(error.response.data.error.rule)[0].message
          )
        }
        showToast(
          'error',
          '認証コードの送信に失敗しました。もう一度お試しください'
        )
      })
  }

  return (
    <SmsAuthPresentation
      sendTelephoneNumber={sendTelephoneNumber}
      sendSmsCode={sendSmsCode}
      errorMsg={errorMsg}
    />
  )
}
