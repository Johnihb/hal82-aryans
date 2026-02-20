'use client'
import { Button } from '@/components/ui/button'
import vapi from '@/lib/vapi'
import { Phone, PhoneOff, User, Bot } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

// WaveAnimation accepts a Tailwind class for bar color so it looks right on each avatar
const WaveAnimation = ({ barClass = 'bg-black' }: { barClass?: string }) => (
  <div className="flex items-center justify-center gap-1 h-12">
    {[...Array(5)].map((_, i) => (
      <div
        key={i}
        className={`wave-bar w-1 rounded-full ${barClass}`}
        style={{
          animationDelay: `${i * 0.1}s`
        }}
      />
    ))}
  </div>
)

const Page = () => {
  const [inCall, setInCall] = useState<boolean>(false)
  const [isSpeaking, setIsSpeaking] = useState<{ user: boolean; assistant: boolean }>({
    user: false,
    assistant: false
  })
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string }>>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const seenTranscripts = useRef<Set<string>>(new Set())

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

 useEffect(() => {
  // USER (mic) speaking
  vapi.on('speech-start', () => {
    setIsSpeaking({
      user: true,
      assistant: false
    })
  })

  vapi.on('speech-end', () => {
    setIsSpeaking(prev => ({
      ...prev,
      user: false
    }))
  })

  // CALL lifecycle
  vapi.on('call-start', () => {
    setInCall(true)
    setIsSpeaking({ user: false, assistant: false })
    seenTranscripts.current.clear()
  })

  vapi.on('call-end', () => {
    setInCall(false)
    setIsSpeaking({ user: false, assistant: false })
    seenTranscripts.current.clear()
  })

  // ASSISTANT (Vapi agent) speaking
  vapi.on('message', (message: any) => {
    if (message.type === 'transcript' && message.transcriptType === 'final') {
      const key = `${message.role}:${message.transcript}`
      if (seenTranscripts.current.has(key)) return
      seenTranscripts.current.add(key)

      setMessages(prev => [
        ...prev,
        {
          role: message.role,
          text: message.transcript
        }
      ])
    }

    if (message.type === 'speech-update') {
      if (message.status === 'started') {
        setIsSpeaking({
          assistant: true,
          user: false
        })
      }

      if (message.status === 'stopped') {
        setIsSpeaking(prev => ({
          ...prev,
          assistant: false
        }))
      }
    }
  })

  return () => {
    vapi.removeAllListeners()
  }
}, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleClick = async () => {
    if (inCall) {
      vapi.stop()
      setIsSpeaking({ user: false, assistant: false })
    } else {
      try {
        const assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID
        if (!assistantId) {
          console.error('NEXT_PUBLIC_VAPI_ASSISTANT_ID is not configured')
          return
        }
        setMessages([])
        seenTranscripts.current.clear()
        setIsSpeaking({ user: false, assistant: false })
        await vapi.start(assistantId)
      } catch (error) {
        console.error('Error connecting to the assistant:', error)
        //! Consider adding user-facing error state/toast notification
      }    }
  }

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden">
      {/* Header */}
      <div className="border-b border-gray-200 p-4 flex-shrink-0">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-medium text-black">Voice Assistant</h1>
          <Button
            variant={inCall ? 'destructive' : 'outline'}
            onClick={handleClick}
            className={inCall ? 'bg-black text-white hover:bg-gray-800' : ''}
          >
            {inCall ? (
              <>
                <PhoneOff className="w-4 h-4 mr-2" />
                End Call
              </>
            ) : (
              <>
                <Phone className="w-4 h-4 mr-2" />
                Start Call
              </>
            )}
          </Button>
        </div>
      </div>

      {/* User and Assistant Grid */}
    {/* User and Assistant Grid */}
<div className="border-b border-gray-200 bg-gray-50 p-8 flex-shrink-0">
  <div className="max-w-4xl mx-auto grid grid-cols-2 gap-8">
    
    {/* Assistant (Bot) */}
    <div className="flex flex-col items-center">
      <div
        className={`w-32 h-32 rounded-full bg-black flex items-center justify-center border-4 transition-all duration-300 ${
          isSpeaking.assistant ? 'border-gray-400 scale-105 shadow-lg' : 'border-gray-600'
        }`}
      >
        <Bot className="w-16 h-16 text-white" />
      </div>

      <p
        className={`mt-4 text-lg font-medium transition-colors ${
          isSpeaking.assistant ? 'text-black' : 'text-gray-500'
        }`}
      >
        Assistant
      </p>

      {/* 🔊 User Wave (UI decides placement) */}
      <div className="h-12 mt-2 flex items-center justify-center">
          {isSpeaking.user && <WaveAnimation barClass="bg-green-500" />}
      </div>
    </div>

    {/* User (You) */}
    <div className="flex flex-col items-center">
      <div
        className={`w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center border-4 transition-all duration-300 ${
          isSpeaking.user ? 'border-black scale-105 shadow-lg' : 'border-gray-300'
        }`}
      >
        <User className="w-16 h-16 text-gray-600" />
      </div>

      <p
        className={`mt-4 text-lg font-medium transition-colors ${
          isSpeaking.user ? 'text-black' : 'text-gray-500'
        }`}
      >
        You
      </p>

      {/* 🔊 User Wave */}
      <div className="h-12 mt-2 flex items-center justify-center">
        {isSpeaking.assistant && <WaveAnimation barClass="bg-black" />}
     
      </div>
    </div>

  </div>
</div>


      {/* Chat Messages - Scrollable Section */}
      <div className="flex-1 overflow-y-auto p-6 bg-white">
        <div className="max-w-4xl mx-auto">
          {messages.length === 0 && !inCall && (
            <div className="text-center text-gray-400 py-12">
              <p className="text-lg">Start a call to begin conversation</p>
            </div>
          )}

          {messages.length === 0 && inCall && (
            <div className="text-center text-gray-400 py-12">
              <p className="text-lg">Listening...</p>
            </div>
          )}

          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                )}

                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-3 break-words ${
                    message.role === 'user' ? 'bg-black text-white' : 'bg-gray-100 text-black border border-gray-200'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </div>

                {message.role === 'user' && (
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 mt-1">
                    <User className="w-6 h-6 text-gray-600" />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page