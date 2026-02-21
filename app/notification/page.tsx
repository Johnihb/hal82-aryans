import React from 'react'

const NotificationPage = () => {
  return (
    <div className="min-h-screen  bg-gradient-to-br from-black/70 via-gray-300 to-white flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-6">
          <div className="inline-block p-4 bg-gray-500 rounded-full">
            <svg 
              className="w-16 h-16 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" 
              />
            </svg>
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Stay Tuned!
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-md mx-auto">
          More updates coming soon
        </p>
        
        <div className="flex justify-center gap-2 mb-8">
          <div className="w-3 h-3 bg-gray-900 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-3 h-3 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
        
        <p className="text-gray-500 text-sm">
          We're working hard to bring you exciting features
        </p>
      </div>
    </div>
  )
}

export default NotificationPage  