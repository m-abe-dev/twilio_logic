import React, { useRef, useEffect, useState } from 'react'
import { Meta } from '../../../Meta'

interface SmsAuthPresentationProps {
  sendTelephoneNumber: (telephone: string) => Promise<void>
  sendSmsCode: (code: string) => Promise<void>
  errorMsg: string
}

export const SmsAuthPresentation: React.FC<SmsAuthPresentationProps> = ({
  sendTelephoneNumber,
  sendSmsCode,
  errorMsg,
}) => {
  const [telephone, setTelephone] = useState('')
  const [verification, setVerification] = useState('')
  const inputRef = useRef(null)
  const buttonDisabled = !telephone.match(/^0\d{9,10}$/)
  const codeButtonDisabled = !verification.match(/^([0-9]{6})$/)

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        margin: '80px 0',
      }}
    >
      <div>
        <Meta title="電話番号(SMS)認証" />
        <h2 style={{ fontWeight: 'normal' }}>電話番号(SMS)認証</h2>
        <div style={{ textAlign: 'center', margin: '40px 10px' }}>
          <p style={{ color: 'red', marginBottom: '10px' }}>{errorMsg}</p>
          <p>
            携帯電話番号を入力後、送信を押してください。
            <br />
            SMSが届きましたら、記載された認証コードを入力してください。
          </p>
        </div>
        <div>
          {/* TODO: validationをかける */}
          <div style={{ position: 'relative' }}>
            <label>
              <input
                type="tel"
                name="telephone"
                value={telephone}
                placeholder="携帯電話番号　ハイフンなし"
                ref={inputRef}
                style={{
                  width: '570px',
                  height: '40px',
                  border: '2px solid #D9D9D9',
                  paddingLeft: '25px',
                  marginBottom: '10px',
                  backgroundColor: '#F2F2F2',
                }}
                onChange={(e) => setTelephone(e.target.value)}
              />
            </label>
            <button
              style={{
                width: '80px',
                height: '39px',
                backgroundColor: '#D9D9D9',
                position: 'absolute',
                top: '1px',
                right: '2px',
              }}
              type="button"
              onClick={() => sendTelephoneNumber(telephone)}
              disabled={buttonDisabled}
            >
              送信
            </button>
            <br />
            <input
              type="number"
              name="verification"
              value={verification}
              placeholder="6桁の認証コード"
              ref={inputRef}
              style={{
                width: '570px',
                height: '40px',
                border: '2px solid #D9D9D9',
                paddingLeft: '25px',
                backgroundColor: '#F2F2F2',
                marginBottom: '40px',
              }}
              onChange={(e) => setVerification(e.target.value)}
            />
          </div>
          <br />
          <button
            style={{
              opacity: codeButtonDisabled ? '0.4' : '1',
              width: '570px',
              height: '40px',
              border: '2px solid #D9D9D9',
              cursor: 'pointer',
              color: 'white',
              backgroundColor: '#469CDA',
            }}
            type="button"
            disabled={codeButtonDisabled}
            onClick={() => sendSmsCode(verification)}
          >
            認証する
          </button>
        </div>
      </div>
    </div>
  )
}
